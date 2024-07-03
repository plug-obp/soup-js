// Generated from grammar/Soup.g4 by ANTLR 4.13.1
// jshint ignore: start
import antlr4 from 'antlr4';
import SoupListener from './SoupListener.js';
const serializedATN = [4,1,48,148,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,1,0,3,0,22,8,0,1,0,3,0,25,8,0,
1,0,1,0,1,0,5,0,30,8,0,10,0,12,0,33,9,0,3,0,35,8,0,1,1,1,1,1,1,1,1,5,1,41,
8,1,10,1,12,1,44,9,1,1,1,3,1,47,8,1,1,2,1,2,1,2,3,2,52,8,2,1,2,3,2,55,8,
2,1,2,3,2,58,8,2,1,2,3,2,61,8,2,1,3,1,3,1,4,1,4,1,4,1,4,1,5,1,5,1,5,3,5,
72,8,5,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,
6,3,6,91,8,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,
1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,5,6,117,8,6,10,6,12,6,120,9,6,1,7,1,
7,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,3,8,132,8,8,3,8,134,8,8,1,8,1,8,1,8,5,
8,139,8,8,10,8,12,8,142,9,8,1,9,1,9,1,9,1,9,1,9,0,2,12,16,10,0,2,4,6,8,10,
12,14,16,18,0,7,1,0,39,40,2,0,14,14,20,21,1,0,24,26,1,0,20,21,1,0,27,30,
2,0,31,31,33,33,2,0,3,4,12,12,165,0,21,1,0,0,0,2,36,1,0,0,0,4,60,1,0,0,0,
6,62,1,0,0,0,8,64,1,0,0,0,10,68,1,0,0,0,12,90,1,0,0,0,14,121,1,0,0,0,16,
133,1,0,0,0,18,143,1,0,0,0,20,22,3,2,1,0,21,20,1,0,0,0,21,22,1,0,0,0,22,
34,1,0,0,0,23,25,5,35,0,0,24,23,1,0,0,0,24,25,1,0,0,0,25,26,1,0,0,0,26,31,
3,4,2,0,27,28,5,35,0,0,28,30,3,4,2,0,29,27,1,0,0,0,30,33,1,0,0,0,31,29,1,
0,0,0,31,32,1,0,0,0,32,35,1,0,0,0,33,31,1,0,0,0,34,24,1,0,0,0,34,35,1,0,
0,0,35,1,1,0,0,0,36,37,5,8,0,0,37,42,3,18,9,0,38,39,5,38,0,0,39,41,3,18,
9,0,40,38,1,0,0,0,41,44,1,0,0,0,42,40,1,0,0,0,42,43,1,0,0,0,43,46,1,0,0,
0,44,42,1,0,0,0,45,47,5,38,0,0,46,45,1,0,0,0,46,47,1,0,0,0,47,3,1,0,0,0,
48,49,5,11,0,0,49,51,3,6,3,0,50,52,3,8,4,0,51,50,1,0,0,0,51,52,1,0,0,0,52,
54,1,0,0,0,53,55,3,10,5,0,54,53,1,0,0,0,54,55,1,0,0,0,55,61,1,0,0,0,56,58,
3,8,4,0,57,56,1,0,0,0,57,58,1,0,0,0,58,59,1,0,0,0,59,61,3,10,5,0,60,48,1,
0,0,0,60,57,1,0,0,0,61,5,1,0,0,0,62,63,7,0,0,0,63,7,1,0,0,0,64,65,5,43,0,
0,65,66,3,12,6,0,66,67,5,44,0,0,67,9,1,0,0,0,68,69,5,25,0,0,69,71,3,16,8,
0,70,72,5,38,0,0,71,70,1,0,0,0,71,72,1,0,0,0,72,11,1,0,0,0,73,74,6,6,-1,
0,74,91,3,14,7,0,75,91,5,11,0,0,76,77,5,41,0,0,77,78,3,12,6,0,78,79,5,42,
0,0,79,91,1,0,0,0,80,81,5,11,0,0,81,91,5,45,0,0,82,83,5,1,0,0,83,91,5,11,
0,0,84,85,5,9,0,0,85,91,3,12,6,10,86,87,5,10,0,0,87,91,3,12,6,9,88,89,7,
1,0,0,89,91,3,12,6,8,90,73,1,0,0,0,90,75,1,0,0,0,90,76,1,0,0,0,90,80,1,0,
0,0,90,82,1,0,0,0,90,84,1,0,0,0,90,86,1,0,0,0,90,88,1,0,0,0,91,118,1,0,0,
0,92,93,10,7,0,0,93,94,7,2,0,0,94,117,3,12,6,8,95,96,10,6,0,0,96,97,7,3,
0,0,97,117,3,12,6,7,98,99,10,5,0,0,99,100,7,4,0,0,100,117,3,12,6,6,101,102,
10,4,0,0,102,103,7,5,0,0,103,117,3,12,6,5,104,105,10,3,0,0,105,106,5,16,
0,0,106,117,3,12,6,4,107,108,10,2,0,0,108,109,5,15,0,0,109,117,3,12,6,3,
110,111,10,1,0,0,111,112,5,2,0,0,112,113,3,12,6,0,113,114,5,39,0,0,114,115,
3,12,6,1,115,117,1,0,0,0,116,92,1,0,0,0,116,95,1,0,0,0,116,98,1,0,0,0,116,
101,1,0,0,0,116,104,1,0,0,0,116,107,1,0,0,0,116,110,1,0,0,0,117,120,1,0,
0,0,118,116,1,0,0,0,118,119,1,0,0,0,119,13,1,0,0,0,120,118,1,0,0,0,121,122,
7,6,0,0,122,15,1,0,0,0,123,124,6,8,-1,0,124,134,3,18,9,0,125,126,5,5,0,0,
126,127,3,12,6,0,127,128,5,6,0,0,128,131,3,16,8,0,129,130,5,7,0,0,130,132,
3,16,8,0,131,129,1,0,0,0,131,132,1,0,0,0,132,134,1,0,0,0,133,123,1,0,0,0,
133,125,1,0,0,0,134,140,1,0,0,0,135,136,10,1,0,0,136,137,5,38,0,0,137,139,
3,16,8,2,138,135,1,0,0,0,139,142,1,0,0,0,140,138,1,0,0,0,140,141,1,0,0,0,
141,17,1,0,0,0,142,140,1,0,0,0,143,144,5,11,0,0,144,145,5,32,0,0,145,146,
3,12,6,0,146,19,1,0,0,0,17,21,24,31,34,42,46,51,54,57,60,71,90,116,118,131,
133,140];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class SoupParser extends antlr4.Parser {

    static grammarFileName = "Soup.g4";
    static literalNames = [ null, "'p:'", "'?'", "'true'", "'false'", "'if'", 
                            "'then'", "'else'", "'var'", "'enabled'", "'@'", 
                            null, null, null, "'!'", null, null, "'nor'", 
                            "'nand'", null, "'+'", "'-'", "'<<'", "'>>'", 
                            "'*'", "'/'", "'%'", null, "'<'", null, "'>'", 
                            "'=='", "'='", null, null, "'|'", "','", "'.'", 
                            "';'", "':'", "'\\u225C'", "'('", "')'", "'['", 
                            "']'", "'''" ];
    static symbolicNames = [ null, null, null, "TRUE", "FALSE", "IF", "THEN", 
                             "ELSE", "VAR", "ENABLED", "INPUT", "IDENTIFIER", 
                             "NUMBER", "NATURAL", "NOT", "OR", "AND", "NOR", 
                             "NAND", "XOR", "PLUS", "MINUS", "SHL", "SHR", 
                             "MULT", "DIV", "MOD", "LE", "LT", "GE", "GT", 
                             "BEQ", "EQ", "NEQ", "IFF", "PIPE", "COMMA", 
                             "DOT", "SEMICOLON", "COLON", "TEQ", "LPAREN", 
                             "RPAREN", "LSQUARE", "RSQUARE", "PRIME", "LINE_COMMENT", 
                             "COMMENT", "WS" ];
    static ruleNames = [ "soup", "variables", "piece", "definedAs", "guard", 
                         "effect", "expression", "literal", "statement", 
                         "assign" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = SoupParser.ruleNames;
        this.literalNames = SoupParser.literalNames;
        this.symbolicNames = SoupParser.symbolicNames;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 6:
    	    		return this.expression_sempred(localctx, predIndex);
    	case 8:
    	    		return this.statement_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expression_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 7);
    		case 1:
    			return this.precpred(this._ctx, 6);
    		case 2:
    			return this.precpred(this._ctx, 5);
    		case 3:
    			return this.precpred(this._ctx, 4);
    		case 4:
    			return this.precpred(this._ctx, 3);
    		case 5:
    			return this.precpred(this._ctx, 2);
    		case 6:
    			return this.precpred(this._ctx, 1);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };

    statement_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 7:
    			return this.precpred(this._ctx, 1);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	soup() {
	    let localctx = new SoupContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, SoupParser.RULE_soup);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 21;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===8) {
	            this.state = 20;
	            this.variables();
	        }

	        this.state = 34;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===11 || _la===25 || _la===35 || _la===43) {
	            this.state = 24;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===35) {
	                this.state = 23;
	                this.match(SoupParser.PIPE);
	            }

	            this.state = 26;
	            this.piece();
	            this.state = 31;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===35) {
	                this.state = 27;
	                this.match(SoupParser.PIPE);
	                this.state = 28;
	                this.piece();
	                this.state = 33;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	variables() {
	    let localctx = new VariablesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, SoupParser.RULE_variables);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 36;
	        this.match(SoupParser.VAR);
	        this.state = 37;
	        this.assign();
	        this.state = 42;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,4,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 38;
	                this.match(SoupParser.SEMICOLON);
	                this.state = 39;
	                this.assign(); 
	            }
	            this.state = 44;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,4,this._ctx);
	        }

	        this.state = 46;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===38) {
	            this.state = 45;
	            this.match(SoupParser.SEMICOLON);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	piece() {
	    let localctx = new PieceContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, SoupParser.RULE_piece);
	    var _la = 0;
	    try {
	        this.state = 60;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 11:
	            localctx = new NamedPieceContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 48;
	            this.match(SoupParser.IDENTIFIER);
	            this.state = 49;
	            this.definedAs();
	            this.state = 51;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===43) {
	                this.state = 50;
	                this.guard();
	            }

	            this.state = 54;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===25) {
	                this.state = 53;
	                this.effect();
	            }

	            break;
	        case 25:
	        case 43:
	            localctx = new AnonymousPieceContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 57;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===43) {
	                this.state = 56;
	                this.guard();
	            }

	            this.state = 59;
	            this.effect();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	definedAs() {
	    let localctx = new DefinedAsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, SoupParser.RULE_definedAs);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 62;
	        _la = this._input.LA(1);
	        if(!(_la===39 || _la===40)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	guard() {
	    let localctx = new GuardContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, SoupParser.RULE_guard);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 64;
	        this.match(SoupParser.LSQUARE);
	        this.state = 65;
	        this.expression(0);
	        this.state = 66;
	        this.match(SoupParser.RSQUARE);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	effect() {
	    let localctx = new EffectContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, SoupParser.RULE_effect);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 68;
	        this.match(SoupParser.DIV);
	        this.state = 69;
	        this.statement(0);
	        this.state = 71;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===38) {
	            this.state = 70;
	            this.match(SoupParser.SEMICOLON);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	expression(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExpressionContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 12;
	    this.enterRecursionRule(localctx, 12, SoupParser.RULE_expression, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 90;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new LiteralExpContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 74;
	            this.literal();
	            break;

	        case 2:
	            localctx = new ReferenceExpContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 75;
	            this.match(SoupParser.IDENTIFIER);
	            break;

	        case 3:
	            localctx = new ParenExpContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 76;
	            this.match(SoupParser.LPAREN);
	            this.state = 77;
	            this.expression(0);
	            this.state = 78;
	            this.match(SoupParser.RPAREN);
	            break;

	        case 4:
	            localctx = new PrimedReferenceExpContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 80;
	            this.match(SoupParser.IDENTIFIER);
	            this.state = 81;
	            this.match(SoupParser.PRIME);
	            break;

	        case 5:
	            localctx = new NamedPieceReferenceExpContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 82;
	            this.match(SoupParser.T__0);
	            this.state = 83;
	            this.match(SoupParser.IDENTIFIER);
	            break;

	        case 6:
	            localctx = new EnabledExpContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 84;
	            this.match(SoupParser.ENABLED);
	            this.state = 85;
	            this.expression(10);
	            break;

	        case 7:
	            localctx = new InputReferenceExpContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 86;
	            this.match(SoupParser.INPUT);
	            this.state = 87;
	            this.expression(9);
	            break;

	        case 8:
	            localctx = new UnaryExpContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 88;
	            localctx.operator = this._input.LT(1);
	            _la = this._input.LA(1);
	            if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 3162112) !== 0))) {
	                localctx.operator = this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 89;
	            this.expression(8);
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 118;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,13,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 116;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,12,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new BinaryExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, SoupParser.RULE_expression);
	                    this.state = 92;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 93;
	                    localctx.operator = this._input.LT(1);
	                    _la = this._input.LA(1);
	                    if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 117440512) !== 0))) {
	                        localctx.operator = this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 94;
	                    this.expression(8);
	                    break;

	                case 2:
	                    localctx = new BinaryExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, SoupParser.RULE_expression);
	                    this.state = 95;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 96;
	                    localctx.operator = this._input.LT(1);
	                    _la = this._input.LA(1);
	                    if(!(_la===20 || _la===21)) {
	                        localctx.operator = this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 97;
	                    this.expression(7);
	                    break;

	                case 3:
	                    localctx = new BinaryExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, SoupParser.RULE_expression);
	                    this.state = 98;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 99;
	                    localctx.operator = this._input.LT(1);
	                    _la = this._input.LA(1);
	                    if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 2013265920) !== 0))) {
	                        localctx.operator = this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 100;
	                    this.expression(6);
	                    break;

	                case 4:
	                    localctx = new BinaryExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, SoupParser.RULE_expression);
	                    this.state = 101;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 102;
	                    localctx.operator = this._input.LT(1);
	                    _la = this._input.LA(1);
	                    if(!(_la===31 || _la===33)) {
	                        localctx.operator = this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 103;
	                    this.expression(5);
	                    break;

	                case 5:
	                    localctx = new BinaryExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, SoupParser.RULE_expression);
	                    this.state = 104;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 105;
	                    localctx.operator = this.match(SoupParser.AND);
	                    this.state = 106;
	                    this.expression(4);
	                    break;

	                case 6:
	                    localctx = new BinaryExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, SoupParser.RULE_expression);
	                    this.state = 107;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 108;
	                    localctx.operator = this.match(SoupParser.OR);
	                    this.state = 109;
	                    this.expression(3);
	                    break;

	                case 7:
	                    localctx = new ConditionalExpContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, SoupParser.RULE_expression);
	                    this.state = 110;
	                    if (!( this.precpred(this._ctx, 1))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
	                    }
	                    this.state = 111;
	                    this.match(SoupParser.T__1);
	                    this.state = 112;
	                    this.expression(0);
	                    this.state = 113;
	                    this.match(SoupParser.COLON);
	                    this.state = 114;
	                    this.expression(1);
	                    break;

	                } 
	            }
	            this.state = 120;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,13,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	literal() {
	    let localctx = new LiteralContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, SoupParser.RULE_literal);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 121;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 4120) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	statement(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new StatementContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 16;
	    this.enterRecursionRule(localctx, 16, SoupParser.RULE_statement, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 133;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 11:
	            localctx = new AssignStatementContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 124;
	            this.assign();
	            break;
	        case 5:
	            localctx = new IfStatementContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 125;
	            this.match(SoupParser.IF);
	            this.state = 126;
	            this.expression(0);
	            this.state = 127;
	            this.match(SoupParser.THEN);
	            this.state = 128;
	            this.statement(0);
	            this.state = 131;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
	            if(la_===1) {
	                this.state = 129;
	                this.match(SoupParser.ELSE);
	                this.state = 130;
	                this.statement(0);

	            }
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 140;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,16,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                localctx = new SequenceStatementContext(this, new StatementContext(this, _parentctx, _parentState));
	                this.pushNewRecursionContext(localctx, _startState, SoupParser.RULE_statement);
	                this.state = 135;
	                if (!( this.precpred(this._ctx, 1))) {
	                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
	                }
	                this.state = 136;
	                this.match(SoupParser.SEMICOLON);
	                this.state = 137;
	                this.statement(2); 
	            }
	            this.state = 142;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,16,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	assign() {
	    let localctx = new AssignContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, SoupParser.RULE_assign);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 143;
	        this.match(SoupParser.IDENTIFIER);
	        this.state = 144;
	        this.match(SoupParser.EQ);
	        this.state = 145;
	        this.expression(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

SoupParser.EOF = antlr4.Token.EOF;
SoupParser.T__0 = 1;
SoupParser.T__1 = 2;
SoupParser.TRUE = 3;
SoupParser.FALSE = 4;
SoupParser.IF = 5;
SoupParser.THEN = 6;
SoupParser.ELSE = 7;
SoupParser.VAR = 8;
SoupParser.ENABLED = 9;
SoupParser.INPUT = 10;
SoupParser.IDENTIFIER = 11;
SoupParser.NUMBER = 12;
SoupParser.NATURAL = 13;
SoupParser.NOT = 14;
SoupParser.OR = 15;
SoupParser.AND = 16;
SoupParser.NOR = 17;
SoupParser.NAND = 18;
SoupParser.XOR = 19;
SoupParser.PLUS = 20;
SoupParser.MINUS = 21;
SoupParser.SHL = 22;
SoupParser.SHR = 23;
SoupParser.MULT = 24;
SoupParser.DIV = 25;
SoupParser.MOD = 26;
SoupParser.LE = 27;
SoupParser.LT = 28;
SoupParser.GE = 29;
SoupParser.GT = 30;
SoupParser.BEQ = 31;
SoupParser.EQ = 32;
SoupParser.NEQ = 33;
SoupParser.IFF = 34;
SoupParser.PIPE = 35;
SoupParser.COMMA = 36;
SoupParser.DOT = 37;
SoupParser.SEMICOLON = 38;
SoupParser.COLON = 39;
SoupParser.TEQ = 40;
SoupParser.LPAREN = 41;
SoupParser.RPAREN = 42;
SoupParser.LSQUARE = 43;
SoupParser.RSQUARE = 44;
SoupParser.PRIME = 45;
SoupParser.LINE_COMMENT = 46;
SoupParser.COMMENT = 47;
SoupParser.WS = 48;

SoupParser.RULE_soup = 0;
SoupParser.RULE_variables = 1;
SoupParser.RULE_piece = 2;
SoupParser.RULE_definedAs = 3;
SoupParser.RULE_guard = 4;
SoupParser.RULE_effect = 5;
SoupParser.RULE_expression = 6;
SoupParser.RULE_literal = 7;
SoupParser.RULE_statement = 8;
SoupParser.RULE_assign = 9;

class SoupContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SoupParser.RULE_soup;
    }

	variables() {
	    return this.getTypedRuleContext(VariablesContext,0);
	};

	piece = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(PieceContext);
	    } else {
	        return this.getTypedRuleContext(PieceContext,i);
	    }
	};

	PIPE = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(SoupParser.PIPE);
	    } else {
	        return this.getToken(SoupParser.PIPE, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterSoup(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitSoup(this);
		}
	}


}



class VariablesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SoupParser.RULE_variables;
    }

	VAR() {
	    return this.getToken(SoupParser.VAR, 0);
	};

	assign = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AssignContext);
	    } else {
	        return this.getTypedRuleContext(AssignContext,i);
	    }
	};

	SEMICOLON = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(SoupParser.SEMICOLON);
	    } else {
	        return this.getToken(SoupParser.SEMICOLON, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterVariables(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitVariables(this);
		}
	}


}



class PieceContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SoupParser.RULE_piece;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class AnonymousPieceContext extends PieceContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	effect() {
	    return this.getTypedRuleContext(EffectContext,0);
	};

	guard() {
	    return this.getTypedRuleContext(GuardContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterAnonymousPiece(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitAnonymousPiece(this);
		}
	}


}

SoupParser.AnonymousPieceContext = AnonymousPieceContext;

class NamedPieceContext extends PieceContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	IDENTIFIER() {
	    return this.getToken(SoupParser.IDENTIFIER, 0);
	};

	definedAs() {
	    return this.getTypedRuleContext(DefinedAsContext,0);
	};

	guard() {
	    return this.getTypedRuleContext(GuardContext,0);
	};

	effect() {
	    return this.getTypedRuleContext(EffectContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterNamedPiece(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitNamedPiece(this);
		}
	}


}

