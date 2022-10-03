gl_curr_optsel = 0;
gl_curr_etd_sel = "Todas";


gl_hist_data = new get_history();
function get_history() {
	this.siz = 0;
	this.nombre = new Array();
	this.totl_bs = new Array();
	this.totl_dol = new Array();
	this.fecha = new Array();
	this.hora = new Array();
	this.etd = new Array();
	this.detalles = new Array();

	this.feclist = new Array();
}


function historial_main() {




	preloder_filtro_etd();
	preloder_filtro_fec();
}

function preloder_filtro_fec() {

	console.log("fec")
	var selec = document.getElementById("selchisfec");

	var siz = gl_hist_data.feclist.length;
	var selc_tx = "<option id='fechall' value='"+(-1)+"'>Todas</option>";
	for (var j = 0; j < siz; j++) {
		var name = gl_hist_data.feclist[j]

		if(name){
			selc_tx += "<option id='fech"+j+"' value='"+j+"'>"+name+"</option>";
		}
	}
	selec.innerHTML = selc_tx;
	selec.setAttribute("onchange","selec_fechas('selchisfec');");
	var current_opt = selec.options[selec.selectedIndex].innerHTML;

	gl_curr_optsel = current_opt;
}

function preloder_filtro_etd() {

	var selec = document.getElementById("selcthisetd");
	var list = ["Todas", "Pendiente", "Aprobada", "Reintegrada"];
	var selc_tx = "";
	for (var j = 0; j < list.length; j++) {
		var name = list[j]
		selc_tx += "<option id='fechetd"+j+"' value='"+name+"'>"+name+"</option>";	
	}
	selec.innerHTML = selc_tx;
	selec.setAttribute("onchange","selec_estado('selcthisetd');");
}

function selec_fechas(id,mostrar = true) {
	var selec = document.getElementById(id);
	var current_opt = selec.options[selec.selectedIndex].innerHTML;
	if(mostrar){
		//console.log(current_opt)
		gl_curr_optsel = current_opt;
		crea_hist_list();
	}
}

function selec_estado(id) {
	var selec = document.getElementById(id);
	var current_opt = selec.options[selec.selectedIndex];
	gl_curr_etd_sel = current_opt.value;

	//console.log(gl_curr_etd_sel);
	crea_hist_list();
}

function crear_historial(index) {
	var fecha = gl_hist_data.fecha[index];
	if(gl_curr_optsel == "Todas" || gl_curr_optsel == fecha){
		var estado = gl_hist_data.etd[index];
		if( (gl_curr_etd_sel == "Todas") || (gl_curr_etd_sel == estado) ){
			var detalles = gl_hist_data.detalles[index];
			var prdol = gl_hist_data.totl_dol[index];
			var prbsf = gl_hist_data.totl_bs[index];
			var hora = gl_hist_data.hora[index];

			var cl = gl_hist_data.nombre[index];

			var est_txa = "<strong id='txesta"+index+"'> Estado: "+estado+"</strong>";
			var est_txb = "<strong id='txestb"+index+"'> Estado: "+estado+"</strong>";

			var secc_his = document.getElementById("historialventa");
			var titulo = "["+cl+", "+est_txa+ "], "+fecha+" "+hora+" <strong class='total_style'>Total: "+get_mask(prdol,gl_mon_b)+" / "+get_mask(prbsf,gl_mon_a+" </strong>");

			var buttm = "<button id='bottdetll"+index+"' type='button' class='butt_style'>Detalles</button>";

			
			var inside = "<div class='element_style_hidden' id='divhis"+index+"'>"+ detalles + est_txb +"</div>";

			secc_his.innerHTML +=  "<div class='div_list_style' onclick='button_detalles("+index+");'>" + buttm  + titulo + inside + "</div>";
			
			return prdol;
		}
	}
	return 0;
}
function crear_lista_cl() {
	//var sect_lista = document.getElementById("list_cl");
	var data_lista = document.getElementById("list_datacl");
	//sect_lista.innerHTML = "";
	data_lista.innerHTML = "";
	var lista_tx = "";
	var data_tx = "";
	for (var j = 0; j < gl_listname.nombrecl.length; j++) {
		//lista_tx += add_text_cl(j,1);
		data_tx += add_text_cl(j,2);
	}
	// agregamos la hilera a la seccion de lista
	//sect_lista.innerHTML = lista_tx;
	data_lista.innerHTML = data_tx;
}

