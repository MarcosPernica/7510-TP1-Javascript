var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');




describe("InterpreterBadBase", function () {

    var db = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
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
    });

    afterEach(function () {
        // runs after each test in this block
    });



    describe('Interpreter Bad Base Load', function () {
 	it('Debe tirar un error al cargar la base de datos por la regla "hijo(X, Y) :- varon("', function () {
            assert.throws(function(){
			interpreter.parseDB(db);
			}, "Error: hijo(X, Y) :- varon( no es ni regla ni hecho.");
        });
    });

    describe('Interpreter Facts', function () {

        it('varon(juan) should be false', function () {
            assert(interpreter.checkQuery('varon(juan)') === false);
        });

        it('varon(maria) should be false', function () {
            assert(interpreter.checkQuery('varon(maria)') === false);
        });

        it('mujer(cecilia) should be false', function () {
            assert(interpreter.checkQuery('mujer(cecilia)') === false);
        });

        it('padre(juan, pepe) should be false', function () {
            assert(interpreter.checkQuery('padre(juan, pepe)') === false);
        });

        it('padre(mario, pepe) should be false', function () {
            assert(interpreter.checkQuery('padre(mario, pepe)') === false);
        });

    });

    describe('Interpreter Rules', function () {

        it('hijo(pepe, juan) should be false', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)') === false);
        });
        it('hija(maria, roberto) should be false', function () {
            assert(interpreter.checkQuery('hija(maria, roberto)') === false);
        });
        it('hijo(pepe, juan) should be false', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)') === false);
        });

    });

});
