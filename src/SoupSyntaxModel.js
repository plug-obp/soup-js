class SyntaxTreeElement {
    accept(visitor, input) {
        return visitor.visitSyntaxTreeElement(this, input);
    }
    equals(other) {
        return this === other;
    }
}
class Expression extends SyntaxTreeElement {
    accept(visitor, input) {
        return visitor.visitExpression(this, input);
    }
}
class Literal extends Expression {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    accept(visitor, input) {
        return visitor.visitLiteral(this, input);
    }
    equals(other) {
        return this === other || (other instanceof Literal && this.value === other.value);
    }
}
export class BooleanLiteral extends Literal {
    accept(visitor, input) {
        return visitor.visitBooleanLiteral(this, input);
    }
}
export class NumberLiteral extends Literal {
    accept(visitor, input) {
        return visitor.visitNumberLiteral(this, input);
    }
}

export class Reference extends Expression {
    name;
    expression = null;
    constructor(name) {
        super();
        this.name = name;
    }
    setExpression(expression) {
        this.expression = expression;
    }
    accept(visitor, input) {
        return visitor.visitReference(this, input);
    }
    equals(other) {
        return this === other 
            || (other instanceof Reference 
                && this.name === other.name 
                && this.expression.equals(other.expression));
    }
}

class UnaryExpression extends Expression {
    operator;
    operand;
    constructor(operator, operand) {
        super();
        this.operator = operator;
        this.operand = operand;
    }
    accept(visitor, input) {
        return visitor.visitUnaryExpression(this, input);
    }
    equals(other) {
        return this === other || (other instanceof UnaryExpression && this.operand.equals(other.operand));
    }
}
export class NotExpression extends UnaryExpression {
    accept(visitor, input) {
        return visitor.visitNotExpression(this, input);
    }
    equals(other) {
        return this === other || (other instanceof NotExpression && this.operand.equals(other.operand));
    }
}
export class PlusExpression extends UnaryExpression {
    accept(visitor, input) {
        return visitor.visitPlusExpression(this, input);
    }
    equals(other) {
        return this === other || (other instanceof PlusExpression && this.operand.equals(other.operand));
    }
}
export class MinusExpression extends UnaryExpression {
    accept(visitor, input) {
        return visitor.visitMinusExpression(this, input);
    }
    equals(other) {
        return this === other || (other instanceof MinusExpression && this.operand.equals(other.operand));
    }
}

class BinaryExpression extends Expression {
    operator;
    left;
    right;
    constructor(operator, left, right) {
        super();
        this.operator = operator;
        this.left = left;
        this.right = right;
    }
    accept(visitor, input) {
        return visitor.visitBinaryExpression(this, input);
    }
    equals(other) {
        return this === other || (other instanceof BinaryExpression && this.left.equals(other.left) && this.right.equals(other.right));
    }
}