SoupParser.NamedPieceContext = NamedPieceContext;

class DefinedAsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SoupParser.RULE_definedAs;
    }

	COLON() {
	    return this.getToken(SoupParser.COLON, 0);
	};

	TEQ() {
	    return this.getToken(SoupParser.TEQ, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterDefinedAs(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitDefinedAs(this);
		}
	}


}



class GuardContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SoupParser.RULE_guard;
    }

	LSQUARE() {
	    return this.getToken(SoupParser.LSQUARE, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	RSQUARE() {
	    return this.getToken(SoupParser.RSQUARE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterGuard(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitGuard(this);
		}
	}


}



class EffectContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SoupParser.RULE_effect;
    }

	DIV() {
	    return this.getToken(SoupParser.DIV, 0);
	};

	statement() {
	    return this.getTypedRuleContext(StatementContext,0);
	};

	SEMICOLON() {
	    return this.getToken(SoupParser.SEMICOLON, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterEffect(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitEffect(this);
		}
	}


}



class ExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SoupParser.RULE_expression;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class LiteralExpContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	literal() {
	    return this.getTypedRuleContext(LiteralContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterLiteralExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitLiteralExp(this);
		}
	}


}

SoupParser.LiteralExpContext = LiteralExpContext;

class ConditionalExpContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	COLON() {
	    return this.getToken(SoupParser.COLON, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterConditionalExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitConditionalExp(this);
		}
	}


}

