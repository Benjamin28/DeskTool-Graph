// cursor advances from 0 to func_string.length()
var cursor = 0;
var plot_coordinates = [];
var function_string;


function parser_increment_cursor(){

}

/*returns array of len plot coordinates.length() containing identical
  values as whatever number cursor is pointing to.*/
function get_num(){

    var int_string = ""
    var i = cursor;

    while(!isNaN(function_string[i])){
	int_string += function_string[i];
    }

    var num_value = parseInt(int_string);
    
    var return_list = new Array(plot_coordinates.length());

    for(i = 0; i < return_list.length(); i++){
	return_list[i] = num_value;
    }
    return return_list;
}

/*true if cursor is pointing to num*/
function is_num(){

    if(isNaN(function_string[cursor])){
	return false;
    }
    return true;

}


function parser_high_priority(){


    var indicator = function_string[cursor];
    var result_list;

    //init list to catch output
    if(indicator == '(' || indicator == 'x' || is_int()){
	result_list = new Array(plot_coordinates.length());
    }else
	print("ERROR, invalid function");

    if(indicator == 'x'){

	return_list = [for (x of plot_coordinates) x];
	parser_increment_cursor();
	return return_list;

    }
    if(is_num()){

	return_list = parser_get_num();
	//possible optimization, is_num_increment
	parser_increment_cursor();
	return return_list;
	
    }
    if(indicator == '('){
	print("ERROR: parenthesis not yet implemented");
    }
    
}

function parser_med_priority(){

    //array
    var hi_prio_left = parser_high_priority();
    while(func_string[cursor] == '*'){

	parser_increment_cursor();

	//array
	var hi_prio_right = parser_high_proiority();
	var i = 0;
	for (i; i < plot_coordinates.length(); i ++){
	    hi_prio_left[i] = hi_prio_left[i] * hi_prio_right[i];
	}
	
    }
    return hi_prio_left;
}


function parser_low_priority(values){

    //array
    var med_prio_left = parser_med_priority();

    while(func_string[cursor] == '+'){
	
	parser_increment_cursor();

	//array
	var med_prio_right = parser_med_priority();
	var i = 0;
	for(i; i < values.length(); i++){

	    values[i] = med_prio_left[i] + med_prio_right[i];
	    
	}
    }
    return values;
}


/*The parser_plot function plots the function over the plot coordinates
  VARIABLE plot_coords: the coordinates for which the function is plotted
  VARIABLE func_string: the function to plot given in a string
  RETURNS: array of values that correspond to each value in plot_coords
*/

function parser_expression(values){

    return parser_low_priority(values);

}


function parser_plot(plot_coords, func_string){

    function_string = func_string;
    plot_coordinates = plot_coords;
    
    //init values array
    var values = new Array(plot_coords.length());

    
    parser_expression();

    print("done parsing");
    print(plot_coords, plot_vars);
    
    
}
