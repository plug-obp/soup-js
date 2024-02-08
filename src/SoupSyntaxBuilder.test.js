import { link, readExpression, readPiece, readSoup, readStatement } from './SoupReader';
import * as stx from './SoupSyntaxModel.js';
import {expect, jest, test} from '@jest/globals';

const trueLiteralPattern = new stx.BooleanLiteral(true, expect.anything());
const falseLiteralPattern = new stx.BooleanLiteral(false, expect.anything());
const number23 = new stx.NumberLiteral(23, expect.anything());
const number42 = new stx.NumberLiteral(42, expect.anything());
const rP = new stx.Reference('p', expect.anything());
const rX = new stx.Reference('x', expect.anything());
const rY = new stx.Reference('y', expect.anything());
const rZM = new stx.Reference('zm', expect.anything());

test('literal', () => {
  expect(readExpression('true')).toEqual(trueLiteralPattern);
  expect(readExpression('false')).toEqual(falseLiteralPattern);
  expect(readExpression('23')).toEqual(number23);
  expect(readExpression('-23')).toEqual(new stx.NumberLiteral(-23, expect.anything()));
  expect(readExpression('+23')).toEqual(number23);
  expect(readExpression('23.4')).toEqual(new stx.NumberLiteral(23.4, expect.anything()));
});

test('reference', () => {
  expect(readExpression('x')).toEqual(rX);
  expect(readExpression('zm')).toEqual(rZM);
});

test('paren', () => { 
  expect(readExpression('(true)')).toEqual(trueLiteralPattern);
  expect(readExpression('(-23)')).toEqual(new stx.NumberLiteral(-23, expect.anything()));
  expect(readExpression('(zm)')).toEqual(rZM);
});

test('unary', () => {
  expect(readExpression('!true')).toEqual(new stx.NotExpression('!', trueLiteralPattern, expect.anything()));
  expect(readExpression('+(23)')).toEqual(new stx.PlusExpression('+', number23, expect.anything()));
  expect(readExpression('-(23)')).toEqual(new stx.MinusExpression('-', number23, expect.anything()));
  expect(readExpression('--23')).toEqual(
    new stx.MinusExpression(
      '-', 
      new stx.NumberLiteral(-23, expect.anything()),
      expect.anything()));
});

test('binary', () => {
  expect(readExpression('true && false')).toEqual(new stx.Conjuction('&&', trueLiteralPattern, falseLiteralPattern, expect.anything()));
  expect(readExpression('true || false')).toEqual(new stx.Disjunction('||', trueLiteralPattern, falseLiteralPattern, expect.anything()));
  expect(readExpression('23 + 42')).toEqual(new stx.Addition('+', number23, number42, expect.anything()));
  expect(readExpression('23 - 42')).toEqual(new stx.Subtraction('-', number23, number42, expect.anything()));
  expect(readExpression('23 * 42')).toEqual(new stx.Multiplication('*', number23, number42, expect.anything()));
  expect(readExpression('23 / 42')).toEqual(new stx.Division('/', number23, number42, expect.anything()));
  expect(readExpression('23 % 42')).toEqual(new stx.Modulus('%', number23, number42, expect.anything()));
  expect(readExpression('23 < 42')).toEqual(new stx.LessThan('<', number23, number42, expect.anything()));
  expect(readExpression('23 <= 42')).toEqual(new stx.LessThanOrEqual('<=', number23, number42, expect.anything()));
  expect(readExpression('23 > 42')).toEqual(new stx.GreaterThan('>', number23, number42, expect.anything()));
  expect(readExpression('23 >= 42')).toEqual(new stx.GreaterThanOrEqual('>=', number23, number42, expect.anything()));
  expect(readExpression('23 == 42')).toEqual(new stx.Equal('==', number23, number42, expect.anything()));
  expect(readExpression('23 != 42')).toEqual(new stx.NotEqual('!=', number23, number42, expect.anything()));
});

test('conditional expression', () => {
  expect(readExpression('true ? 23 : 42')).toEqual(new stx.ConditionalExpression(trueLiteralPattern, number23, number42, expect.anything()));
});

test('assignment', () => {
  expect(readStatement('x = 23')).toEqual(new stx.Assignment(rX, number23, expect.anything()));
});