SoupParser.ConditionalExpContext = ConditionalExpContext;

class InputReferenceExpContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	INPUT() {
	    return this.getToken(SoupParser.INPUT, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterInputReferenceExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitInputReferenceExp(this);
		}
	}


}

SoupParser.InputReferenceExpContext = InputReferenceExpContext;

class ReferenceExpContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	IDENTIFIER() {
	    return this.getToken(SoupParser.IDENTIFIER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterReferenceExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitReferenceExp(this);
		}
	}


}

SoupParser.ReferenceExpContext = ReferenceExpContext;

class BinaryExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        this.operator = null;;
        super.copyFrom(ctx);
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	MULT() {
	    return this.getToken(SoupParser.MULT, 0);
	};

	DIV() {
	    return this.getToken(SoupParser.DIV, 0);
	};

	MOD() {
	    return this.getToken(SoupParser.MOD, 0);
	};

	PLUS() {
	    return this.getToken(SoupParser.PLUS, 0);
	};

	MINUS() {
	    return this.getToken(SoupParser.MINUS, 0);
	};

	LE() {
	    return this.getToken(SoupParser.LE, 0);
	};

	LT() {
	    return this.getToken(SoupParser.LT, 0);
	};

	GE() {
	    return this.getToken(SoupParser.GE, 0);
	};

	GT() {
	    return this.getToken(SoupParser.GT, 0);
	};

	BEQ() {
	    return this.getToken(SoupParser.BEQ, 0);
	};

	NEQ() {
	    return this.getToken(SoupParser.NEQ, 0);
	};

	AND() {
	    return this.getToken(SoupParser.AND, 0);
	};

	OR() {
	    return this.getToken(SoupParser.OR, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterBinaryExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitBinaryExpression(this);
		}
	}


}

