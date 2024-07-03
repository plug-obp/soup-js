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

    position(ctx) {
        return new stx.Position(
            new stx.Cursor(ctx.start.line, ctx.start.column), 
            new stx.Cursor(ctx.stop.line, ctx.stop.stop));
    }

    singlePosition(cursor) {
        return new stx.Position(cursor, cursor);
    }

    exitLiteral(ctx) {
        if (ctx.TRUE() != null) {
            this.setValue(ctx, new stx.BooleanLiteral(true, this.position(ctx)));
            return;
        }
        if (ctx.FALSE() != null) {
            this.setValue(ctx, new stx.BooleanLiteral(false, this.position(ctx)));
            return;
        }
        if (ctx.NUMBER() != null) {
            let numberString = ctx.NUMBER().getText();
            //if the number has a dot, then it is a float
            if (numberString.indexOf('.') != -1) {
                this.setValue(ctx, new stx.NumberLiteral(parseFloat(numberString), this.position(ctx)));
                return;
            }
            //otherwise, it is an integer
            this.setValue(ctx, new stx.NumberLiteral(parseInt(ctx.NUMBER().getText()), this.position(ctx)));
            return;
        }
    }

    exitLiteralExp(ctx) {
        this.setValue(ctx, this.getValue(ctx.literal()));
    }

    exitReferenceExp(ctx) {
        this.setValue(ctx, new stx.Reference(ctx.IDENTIFIER().getText(), this.position(ctx)));
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
                unaryExpression = new stx.NotExpression(operator, expression, this.position(ctx));
                break;
            case SoupParser.PLUS:
                unaryExpression = new stx.PlusExpression(operator, expression, this.position(ctx));
                break;
            case SoupParser.MINUS:
                unaryExpression = new stx.MinusExpression(operator, expression, this.position(ctx));
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
                binaryExpression = new stx.Multiplication(operator, left, right, this.position(ctx));
                break;
            case SoupParser.DIV:
                binaryExpression = new stx.Division(operator, left, right, this.position(ctx));
                break;
            case SoupParser.MOD:
                binaryExpression = new stx.Modulus(operator, left, right, this.position(ctx));
                break;
            case SoupParser.PLUS:
                binaryExpression = new stx.Addition(operator, left, right, this.position(ctx));
                break;
            case SoupParser.MINUS:
                binaryExpression = new stx.Subtraction(operator, left, right, this.position(ctx));
                break;
            case SoupParser.LE:
                binaryExpression = new stx.LessThanOrEqual(operator, left, right, this.position(ctx));
                break;
            case SoupParser.LT:
                binaryExpression = new stx.LessThan(operator, left, right, this.position(ctx));
                break;
            case SoupParser.GE:
                binaryExpression = new stx.GreaterThanOrEqual(operator, left, right, this.position(ctx));
                break;
            case SoupParser.GT:
                binaryExpression = new stx.GreaterThan(operator, left, right, this.position(ctx));
                break;
            case SoupParser.BEQ:
                binaryExpression = new stx.Equal(operator, left, right, this.position(ctx));
                break;
            case SoupParser.NEQ:
                binaryExpression = new stx.NotEqual(operator, left, right, this.position(ctx));
                break;
            case SoupParser.AND:
                binaryExpression = new stx.Conjuction(operator, left, right, this.position(ctx));
                break;
            case SoupParser.OR:
                binaryExpression = new stx.Disjunction(operator, left, right, this.position(ctx));
                break;
        }
        this.setValue(ctx, binaryExpression);
    }

    exitConditionalExp(ctx) {
        const condition = this.getValue(ctx.expression(0));
        const thenExpression = this.getValue(ctx.expression(1));
        const elseExpression = this.getValue(ctx.expression(2));
        this.setValue(ctx, new stx.ConditionalExpression(condition, thenExpression, elseExpression, this.position(ctx)));
    }

    exitAssign(ctx) {
        const reference = new stx.Reference(ctx.IDENTIFIER().getText(), this.position(ctx));
        const expression = this.getValue(ctx.expression());
        this.setValue(ctx, new stx.Assignment(reference, expression, this.position(ctx)));
    }
    exitAssignStatement(ctx) {
        this.setValue(ctx, this.getValue(ctx.assign()));
    }
    exitIfStatement(ctx) {
        const condition = this.getValue(ctx.expression());
        const thenStatement = this.getValue(ctx.statement(0));
        let elseStatement = null;
        if (ctx.statement(1) == null) {
            elseStatement = new stx.Skip(
                new stx.Position(
                    thenStatement.position.stop, 
                    thenStatement.position.stop));
        } else {
            elseStatement = this.getValue(ctx.statement(1));
        }
        this.setValue(ctx, new stx.IfStatement(condition, thenStatement, elseStatement, this.position(ctx)));
    }

    exitSequenceStatement(ctx) {
        const left = this.getValue(ctx.statement(0));
        const right = this.getValue(ctx.statement(1));
        this.setValue(ctx, new stx.Sequence(left, right, this.position(ctx)));
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
                effect != null ? effect : new stx.Skip(),
                this.position(ctx)
            ));
    }

    exitAnonymousPiece(ctx) {
        const guard = this.getValue(ctx.guard());
        const effect = this.getValue(ctx.effect());
        this.setValue(ctx,
            new stx.AnonymousPiece(
                guard != null ? guard : new stx.BooleanLiteral(true),
                effect != null ? effect : new stx.Skip()),
                this.position(ctx));
    }

    exitVariables(ctx) {
        const variables = [];
        for (let i = 0; i < ctx.assign().length; i++) {
            //assign target should be a reference to a variable here
            const assign = this.getValue(ctx.assign(i));
            const vDecl = new stx.VariableDeclaration(assign.target.name, assign.expression, this.position(ctx.assign(i)));
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
        this.setValue(ctx, new stx.Soup(variables != null ? variables : [], pieces, this.position(ctx)));
    }

    exitPrimedReferenceExp(ctx) {
        this.setValue(ctx, new stx.PrimedReference(ctx.IDENTIFIER().getText(), this.position(ctx)));
    }
    exitNamedPieceReferenceExp(ctx) {
        this.setValue(ctx, new stx.NamedPieceReference(ctx.IDENTIFIER().getText(), this.position(ctx) ));
    }
    exitEnabledExp(ctx) {
        this.setValue(ctx, new stx.EnabledExpression(this.getValue(ctx.expression(), this.position(ctx) )));
    }
    exitInputReferenceExp(ctx) {
        this.setValue(ctx, new stx.InputReference(this.getValue(ctx.expression(), this.position(ctx) )));
    }
}

