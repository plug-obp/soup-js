import { readExpression, readPiece, readSoup, readStatement } from './SoupReader'; 
import { SoupSyntaxBuilder } from './SoupSyntaxBuilder';
import * as stx from './SoupSyntaxModel.js';

test('literal', () => {
  expect(readExpression('true')).toEqual(new stx.BooleanLiteral(true));
  expect(readExpression('false')).toEqual(new stx.BooleanLiteral(false));
  expect(readExpression('23')).toEqual(new stx.NumberLiteral(23));
  expect(readExpression('-23')).toEqual(new stx.NumberLiteral(-23));
  expect(readExpression('+23')).toEqual(new stx.NumberLiteral(23));
  expect(readExpression('23.4')).toEqual(new stx.NumberLiteral(23.4));
});

test('reference', () => {
  expect(readExpression('x')).toEqual(new stx.Reference('x'));
  expect(readExpression('zm')).toEqual(new stx.Reference('zm'));
});

test('paren', () => { 
  expect(readExpression('(true)')).toEqual(new stx.BooleanLiteral(true));
  expect(readExpression('(-23)')).toEqual(new stx.NumberLiteral(-23));
  expect(readExpression('(zm)')).toEqual(new stx.Reference('zm'));
});

test('unary', () => {
  expect(readExpression('!true')).toEqual(new stx.NotExpression('!', new stx.BooleanLiteral(true)));
  expect(readExpression('+(23)')).toEqual(new stx.PlusExpression('+', new stx.NumberLiteral(23)));
  expect(readExpression('-(23)')).toEqual(new stx.MinusExpression('-', new stx.NumberLiteral(23)));
  expect(readExpression('--23')).toEqual(new stx.MinusExpression('-', new stx.NumberLiteral(-23)));
});

test('binary', () => {
  expect(readExpression('true && false')).toEqual(new stx.Conjuction('&&', new stx.BooleanLiteral(true), new stx.BooleanLiteral(false)));
  expect(readExpression('true || false')).toEqual(new stx.Disjunction('||', new stx.BooleanLiteral(true), new stx.BooleanLiteral(false)));
  expect(readExpression('23 + 42')).toEqual(new stx.Addition('+', new stx.NumberLiteral(23), new stx.NumberLiteral(42)));
  expect(readExpression('23 - 42')).toEqual(new stx.Subtraction('-', new stx.NumberLiteral(23), new stx.NumberLiteral(42)));
  expect(readExpression('23 * 42')).toEqual(new stx.Multiplication('*', new stx.NumberLiteral(23), new stx.NumberLiteral(42)));
  expect(readExpression('23 / 42')).toEqual(new stx.Division('/', new stx.NumberLiteral(23), new stx.NumberLiteral(42)));
  expect(readExpression('23 % 42')).toEqual(new stx.Modulus('%', new stx.NumberLiteral(23), new stx.NumberLiteral(42)));
  expect(readExpression('23 < 42')).toEqual(new stx.LessThan('<', new stx.NumberLiteral(23), new stx.NumberLiteral(42)));
  expect(readExpression('23 <= 42')).toEqual(new stx.LessThanOrEqual('<=', new stx.NumberLiteral(23), new stx.NumberLiteral(42)));
  expect(readExpression('23 > 42')).toEqual(new stx.GreaterThan('>', new stx.NumberLiteral(23), new stx.NumberLiteral(42)));
  expect(readExpression('23 >= 42')).toEqual(new stx.GreaterThanOrEqual('>=', new stx.NumberLiteral(23), new stx.NumberLiteral(42)));
  expect(readExpression('23 == 42')).toEqual(new stx.Equal('==', new stx.NumberLiteral(23), new stx.NumberLiteral(42)));
  expect(readExpression('23 != 42')).toEqual(new stx.NotEqual('!=', new stx.NumberLiteral(23), new stx.NumberLiteral(42)));
});

