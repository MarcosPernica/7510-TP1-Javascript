var normalizar = function(texto)
{
	var n = new RegExp("\n{1,}",'g');
	var t = new RegExp("\t{1,}",'g');
	var s = new RegExp(" {1,}",'g');
	var p = new RegExp("\\.{1,}",'g');

	texto = texto.replace(n,"");
	texto = texto.replace(t,"");
	texto = texto.replace(s,"");
	texto = texto.replace(p,"");

	return texto;
}


module.exports = normalizar;
