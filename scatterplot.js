// Set the dimensions of the canvas / graph
var margin2 = {top: 35, right: 80, bottom: 35, left: 55},
    width2 = 600 - margin2.left - margin2.right,
    height2 = 300 - margin2.top - margin2.bottom;

// Data from `
// Parse the year
var parseYear = d3.timeParse("%Y");

// Set the ranges
var x = d3.scaleTime().range([0, width2]);
var y2 = d3.scaleLinear().range([height2, 0]);

// Define the Grid
function make_y_gridlines() {
    return d3.axisLeft(y2)
    }   

// Define the axes
var xAxis = d3.axisBottom(x).ticks(8)
    .tickFormat(d3.timeFormat("%Y"));
var yAxis = d3.axisLeft(y2).ticks(7)
    .tickPadding(10).tickSize(0);

// Define the lines
var valueline = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y2(d.under20); });
var valueline2 = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y2(d.twentyTo24); });
var valueline3 = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y2(d.twentyfiveTo29); });
var valueline4 = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y2(d.thirtyTo34); });
var valueline5 = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y2(d.thirtyfiveTo39); });
var valueline6 = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y2(d.fortyPlus); });
    
// Adds the svg canvas
var svg = d3.select("#svg2")
    .append("svg")
        .attr("width", width2 + margin2.left + margin2.right)
        .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
        .attr("transform", 
              `translate(${margin2.left},${margin2.top})`);

// Get the data
d3.csv("birthdata.csv", function(error, birthdata) {
    if (error) throw error;
    
    birthdata.forEach(function(d) {
        d.year = parseYear(d.year);
        d.under20 = +d.under20;
        d.twentyTo24 = +d.twentyTo24;
        d.twentyfiveTo29 = +d.twentyfiveTo29;
        d.thirtyTo34 = +d.thirtyTo34;
        d.thirtyfiveTo39 = +d.thirtyfiveTo39;
        d.fortyPlus = +d.fortyPlus;
    });

    // Scale the range of the data
    x.domain(d3.extent(birthdata, function(d) { return d.year; }));
    y2.domain([0, 0.32]);
    
    // Add the valueline path.
    svg.append("path")
        .data([birthdata])
        .attr("class", "path")
        .style("stroke-width",0.75)
        .attr("d", valueline);
    svg.append("path")
        .data([birthdata])
        .style("stroke", "blue")
        .style("stroke-width",0.75)
        .attr("d", valueline2);
    svg.append("path")
        .data([birthdata])
        .style("stroke", "red")
        .style("stroke-width",0.75)
        .attr("d", valueline3);
    svg.append("path")
        .data([birthdata])    
        .style("stroke", "purple")
        .style("stroke-width",0.75)
        .attr("d", valueline4);
    svg.append("path")
        .data([birthdata])
        .style("stroke", "turquoise")
        .style("stroke-width",0.75)
        .attr("d", valueline5);
    svg.append("path")
        .data([birthdata])
        .style("stroke", "orange")
        .style("stroke-width",0.75)
        .attr("d", valueline6);

    // Add the line labels
    svg.append("text")
        .attr("transform", 
            "translate("+(width2+7)+","
            +(y2(birthdata[birthdata.length -1].under20)-5)+")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "green")
        .style("font-weight", "bold")
        .text("Under 20");
    svg.append("text")
        .attr("transform", 
            "translate("+(width2+7)+","
            +(y2(birthdata[birthdata.length -1].twentyTo24))+")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "blue")
        .style("font-weight", "bold")
        .text("20 - 24");
    svg.append("text")
        .attr("transform", 
            "translate("+(width2+7)+","
            +(y2(birthdata[birthdata.length -1].twentyfiveTo29)-2)+")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "red")
        .style("font-weight", "bold")
        .text("25 - 29");
    svg.append("text")
        .attr("transform", 
            "translate("+(width2+7)+","
            +(y2(birthdata[birthdata.length -1].thirtyTo34))+")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "purple")
        .style("font-weight", "bold")
        .text("30 - 34");
    svg.append("text")
        .attr("transform", 
            "translate("+(width2+7)+","
            +(y2(birthdata[birthdata.length -1].thirtyfiveTo39)+5)+")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "turquoise")
        .style("font-weight", "bold")
        .text("35 - 39");
    svg.append("text")
        .attr("transform", 
            "translate("+(width2+7)+","
            +(y2(birthdata[birthdata.length -1].fortyPlus))+")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "orange")
        .style("font-weight", "bold")
        .text("40 and Older");

    // Add the scatterplot
    svg.selectAll("dot")
        .data(birthdata)
        .enter().append("circle")
        .attr("r", 2.5)
        .attr("cx", function(d) { return x(d.year); })
        .attr("cy", function(d) { return y2(d.under20); })
        .style("fill", "green");
    svg.selectAll("dot")
        .data(birthdata)
        .enter().append("circle")
        .attr("r", 2.5)
        .attr("fill", "blue")
        .attr("cx", function(d) { return x(d.year); })
        .attr("cy", function(d) { return y2(d.twentyTo24); });
    svg.selectAll("dot")
        .data(birthdata)
        .enter().append("circle")
        .attr("r", 2.5)
        .attr("fill", "red")
        .attr("cx", function(d) { return x(d.year); })
        .attr("cy", function(d) { return y2(d.twentyfiveTo29); });
    svg.selectAll("dot")
        .data(birthdata)
        .enter().append("circle")
        .attr("r", 2.5)
        .attr("fill", "purple")
        .attr("cx", function(d) { return x(d.year); })
        .attr("cy", function(d) { return y2(d.thirtyTo34); });
    svg.selectAll("dot")
        .data(birthdata)
        .enter().append("circle")
        .attr("r", 2.5)
        .attr("fill", "turquoise")
        .attr("cx", function(d) { return x(d.year); })
        .attr("cy", function(d) { return y2(d.thirtyfiveTo39); });
    svg.selectAll("dot")
        .data(birthdata)
        .enter().append("circle")
        .attr("r", 2.5)
        .attr("fill", "orange")
        .attr("cx", function(d) { return x(d.year); })
        .attr("cy", function(d) { return y2(d.fortyPlus); });

    
    // Add the X Axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis)
    svg.append("text") // text label for the x axis    
        .attr("x", width2 / 2 )
        .attr("y", height2 + margin2.bottom)
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", 12)
        .text("Year");

    // Add the Y Axis
    svg.append("g")
        .attr("class", "axis") 
        .call(yAxis)
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin2.left)
        .attr("x",0 - (height2 / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", 12)
        .text("Proportion of Births to First Time Mothers");

    // Add the Grid
    svg.append("g")
        .attr("class", "grid")
        .attr("stroke-width", 0.2)
        .call(make_y_gridlines()
            .tickSize(-width2, 0, 0)
            .tickFormat(""))

    // Add a Title
    svg.append("text")
        .attr("x", (width2 / 2))
        .attr("y", 0 - (margin2.top / 2)+5)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .text("Proportion of Births to First Time Mothers by Age");


});