

var gl_type = [	"text/csv", "text/comma-separated-values"
			];

function importar_main() {



	// Importar Historial
	var hist_file = document.getElementById("file_hist");
	importar_hist_list(hist_file);
	hist_file.addEventListener("change", function(){importar_hist_list(hist_file)});

}


function importar_hist_list(elem) {

	var file_date = elem.files[0];
	if(file_date){
		var current_type = file_date.type;
		//console.log(current_type);
		if(current_type == gl_type[0] || current_type == gl_type[1]){
			Papa.parse(file_date,{
				config: {
					delimiter: ";"
				},
				complete: function(results) {
					save_exp_date(results.data);
					//console.log("Finished:",results.data);
				}
			});
		}
	}
}



var save_expdate = new Array();

function save_exp_date(results) {
    var data = results
	save_expdate = new Array();
	doc_siz_fila = data.length;
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        var cells = row.join(";").split(";");
		save_expdate[i] = new Array();
        for (var j = 0; j < cells.length; j++) {

			if(cells[j].includes("ï»¿"))
				cells[j] = cells[j].replaceAll("ï»¿", "");

			if(cells[j].includes("Ã")){
				cells[j] = cells[j].replaceAll("Ã", "Ñ");
				cells[j] = cells[j].replaceAll("Ã³", "ó");
				cells[j] = cells[j].replaceAll("Ã", "Ó");
			}
			if(cells[j].includes("ã"))
				cells[j] = cells[j].replaceAll("ã", "ñ");

			save_expdate[i][j] = cells[j];	
        }
		if(i==0)
		doc_siz_col = cells.length;
    }

	recovery_hist_data();
}

function recovery_hist_data() {

	var siz = save_expdate.length; 
    for (var i = 1; i < siz ; i++) {
		if(save_expdate[i][0] == "")
			continue;

		var fecha = save_expdate[i][3];
		gl_hist_data.nombre.push(save_expdate[i][0]);
		gl_hist_data.totl_bs.push(get_string_num(""+save_expdate[i][1]));
		gl_hist_data.totl_dol.push(get_string_num(""+save_expdate[i][2]));
		gl_hist_data.fecha.push(fecha);
		gl_hist_data.hora.push(save_expdate[i][4]);
		gl_hist_data.etd.push(save_expdate[i][5]);
		var detall = new Array();
		var tx = ""
		for (var j = 6; j < save_expdate[i].length ; j++) {
			tx = save_expdate[i][j];
			if(tx == "") continue;
			else
				detall.push("<div class='div_his_list_style'>"+tx+"</div>");
		}
		var fec_tx = gl_hist_data.feclist.join(";");
		var result = fec_tx.includes(fecha);
		if(!result) gl_hist_data.feclist.push(fecha);

		gl_hist_data.detalles.push(detall.join("\n"));
		gl_hist_data.siz++;
	}

	crea_hist_list();

	preloder_filtro_fec();
	console.log("gl_hist_data: "+gl_hist_data.siz);
}


var gl_result_temp = new Array();

var timeoutID;
function start_read_list() {
	var butt = document.getElementById("butlistimport");
	butt.disabled = true;
	butt.setAttribute("class", "button_style_disable");
	timeoutID = setTimeout(recovery_simple_list, 100);
}

function get_string_num(text) {
	var tx = "";
	var punto = true;
	for (var j = 0; j < text.length; j++) {
		if(parseInt(text[j]) || text[j] == "0"){
			tx += text[j];
			continue;
		}
		if( text[j] == "." && punto){
			tx += text[j];
			punto = false;
			continue;
		}
	}
	//console.log("Este es el bueno : " +tx);
	return parseFloat(tx)? parseFloat(tx) : 0;
}

function remove_empy_name(){
	var siz = gl_result_temp.length;
    for (var j = 0;j<siz ; j++) {
		var nombre = gl_result_temp[j].products.nombre;
		if(nombre && nombre.length==0){
			gl_result_temp.splice(j, 1);
			gl_result_temp.splice(j, 1);
			gl_result_temp.splice(j, 1);
			gl_result_temp.splice(j, 1);
		}
	}
}