/*
    The simple Soup it is a flat language, the scope has only one level.
    If we add variable declaration in guards and effects, then we will need a layered scope.
    If we add functions, then we will also need a layered scope.
*/
class Scope {
    scope;
    constructor(scope = new Map()) {
        this.scope = scope;
    }
    currentScope() {
        return this.scope;
    }

    symbolMissingError(symbol) {
        return new Error(`Symbol ${symbol} is not defined in the current scope`);
    }

    symbolAlreadyDefinedError(symbol) {
        return new Error(`Symbol ${symbol} is already defined in the current scope`);
    }

    lookup(symbol) {
        if (this.scope.has(symbol)) {
            return this.scope.get(symbol);
        }
        throw new this.symbolMissingError(symbol);
    }

    define(symbol, value) {
        if (this.scope.has(symbol)) {
            throw this.symbolAlreadyDefinedError(symbol);
        }
        this.scope.set(symbol, value);
    }
}

export class Environment {
    pieceScope; //the scope for pieces, each piece has an unique name
    variableScope; //the scope for variables, each variable has an unique name
    constructor(pieceScope = new Scope(), variableScope = new Scope()) {
        this.pieceScope = pieceScope;
        this.variableScope = variableScope;
    }
}

/*
    I am not sure if we need this class as a linker.
    I definitely see its value as a semantic checker, that ensures the names are correctly used. 
    But we do not need to change the AST for only checking.

    If ever we use optimize the interpreter environment to use the index of a variable in an 
    array-based encoding of the environment, then it will be convenient to change the AST (make references point back to the declarations)
    instead of having a symbol-table.
 */
export class SoupLinker extends stx.Visitor {
    visitReference(reference, environment) {
        const {_, variableScope} = environment;
        if (reference.expression == null) {
            try {
                reference.setDeclaration(variableScope.lookup(reference.name));
            } catch (error) {
                throw variableScope.symbolMissingError(reference.name);
            }
        }
    }

    visitSoup(soup, environment) {
        if (! (environment != null)) {
            environment = new Environment();
        }
        const {pieceScope, variableScope} = environment;
        for (let variable of soup.variables) {
            variable.initialValue.accept(this, environment);
            variableScope.define(variable.name, variable);
        }
        for (let piece of soup.pieces) {
            piece.accept(this, environment);
        }
    }

    visitAnonymousPiece(anonymousPiece, environment) {
        anonymousPiece.guard.accept(this, environment);
        anonymousPiece.effect.accept(this, environment);
    }

    visitNamedPiece(namedPiece, environment) {
        const {pieceScope, variableScope} = environment;
        pieceScope.define(namedPiece.name, namedPiece);
        namedPiece.guard.accept(this, environment);
        namedPiece.effect.accept(this, environment);
    }

    visitAssignment(assignment, environment) {
        assignment.target.accept(this, environment);
        assignment.expression.accept(this, environment);
    }

    visitIfStatement(ifStatement, environment) {
        ifStatement.condition.accept(this, environment);
        ifStatement.thenStatement.accept(this, environment);
        ifStatement.elseStatement.accept(this, environment);
    }

    visitSequence(sequence, environment) {
        sequence.left.accept(this, environment);
        sequence.right.accept(this, environment);
    }

    visitConditionalExpression(conditionalExpression, environment) {
        conditionalExpression.condition.accept(this, environment);
        conditionalExpression.thenExpression.accept(this, environment);
        conditionalExpression.elseExpression.accept(this, environment);
    }

    visitBinaryExpression(binaryExpression, environment) {
        binaryExpression.left.accept(this, environment);
        binaryExpression.right.accept(this, environment);
    }

    visitUnaryExpression(unaryExpression, environment) {
        unaryExpression.expression.accept(this, environment);
    }

    visitPrimedReference(primedReference, environment) {
        const {_, variableScope} = environment;
        if (reference.expression == null) {
            try {
                variableScope.lookup(reference.name);
            } catch (error) {
                throw variableScope.symbolMissingError(reference.name);
            }
        }
    }

    visitNamedPieceReference(namedPieceReference, environment) {
        const {_, pieceScope} = environment;
        if (reference.expression == null) {
            try {
                pieceScope.lookup(reference.name);
            } catch (error) {
                throw pieceScope.symbolMissingError(reference.name);
            }
        }
    }

    visitEnabledExpression(enabledExpression, environment) {
        enabledExpression.expression.accept(this, environment);
    }
}