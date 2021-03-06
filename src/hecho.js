var Normalizar = require('./core');

var Hecho = function (hecho) {
	//Es buena practica tener los atributos todos juntos aunque en realidad esto no hace nada util.
	this.hecho;

	//Valida que sea un hecho.
	this.validarHecho = function(hecho)
	{
		var re = new RegExp("^[0-9a-zA-Z]{1,}\\(([0-9a-zA-Z]{1,}, *)*([0-9a-zA-Z]){1,}\\)$");
		return re.test(hecho);
	}  







	//Constructor: 
	//Normaliza y valida que sea un hecho lo pasado.
	//Normaliza la entrada para facilitar y optimizar futuros accesos. No se asume que la informacion ingrese normalizada por las dudas.
	this.hecho = Normalizar(hecho);
	if(!this.validarHecho(this.hecho))
		throw "No es un hecho "+this.hecho;





	

	this.checkQuery = function(consulta)
	{
		//Si coinciden es verdadero.
		return this.hecho == Normalizar(consulta);
	}
}

module.exports = Hecho;