export class Multiplication extends BinaryExpression {
    accept(visitor, input) {
        return visitor.visitMultiplication(this, input);
    }
    equals(other) {
        return this === other || (other instanceof Multiplication && this.left.equals(other.left) && this.right.equals(other.right));
    }
}
export class Division extends BinaryExpression {
    accept(visitor, input) {
        return visitor.visitDivision(this, input);
    }
    equals(other) {
        return this === other || (other instanceof Division && this.left.equals(other.left) && this.right.equals(other.right));
    }
}
export class Modulus extends BinaryExpression {
    accept(visitor, input) {
        return visitor.visitModulus(this, input);
    }
    equals(other) {
        return this === other || (other instanceof Modulus && this.left.equals(other.left) && this.right.equals(other.right));
    }
}
export class Addition extends BinaryExpression {
    accept(visitor, input) {
        return visitor.visitAddition(this, input);
    }
    equals(other) {
        return this === other || (other instanceof Addition && this.left.equals(other.left) && this.right.equals(other.right));
    }
}
export class Subtraction extends BinaryExpression {
    accept(visitor, input) {
        return visitor.visitSubtraction(this, input);
    }
    equals(other) {
        return this === other || (other instanceof Subtraction && this.left.equals(other.left) && this.right.equals(other.right));
    }
}
export class LessThan extends BinaryExpression {
    accept(visitor, input) {
        return visitor.visitLessThan(this, input);
    }
    equals(other) {
        return this === other || (other instanceof LessThan && this.left.equals(other.left) && this.right.equals(other.right));
    }
}
export class LessThanOrEqual extends BinaryExpression {
    accept(visitor, input) {
        return visitor.visitLessThanOrEqual(this, input);
    }
    equals(other) {
        return this === other || (other instanceof LessThanOrEqual && this.left.equals(other.left) && this.right.equals(other.right));
    }
}
export class GreaterThan extends BinaryExpression {
    accept(visitor, input) {
        return visitor.visitGreaterThan(this, input);
    }
    equals(other) {
        return this === other || (other instanceof GreaterThan && this.left.equals(other.left) && this.right.equals(other.right));
    }
}
export class GreaterThanOrEqual extends BinaryExpression {
    accept(visitor, input) {
        return visitor.visitGreaterThanOrEqual(this, input);
    }
    equals(other) {
        return this === other || (other instanceof GreaterThanOrEqual && this.left.equals(other.left) && this.right.equals(other.right));
    }
}
export class Equal extends BinaryExpression {
    accept(visitor, input) {
        return visitor.visitEqual(this, input);
    }
    equals(other) {
        return this === other || (other instanceof Equal && this.left.equals(other.left) && this.right.equals(other.right));
    }
}
export class NotEqual extends BinaryExpression {
    accept(visitor, input) {
        return visitor.visitNotEqual(this, input);
    }
    equals(other) {
        return this === other || (other instanceof NotEqual && this.left.equals(other.left) && this.right.equals(other.right));
    }
}
export class Conjuction extends BinaryExpression {
    accept(visitor, input) {
        return visitor.visitConjuction(this, input);
    }
    equals(other) {
        return this === other || (other instanceof Conjuction && this.left.equals(other.left) && this.right.equals(other.right));
    }
}
export class Disjunction extends BinaryExpression {
    accept(visitor, input) {
        return visitor.visitDisjunction(this, input);
    }
    equals(other) {
        return this === other
            || (    other instanceof Disjunction 
                && this.left.equals(other.left) 
                && this.right.equals(other.right));
    }
}

export class ConditionalExpression extends Expression {
    condition;
    thenExpression;
    elseExpression;
    constructor(condition, thenExpression, elseExpression) {
        super();
        this.condition = condition;
        this.thenExpression = thenExpression;
        this.elseExpression = elseExpression;
    }
    accept(visitor, input) {
        return visitor.visitConditionalExpression(this, input);
    }
    equals(other) {
        return this === other 
            || (    other instanceof ConditionalExpression
                && this.condition.equals(other.condition) 
                && this.thenExpression.equals(other.thenExpression) 
                && this.elseExpression.equals(other.elseExpression));
    }
}

class Statement extends SyntaxTreeElement {
    accept(visitor, input) {
        return visitor.visitStatement(this, input);
    }
}
export class Skip extends Statement {
    accept(visitor, input) {
        return visitor.visitSkip(this, input);
    }
}
export class Assignment extends Statement {
    target;
    expression;
    constructor(target, expression) {
        super();
        this.target = target;
        this.expression = expression;
    }
    accept(visitor, input) {
        return visitor.visitAssignment(this, input);
    }
    equals(other) {
        return this === other
            || (    other instanceof Assignment
                && this.target === other.target 
                && this.expression.equals(other.expression));
    }
}
export class IfStatement extends Statement {
    condition;
    thenBlock;
    elseBlock;
    constructor(condition, thenBlock, elseBlock) {
        super();
        this.condition = condition;
        this.thenBlock = thenBlock;
        this.elseBlock = elseBlock;
    }
    accept(visitor, input) {
        return visitor.visitIfStatement(this, input);
    }
    equals(other) {
        return this === other 
            || (    other instanceof IfStatement
                && this.condition.equals(other.condition) 
                && this.thenBlock.equals(other.thenBlock) 
                && this.elseBlock.equals(other.elseBlock));
    }
}
export class Sequence extends Statement {
    left;
    right;
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
    accept(visitor, input) {
        return visitor.visitSequence(this, input);
    }
    equals(other) {
        return this === other 
            || (    other instanceof Sequence
                && this.left.equals(other.left) 
                && this.right.equals(other.right));
    }
}

