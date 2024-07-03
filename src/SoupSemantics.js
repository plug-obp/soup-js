import { readExpression } from "./SoupReader.js";
import { Reference, Visitor, AnonymousPiece, NamedPiece } from "./SoupSyntaxModel.js";
import { createXXHash32 } from 'hash-wasm';

//I do not box the values. The booleans are native booleans, the numbers are native numbers.
export class RuntimeEnvironment {
    constructor(scope = new Map()) {
        this.scope = scope;
    }
    define(name, value) {
        if (this.scope.has(name)) {
            throw new Error(`The variable ${name} is already defined.`);
        }
        this.scope.set(name, value);
    }
    lookup(name) {
        if (this.scope.has(name) === false) {
            throw new Error(`The variable ${name} is not defined.`);
        }
        return this.scope.get(name);
    }
    update(name, value) {
        if (this.scope.has(name) === false) {
            throw new Error(`The variable ${name} is not defined.`);
        }
        this.scope.set(name, value);
    }
    clone() {
        return new RuntimeEnvironment(new Map(this.scope));
    }

    async hashCode() {
        const hasher = await createXXHash32();
        //The entries are not ordered, so I sort them.
        const entries = Array.from(this.scope.entries()).sort((a, b) => a[0] < b[0]? -1 : a[0] > b[0] ? 1 : 0);
        for (const [key, value] of entries) {
            hasher.update(key);
            hasher.update(value.toString());
        }
        return hasher.digest();
    }

    equals(other) {
        if (other === this) { return true; }
        if (other instanceof RuntimeEnvironment === false) { return false; }
        if (this.scope.size !== other.scope.size) {
            return false;
        }
        for (const [key, value] of this.scope) {
            if (other.scope.has(key) === false) {
                return false;
            }
            if (other.scope.get(key) !== value) {
                return false;
            }
        }
        return true;
    }
}

export function ensureBoolean(operator, value) {
    if (typeof value !== 'boolean') {
        throw new Error(`${operator} expects a boolean, got '${value}'.`);
    }
}
function ensureNumber(operator, value) {
    if (typeof value !== 'number') {
        throw new Error(`${operator} expects a number, got '${value}'.`);
    }
}

/*
    The Expression interpreter maps the syntax tree to javascript values.
    It does not have side effects.
    4 values are returned: true, false, a number, or Error.
*/
export class ExpressionInterpreter extends Visitor {
    visitSyntaxTreeElement(node, env) {
        return new Error(`The node ${node.constructor.name} is not supported by the Soup expression interpreter.`);
    }
    visitBooleanLiteral(node, env) {
        return node.value;
    }
    visitNumberLiteral(node, env) {
        return node.value;
    }
    visitReference(node, env) {
        return env.lookup(node.name);
    }
    visitNotExpression(node, env) {
        const operand = node.operand.accept(this, env);
        ensureBoolean('Unary !', operand);
        return !operand;
    }
    visitMinusExpression(node, env) {
        const operand = node.operand.accept(this, env);
        ensureNumber('Unary -', operand);
        return -operand;
    }
    visitPlusExpression(node, env) {
        const operand = node.operand.accept(this, env);
        ensureNumber('Unary +', operand);
        return operand;
    }
    visitMultiplication(node, env) {
        const left = node.left.accept(this, env);
        ensureNumber('*', left);
        const right = node.right.accept(this, env);
        ensureNumber('*', right);
        return left * right;
    }
    visitDivision(node, env) {
        const left = node.left.accept(this, env);
        ensureNumber('/', left);
        const right = node.right.accept(this, env);
        ensureNumber('/', right);
        if (right === 0) {
            throw new Error('Division by zero.');
        }
        return left / right;
    }
    visitModulus(node, env) {
        const left = node.left.accept(this, env);
        ensureNumber('%', left);
        const right = node.right.accept(this, env);
        ensureNumber('%', right);
        return left % right;
    }
    visitAddition(node, env) {
        const left = node.left.accept(this, env);
        ensureNumber('+', left);
        const right = node.right.accept(this, env);
        ensureNumber('+', right);
        return left + right;
    }
    visitSubtraction(node, env) {
        const left = node.left.accept(this, env);
        ensureNumber('-', left);
        const right = node.right.accept(this, env);
        ensureNumber('-', right);
        return left - right;
    }
    visitLessThan(node, env) {
        const left = node.left.accept(this, env);
        ensureNumber('<', left);
        const right = node.right.accept(this, env);
        ensureNumber('<', right);
        return left < right;
    }
    visitLessThanOrEqual(node, env) {
        const left = node.left.accept(this, env);
        ensureNumber('<=', left);
        const right = node.right.accept(this, env);
        ensureNumber('<=', right);
        return left <= right;
    }
    visitGreaterThan(node, env) {
        const left = node.left.accept(this, env);
        ensureNumber('>', left);
        const right = node.right.accept(this, env);
        ensureNumber('>', right);
        return left > right;
    }
    visitGreaterThanOrEqual(node, env) {
        const left = node.left.accept(this, env);
        ensureNumber('>=', left);
        const right = node.right.accept(this, env);
        ensureNumber('>=', right);
        return left >= right;
    }
    visitEqual(node, env) {
        const left = node.left.accept(this, env);
        const right = node.right.accept(this, env);
        return left === right;
    }
    visitNotEqual(node, env) {
        const left = node.left.accept(this, env);
        const right = node.right.accept(this, env);
        return left !== right;
    }
    visitConjuction(node, env) {
        const left = node.left.accept(this, env);
        ensureBoolean('&&', left);
        const right = node.right.accept(this, env);
        ensureBoolean('&&', right);
        return left && right;
    }
    visitDisjunction(node, env) {
        const left = node.left.accept(this, env);
        ensureBoolean('||', left);
        const right = node.right.accept(this, env);
        ensureBoolean('||', right);
        return left || right;
    }
    visitConditionalExpression(node, env) {
        const condition = node.condition.accept(this, env);
        if (typeof condition !== 'boolean') {
            throw new Error(`The conditional expressions ?: expects a boolean condition, got '${condition}'.`);
        }
        if (condition === true) {
            return node.thenExpression.accept(this, env);
        }
        return node.elseExpression.accept(this, env);
    }
}

