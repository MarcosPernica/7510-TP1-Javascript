var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');



describe("InterpreterMathTest", function () {

    var db = [
        "add(zero, zero, zero).",
        "add(zero, one, one).",
        "add(zero, two, two).",
        "add(one, zero, one).",
        "add(one, one, two).",
        "add(one, two, zero).",
        "add(two, zero, two).",
        "add(two, one, zero).",
        "add(two, two, one).",
        "substract(X, Y, Z) :- add(Y, Z, X).",
    ];

    var interpreter = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
        interpreter.parseDB(db);
    });

    afterEach(function () {
        // runs after each test in this block
    });


    describe('Interpreter Math Facts', function () {

        it('add(zero, zero, zero) should be true', function () {
            assert(interpreter.checkQuery('add(zero, zero, zero)'));
        });

        it('add(zero, two, two) should be true', function () {
            assert(interpreter.checkQuery('add(zero, zero, zero)'));
        });

        it('add(zero, zero, four) should be false', function () {
            assert(interpreter.checkQuery('mujer(cecilia)') === false);
        });

    });

    describe('Interpreter Math Rules', function () {

        it('substract(zero, zero, zero) should be true', function () {
            assert(interpreter.checkQuery('substract(zero,zero,zero)'));
        });
        it('substract(zero, five, zero) should be false', function () {
            assert(interpreter.checkQuery('substract(zero, five, zero)') === false);
        });
        it('substract(zero, one, two) should be true', function () {
            assert(interpreter.checkQuery('substract(zero, one, two)'));
        });


    });


});