export class AnonymousPiece extends SyntaxTreeElement {
    guard;
    effect;
    constructor(guard, effect) {
        super();
        this.guard = guard;
        this.effect = effect;
    }
    accept(visitor, input) {
        return visitor.AnonymousPiece(this, input);
    }
    equals(other) {
        return this === other 
            || (    other instanceof AnonymousPiece
                && this.guard.equals(other.guard) 
                && this.effect.equals(other.effect));
    }
}
export class NamedPiece extends AnonymousPiece {
    name;
    constructor(name, guard, effect) {
        super(guard, effect);
        this.name = name;
    }
    accept(visitor, input) {
        return visitor.NamedPiece(this, input);
    }
    equals(other) {
        return this === other 
            || (    other instanceof NamedPiece
                && this.name === other.name 
                && this.guard.equals(other.guard) 
                && this.effect.equals(other.effect));
    }
}

export class VariableDeclaration extends SyntaxTreeElement {
    name;
    initialValue;
    constructor(name, initialValue) {
        super();
        this.name = name;
        this.initialValue = initialValue;
    }
    accept(visitor, input) {
        return visitor.visitVariableDeclaration(this, input);
    }
    equals(other) {
        return this === other 
            || (    other instanceof VariableDeclaration
                && this.name === other.name 
                && this.initialValue === other.initialValue);
    }
}

export class Soup extends SyntaxTreeElement {
    variables;
    pieces;
    constructor(variables, pieces) {
        super();
        this.variables = variables;
        this.pieces = pieces;
    }
    accept(visitor, input) {
        return visitor.visitSoup(this, input);
    }
    equals(other) {
        return this === other 
            || (    other instanceof Soup
                && this.variables.equals(other.variables) 
                && this.pieces.equals(other.pieces));
    }
}

export class Visitor {
    visitSyntaxTreeElement(element, input) { }
    visitExpression(element, input) {
        this.visitSyntaxTreeElement(element, input);
    }
    visitLiteral(element, input) {
        this.visitExpression(element, input);
    }
    visitBooleanLiteral(element, input) {
        this.visitLiteral(element, input);
    }
    visitNumberLiteral(element, input) {
        this.visitLiteral(element, input);
    }
    visitReference(element, input) {
        this.visitExpression(element, input);
    }
    visitUnaryExpression(element, input) {
        this.visitExpression(element, input);
    }
    visitNotExpression(element, input) {
        this.visitUnaryExpression(element, input);
    }
    visitPlusExpression(element, input) {
        this.visitUnaryExpression(element, input);
    }
    visitMinusExpression(element, input) {
        this.visitUnaryExpression(element, input);
    }
    visitBinaryExpression(element, input) {
        this.visitExpression(element, input);
    }
    visitMultiplication(element, input) {
        this.visitBinaryExpression(element, input);
    }
    visitDivision(element, input) {
        this.visitBinaryExpression(element, input);
    }
    visitModulus(element, input) {
        this.visitBinaryExpression(element, input);
    }
    visitAddition(element, input) {
        this.visitBinaryExpression(element, input);
    }
    visitSubtraction(element, input) {
        this.visitBinaryExpression(element, input);
    }
    visitLessThan(element, input) {
        this.visitBinaryExpression(element, input);
    }
    visitLessThanOrEqual(element, input) {
        this.visitBinaryExpression(element, input);
    }
    visitGreaterThan(element, input) {
        this.visitBinaryExpression(element, input);
    }
    visitGreaterThanOrEqual(element, input) {
        this.visitBinaryExpression(element, input);
    }
    visitEqual(element, input) {
        this.visitBinaryExpression(element, input);
    }
    visitNotEqual(element, input) {
        this.visitBinaryExpression(element, input);
    }
    visitConjuction(element, input) {
        this.visitBinaryExpression(element, input);
    }
    visitDisjunction(element, input) {
        this.visitBinaryExpression(element, input);
    }
    visitConditionalExpression(element, input) {
        this.visitExpression(element, input);
    }
    visitStatement(element, input) {
        this.visitSyntaxTreeElement(element, input);
    }
    visitSkip(element, input) {
        this.visitStatement(element, input);
    }
    visitAssignment(element, input) {
        this.visitStatement(element, input);
    }
    visitIfStatement(element, input) {
        this.visitStatement(element, input);
    }
    visitSequence(element, input) {
        this.visitStatement(element, input);
    }
    visitAnonymousPiece(element, input) {
        this.visitSyntaxTreeElement(element, input);
    }
    visitNamedPiece(element, input) {
        this.visitAnonymousPiece(element, input);
    }
    visitSoup(element, input) {
        this.visitSyntaxTreeElement(element, input);
    }
}