function add_text_cl(index,opt){
	var nombre = gl_listname.nombrecl[index]?gl_listname.nombrecl[index]:"";

	if(opt==1){
		return "<div> </div>";
	}
	if(opt==2){
		return "<option value='"+nombre+"'>";
	}
}
function button_detalles(index) {
	var butt = document.getElementById("bottdetll"+index);
	var name = butt.className;
	if(name=="butt_style")
		butt.setAttribute("class", "butt_style_selc");
	else
		butt.setAttribute("class", "butt_style");


	var secc_div = document.getElementById("divhis"+index);
	var class_name = secc_div.className;
	if(class_name == "element_style_hidden")
		secc_div.setAttribute("class", "");
	else
		secc_div.setAttribute("class", "element_style_hidden");
}

function button_pend_hist(index) {
	var etd = "Aprobada";

	var txesta = document.getElementById("txesta"+index);
	var txestb = document.getElementById("txestb"+index);

	txesta.innerHTML = " Estado: "+etd;
	txestb.innerHTML = " Estado: "+etd;

	//Datos De la venta -----------------------------------------------------
	gl_hist_data.etd[index] = etd;			//Cambia el estado de la venta seleccionada
	gl_hist_data.clave = gl_curr_optsel;		//Valor de la clave segun el selector de fechas
	agregar_ventas(gl_hist_data);				//Envia los datos para ser guardados
	//mostrar_lista(gl_currt_list_selec);

	//Cambia el boton
	var bott = document.getElementById("bott_pend"+index);
	bott.setAttribute("id", "bott_reint"+index);
	bott.setAttribute("onclick", "button_reint_hist("+index+");");
	bott.setAttribute("class", "butt_style");
	bott.innerHTML = "Reintegrar";
}

function button_reint_hist(index) {
	var etd = "Reintegrada";
	if(gl_hist_data.etd[index]=="Aprobada"){
		cop_list = new cop_products();
		//console.log(index);
		var bott = document.getElementById("bott_reint"+index);
		bott.setAttribute("class", "element_style_hidden");

		var listindex = gl_hist_data.pdtindex[index];
		var listclave = gl_hist_data.pdtclave[index];
		var listcantidad = gl_hist_data.pdtcantidad[index];
		var listdesc = gl_hist_data.pdtdesc[index];
		for (var j = 0; j < listindex.length ; j++) {
			var lindex = parseInt(listindex[j]);
			var num = listdesc[j];
			var prod = gl_products[lindex].products;
			//console.log("Name:"+prod.nombre+" Cant: "+prod.cantidad+" New Can: "+ (prod.cantidad + num))
			prod.cantidad = parseFloat(prod.cantidad)? parseFloat(prod.cantidad):0;
			prod.cantidad += num;

			var curr_prod = new r_product();
			curr_prod.id = lindex;
			curr_prod.products = prod;
			agregar_all_producto(curr_prod);
		}
		update_list_rv();

		//console.log("index"+" "+index);
		var txesta = document.getElementById("txesta"+index);
		var txestb = document.getElementById("txestb"+index);

		txesta.innerHTML = " Estado: "+etd;
		txestb.innerHTML = " Estado: "+etd;

		//Cambia el boton a modo deshacer
		var bott = document.getElementById("bott_reint"+index);
		bott.setAttribute("id", "bott_desh"+index);
		bott.setAttribute("onclick", "button_desh_hist("+index+");");
		bott.setAttribute("class", "butt_style");
		bott.innerHTML = "Deshacer";

		//Datos De la venta -----------------------------------------------------
		gl_hist_data.etd[index] = etd;			//Cambia el estado de la venta seleccionada
		gl_hist_data.clave = gl_curr_optsel;		//Valor de la clave segun el selector de fechas
		agregar_ventas(gl_hist_data);				//Envia los datos para ser guardados
	}
}

