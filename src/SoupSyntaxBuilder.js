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

    exitBinaryExpression(ctx) {
        const operator = ctx.operator.text;
        const left = this.getValue(ctx.expression(0));
        const right = this.getValue(ctx.expression(1));
        let binaryExpression = null;
        switch (ctx.operator.type) {
            case SoupParser.MULT:
                binaryExpression = new stx.Multiplication(operator, left, right);
                break;
            case SoupParser.DIV:
                binaryExpression = new stx.Division(operator, left, right);
                break;
            case SoupParser.MOD:
                binaryExpression = new stx.Modulus(operator, left, right);
                break;
            case SoupParser.PLUS:
                binaryExpression = new stx.Addition(operator, left, right);
                break;
            case SoupParser.MINUS:
                binaryExpression = new stx.Subtraction(operator, left, right);
                break;
            case SoupParser.LE:
                binaryExpression = new stx.LessThanOrEqual(operator, left, right);
                break;
            case SoupParser.LT:
                binaryExpression = new stx.LessThan(operator, left, right);
                break;
            case SoupParser.GE:
                binaryExpression = new stx.GreaterThanOrEqual(operator, left, right);
                break;
            case SoupParser.GT:
                binaryExpression = new stx.GreaterThan(operator, left, right);
                break;
            case SoupParser.EQ:
                binaryExpression = new stx.Equal(operator, left, right);
                break;
            case SoupParser.NEQ:
                binaryExpression = new stx.NotEqual(operator, left, right);
                break;
            case SoupParser.AND:
                binaryExpression = new stx.Conjuction(operator, left, right);
                break;
            case SoupParser.OR:
                binaryExpression = new stx.Disjunction(operator, left, right);
                break;
        }
        this.setValue(ctx, binaryExpression);
    }

    exitConditionalExp(ctx) {
        const condition = this.getValue(ctx.expression(0));
        const thenExpression = this.getValue(ctx.expression(1));
        const elseExpression = this.getValue(ctx.expression(2));
        this.setValue(ctx, new stx.ConditionalExpression(condition, thenExpression, elseExpression));
    }

    exitAssign(ctx) {
        const reference = new stx.Reference(ctx.IDENTIFIER().getText());
        const expression = this.getValue(ctx.expression());
        this.setValue(ctx, new stx.Assignment(reference, expression));
    }
    exitAssignStatement(ctx) {
        this.setValue(ctx, this.getValue(ctx.assign()));
    }
    exitIfStatement(ctx) {
        const condition = this.getValue(ctx.expression());
        const thenStatement = this.getValue(ctx.statement(0));
        let elseStatement = null;
        if (ctx.statement(1) == null) {
            elseStatement = new stx.Skip();
        } else {
            elseStatement = this.getValue(ctx.statement(1));
        }
        this.setValue(ctx, new stx.IfStatement(condition, thenStatement, elseStatement));
    }

    exitSequenceStatement(ctx) {
        const left = this.getValue(ctx.statement(0));
        const right = this.getValue(ctx.statement(1));
        this.setValue(ctx, new stx.Sequence(left, right));
    }

    exitGuard(ctx) {
        this.setValue(ctx, this.getValue(ctx.expression()));
    }

    exitEffect(ctx) {
        this.setValue(ctx, this.getValue(ctx.statement()));
    }

    exitNamedPiece(ctx) {
        const name = ctx.IDENTIFIER().getText();
        const guard = this.getValue(ctx.guard());
        const effect = this.getValue(ctx.effect());
        this.setValue(ctx, 
            new stx.NamedPiece(
                name, 
                guard != null ? guard : new stx.BooleanLiteral(true),
                effect != null ? effect : new stx.Skip()
            ));
    }

    exitAnonymousPiece(ctx) {
        const guard = this.getValue(ctx.guard());
        const effect = this.getValue(ctx.effect());
        this.setValue(ctx,
            new stx.AnonymousPiece(
                guard != null ? guard : new stx.BooleanLiteral(true),
                effect));
    }

    exitVariables(ctx) {
        const variables = [];
        for (let i = 0; i < ctx.assign().length; i++) {
            //assign target should be a reference to a variable here
            const assign = this.getValue(ctx.assign(i));
            const vDecl = new stx.VariableDeclaration(assign.target.name, assign.expression);
            variables.push(vDecl);
        }
        this.setValue(ctx, variables);
    }

    exitSoup(ctx) {
        const variables = this.getValue(ctx.variables());
        const pieces = [];
        for (let i = 0; i < ctx.piece().length; i++) {
            pieces.push(this.getValue(ctx.piece(i)));
        }
        this.setValue(ctx, new stx.Soup(variables != null ? variables : [], pieces));
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