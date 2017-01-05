function numal_rsum(domain, func, subintervals, stepsize){

    console.log(domain);
    var y_values = parser_plot(domain, func);
    console.log(y_values);
    var total = 0;

    for(var i = 0; i < subintervals; i++){

	total+= y_values[i]*stepsize;

    }
    console.log(total);
}
