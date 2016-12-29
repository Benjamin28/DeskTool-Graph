// cursor advances from 0 to func_string.length()
var cursor = 0;
var values = [];
var function_string;



/*The parser_plot function plots the function over the plot coordinates
  VARIABLE plot_coords: the coordinates for which the function is plotted
  VARIABLE func_string: the function to plot given in a string
  RETURNS: array of values that correspond to each value in plot_coords
*/

function parser_expression(func_string, plot_vars){

    var left_hand = parser_low_priority(func_string, plot_vars);
    while(func_string[cursor] == '+'){

	
	
    }

}


function parser_plot(plot_coords, func_string){

    function_string = func_string;
    
    //init values array
    var i = 0;
    for(i = 0; i < plot_coords.length; i++){
	values.push(0);	
    }

    //set every var in values array to correct first value
    for(i = 0; i < plot_coords.length; i++){

	if(is_x()){
	    values[i] = plot_coords[i];
	}
	else if(is_num){
	    values[i] = parser_get_num()
	}
	else{
	    print("ERROR: first char in expression invalid");
	}
    }
    //increment cursor
    parser_increment_cursor();
    
    while(parser_expression(func_string, plot_coords));

    print("done parsing");
    print(plot_coords);
    
    
}
