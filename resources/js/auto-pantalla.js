gl_mobil = false;

function check_windows_siz() {
	var ancho = window.innerWidth;
	var alto = window.innerHeight;

	var objref = document.body
	var font_siz = getComputedStyle(objref).getPropertyValue("--siz-text");

	if(ancho < 1024){
		//console.log(+ancho+"  " +font_siz);
		if(gl_mobil)
			ocultar_lista_menu();

		if(!gl_mobil) {
			//console.log(+ancho+"  " +font_siz);
			objref.style.setProperty("--alig-text", 'left');
			objref.style.setProperty("--cel-siz", '5%');
			gl_mobil = true;
		}
	}
	else if(ancho >= 1024) {
		//console.log(+ancho+"  " +font_siz);

		objref.style.setProperty("--alig-text", 'center');
		objref.style.setProperty("--cel-siz", '10%');
		if(gl_mobil) {
			gl_mobil = false;
		}
	}
}
