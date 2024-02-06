import { link, readExpression, readPiece, readSoup, readStatement } from './SoupReader';
import { Environment, evaluateString, ExpressionInterpreter, SoupSemantics, StatementInterpreter } from './SoupSemantics';
import { Skip, Soup } from './SoupSyntaxModel';

test('eval literal', () => {
    expect(evaluateString('true')).toBe(true);
    expect(evaluateString('false')).toBe(false);
    expect(evaluateString('23')).toBe(23);
    expect(evaluateString('23.4')).toBe(23.4);
});

test('eval reference', () => {
    expect(evaluateString('x', new Environment(new Map([['x', 23]])))).toBe(23);
    expect(evaluateString('zm', new Environment(new Map([['zm', 42]])))).toBe(42);
    expect(() => evaluateString('x', new Environment())).toThrow('The variable x is not defined.');
});

test('eval unary', () => {
    expect(evaluateString('!true')).toBe(false);
    expect(evaluateString('!false')).toBe(true);
    expect(() => evaluateString('!23')).toThrow("Unary ! expects a boolean, got '23'.");
    expect(evaluateString('-23')).toBe(-23);
    expect(() => evaluateString('-true')).toThrow("Unary - expects a number, got 'true'.");
    expect(evaluateString('+23')).toBe(23);
    expect(evaluateString('-(23)')).toBe(-23);
    expect(evaluateString('+(23)')).toBe(23);
    expect(() => evaluateString('+false')).toThrow("Unary + expects a number, got 'false'.");
});

test('eval and', () => {
    expect(evaluateString('true && false')).toBe(false);
    expect(evaluateString('true && true')).toBe(true);
    expect(evaluateString('false && false')).toBe(false);
    expect(evaluateString('false && true')).toBe(false);

    expect(() => evaluateString('23 && true')).toThrow("&& expects a boolean, got '23'.");
    expect(() => evaluateString('false && 42')).toThrow("&& expects a boolean, got '42'.");
});

test('eval or', () => {
    expect(evaluateString('true || true')).toBe(true);
    expect(evaluateString('true || false')).toBe(true);
    expect(evaluateString('false || true')).toBe(true);
    expect(evaluateString('false || false')).toBe(false);

    expect(() => evaluateString('23 || true')).toThrow("|| expects a boolean, got '23'.");
    expect(() => evaluateString('false || 42')).toThrow("|| expects a boolean, got '42'.");
});

test('eval plus', () => {
    expect(evaluateString('23 + 42')).toBe(65);
    expect(evaluateString('-23 + 23')).toBe(0);

    expect(() => evaluateString('23 + true')).toThrow("+ expects a number, got 'true'.");
    expect(() => evaluateString('false + 42')).toThrow("+ expects a number, got 'false'.");
});

test('eval -', () => {
    expect(evaluateString('23 - 42')).toBe(-19);
    expect(evaluateString('23 - 23')).toBe(0);

    expect(() => evaluateString('23 - true')).toThrow("- expects a number, got 'true'.");
    expect(() => evaluateString('false - 42')).toThrow("- expects a number, got 'false'.");
});

test('eval *', () => {
    expect(evaluateString('23 * 42')).toBe(966);
    expect(evaluateString('23 * 0')).toBe(0);
    expect(evaluateString('23 * -1')).toBe(-23);

    expect(() => evaluateString('23 * true')).toThrow("* expects a number, got 'true'.");
    expect(() => evaluateString('false * 42')).toThrow("* expects a number, got 'false'.");
});

test('eval /', () => {
    expect(evaluateString('23 / 42')).toBeCloseTo(0.547619);
    expect(evaluateString('23 / 1')).toBe(23);
    expect(evaluateString('23 / -1')).toBe(-23);
    expect(evaluateString('23 / 23')).toBe(1);
    expect(evaluateString('23 / 0.5')).toBe(46);
});

test('visitDivision throws error when dividing by zero', () => {
    const node = {
        left: { accept: () => 10 },
        right: { accept: () => 0 }
    };
    const env = {};
    const visitor = new ExpressionInterpreter();

    expect(() => visitor.visitDivision(node, env)).toThrow('Division by zero.');
});

test('eval / error when right is zero', () => {
    expect(() => evaluateString('23 / 0')).toThrow(Error('Division by zero.'));
});

test('eval / error when operands are not a number', () => {
    expect(() => evaluateString('23 / true')).toThrow("/ expects a number, got 'true'.");
    expect(() => evaluateString('false / 42')).toThrow("/ expects a number, got 'false'.");
});

test('eval %', () => {
    expect(evaluateString('23 % 42')).toBe(23);
    expect(evaluateString('23 % 23')).toBe(0);
    expect(evaluateString('23 % 1')).toBe(0);

    expect(() => evaluateString('23 % true')).toThrow("% expects a number, got 'true'.");
    expect(() => evaluateString('false % 42')).toThrow("% expects a number, got 'false'.");
});

