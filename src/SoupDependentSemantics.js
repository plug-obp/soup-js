import { ensureBoolean, ExpressionInterpreter, RuntimeEnvironment, StatementInterpreter, StepExpressionInterpreter } from "./SoupSemantics.js";

export class DependentRuntimeEnvironment {
    constructor(input = Map(), environment = new RuntimeEnvironment()) {
        this.input = input;
        this.environment = environment;
    }

    lookup(name) {
        if (this.environment == null) {
            throw new Error(`The variable ${name} is not defined.`);
        }
        return this.environment.lookup(name);
    }

    update(name, value) {
        if (this.environment == null) {
            throw new Error(`The variable ${name} is not defined.`);
        }
        this.environment.update(name, value);
    }

    clone() {
        return new DependentRuntimeEnvironment(this.input, this.environment.clone());
    }
}
export class DependentExpressionInterpreter extends ExpressionInterpreter {
    constructor(stepInterpeter) {
        super();
        this.stepInterpeter = stepInterpeter;
    }
    visitInputReference(node, environment) {
        return node.expression.accept(this.stepInterpeter, environment.input);
    }
}
export class SoupDependentSemantics {
    soup;
    stepInterpreter;
    expressionInterpreter;
    statementInterpreter;
    constructor(
        soup,
        stepInterpreter = new StepExpressionInterpreter(),
        expressionInterpreter = new DependentExpressionInterpreter(stepInterpreter),
        statementInterpreter = new StatementInterpreter(expressionInterpreter)) {
            this.soup = soup;
            this.stepInterpreter = stepInterpreter;
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
    actions(input, environment) {
        const extendedEnvironment = new DependentRuntimeEnvironment(input, environment);
        return this.soup.pieces.filter(piece => {
            const guard = piece.guard.accept(this.expressionInterpreter, extendedEnvironment);
            ensureBoolean('Piece guard', guard);
            return guard;
        });
    }

    execute(piece, input, environment) {
        const extendedEnvironment = new DependentRuntimeEnvironment(input, environment.clone());
        return [piece.effect.accept(this.statementInterpreter, extendedEnvironment)];
    }
}

// a step of the dependent semantics is:
// {input, source, action, target}