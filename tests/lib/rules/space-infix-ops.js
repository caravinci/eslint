/**
 * @fileoverview Require spaces around infix operators
 * @author Michael Ficarra
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/space-infix-ops"),
    { RuleTester } = require("../../../lib/rule-tester"),
    parser = require("../../fixtures/fixture-parser");

const ruleTester = new RuleTester();

ruleTester.run("space-infix-ops", rule, {
    valid: [
        "a + b",
        "a + ++b",
        "a++ + b",
        "a++ + ++b",
        "a     + b",
        "(a) + (b)",
        "((a)) + ((b))",
        "(((a))) + (((b)))",
        "a + +b",
        "a + (b)",
        "a + +(b)",
        "a + (+(b))",
        "(a + b) + (c + d)",
        "a = b",
        "a ? b : c",
        "var a = b",
        { code: "const my_object = {key: 'value'};", parserOptions: { ecmaVersion: 6 } },
        { code: "var {a = 0} = bar;", parserOptions: { ecmaVersion: 6 } },
        { code: "function foo(a = 0) { }", parserOptions: { ecmaVersion: 6 } },
        { code: "a ** b", parserOptions: { ecmaVersion: 7 } },
        { code: "a|0", options: [{ int32Hint: true }] },
        { code: "a |0", options: [{ int32Hint: true }] },

        // Type Annotations
        { code: "function foo(a: number = 0) { }", parser: parser("type-annotations/function-parameter-type-annotation"), parserOptions: { ecmaVersion: 6 } },
        { code: "function foo(): Bar { }", parser: parser("type-annotations/function-return-type-annotation"), parserOptions: { ecmaVersion: 6 } },
        { code: "var foo: Bar = '';", parser: parser("type-annotations/variable-declaration-init-type-annotation"), parserOptions: { ecmaVersion: 6 } },
        { code: "const foo = function(a: number = 0): Bar { };", parser: parser("type-annotations/function-expression-type-annotation"), parserOptions: { ecmaVersion: 6 } },

        // TypeScript Type Aliases
        { code: "type Foo<T> = T;", parser: parser("typescript-parsers/type-alias"), parserOptions: { ecmaVersion: 6 } }
    ],
    invalid: [
        {
            code: "a+b",
            output: "a + b",
            errors: [{
                message: "Operator '+' must be spaced.",
                type: "BinaryExpression",
                line: 1,
                column: 2,
                endColumn: 3
            }]
        },
        {
            code: "a +b",
            output: "a + b",
            errors: [{
                message: "Operator '+' must be spaced.",
                type: "BinaryExpression",
                line: 1,
                column: 3,
                endColumn: 4
            }]
        },
        {
            code: "a+ b",
            output: "a + b",
            errors: [{
                message: "Operator '+' must be spaced.",
                type: "BinaryExpression",
                line: 1,
                column: 2,
                endColumn: 3
            }]
        },
        {
            code: "a||b",
            output: "a || b",
            errors: [{
                message: "Operator '||' must be spaced.",
                type: "LogicalExpression",
                line: 1,
                column: 2,
                endColumn: 4
            }]
        },
        {
            code: "a ||b",
            output: "a || b",
            errors: [{
                message: "Operator '||' must be spaced.",
                type: "LogicalExpression",
                line: 1,
                column: 3,
                endColumn: 5
            }]
        },
        {
            code: "a|| b",
            output: "a || b",
            errors: [{
                message: "Operator '||' must be spaced.",
                type: "LogicalExpression",
                line: 1,
                column: 2,
                endColumn: 4
            }]
        },
        {
            code: "a=b",
            output: "a = b",
            errors: [{
                message: "Operator '=' must be spaced.",
                type: "AssignmentExpression",
                line: 1,
                column: 2
            }]
        },
        {
            code: "a= b",
            output: "a = b",
            errors: [{
                message: "Operator '=' must be spaced.",
                type: "AssignmentExpression",
                line: 1,
                column: 2
            }]
        },
        {
            code: "a =b",
            output: "a = b",
            errors: [{
                message: "Operator '=' must be spaced.",
                type: "AssignmentExpression",
                line: 1,
                column: 3
            }]
        },
        {
            code: "a?b:c",
            output: "a ? b:c",
            errors: [{
                message: "Operator '?' must be spaced.",
                type: "ConditionalExpression",
                line: 1,
                column: 2,
                endColumn: 3
            }]
        },
        {
            code: "a?b : c",
            output: "a ? b : c",
            errors: [{
                message: "Operator '?' must be spaced.",
                type: "ConditionalExpression",
                line: 1,
                column: 2,
                endColumn: 3
            }]
        },
        {
            code: "a ? b:c",
            output: "a ? b : c",
            errors: [{
                message: "Operator ':' must be spaced.",
                type: "ConditionalExpression",
                line: 1,
                column: 6,
                endColumn: 7
            }]
        },
        {
            code: "a? b : c",
            output: "a ? b : c",
            errors: [{
                message: "Operator '?' must be spaced.",
                type: "ConditionalExpression",
                line: 1,
                column: 2,
                endColumn: 3
            }]
        },
        {
            code: "a ?b : c",
            output: "a ? b : c",
            errors: [{
                message: "Operator '?' must be spaced.",
                type: "ConditionalExpression",
                line: 1,
                column: 3,
                endColumn: 4
            }]
        },
        {
            code: "a ? b: c",
            output: "a ? b : c",
            errors: [{
                message: "Operator ':' must be spaced.",
                type: "ConditionalExpression",
                line: 1,
                column: 6,
                endColumn: 7
            }]
        },
        {
            code: "a ? b :c",
            output: "a ? b : c",
            errors: [{
                message: "Operator ':' must be spaced.",
                type: "ConditionalExpression",
                line: 1,
                column: 7,
                endColumn: 8
            }]
        },
        {
            code: "var a=b;",
            output: "var a = b;",
            errors: [{
                message: "Operator '=' must be spaced.",
                type: "VariableDeclarator",
                line: 1,
                column: 6
            }]
        },
        {
            code: "var a= b;",
            output: "var a = b;",
            errors: [{
                message: "Operator '=' must be spaced.",
                type: "VariableDeclarator",
                line: 1,
                column: 6
            }]
        },
        {
            code: "var a =b;",
            output: "var a = b;",
            errors: [{
                message: "Operator '=' must be spaced.",
                type: "VariableDeclarator",
                line: 1,
                column: 7
            }]
        },
        {
            code: "var a = b, c=d;",
            output: "var a = b, c = d;",
            errors: [{
                message: "Operator '=' must be spaced.",
                type: "VariableDeclarator",
                line: 1,
                column: 13
            }]
        },
        {
            code: "a| 0",
            output: "a | 0",
            options: [{
                int32Hint: true
            }],
            errors: [{
                message: "Operator '|' must be spaced.",
                type: "BinaryExpression",
                line: 1,
                column: 2
            }]
        },
        {
            code: "var output = test || (test && test.value) ||(test2 && test2.value);",
            output: "var output = test || (test && test.value) || (test2 && test2.value);",
            errors: [{
                message: "Operator '||' must be spaced.",
                type: "LogicalExpression",
                line: 1,
                column: 43
            }]
        },
        {
            code: "var output = a ||(b && c.value) || (d && e.value);",
            output: "var output = a || (b && c.value) || (d && e.value);",
            errors: [{
                message: "Operator '||' must be spaced.",
                type: "LogicalExpression",
                line: 1,
                column: 16
            }]
        },
        {
            code: "var output = a|| (b && c.value) || (d && e.value);",
            output: "var output = a || (b && c.value) || (d && e.value);",
            errors: [{
                message: "Operator '||' must be spaced.",
                type: "LogicalExpression",
                line: 1,
                column: 15
            }]
        },
        {
            code: "const my_object={key: 'value'}",
            output: "const my_object = {key: 'value'}",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                message: "Operator '=' must be spaced.",
                type: "VariableDeclarator",
                line: 1,
                column: 16
            }]
        },
        {
            code: "var {a=0}=bar;",
            output: "var {a = 0} = bar;",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                message: "Operator '=' must be spaced.",
                line: 1,
                column: 7,
                type: "AssignmentPattern"
            }, {
                message: "Operator '=' must be spaced.",
                line: 1,
                column: 10,
                type: "VariableDeclarator"
            }]
        },
        {
            code: "function foo(a=0) { }",
            output: "function foo(a = 0) { }",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                message: "Operator '=' must be spaced.",
                line: 1,
                column: 15,
                type: "AssignmentPattern"
            }]
        },
        {
            code: "a**b",
            output: "a ** b",
            parserOptions: { ecmaVersion: 7 },
            errors: [{
                message: "Operator '**' must be spaced.",
                line: 1,
                column: 2,
                type: "BinaryExpression"
            }]
        },
        {
            code: "'foo'in{}",
            output: "'foo' in {}",
            errors: [{
                message: "Operator 'in' must be spaced.",
                line: 1,
                column: 6,
                type: "BinaryExpression"
            }]
        },
        {
            code: "'foo'instanceof{}",
            output: "'foo' instanceof {}",
            errors: [{
                message: "Operator 'instanceof' must be spaced.",
                line: 1,
                column: 6,
                type: "BinaryExpression"
            }]
        },

        // Type Annotations

        {
            code: "var a: Foo= b;",
            output: "var a: Foo = b;",
            parser: parser("type-annotations/variable-declaration-init-type-annotation-no-space"),
            errors: [{
                message: "Operator '=' must be spaced.",
                type: "VariableDeclarator",
                line: 1,
                column: 11
            }]
        },
        {
            code: "function foo(a: number=0): Foo { }",
            output: "function foo(a: number = 0): Foo { }",
            parser: parser("type-annotations/function-declaration-type-annotation-no-space"),
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                message: "Operator '=' must be spaced.",
                line: 1,
                column: 23,
                type: "AssignmentPattern"
            }]
        }
    ]
});
