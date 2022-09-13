// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 40, bottom: 40, left: 60},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Set the ranges
var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

var x1 = d3.scaleBand()
    .padding(0.05);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["green", "blue", "red", "purple", "turquoise", "orange"]);

// Adds the svg canvas
var svg = d3.select("#svg1")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              `translate(${margin.left},${margin.top})`);


d3.csv("birthdata4.csv", function(d, i, columns) {
  for (var i = 0, n = columns.length; i < n-1; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(error, birthdata) {
  if (error) throw error;

  var keys = birthdata.columns.slice(1);
  var keys1 = ["Under 20", "20 - 24", "25 - 29", "30 - 34", "35 - 39", "40 & Older"];
  
  x0.domain(birthdata.map(function(d) { return d.year; }));
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  y.domain([0, .3]).nice();

  svg.append("g")
    .selectAll("g")
    .data(birthdata)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x0(d.year) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) {return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return z(d.key); });

  svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0).tickSize(0))
      .append("text")
      .attr("x", width/2)
      .attr("dy", "2em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .style("font-size", 12)
      .text("Year");

  svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).tickFormat(d3.format(".0%")).ticks(6))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", 0-(height/2))
      .attr("y", 15-margin.left)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .style("font-size", 12)
      .text("Proportion of Births to First Time Mothers");

  var legend = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys1)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 11 + ")"; });

  legend.append("rect")
      .attr("x", width+25)
      .attr("y", height/4)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width +20)
      .attr("y", height/4+5)
      .attr("dy", "0.32em")
      .attr("font-weight", "bold")
      .text(function(d) { return d; });
  
  // Add a Title
  svg.append("text")
  .attr("x", (width / 2))
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")
  .attr("font-weight", "bold")
  .style("font-size", "16px")
  // .style("text-decoration", "underline")
  .text("Age of First Time Mothers");

});
