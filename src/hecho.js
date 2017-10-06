var Hecho = function (hecho) {
	//Es buena practica tener los atributos todos juntos aunque en realidad esto no hace nada util.
	this.hecho;

	//Normaliza la entrada para facilitar y optimazar futuros acessos.
	this.normalizarHecho = function(hecho)
	{
		var n = new RegExp("\n{1,}",'g');
		var t = new RegExp("\t{1,}",'g');
		var s = new RegExp(" {1,}",'g');
		var p = new RegExp("\\.{1,}",'g');

		hecho = hecho.replace(n,"");
		hecho = hecho.replace(t,"");
		hecho = hecho.replace(s,"");
		hecho = hecho.replace(p,"");
		return hecho;
	}

	//Valida que sea un hecho.
	this.validarHecho = function(hecho)
	{
		var re = new RegExp("^[0-9a-zA-Z]{1,}\\(([0-9a-zA-Z]{1,}, *)*([0-9a-zA-Z]){1,}\\)$");
		return re.test(hecho);
	}  







	//Constructor: 
	//Normaliza y valida que sea un hecho lo pasado.
	this.hecho = this.normalizarHecho(hecho);
	if(!this.validarHecho(this.hecho))
		throw "No es un hecho "+this.hecho;





	

	this.checkQuery = function(consulta)
	{
		//Si coinciden es verdadero.
		return this.hecho == this.normalizarHecho(consulta);
	}
}

module.exports = Hecho;
