import { readExpression } from "./SoupReader";
import { Visitor } from "./SoupSyntaxModel";

export class Environment {
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
        return this.scope.get(name);
    }
    update(name, value) {
        if (this.scope.has(name) === false) {
            throw new Error(`The variable ${name} is not defined.`);
        }
        this.scope.set(name, value);
    }
}

//I do not box the values. The booleans are native booleans, the numbers are native numbers.

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
        return !node.operand.accept(this, env);
    }
    visitMinusExpression(node, env) {
        return -node.operand.accept(this, env);
    }
    visitPlusExpression(node, env) {
        return node.operand.accept(this, env);
    }
    visitMultiplication(node, env) {
        return node.left.accept(this, env) * node.right.accept(this, env);
    }
    visitDivision(node, env) {
        return node.left.accept(this, env) / node.right.accept(this, env);
    }
    visitModulus(node, env) {
        return node.left.accept(this, env) % node.right.accept(this, env);
    }
    visitAddition(node, env) {
        return node.left.accept(this, env) + node.right.accept(this, env);
    }
    visitSubtraction(node, env) {
        return node.left.accept(this, env) - node.right.accept(this, env);
    }
    visitLessThan(node, env) {
        return node.left.accept(this, env) < node.right.accept(this, env);
    }
    visitLessThanOrEqual(node, env) {
        return node.left.accept(this, env) <= node.right.accept(this, env);
    }
    visitGreaterThan(node, env) {
        return node.left.accept(this, env) > node.right.accept(this, env);
    }
    visitGreaterThanOrEqual(node, env) {
        return node.left.accept(this, env) >= node.right.accept(this, env);
    }
    visitEqual(node, env) {
        return node.left.accept(this, env) === node.right.accept(this, env);
    }
    visitNotEqual(node, env) {
        return node.left.accept(this, env) !== node.right.accept(this, env);
    }
    visitConjuction(node, env) {
        return node.left.accept(this, env) && node.right.accept(this, env);
    }
    visitDisjunction(node, env) {     
        return node.left.accept(this, env) || node.right.accept(this, env);
    }
    visitConditionalExpression(node, env) {
        return node.condition.accept(this, env) ? node.trueExpression.accept(this, env) : node.falseExpression.accept(this, env);
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
        const value = node.expression.accept(this.expressionInterpreter, env);
        env.update(node.name, value);
        return env;
    }
    visitIfStatement(node, env) {
        if (node.condition.accept(this.expressionInterpreter, env)) {
            return node.trueStatement.accept(this, env);
        }
        return node.falseStatement.accept(this, env);
    }
    visitSequence(node, env) {
        return node.second.accept(this, node.first.accept(this, env));
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
        const environment = new Environment();
        for (const variable of this.soup.variables) {
            environment.define(variable.name, variable.expression.accept(this.expressionInterpreter, environment));
        }
        return [environment];
    }
    actions(configuration) {
        return this.soup.pieces.filter(piece => 
            piece.guard.accept(this.expressionInterpreter, configuration) === true);
    }
    execute(action, configuration) {
        return [action.statement.accept(this.statementInterpreter, configuration)];
    }
}

export function evaluateExpression(syntaxTree, environment, interpreter = new ExpressionInterpreter()) {
    return syntaxTree.accept(interpreter, environment);
}
export function evaluateString(soupExpressionString, environment) {
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

class StepExpressionInterpreter extends ExpressionInterpreter {
    visitReference(node, step) {
        const {source, piece, target} = step;
        return source.lookup(node.name);
    }
    visitPrimedReference(node, step) {
        const {source, piece, target} = step;
        return target.lookup(node.name);
    }
    visitNamedPieceReference(node, step) {
        const {source, piece, target} = step;
        return piece.name === node.name;
    }
    visitEnabledExpression(node, step) {
        return node.expression.accept(this, step);
    }
}