test('conditional expression', () => {
  expect(readExpression('true ? 23 : 42')).toEqual(new stx.ConditionalExpression(new stx.BooleanLiteral(true), new stx.NumberLiteral(23), new stx.NumberLiteral(42)));
});

test('assignment', () => {
  expect(readStatement('x = 23')).toEqual(new stx.Assignment(new stx.Reference('x'), new stx.NumberLiteral(23)));
});

test('if statement', () => {
  expect(readStatement('if true then x=23 else y=42')).toEqual(
    new stx.IfStatement(
      new stx.BooleanLiteral(true), 
      new stx.Assignment(new stx.Reference('x'), new stx.NumberLiteral(23)),
      new stx.Assignment(new stx.Reference('y'), new stx.NumberLiteral(42))
    ));
  expect(readStatement('if true then x=23')).toEqual(
    new stx.IfStatement(
      new stx.BooleanLiteral(true),
      new stx.Assignment(new stx.Reference('x'), new stx.NumberLiteral(23)),
      new stx.Skip()));
});

test('sequence statement', () => {
  expect(readStatement('x=23; y=42')).toEqual(
    new stx.Sequence(
      new stx.Assignment(new stx.Reference('x'), new stx.NumberLiteral(23)),
      new stx.Assignment(new stx.Reference('y'), new stx.NumberLiteral(42))
    ));
});

test('anonymous piece', () => {
  expect(readPiece('[ p ] / x=23')).toEqual(
    new stx.AnonymousPiece(
      new stx.Reference('p'),
      new stx.Assignment(new stx.Reference('x'), new stx.NumberLiteral(23))
    ));
  expect(readPiece('/ x=23')).toEqual(
    new stx.AnonymousPiece(
      new stx.BooleanLiteral(true),
      new stx.Assignment(new stx.Reference('x'), new stx.NumberLiteral(23))
    ));
});

test('named piece', () => {
  expect(readPiece('piece: [ p ] / x=23')).toEqual(
    new stx.NamedPiece(
      'piece',
      new stx.Reference('p'),
      new stx.Assignment(new stx.Reference('x'), new stx.NumberLiteral(23))
    ));

  expect(readPiece('piece: / x=23')).toEqual(
    new stx.NamedPiece(
      'piece',
      new stx.BooleanLiteral(true),
      new stx.Assignment(new stx.Reference('x'), new stx.NumberLiteral(23))
    ));
  
  expect(readPiece('piece: [ p ]')).toEqual(
    new stx.NamedPiece(
      'piece',
      new stx.Reference('p'),
      new stx.Skip()
    ));
});

test('soup', () => {
  expect(readSoup('var x=2 p1: [ p ] / x=23 | p2: / x=23')).toEqual(
    new stx.Soup([
      new stx.VariableDeclaration('x', new stx.NumberLiteral(2))
    ], [
      new stx.NamedPiece(
        'p1',
        new stx.Reference('p'),
        new stx.Assignment(new stx.Reference('x'), new stx.NumberLiteral(23))
      ),
      new stx.NamedPiece(
        'p2',
        new stx.BooleanLiteral(true),
        new stx.Assignment(new stx.Reference('x'), new stx.NumberLiteral(23))
      )
    ]));
});


test('soup no vars', () => {
  expect(readSoup('p1: [ p ] / x=23 | p2: / x=23')).toEqual(
    new stx.Soup([],
      [
        new stx.NamedPiece(
          'p1',
          new stx.Reference('p'),
          new stx.Assignment(new stx.Reference('x'), new stx.NumberLiteral(23))
        ),
        new stx.NamedPiece(
          'p2',
          new stx.BooleanLiteral(true),
          new stx.Assignment(new stx.Reference('x'), new stx.NumberLiteral(23))
        )
      ]
    ));
});

test('soup no pieces', () => {
  expect(readSoup('var x=2')).toEqual(
    new stx.Soup([
      new stx.VariableDeclaration('x', new stx.NumberLiteral(2))
    ], []));
});