var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("InterpreterBadQuery", function () {

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
        "hijo(X, Y) :- varon(X), padre(Y, X).",
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
        interpreter.parseDB(db);
    });

    afterEach(function () {
        // runs after each test in this block
    });


    describe('Interpreter Facts', function () {

        it('varon() should throw exception', function () {
            assert.throws(function(){
			interpreter.checkQuery('varon()')
			}, Error);
        });

       
    });

    describe('Interpreter Rules', function () {
  		it('varon(X,) should throw exception', function () {
           		 assert.throws(function(){
				interpreter.checkQuery('varon(X,)')
				}, Error);
        });
        
    });

});