SoupParser.BinaryExpressionContext = BinaryExpressionContext;

class ParenExpContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LPAREN() {
	    return this.getToken(SoupParser.LPAREN, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	RPAREN() {
	    return this.getToken(SoupParser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterParenExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitParenExp(this);
		}
	}


}

SoupParser.ParenExpContext = ParenExpContext;

class PrimedReferenceExpContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	IDENTIFIER() {
	    return this.getToken(SoupParser.IDENTIFIER, 0);
	};

	PRIME() {
	    return this.getToken(SoupParser.PRIME, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterPrimedReferenceExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitPrimedReferenceExp(this);
		}
	}


}

SoupParser.PrimedReferenceExpContext = PrimedReferenceExpContext;

class UnaryExpContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        this.operator = null;;
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	NOT() {
	    return this.getToken(SoupParser.NOT, 0);
	};

	PLUS() {
	    return this.getToken(SoupParser.PLUS, 0);
	};

	MINUS() {
	    return this.getToken(SoupParser.MINUS, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterUnaryExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitUnaryExp(this);
		}
	}


}

SoupParser.UnaryExpContext = UnaryExpContext;

class EnabledExpContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	ENABLED() {
	    return this.getToken(SoupParser.ENABLED, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterEnabledExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitEnabledExp(this);
		}
	}


}

