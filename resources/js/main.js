
var current_element = null;


//Datos de los productos
var gl_products = new Array();


//Unidades fijas -------------
var gl_mon_a = "Bs";
var gl_mon_b = "$";
//---------------------------

//Es firefox ?
var gl_browser = false;

function add_message(text)
{
	alert(text);
}

function notSupported(){ alert("El navegador no lo soporta."); }


function click_test(){
	for(var j = 0; j<5 && cop_list[j]; j++){
			console.log(""+cop_list[j].start+" :: "+j+" :: "+cop_list[j].index[0] +" :: "+cop_list[j].num[0])
	}

	//var result = new result_list();
	//agregar_producto(result);

	//get_celda_value(table_fila,table_col);
	//gloval_test += "input "+document.getElementById("input0").value;

	//create_table(table_fila,table_col);
	
      //for (var j = 0; j < save_expdate.length; j++) {

		//gloval_test += " ["+save_expdate[0][j]+"] ";
		//gloval_test += " ["+save_expdate[1][j]+"] ";
		//gloval_test += " ["+save_expdate[2][j]+"] ";
		//gloval_test += " ["+save_expdate[3][j]+"] ";
     //}
		//setCaretPosition("inputest", 5);
	//add_message(gloval_test);
	//gloval_test ="";

	//get_celda_value(table_fila,table_col);
//var gl_products.list_prda_ventas = new reg_ventas();
	//	agregar_ventas(gl_products.list_prda_ventas);

}

//contador para esperar mientras los valores se cargan
var segundos = 0;
// var contador = setInterval(cambio_valor, 1000);
var cont_sw = true;

function cursor_en_fila(id)
{
	var fila = document.getElementById("fila"+id);
	fila.setAttribute("class","fila_selec_style");
}

function cursor_no_fila(id)
{
	var fila = document.getElementById("fila"+id);
	fila.setAttribute("class","fila_style");
}

function cursor_en_button(id)
{
	var butt = document.getElementById(id);
	butt.setAttribute("class","input_style_selec");
}

function cursor_no_button(id)
{
	var butt = document.getElementById(id);
	butt.setAttribute("class","input_style_td");
}

function init(){
	//Identifica si es firefox
	gl_browser = is_browser_active("firefox");

	check_windows_siz();


	//Inicializa la seccion de Leer documentos tipo hojas de datos
	importar_main();


	//Historial
 	visible_element();
	historial_main();

}

window.addEventListener("resize", check_windows_siz);

window.addEventListener("keypress", function() {
	var key = window.event.key;
	current_key = key;
	//add_message("");
	var input = document.activeElement;
	var class_name = input.className;

	//console.log("key"+class_name);
	if(class_name == "input_style_visible"){
		return soloNumeros(event);
	}
});

window.addEventListener("keyup", function() {
	var input = document.activeElement;
	var class_name = input.className;
remplace_doble_punto();
	current_key = null;

	var key = window.event.key;
	if(key == "Enter"){
		var id_name = input.id;
				//add_message(id_name);
		if(id_name.includes("input")){
			var class_name = input.className;
			//add_message(class_name);
			if(class_name == "input_style_visible"){
				ocultar_input()
			}
		}
		input.blur();
	}


});

//Solo permite introducir n??meros.
function soloNumeros(e){
	var input_test = document.getElementById("inputest");

	var input = document.activeElement;
	var num = input.value;
    var key = window.event ? e.which : e.keyCode;
	if(key == 46){
		if (num == "")
			return e.preventDefault();

	 	else if(!num.includes(".")){
			return null;
		}	
	}
	else if(key == 45){
		if (num == "")
			return e.preventDefault();

	 	else if(!num.includes("-")){
			return null;
		}
	}

    if (key < 48 || key > 57) {
        //Usando la definici??n del DOM level 2, "return" NO funciona.
        e.preventDefault();
    }
}

function soltar_tecla(e){
	var key = window.event.key;
	//add_message(key);
	if(key == "."){
		var input_test = document.getElementById("inputest");

		var input = document.activeElement;
		var num = input.value;
	 	if (!num.includes(".")){
			input.value = remplace_test(num);
			//input.value = parseFloat(input.value).toFixed(2);
			return null;
		}
	}
}
