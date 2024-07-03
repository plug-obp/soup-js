import { DependentExpressionInterpreter, DependentRuntimeEnvironment, SoupDependentSemantics } from "./SoupDependentSemantics.js";
import { readExpression, readSoup } from "./SoupReader.js";
import { SoupSemantics, StepExpressionInterpreter, RuntimeEnvironment } from "./SoupSemantics.js";
import { InputReference, NumberLiteral } from "./SoupSyntaxModel.js";

function base() {
    const baseCode = `
        var x = 0;
        | piece: [x==0]/x=3;
    `;
    const baseSoup = readSoup(baseCode);
    const baseSemantics = new SoupSemantics(baseSoup);
    const s = baseSemantics.initial()[0];
    const a = baseSemantics.actions(s)[0];
    const t = baseSemantics.execute(a, s)[0];
    const step = {s, a, t};
    return {step, stepEvaluator: new StepExpressionInterpreter()}
}

test('dependent expression eval', () => {
    const {step, stepEvaluator} = base();

    function deval(code) {
        const expression = readExpression(code);
        const evaluator = new DependentExpressionInterpreter(stepEvaluator);
        const environment = new RuntimeEnvironment();
        const extendedEnvironment = new DependentRuntimeEnvironment(step, environment);
        const value = expression.accept(evaluator, extendedEnvironment);
        return value;
    }
    expect(deval('@true')).toBe(true);
    expect(deval('@x')).toBe(0);
    expect(deval('@x\'')).toBe(3);
    expect(deval('@p:piece')).toBe(true);
    expect(deval('@p:no')).toBe(false);
    expect(deval('@(x==3)')).toBe(false);
    expect(deval('@(x==0)')).toBe(true);
    expect(deval('@(x\'==0)')).toBe(false);
    expect(deval('@(x\'==3)')).toBe(true);
});

test('mixed eval', () => {
    const {step, stepEvaluator} = base();

    function deval(code) {
        const expression = readExpression(code);
        const evaluator = new DependentExpressionInterpreter(stepEvaluator);
        const environment = new RuntimeEnvironment();
        environment.define('x', 1);
        const extendedEnvironment = new DependentRuntimeEnvironment(step, environment);
        const value = expression.accept(evaluator, extendedEnvironment);
        return value;
    }
    expect(deval('@true && true')).toBe(true);
    expect(deval('@x + x')).toBe(1);
    expect(deval('@x\' + x')).toBe(4);
    expect(deval('@p:piece ∧ x == 1')).toBe(true);
    expect(deval('@p:no ∨ x == 1')).toBe(true);
    expect(deval('@(x==3)')).toBe(false);
    expect(deval('(@x\') == x + 2')).toBe(true);
});

test('dependent semantics', () => {
    const code = `
        var x = 0;
        | piece: [x==0 ∧ @x' == 3]/ x = @x' + 1;
    `;
    const soup = readSoup(code);
    const semantics = new SoupDependentSemantics(soup);
    const {step, _} = base();
    const s = semantics.initial()[0];
    const a = semantics.actions(step, s)[0];
    const t = semantics.execute(a, step, s)[0];
    expect(t.lookup('x')).toBe(4);
    expect(t).not.toBeInstanceOf(DependentRuntimeEnvironment);
});