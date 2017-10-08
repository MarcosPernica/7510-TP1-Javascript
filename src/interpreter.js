var Hecho = require('./hecho');
var Regla = require('./regla');

var Interpreter = function () {
	//Es buena practica tener los atributos todos juntos aunque en realidad esto no hace nada util.
	this.db;
	this.arregloHechos = new Array();
	this.arregloReglas = new Array();
	this.hayDBValida = false;

	//Devuelve el hecho o false si no era hecho.
	this.esHecho = function(hecho)
	{
		var res;
		try
		{
			res = new Hecho(hecho);	
		}
		catch(e)
		{		
			res = false;
		}
		return res;
	}

	//Devuelve la regla o false si no era regla.
	this.esRegla = function(regla)
	{
		var res;
		try
		{
			res = new Regla(regla);	
		}
		catch(e)
		{		
			res = false;
		}
		return res;
	}

	this.parseDB = function (arregloDB) 
	{
		var elemento;
		this.hayDBValida = false;

		//Trata de convertir cada elemento a regla o a hecho. Si alguno no se puede falla todo.
		for(var i=0; i<arregloDB.length; i++)
		{
			elemento = this.esHecho(arregloDB[i]);
			if(elemento !== false)
			{
				this.arregloHechos.push(elemento);
				continue;
			}

			elemento = this.esRegla(arregloDB[i]);
			if(elemento !== false)
			{
				this.arregloReglas.push(elemento);
				continue;
			}

			throw	"Error: " + arregloDB[i] + " no es ni regla ni hecho.";
		}

		this.hayDBValida = true;
		return true;		
	}

	this.normalizarConsulta = function(consulta)
	{
		var n = new RegExp("\n{1,}",'g');
		var t = new RegExp("\t{1,}",'g');
		var s = new RegExp(" {1,}",'g');
		var p = new RegExp("\\.{1,}",'g');

		consulta = consulta.replace(n,"");
		consulta = consulta.replace(t,"");
		consulta = consulta.replace(s,"");
		consulta = consulta.replace(p,"");
		return consulta;
	}

	this.validarConsulta = function(consulta)
	{
		var re = new RegExp("^[0-9a-zA-Z]{1,}\\(([0-9a-zA-Z]{1,}, *)*([0-9a-zA-Z]){1,}\\)$");
		return re.test(this.normalizarConsulta(consulta));
	}  

	this.checkQuery = function (query) 
	{
		if(!this.hayDBValida)
			return false;

		if(!this.validarConsulta(query))
			throw Error("Error: " + query + " no es valida.");			


		var res;

		//Chequea primero con las reglas.
		for(var i=0;i<this.arregloReglas.length;i++)
		{
			try
			{
				res = this.arregloReglas[i].checkQuery(query, this.arregloHechos);
				return res;
			}	
			catch(e)
			{
				continue;	
			}
		}

		res = false;

		//Sino era una consulta a una regla se fija con los hechos.
		for(var i=0;(i<this.arregloHechos.length) && !res;i++)
			res = this.arregloHechos[i].checkQuery(query);
	
		return res;
	}
}

module.exports = Interpreter;
