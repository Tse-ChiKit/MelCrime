var width_cho = 960,
    height_cho = 700;

var rateById_cho = d3.map();

var path_cho = d3.geo.path();

var color_domain = [1000, 2000, 5000, 10000, 15000,20000, 25000];
var ext_color_domain = [0, 1000, 2000, 5000, 10000, 20000, 25000];
var legend_labels = ["< 1000", "1000+", "2000+", "5000+", "10000+","20000+", "> 25000"];

var color = d3.scale.threshold()
    .domain(color_domain)
    .range(["#C6DBEF", "#9ECAE1", "#6BAED6", "#4292C6", "#2171B5","08519C", "#083067"]);


var svg_cho = d3.select("#choroplethvic").append("svg")
    .attr("width", width_cho)
    .attr("height", height_cho);

var div_cho_info = d3.select("#choroplethvic").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.3);

var quantize_cho = d3.scale.quantize()
    .domain(color_domain)
    .range(d3.range(7).map(function(i) {

        return "q" + i + "-9"; }));



//-------------------------------------------------------
queue().defer(d3.json, "suburb2.json")
    .defer(d3.tsv, "testdata3.tsv")
    .defer(d3.tsv, "testdata3.tsv",function(d) {
        rateById_cho.set(d.id, +d.rate);})
    .await(callback);


function callback(error,topology,tsvdata){



    var rateById_dt1 = {};
    var nameById_dt1 = {};

    tsvdata.forEach(function(d) {
        console.log(d);
        rateById_dt1[d.id] = +d.rate;
        nameById_dt1[d.id] = d.name;
    });

    //console.log(rateById_dt1[1]);
//    console.log(error);
//    console.log(rateById_cho.get(1));
//    console.log(rateById_cho.get(2));
    var featureCollection = topojson.feature(topology, topology.objects.suburb);
    var jsonregion = topology.objects.suburb.geometries;

//    console.log("outside0");
//    console.log(rateById.get(1));
//    console.log(quantize(rateById.get(1)));
////



    for (var i=0; i<tsvdata.length; i++) {

        var tsvsub = tsvdata[i];
        var subid = tsvsub.id;


        for(var a = 0; a<jsonregion.length; a++)
        {
            if(jsonregion[a].properties.id == subid)
            {
                jsonregion[a].properties['rate'] = tsvsub.rate;
            }
        }

    }


    var bounds = d3.geo.bounds(featureCollection);

    var centerX = d3.sum(bounds, function(d) {return d[0];}) / 2,
        centerY = d3.sum(bounds, function(d) {return d[1];}) / 2;

    var projection = d3.geo.mercator().translate([width_cho/2-50, height_cho/2])
        .scale(25000)
        .center([centerX, centerY]);

    path_cho.projection(projection);


    svg_cho.selectAll("path")
        .data(featureCollection.features)
        .enter().append("path")
        .attr("d", path_cho)
        //Adding mouseevents
        .on("mouseover", function(d) {


            d3.select(this).transition().duration(300).style("opacity", 1);
            div_cho_info.transition()
                .style("opacity", 0.9);
            div_cho_info.text(nameById_dt1[d.properties.id]);
            div_cho_info
                .style("left", (d3.event.pageX-500) + "px")
                .style("top", (d3.event.pageY -1290) + "px");
        })
        .on("mouseout", function() {
            d3.select(this)
                .transition().duration(300)
                .style("opacity", 1);
            div_cho_info.transition().duration(300)
                .style("opacity", 0);
        });

////


    var s = svg_cho.selectAll("#chorplethvic path");
    svg_cho.selectAll("path").attr("class",function(d) {
        return quantize_cho(rateById_cho.get(d.properties.id)); });



    //add legend

    var legend = svg_cho.selectAll("g.legend")
        .data(ext_color_domain)
        .enter().append("g")
        .attr("class", "legend")
        .attr('transform', 'translate(0,250)');

    var ls_w = 20, ls_h = 20;

    legend.append("rect")
        .attr("x", 20)
        .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
        .attr("width", ls_w)
        .attr("height", ls_h)
        .style("fill", function(d, i) { return color(d); })
        .style("opacity", 0.8);

    legend.append("text")
        .attr("x", 50)
        .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
        .text(function(d, i){ return legend_labels[i]; });




};