SoupParser.EnabledExpContext = EnabledExpContext;

class NamedPieceReferenceExpContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	IDENTIFIER() {
	    return this.getToken(SoupParser.IDENTIFIER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterNamedPieceReferenceExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitNamedPieceReferenceExp(this);
		}
	}


}

SoupParser.NamedPieceReferenceExpContext = NamedPieceReferenceExpContext;

class LiteralContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SoupParser.RULE_literal;
    }

	NUMBER() {
	    return this.getToken(SoupParser.NUMBER, 0);
	};

	TRUE() {
	    return this.getToken(SoupParser.TRUE, 0);
	};

	FALSE() {
	    return this.getToken(SoupParser.FALSE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterLiteral(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitLiteral(this);
		}
	}


}



class StatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SoupParser.RULE_statement;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class IfStatementContext extends StatementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	IF() {
	    return this.getToken(SoupParser.IF, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	THEN() {
	    return this.getToken(SoupParser.THEN, 0);
	};

	statement = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StatementContext);
	    } else {
	        return this.getTypedRuleContext(StatementContext,i);
	    }
	};

	ELSE() {
	    return this.getToken(SoupParser.ELSE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterIfStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitIfStatement(this);
		}
	}


}

SoupParser.IfStatementContext = IfStatementContext;