test('eval <', () => {
    expect(evaluateString('23 < 42')).toBe(true);
    expect(evaluateString('42 < 23')).toBe(false);
    expect(evaluateString('23 < 23')).toBe(false);
    expect(evaluateString('23 < 23.1')).toBe(true);
    expect(evaluateString('23.1 < 23')).toBe(false);
    expect(evaluateString('-23 < -22')).toBe(true);

    expect(() => evaluateString('23 < true')).toThrow("< expects a number, got 'true'.");
    expect(() => evaluateString('false < 42')).toThrow("< expects a number, got 'false'.");
});

test('eval <=', () => {
    expect(evaluateString('23 <= 42')).toBe(true);
    expect(evaluateString('42 <= 23')).toBe(false);
    expect(evaluateString('23 <= 23')).toBe(true);
    expect(evaluateString('23 <= 23.1')).toBe(true);
    expect(evaluateString('23.1 <= 23')).toBe(false);
    expect(evaluateString('-23 <= -22')).toBe(true);

    expect(() => evaluateString('23 <= true')).toThrow("<= expects a number, got 'true'.");
    expect(() => evaluateString('false <= 42')).toThrow("<= expects a number, got 'false'.");
});

test('eval >', () => {
    expect(evaluateString('23   > 42')).toBe(false);
    expect(evaluateString('42   > 23')).toBe(true);
    expect(evaluateString('23   > 23')).toBe(false);
    expect(evaluateString('23   > 23.1')).toBe(false);
    expect(evaluateString('23.1 > 23')).toBe(true);
    expect(evaluateString('-23  > -22')).toBe(false);

    expect(() => evaluateString('23 > true')).toThrow("> expects a number, got 'true'.");
    expect(() => evaluateString('false > 42')).toThrow("> expects a number, got 'false'.");
});

test('eval >=', () => {
    expect(evaluateString('23   >= 42')).toBe(false);
    expect(evaluateString('42   >= 23')).toBe(true);
    expect(evaluateString('23   >= 23')).toBe(true);
    expect(evaluateString('23   >= 23.1')).toBe(false);
    expect(evaluateString('23.1 >= 23')).toBe(true);
    expect(evaluateString('-23  >= -22')).toBe(false);

    expect(() => evaluateString('23 >= true')).toThrow(">= expects a number, got 'true'.");
    expect(() => evaluateString('false >= 42')).toThrow(">= expects a number, got 'false'.");
});

test('eval ==', () => {
    expect(evaluateString('23 == 42')).toBe(false);
    expect(evaluateString('true == 42')).toBe(false);
    expect(evaluateString('23 == false')).toBe(false);
    expect(evaluateString('false == true')).toBe(false);
    expect(evaluateString('42 == 42')).toBe(true);
    expect(evaluateString('true == true')).toBe(true);
    expect(evaluateString('false == false')).toBe(true);
    expect(evaluateString('23.43 == 23.43')).toBe(true);
});

test('eval !=', () => {
    expect(evaluateString('23 != 42')).toBe(true);
    expect(evaluateString('true != 42')).toBe(true);
    expect(evaluateString('23 != false')).toBe(true);
    expect(evaluateString('false != true')).toBe(true);
    expect(evaluateString('42 != 42')).toBe(false);
    expect(evaluateString('true != true')).toBe(false);
});

test('eval conditional', () => {
    expect(evaluateString('true ? 23 : 42')).toBe(23);
    expect(evaluateString('false ? 23 : 42')).toBe(42);

    expect(() => evaluateString('23 ? 23 : 42')).toThrow("The conditional expressions ?: expects a boolean condition, got '23'.");
});

test('eval expression with variable', () => {
    expect(evaluateString('x + 1', new Environment(new Map([['x', 23]])))).toBe(24);
    expect(evaluateString('zm && zm', new Environment(new Map([['zm', true]])))).toBe(true);
});

test('eval expression with variable error', () => {
    expect(() => evaluateString('x + 1', new Environment())).toThrow('The variable x is not defined.');
});

test('eval expression with variable and conditional', () => {
    expect(evaluateString('x ? 23 : 42', new Environment(new Map([['x', true]])))).toBe(23);
    expect(evaluateString('x ? 23 : 42', new Environment(new Map([['x', false]])))).toBe(42);
});

test('execute assign statement', () => {
    const statementInterpreter = new StatementInterpreter();
    const env = new Environment(new Map([['x', 23]]));
    let statement = readStatement('x = 42');
    statement.accept(statementInterpreter, env);
    expect(env.lookup('x')).toBe(42);
    statement = readStatement('x = 23 + 23');
    statement.accept(statementInterpreter, env);
    expect(env.lookup('x')).toBe(46);
    env.define('y', 23);
    statement = readStatement('y = x - 46');
    statement.accept(statementInterpreter, env);
    expect(env.lookup('y')).toBe(0);
});

