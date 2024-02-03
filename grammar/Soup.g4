grammar Soup;

soup: variables (PIPE? piece (PIPE piece)*)?;

variables: VAR assign (SEMICOLON assign)* SEMICOLON?;
piece: IDENTIFIER COLON guard? effect?;
guard: LSQUARE expression RSQUARE;
effect: DIV statement SEMICOLON?;

expression
    : literal                                                   #LiteralExp
    | IDENTIFIER                                                #ReferenceExp
    | LPAREN expression RPAREN                                  #ParenExp
    | <assoc=right> operator=(NOT | PLUS | MINUS) expression    #UnaryExp
    | expression operator=(MULT | DIV | MOD) expression         #BinaryExpression
    | expression operator=(PLUS | MINUS) expression             #BinaryExpression
    | expression operator=(LE | LT | GE | GT) expression        #BinaryExpression
    | expression operator=(EQ | NEQ) expression                 #BinaryExpression
    | expression operator=AND expression                        #BinaryExpression
    | expression operator=OR expression                         #BinaryExpression
    | <assoc=right> expression '?' expression ':' expression    #ConditionalExp
    ;

literal
    : NATURAL
    | TRUE
    | FALSE
    ;

statement
    : assign                                            #AssignStatement
    | IF expression THEN statement (ELSE statement)?    #IfStatement
    | statement SEMICOLON statement                     #SequenceStatement
    ;

assign: IDENTIFIER EQ expression;

TRUE: 'true';
FALSE: 'false';
IF: 'if';
THEN: 'then';
ELSE: 'else';
VAR: 'var';

IDENTIFIER : [a-zA-Z][a-zA-Z_0-9]*;
NATURAL: [0-9]+;

NOT: '!';
OR : '||' | 'or' | '∨';
AND: '&&' | 'and' | '∧';
NOR: 'nor';
NAND: 'nand';
XOR: 'xor' | '^';
PLUS : '+';
MINUS : '-';
SHL: '<<';
SHR: '>>';
MULT : '*';
DIV: '/';
MOD: '%';
LE : '<=' | '≤';
LT : '<';
GE : '>=' | '≥';
GT : '>';
EQ : '=';
NEQ : '!=' | '≠';
IFF: '<=>' | '⟺';

PIPE: '|';
COMMA : ',';
SEMICOLON : ';';
COLON:  ':';
LPAREN : '(';
RPAREN : ')';
LSQUARE : '[';
RSQUARE : ']';

LINE_COMMENT : '//' .*? '\n' -> skip ;
COMMENT : '/*' .*? '*/' -> skip ;
WS : [ \r\t\n]+ -> skip ;