export class StatementInterpreter extends Visitor {
    expressionInterpreter;
    constructor(expressionInterpreter = new ExpressionInterpreter()) {
        super();
        this.expressionInterpreter = expressionInterpreter;
    }
    visitSyntaxTreeElement(node, env) {
        return new Error(`The node ${node.constructor.name} is not supported by the Soup statement interpreter.`);
    }
    visitSkip(node, env) {
        return env;
    }
    visitAssignment(node, env) {
        if (!(node.target instanceof Reference)) {
            throw new Error(`The left side of an assignment must be a variable, got ${node.target}.`);
        }
        const value = node.expression.accept(this.expressionInterpreter, env);
        env.update(node.target.name, value);
        return env;
    }
    visitIfStatement(node, env) {
        const condition = node.condition.accept(this.expressionInterpreter, env);
        ensureBoolean('If condition', condition);
        if (condition === true) {
            return node.thenStatement.accept(this, env);
        }
        return node.elseStatement.accept(this, env);
    }
    visitSequence(node, env) {
        return node.right.accept(this, node.left.accept(this, env));
    }
}

export class SoupSemantics {
    soup;
    expressionInterpreter;
    statementInterpreter;
    constructor(
        soup,
        expressionInterpreter = new ExpressionInterpreter(),
        statementInterpreter = new StatementInterpreter(expressionInterpreter)) {
            this.soup = soup;
            this.expressionInterpreter = expressionInterpreter;
            this.statementInterpreter = statementInterpreter;
    }
    initial() {
        const environment = new RuntimeEnvironment();
        for (const variable of this.soup.variables) {
            environment.define(variable.name, variable.initialValue.accept(this.expressionInterpreter, environment));
        }
        return [environment];
    }
    actions(environment) {
        return this.soup.pieces.filter(piece => {
            const guard = piece.guard.accept(this.expressionInterpreter, environment);
            ensureBoolean('Piece guard', guard);
            return guard;
        });
    }
    //Attention: The executeImpure modifies the environment.
    executeImpure(piece, environment) {
        return [piece.effect.accept(this.statementInterpreter, environment)];
    }

    execute(piece, environment) {
        const newEnvironment = environment.clone();
        return [piece.effect.accept(this.statementInterpreter, newEnvironment)];
    }
}

export function evaluateExpression(syntaxTree, environment = new RuntimeEnvironment(), interpreter = new ExpressionInterpreter()) {
    return syntaxTree.accept(interpreter, environment);
}
export function evaluateString(soupExpressionString, environment = new RuntimeEnvironment()) {
    const syntaxModel = readExpression(soupExpressionString);
    return evaluateExpression(syntaxModel, environment);
}

export function evaluateStep(syntaxTree, stepEnvironment, interpreter = new StepExpressionInterpreter()) {
    return syntaxTree.accept(interpreter, stepEnvironment);
}
export function evaluateStepString(soupExpressionString, stepEnvironment) {
    const syntaxModel = readExpression(soupExpressionString);
    return evaluateStep(syntaxModel, stepEnvironment);
}

export class StepExpressionInterpreter extends ExpressionInterpreter {
    visitReference(node, step) {
        const {s:source, a:piece, t:target} = step;
        //if  the reference is "deadlock"
        if (node.name === 'deadlock') {
            //and the piece is not a soup action, then deadlock
            if (!(piece instanceof AnonymousPiece)) return true;
            return false;
        }
        return source.lookup(node.name);
    }
    visitPrimedReference(node, step) {
        const {s:source, a:piece, t:target} = step;
        return target.lookup(node.name);
    }
    visitNamedPieceReference(node, step) {
        const {s:source, a:piece, t:target} = step;
        return piece instanceof NamedPiece && piece.name === node.name;
    }
    visitEnabledExpression(node, step) {
        return node.expression.accept(this, step);
    }
}