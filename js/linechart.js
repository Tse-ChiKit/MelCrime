console.log("running");

var margin = {top: 20, right: 20, bottom: 30, left: 70},
    width = 760 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

var formatDate = d3.time.format("%Y");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(d3.time.years)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(6);

var line = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.total_offences); });

var div = d3.select("#linechart").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var svg = d3.select("#linechart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/total_offences.tsv", type, function(error, data) {
    if (error) throw error;

    console.log(data);
    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([350000,500000]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Number of Crimes");

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);



    svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return x(d.year); })
        .attr("cy", function(d) { return y(d.total_offences); })
        .on("mouseover", function(d) {
            console.log(event.pageX);
            console.log(event.pageY);

            console.log("move on ");
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html(formatDate(d.year) + "<br/>"  + d.total_offences)
                .style("left", (d3.event.pageX-450) + "px")
                .style("top", (d3.event.pageY-270) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", -5)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "none")
        .text("Recorded offences in Melbourne from 2011 to 2015");





});

function type(d) {
    d.year = formatDate.parse(d.year);
    d.total_offences = +d.total_offences;
    return d;
}