test('if statement', () => {
  expect(readStatement('if true then x=23 else y=42')).toEqual(
    new stx.IfStatement(
      trueLiteralPattern,
      new stx.Assignment(rX, number23, expect.anything()),
      new stx.Assignment(rY, number42, expect.anything()),
      expect.anything()
    ));
  expect(readStatement('if true then x=23')).toEqual(
    new stx.IfStatement(
      trueLiteralPattern,
      new stx.Assignment(rX, number23, expect.anything()),
      new stx.Skip(expect.anything()), expect.anything() ));
});

test('sequence statement', () => {
  expect(readStatement('x=23; y=42')).toEqual(
    new stx.Sequence(
      new stx.Assignment(rX, number23, expect.anything()),
      new stx.Assignment(rY, number42, expect.anything()),
      expect.anything()
    ));
});

test('anonymous piece', () => {
  expect(readPiece('[ p ] / x=23')).toEqual(
    new stx.AnonymousPiece(
      rP,
      new stx.Assignment(rX, number23, expect.anything()), expect.anything()
    ));
  expect(readPiece('/ x=23')).toEqual(
    new stx.AnonymousPiece(
      trueLiteralPattern,
      new stx.Assignment(rX, number23, expect.anything()), expect.anything()
    ));
});

test('named piece', () => {
  expect(readPiece('piece: [ p ] / x=23')).toEqual(
    new stx.NamedPiece(
      'piece',
      rP,
      new stx.Assignment(rX, number23, expect.anything()), expect.anything()
    ));

  expect(readPiece('piece: / x=23')).toEqual(
    new stx.NamedPiece(
      'piece',
      trueLiteralPattern,
      new stx.Assignment(rX, number23, expect.anything()), expect.anything()
    ));
  
  expect(readPiece('piece: [ p ]')).toEqual(
    new stx.NamedPiece(
      'piece',
      rP,
      new stx.Skip(), expect.anything()));
});

test('soup', () => {
  expect(readSoup('var x=42 p1: [ p ] / x=23 | p2: / x=23')).toEqual(
    new stx.Soup([
      new stx.VariableDeclaration('x', number42, expect.anything())
    ], [
      new stx.NamedPiece(
        'p1',
        rP,
        new stx.Assignment(rX, number23, expect.anything()),
        expect.anything()
      ),
      new stx.NamedPiece(
        'p2',
        trueLiteralPattern,
        new stx.Assignment(rX, number23, expect.anything()),
        expect.anything()
      )
    ], expect.anything()));
});

test('soup one piece no bool guard', () => {
  const soup = readSoup('var x = 23; p1: [ x ] / x = 42');
  expect(soup).toEqual(
    new stx.Soup([
      new stx.VariableDeclaration('x', number23, expect.anything())
    ], [
      new stx.NamedPiece(
        'p1',
        rX,
        new stx.Assignment(rX, number42, expect.anything()),
        expect.anything()
      )
    ], expect.anything()));
});

test('soup no vars', () => {
  expect(readSoup('p1: [ p ] / x=23 | p2: / x=23')).toEqual(
    new stx.Soup([],
      [
        new stx.NamedPiece(
          'p1',
          rP,
          new stx.Assignment(rX, number23, expect.anything()),
          expect.anything()
        ),
        new stx.NamedPiece(
          'p2',
          trueLiteralPattern,
          new stx.Assignment(rX, number23, expect.anything()),
          expect.anything()
        )
      ],
      expect.anything()
    ));
});

test('soup no pieces', () => {
  expect(readSoup('var x=42')).toEqual(
    new stx.Soup([
      new stx.VariableDeclaration('x', number42, expect.anything())
    ], [], expect.anything()));
});

test('primed reference', () => {
  expect(readExpression("x'")).toEqual(new stx.PrimedReference('x', expect.anything()));
});

test('named piece reference', () => {
  expect(readExpression("p:toto")).toEqual(new stx.NamedPieceReference('toto', expect.anything()));
});

test('enabled', () => {
  expect(readExpression("enabled(x==23)")).toEqual(
    new stx.EnabledExpression(
      new stx.Equal(
        '==',
        rX, 
        number23,
        expect.anything()),
      expect.anything()));
});

test('link variable', () => {
  const soup = readSoup("var a=true; [a] / a=23");
  link(soup);

  const a = new stx.VariableDeclaration('a', trueLiteralPattern, expect.anything());
  const rA = new stx.Reference('a', expect.anything());
  rA.setDeclaration(a);
  expect(soup).toEqual(
    new stx.Soup([a], [
      new stx.AnonymousPiece(
        rA,
        new stx.Assignment(rA, number23, expect.anything()),
        expect.anything()
      )
    ], expect.anything()));
});
