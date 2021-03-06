var Hecho = require('./hecho');
var Normalizar = require('./core');

var Regla = function (regla) {
	//Es buena practica tener los atributos todos juntos aunque en realidad esto no hace nada util.
	this.reglaNormalizada;
	this.nombreRegla;
	this.arregloParametros;
	this.arregloHechos;

	
	this.obtenerNombreRegla = function(reglaNormalizada)
	{
		var re = new RegExp("^([^(]*)\\([^)]*\\).*$");
		return re.exec(reglaNormalizada)[1];
	}

	this.obtenerParametrosRegla = function(reglaNormalizada)
	{
		re = new RegExp("^[^(]*\\(([^)]*)\\).*$");
		return re.exec(reglaNormalizada)[1].split(',');
	}

	this.validarRegla = function(regla)
	{
		var re = new RegExp("^[0-9a-zA-Z]{1,}\\(([0-9a-zA-Z]{1,}, *)*([0-9a-zA-Z]){1,}\\) *:- *([0-9a-zA-Z]{1,}\\(([0-9a-zA-Z]{1,},*)*([0-9a-zA-Z]){1,}\\), *)*([0-9a-zA-Z]{1,}\\(([0-9a-zA-Z]{1,}, *)*([0-9a-zA-Z]){1,}\\) *)$");
		return re.test(regla);
	}





	//Constructor: 

	//Normaliza y valida que sea una regla lo pasado.
	//Normaliza la entrada para facilitar y optimizar futuros accesos. No se asume que la informacion ingrese normalizada por las dudas.
	this.reglaNormalizada = Normalizar(regla);
	if(!this.validarRegla(this.reglaNormalizada))
		throw "No es una regla "+this.reglaNormalizada;


	//Despieza la regla para optimizar el acceso a sus miembros.
	this.nombreRegla = this.obtenerNombreRegla(this.reglaNormalizada);
	this.arregloParametros = this.obtenerParametrosRegla(this.reglaNormalizada);

	var re = new RegExp("^.*:-(.*)$");
	this.arregloHechos = re.exec(this.reglaNormalizada)[1].replace("\),","\) ").split(' ');







	this.obtenerValorVerdadHecho = function(hecho, arregloHechos)
	{
		var res = false;

		for(var i=0;i<arregloHechos.length;i++)
			res |= arregloHechos[i].checkQuery(hecho);

		return res;
	}

	//Determina la equivalencia entre la consulta y la regla basandose en la cantidad de parametros y nombre de la regla.
	this.validarEquivalenciaReglaConsulta = function(consultaNormalizada)
	{
		//Obtiene el nombre y cantidad de parametros y los compara
		var parametrosConsulta = this.obtenerParametrosRegla(consultaNormalizada);
		var nombreConsulta = this.obtenerNombreRegla(consultaNormalizada);

		return nombreConsulta == this.nombreRegla && parametrosConsulta.length === this.arregloParametros.length
	}
	  

	//Resuelve la consulta si aplica y sino tira una excepcion.
	this.checkQuery = function(consulta, arregloHechos)
	{
		consulta = Normalizar(consulta);

		if(!this.validarEquivalenciaReglaConsulta(consulta))
			throw "La consulta no es aplicable";		

		//Reemplaza los parametros en la regla
		var parametrosConsulta = this.obtenerParametrosRegla(consulta);
		var arregloHechosAux = this.arregloHechos.slice();
		
		for(var i=0;i<parametrosConsulta.length;i++)
			for(var a=0;a<arregloHechosAux.length;a++)
				arregloHechosAux[a] = arregloHechosAux[a].replace(this.arregloParametros[i], parametrosConsulta[i]);	

		//Obtiene el valor de verdad de la consulta.
		var verdad = true;

		for(var i=0;i<arregloHechosAux.length;i++)
		{
			verdad &= this.obtenerValorVerdadHecho(arregloHechosAux[i], arregloHechos);
			if(!verdad)
				break;
		}

		
		//Transformo la salida de "truthy/falsy" a "true/false."
		if(verdad)
			return true;
		return false;		
	}
}

module.exports = Regla;
