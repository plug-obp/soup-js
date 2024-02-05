import { readExpression } from './SoupReader'; 
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