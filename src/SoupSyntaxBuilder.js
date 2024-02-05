import SoupParser from '../generated/grammar/SoupParser.js';
import SoupListener from '../generated/grammar/SoupListener.js';
import * as stx from './SoupSyntaxModel.js';

export class SoupSyntaxBuilder extends SoupListener {
    constructor() {
        super();
        this.map = new Map();
        this.tree = null;
    }

    setValue(key, value) {
        this.map.set(key, value);
    }

    getValue(key) {
        return this.map.get(key);
    }

    exitLiteral(ctx) {
        if (ctx.TRUE() != null) {
            this.setValue(ctx, new stx.BooleanLiteral(true));
            return;
        }
        if (ctx.FALSE() != null) {
            this.setValue(ctx, new stx.BooleanLiteral(false));
            return;
        }
        if (ctx.NUMBER() != null) {
            let numberString = ctx.NUMBER().getText();
            //if the number has a dot, then it is a float
            if (numberString.indexOf('.') != -1) {
                this.setValue(ctx, new stx.NumberLiteral(parseFloat(numberString)));
                return;
            }
            //otherwise, it is an integer
            this.setValue(ctx, new stx.NumberLiteral(parseInt(ctx.NUMBER().getText())));
            return;
        }
    }

    exitLiteralExp(ctx) {
        this.setValue(ctx, this.getValue(ctx.literal()));
    }

    exitReferenceExp(ctx) {
        this.setValue(ctx, new stx.Reference(ctx.IDENTIFIER().getText()));
    }

    exitParenExp(ctx) {
        this.setValue(ctx, this.getValue(ctx.expression()));
    }

    exitUnaryExp(ctx) {
        const operator = ctx.operator.text;
        const expression = this.getValue(ctx.expression());
        let unaryExpression = null;
        switch (ctx.operator.type) {
            case SoupParser.NOT:
                unaryExpression = new stx.NotExpression(operator, expression);
                break;
            case SoupParser.PLUS:
                unaryExpression = new stx.PlusExpression(operator, expression);
                break;
            case SoupParser.MINUS:
                unaryExpression = new stx.MinusExpression(operator, expression);
                break;
        }
        this.setValue(ctx, unaryExpression);
    }
}

export class Context {
    constructor(scope = new Map()) {
        this.context = new Array();
        //The first context is the global context
        this.context.push(scope);
    }
    currentContext() {
        return this.context[this.context.length - 1];
    }

    pushContext(context) { 
        if (context == null) {
            context = new Map();
        }
        this.context.push(context); 
    }
    popContext() { this.context.pop(); }

    symbolMissingError(symbol) {
        return new Error(`Symbol ${symbol} is not defined in the current scope`);
    }

    symbolAlreadyDefinedError(symbol) {
        return new Error(`Symbol ${symbol} is already defined in the current scope`);
    }

    lookup(symbol) {
        for (let i = this.context.length - 1; i >= 0; i--) {
            if (this.context[i].has(symbol)) {
                return this.context[i].get(symbol);
            }
        }
        throw new this.symbolMissingError(symbol);
    }

    define(symbol, value) {
        if (this.currentContext().has(symbol)) {
            throw this.symbolAlreadyDefinedError(symbol);
        }
        this.currentContext().set(symbol, value);
    }
}

export class SoupLinker extends stx.Visitor {}