
function menu_main(){
	var select = document.getElementById("selectlistaname");
	var opt = select.options[select.selectedIndex];
	var input2 = document.getElementById("inputlistaname");

	if(edit_mode){
		input2.setAttribute("class","mask_style");
		select.setAttribute("class","element_style_hidden");
	}

	reset_inputs_rv();
	document.getElementById("rv_totaldol").value = 0.00+" $";
	document.getElementById("rv_totalbsf").value = 0.00+" BsF";

	var select1 = document.getElementById("selcregvent");
}

function mostrar_lista_menu(is_pc=false){

}

gl_menu_sw = false;
function ocultar_lista_menu(){
	var elm = document.activeElement;
	//alert(elm.tagName)

	if(elm.tagName == "INPUT"){
		var lista = document.getElementById("allmenu");
		var class_name = lista.className;
		if(class_name != "element_style_hidden"){
			lista.setAttribute("class","element_style_hidden");
			return null;
		}
	}
}
var gl_is_touch = null;
window.addEventListener("touchstart", function() {
	gl_is_touch = true;

});

window.addEventListener("touchmove", function() {
	mostrar_lista_menu();
});

window.addEventListener("mousemove", function() {
	mostrar_lista_menu(true);
});

/*
window.addEventListener('scroll', function() {

    var elm = document.documentElement;

		alert(elm.tagname + " :: "+ document.body.clientHeight)
//if($(window).scrollTop() + $(window).height() >= $(document).height()) {
    if ((elm.scrollHeight - elm.scrollTop) >= (document.body.clientHeight)) {
        console.log(elm.scrollTop);

		mostrar_lista_menu(true);
	}
});*/

function visible_element() {
	var elm = document.activeElement;

	var sec_hist = document.getElementById("seccion3");

	sec_hist.setAttribute("class","label_style");
	
}

function mostrar_input() {
	var mask = document.activeElement;
	var id_name = mask.id;


	mask.setAttribute("placeholder", "Vacio");
	var id_input = id_name.replace("text_mask", "input"); //remplaza  palabaras en cadenas de texto

	var input = document.getElementById(id_input);
	//var fila = document.getElementById("fila"+id_a);
	//var celda = document.getElementById("celd"+id_b);
	//var input = document.getElementById("input"+id_c);
	//var mask = document.getElementById("text_mask"+id_d);

	//alert("Mostrar: "+input +" "+id_name.includes("text_mask"))
	if(input && id_name.includes("text_mask")){
		input.setAttribute("class","input_style_visible");
		mask.setAttribute("disabled", "");
		input.focus();
		if(current_element == input)
			current_element = null;

		else
			current_element = input;
	}
	return null
}

function ocultar_input(id = null) {
	var current_input = document.activeElement;
	var current_id_name = current_input.tagname == "INPUT" ? current_input.id : "";
	var input_old = current_element;

	//console.log(id +" :: "+current_element +" :: "+current_id_name);
	if(id){
		var input = document.getElementById(id);
		if(input){
			var id_mask = id.replace("input", "text_mask"); //remplaza  palabaras en cadenas de texto
			//console.log(id_mask)
			var mask = document.getElementById(id_mask);
			input.setAttribute("class","input_style_visible");
			mask.setAttribute("disabled", "");
			input.focus();
			input.select();
			current_element = input;
		}
	}
	//else if(current_id_name!=""){
		//el_selec(current_id_name);
	//}
	
	if(input_old ){
		var id_name_old = input_old.id;
		var id_mask_old = id_name_old.replace("input", "text_mask"); //remplaza  palabaras en cadenas de texto
		var mask_old = document.getElementById(id_mask_old);
		if(mask_old && id_name_old.includes("input")){
			input_old.setAttribute("class","input_style_hidden");
			mask_old.setAttribute("placeholder", "Ingrese Valor");
			mask_old.disabled=false;
			if(id_name_old != current_id_name)
				current_element = null;
		}
	}
}

function el_selec(selec){
	var elm = document.activeElement;
	if(selec)elm.select();
}
function el_unselec(){
	var elm = document.activeElement;
	var sel = elm.blur();

}

