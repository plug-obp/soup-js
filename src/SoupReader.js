import antlr4 from 'antlr4';
import SoupLexer from '../generated/grammar/SoupLexer.js';
import SoupParser from '../generated/grammar/SoupParser.js';
import {SoupSyntaxBuilder, SoupLinker} from './SoupSyntaxBuilder.js';

function antlr4Parser(input) {
    const chars = new antlr4.InputStream(input);
    const lexer = new SoupLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    return new SoupParser(tokens);
}

function buildSyntaxModel(antlr4Tree) {
    const syntaxBuilder = new SoupSyntaxBuilder();
	antlr4.tree.ParseTreeWalker.DEFAULT.walk(syntaxBuilder, antlr4Tree);
	return syntaxBuilder.map.get(antlr4Tree);
}

export function readExpression(input) {
	const parser = antlr4Parser(input);
	const tree = parser.expression();

	return buildSyntaxModel(tree);
}

export function readSoup(input) {
	const parser = antlr4Parser(input);
	const tree = parser.soup();

	return buildSyntaxModel(tree);
}

export function link(tree, context = new Map()) {
	tree.accept(new SoupLinker(), new Context(context));
	tree;
}