class AssignStatementContext extends StatementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	assign() {
	    return this.getTypedRuleContext(AssignContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterAssignStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitAssignStatement(this);
		}
	}


}

SoupParser.AssignStatementContext = AssignStatementContext;

class SequenceStatementContext extends StatementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	statement = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StatementContext);
	    } else {
	        return this.getTypedRuleContext(StatementContext,i);
	    }
	};

	SEMICOLON() {
	    return this.getToken(SoupParser.SEMICOLON, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterSequenceStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitSequenceStatement(this);
		}
	}


}

SoupParser.SequenceStatementContext = SequenceStatementContext;

class AssignContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SoupParser.RULE_assign;
    }

	IDENTIFIER() {
	    return this.getToken(SoupParser.IDENTIFIER, 0);
	};

	EQ() {
	    return this.getToken(SoupParser.EQ, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.enterAssign(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SoupListener ) {
	        listener.exitAssign(this);
		}
	}


}




SoupParser.SoupContext = SoupContext; 
SoupParser.VariablesContext = VariablesContext; 
SoupParser.PieceContext = PieceContext; 
SoupParser.DefinedAsContext = DefinedAsContext; 
SoupParser.GuardContext = GuardContext; 
SoupParser.EffectContext = EffectContext; 
SoupParser.ExpressionContext = ExpressionContext; 
SoupParser.LiteralContext = LiteralContext; 
SoupParser.StatementContext = StatementContext; 
SoupParser.AssignContext = AssignContext; 
