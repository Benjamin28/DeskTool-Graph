// cursor advances from 0 to func_string.length()
var cursor;
var plot_coordinates = [];
var function_string;

function parser_get_domain(min, max){

    var return_array=[];

    var step_size = (max-min)/100;

    for(var i = 0; i < 100; i++){
	return_array.push(min+i*step_size);
    }
    
    return return_array;
}

function parser_increment_cursor(){


    if(is_num()){
	while(!isNaN(function_string[cursor]))
	    cursor++;
    }
    else
	cursor++;

    while(function_string[cursor] == ' ')
	cursor++;
    
    
}

/*returns array of len plot coordinates.length() containing identical
  values as whatever number cursor is pointing to.*/
function get_num(){

    var int_string = "";
    var i = cursor;

    while(!isNaN(function_string[i])){
	int_string += function_string[i];
	i++;
    }

    var num_value = parseInt(int_string);
    
    var return_list = new Array(plot_coordinates.length);

    for(i = 0; i < return_list.length; i++){
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
    if(indicator == '(' || indicator == 'x' || is_num()){
	result_list = new Array(plot_coordinates.length);
    }else
	console.log("ERROR, invalid function");

    if(indicator == 'x'){

	return_list = plot_coordinates.slice();
	parser_increment_cursor();
	return return_list;

    }
    if(is_num()){

	return_list = get_num();
	//possible optimization, is_num_increment
	parser_increment_cursor();
	return return_list;
	
    }
    if(indicator == '('){
	console.log("ERROR: parenthesis not yet implemented");
    }
    
}

function parser_med_priority(){

    //array
    var hi_prio_left = parser_high_priority();
    while(function_string[cursor] == '*'){

	parser_increment_cursor();

	//array	
	var hi_prio_right = parser_high_priority();
	var i = 0;
	for (i; i < plot_coordinates.length; i ++){
	    hi_prio_left[i] = hi_prio_left[i] * hi_prio_right[i];
	}
	
    }
    return hi_prio_left;
}


function parser_low_priority(values){

    //array
    var med_prio_left = parser_med_priority();

    while(function_string[cursor] == "+"){
	
	parser_increment_cursor();
	
	
	//array
	var med_prio_right = parser_med_priority();
	var i = 0;
	for(i; i < plot_coordinates.length; i++){

	    med_prio_left[i] = med_prio_left[i] + med_prio_right[i];
	    
	}

    }
    return med_prio_left;
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


    cursor = 0;
    
    function_string = func_string;
    plot_coordinates = plot_coords;
    
    //init values array
    var values = new Array(plot_coords.length);

    
    var plot_vars = parser_expression();

    console.log(plot_vars);
    return plot_vars;
    
}