test('execute if statement', () => {
    const statementInterpreter = new StatementInterpreter();
    const env = new Environment(new Map([['x', 23]]));
    let statement = readStatement('if (x < 42) then x = 42');
    statement.accept(statementInterpreter, env);
    expect(env.lookup('x')).toBe(42);
    statement = readStatement('if (x < 42) then x = 42 else x = 23');
    statement.accept(statementInterpreter, env);
    expect(env.lookup('x')).toBe(23);
    statement = readStatement('if (x < 42) then x = 42 else x = 23');
    statement.accept(statementInterpreter, env);
    expect(env.lookup('x')).toBe(42);
});

test('execute if statement with nested if', () => {
    const statementInterpreter = new StatementInterpreter();
    const env = new Environment(new Map([['x', 23]]));
    const statement = readStatement('if (x < 42) then if (x < 23) then x = 42 else x = 23');
    statement.accept(statementInterpreter, env);
    expect(env.lookup('x')).toBe(23);
});

test('execute if with non boolean condition', () => {
    const statementInterpreter = new StatementInterpreter();
    const env = new Environment(new Map([['x', 23]]));
    const statement = readStatement('if (x) then x = 42');
    expect(() => statement.accept(statementInterpreter, env)).toThrow("If condition expects a boolean, got '23'.");
});

test('execute sequence statement', () => {
    const statementInterpreter = new StatementInterpreter();
    const env = new Environment(new Map([['x', 23], ['y', 42]]));
    const statement = readStatement('x = 42; y = 23');
    statement.accept(statementInterpreter, env);
    expect(env.lookup('x')).toBe(42);
    expect(env.lookup('y')).toBe(23);
});

test('execute 3 statements in sequence', () => {
    const statementInterpreter = new StatementInterpreter();
    const env = new Environment(new Map([['x', 23], ['y', 42]]));
    const statement = readStatement('x = 42; y = 23; x = 23');
    statement.accept(statementInterpreter, env);
    expect(env.lookup('x')).toBe(23);
    expect(env.lookup('y')).toBe(23);
});

test('execute skip statement', () => {
    const statementInterpreter = new StatementInterpreter();
    const env = new Environment(new Map([['x', 23]]));
    const statement = new Skip();
    statement.accept(statementInterpreter, env);
    expect(env.lookup('x')).toBe(23);
});

test('soup initial', () => {
    const soup = readSoup('var x = 23; y = 42');
    const [env] = new SoupSemantics(soup).initial();
    expect(env.lookup('x')).toBe(23);
    expect(env.lookup('y')).toBe(42);
});

test('soup initial with expressions', () => {
    const soup = readSoup('var x = 23 + 42; y = x - 23; z = x < 42');
    const [env] = new SoupSemantics(soup).initial();
    expect(env.lookup('x')).toBe(65);
    expect(env.lookup('y')).toBe(42);
    expect(env.lookup('z')).toBe(false);
});

test('soup actions with non-boolean piece guard', () => {
    const soup = readSoup('var x = 23; p1: [ x ] / x = 42');
    const semantics = new SoupSemantics(soup);
    const [env] = semantics.initial();
    expect(() => semantics.actions(env)).toThrow("Piece guard expects a boolean, got '23'.");
});

test('soup actions one action enabled', () => {
    const soup = readSoup('var x = 23; p1: [ x < 25 ] / x = 42');
    const semantics = new SoupSemantics(soup);
    const [env] = semantics.initial();
    const actions = semantics.actions(env);
    expect(actions.length).toBe(1);
    expect(actions[0].name).toBe('p1');
});

test('soup actions two pieces enabled', () => {
    const soup = readSoup('var x = 23; p1: [ x < 25 ] / x = 42 | p2: [ true ] / x = 42');
    const semantics = new SoupSemantics(soup);
    const [env] = semantics.initial();
    const actions = semantics.actions(env);
    expect(actions.length).toBe(2);
    expect(actions[0].name).toBe('p1');
    expect(actions[1].name).toBe('p2');
});

test('soup actions no action enabled', () => {
    const soup = readSoup('var x = 23; p1: [ x < 23 ] / x = 42');
    const semantics = new SoupSemantics(soup);
    const [env] = semantics.initial();
    const actions = semantics.actions(env);
    expect(actions.length).toBe(0);
});

test('soup execute', () => {
    const soup = readSoup('var x = 23; p1: [ x < 25 ] / x = 42');
    const semantics = new SoupSemantics(soup);
    const [env] = semantics.initial();
    const [action] = semantics.actions(env);
    const [newEnv] = semantics.execute(action, env);
    expect(newEnv.lookup('x')).toBe(42);
    expect(newEnv).toBe(env);
});

test('soup execute safe', () => {
    const soup = readSoup('var x = 23; p1: [ x < 25 ] / x = 42');
    const semantics = new SoupSemantics(soup);
    const [env] = semantics.initial();
    const [action] = semantics.actions(env);
    const [newEnv] = semantics.executeSafe(action, env);
    expect(newEnv.lookup('x')).toBe(42);
    expect(newEnv).not.toBe(env);
    expect(env.lookup('x')).toBe(23);
});