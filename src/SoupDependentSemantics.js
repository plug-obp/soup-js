import { ExpressionInterpreter, StatementInterpreter, StepExpressionInterpreter } from "./SoupSemantics.js";
import { Environment } from "./SoupSyntaxBuilder.js";

export class DependentRuntimeEnvironment {
    constructor(scope = Map(), parent = null) {
        this.scope = scope;
        this.parent = parent;
    }

    lookup(name) {
        if (!this.scope.has(name)) {
            if (this.parent == null) {
                throw new Error(`The variable ${name} is not defined.`);
            }
            return this.parent.lookup(name);
        }
        return this.scope.get(name);
    }

    clone() {
        return new DependentRuntimeEnvironment(new Map(this.scope), this.parent().clone());
    }

    async hashCode() {
        const hasher = await createXXHash32();
        //The entries are not ordered, so I sort them.
        const entries = Array.from(this.scope.entries()).sort((a, b) => a[0] < b[0]? -1 : a[0] > b[0] ? 1 : 0);
        for (const [key, value] of entries) {
            hasher.update(key);
            hasher.update(value.toString());
        }
        if (this.parent != null) {
            hasher.update(this.parent.hashCode());
        }
        return hasher.digest();
    }

    equals(other) {
        if (other === this) { return true; }
        if (other instanceof DependentRuntimeEnvironment === false) { return false; }
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
        if (this.parent != null) {
            if (!this.parent.equals(other.parent)) return false;
        }
        return true;
    }
}
export class DependentExpressionInterpreter extends ExpressionInterpreter {
    constructor(stepInterpeter) {
        super();
        this.stepInterpeter = stepInterpeter;
    }
    visitInputReference(node, environment) {
        return node.expression.accept(this.stepInterpeter, environment.lookup('@'));
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
        const environment = new Environment();
        for (const variable of this.soup.variables) {
            environment.define(variable.name, variable.initialValue.accept(this.expressionInterpreter, environment));
        }
        return [environment];
    }
    actions(input, environment) {
        const extendedEnvironment = new DependentRuntimeEnvironment(new Map([[ "@", input]]), environment);
        return this.soup.pieces.filter(piece => {
            const guard = piece.guard.accept(this.expressionInterpreter, extendedEnvironment);
            ensureBoolean('Piece guard', guard);
            return guard;
        });
    }

    execute(piece, input, environment) {
        const extendedEnvironment = new DependentRuntimeEnvironment(new Map([[ "@", input]]), environment.clone());
        return [piece.effect.accept(this.statementInterpreter, extendedEnvironment)];
    }
}