function button_desh_hist(index) {
	var etd = "Aprobada";
	if(gl_hist_data.etd[index]=="Reintegrada"){
		//console.log(index);
		var bott = document.getElementById("bott_desh"+index);
		bott.setAttribute("class", "element_style_hidden");

		var listindex = gl_hist_data.pdtindex[index];
		var listclave = gl_hist_data.pdtclave[index];
		var listcantidad = gl_hist_data.pdtcantidad[index];
		var listdesc = gl_hist_data.pdtdesc[index];
		for (var j = 0; j < listindex.length ; j++) {
			var lindex = parseInt(listindex[j]);
			var num = (listdesc[j])*(-1);
			  
			var prod = gl_products[lindex].products;
			//console.log("Name:"+prod.nombre+" Cant: "+prod.cantidad+" New Can: "+ (prod.cantidad + num))
			prod.cantidad = parseFloat(prod.cantidad)? parseFloat(prod.cantidad):0;
			prod.cantidad += num;

			var curr_prod = new r_product();
			curr_prod.id = lindex;
			curr_prod.products = prod;
			agregar_all_producto(curr_prod);
		}
		update_list_rv();

		//console.log("index"+" "+index);
		var txesta = document.getElementById("txesta"+index);
		var txestb = document.getElementById("txestb"+index);

		txesta.innerHTML = " Estado: "+etd;
		txestb.innerHTML = " Estado: "+etd;

		//Cambia el boton a modo reintegrar
		var bott = document.getElementById("bott_desh"+index);
		bott.setAttribute("id", "bott_reint"+index);
		bott.setAttribute("onclick", "button_reint_hist("+index+");");
		bott.setAttribute("class", "butt_style");
		bott.innerHTML = "Reintegrar";

		//Datos De la venta -----------------------------------------------------
		gl_hist_data.etd[index] = etd;			//Cambia el estado de la venta seleccionada
		gl_hist_data.clave = gl_curr_optsel;		//Valor de la clave segun el selector de fechas
		agregar_ventas(gl_hist_data);				//Envia los datos para ser guardados
		//mostrar_lista(gl_currt_list_selec);
	}
}

function eliminar_todo(opt){
	var butt = document.getElementById("buthist");
	var label = document.getElementById("histlabel");
	var check = document.getElementById("histcheck");
	if(opt==0){
		label.setAttribute("class", "cajas_style");
		check.checked = false;
		butt.setAttribute("onclick", "eliminar_todo(1)");
		alert("Estas a punto de borrar todo, marque la casilla para confirmar y vuelva a pulsar.");
	}
	if(opt==1){
		label.setAttribute("class", "input_style_hidden");
		butt.setAttribute("onclick", "eliminar_todo(0)");
		if(check.checked){
			check.checked = false;
			clear_history();
			alert("Se ha borrado Todo el Historial.");
		}
	}
}
function clear_history(){
	var input = document.getElementById("totalhist");
	input.value = 0;
	//Restaura los valores de control del historial
	gl_general.fechalist = new Array();
	gl_general.fecha = null;
	gl_general.clv_max = 0;
	agregar_gene_datos(gl_general);	

	preloder_filtro_fec();
	selec_fechas("selchisfec");

	var secc_his = document.getElementById("historialventa");
	secc_his.innerHTML = "";

	gl_hist_data = new reg_ventas();
	remover_ventas();
}



