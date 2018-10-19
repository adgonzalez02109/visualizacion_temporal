var margin = {top: 30, right: 20, bottom: 50, left: 50},
width = 950,// - margin.left - margin.right,
height = 500;// - margin.top - margin.bottom;

var data=[];
var vertical_indicator,horizontal_indicator;

var parseTime = d3.timeParse("%d/%m/%Y");

var datos = d3.csv("https://www.datos.gov.co/api/views/fafq-yunu/rows.csv?accessType=DOWNLOAD");
var choice = {"1":0,"2":0,"3":0,"4":0,"5":0,"6":0};
var filtrados = {"1":[],"2":[],"3":[],"4":[],"5":[],"6":[]};
var rangos = {"1":{"min":0,"max":18},"2":{"min":19,"max":30},"3":{"min":31,"max":40},"4":{"min":41,"max":50},"5":{"min":51,"max":60},"6":{"min":61,"max":200}};

function update(rango){
    if(rango == 7){
        for(ch in choice){
            choice[ch] = 0;
            d3.select("#sel"+ch).style("background-color","white").style("color","black");
        }
        

        data = d3.nest().key(function(d) { return d.NEW_FECHA_CAPTURA; })
        .rollup(function(v) { return v.length; })
        .entries(insumo_original);
        paint_dots(data);


    }else{
        if(choice[rango]==0){
            choice[rango]=1;
            console.log("#sel"+rango);
            d3.select("#sel"+rango).style("background-color","gray").style("color","white");

        }else{
            choice[rango]=0;
            d3.select("#sel"+rango).style("background-color","white").style("color","black");

        }  
        var filtrado_temp = [] 
        for(cho in choice){
            if(choice[cho] == 1){
                filtrado_temp.push.apply(filtrado_temp,filtrados[cho])
            }

        }
        if(filtrado_temp.length == 0){
            filtrado_temp = insumo_original;
        }
        data = d3.nest()
        .key(function(d) { return d.NEW_FECHA_CAPTURA; })
        .rollup(function(v) { return v.length; })
        .entries(filtrado_temp);
        paint_dots(data);
    }
}

var insumo_original = [];
datos.then(function(datos){

    datos.forEach(function(d,i,arr){
        var v = d.FECHA_CAPTURA.split("/");

        var year = v[2] > 19 ? 1900+parseInt(v[2]):2000+parseInt(v[2]);
        datos[i]["NEW_FECHA_CAPTURA"] = v[0]+"/"+v[1]+"/"+year;

    });
    datos = datos.filter(function(d){ return parseTime(d.NEW_FECHA_CAPTURA)>new Date(2000,1,1)})
    insumo_original = datos;
    for(dato in filtrados){
        filtrados[dato]=datos.filter(function(d){ return d.EDAD >= rangos[dato].min &&  d.EDAD <= rangos[dato].max})
        console.log(filtrados[dato])
    }
    console.log(datos)
    data = d3.nest()
    .key(function(d) { return d.NEW_FECHA_CAPTURA; })
    .rollup(function(v) { return v.length; })
    .entries(datos);

    graph(data)

});

var svg,x,y,yAxis;

function graph(data){

   svg = d3.select("#first").append("svg")
   .attr("width", width)
   .attr("height", height)
   .append("g")
   .attr("transform", "translate(0,0)");
   svg.on("mousemove", mousemoved);

   x = d3.scaleTime()
   .domain(d3.extent(data, d => (parseTime(d.key))))
   .range([margin.left, width - margin.right])


   var xAxis = g => g
   .attr("transform", `translate(${0},${height-margin.bottom})`)
   .call(d3.axisBottom(x).ticks(width/30).tickSizeOuter(0));



   svg.append("g")
   .call(xAxis);

      y = d3.scaleLinear()
   .domain([d3.min(data,d=>d.value), d3.max(data,d=>d.value)])
   .range([height- margin.bottom, margin.top ]);

   yAxis = g => g
   .attr("transform", `translate(${margin.left},${0})`)
   .call(d3.axisLeft(y))
   .call(g => g.select(".domain").remove())
   .call(g => g.select(".tick:last-of-type text").clone()

    .attr("x", 3)
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .text(data.count));


svg.append("g")
   .call(yAxis);



   paint_dots(data);
   createVerticalIndicator();

}
function paint_dots(data){




    let dot = svg.selectAll("circle")
    .data(data);

    dot.enter()
    .append("circle")
    .style("fill", "blue")

    .style("fill-opacity",0.1)
    .attr("cx", d => x(parseTime(d.key)))
    .attr("cy",d => y(d.value))
    .attr("r", 3)
    .on("mouseover", function(d) { 
        d3.select("#texto").text("En "+d.key+" hubo "+d.value+" personas capturadas");
    });

    dot.transition()
    .style("fill", "blue")

    .style("fill-opacity",0.1)
    .attr("cx", d => x(parseTime(d.key)))
    .attr("cy",d => y(d.value))
    .attr("r", 3)
    .duration(750); 

    dot.exit().remove();



}
function createVerticalIndicator() {
    vertical_indicator = svg.append("line")
    .attr("x1", -100)
    .attr("y1", 0)
    .attr("x2", -100)
    .attr("y2", height)
    .attr("stroke-dasharray", "4 4")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.2)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round");
    horizontal_indicator = svg.append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", width)
    .attr("y2", 0)
    .attr("stroke-dasharray", "4 4")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.2)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round");
}
function mousemoved() {
    const coords = d3.mouse(this);
    var x = coords[0];
    if (x <= margin.left) {
        x = margin.left;
    }
    if (x >= width - margin.right) {
        x = width - margin.right;
    }
    vertical_indicator
    .attr("x1", x)
    .attr("x2", x);

    var y = coords[1];
    if (y <= margin.top) {
        y = margin.top;
    }
    if (y >= height- margin.bottom) {
        y = height - margin.bottom;
    }
    horizontal_indicator
    .attr("y1", y)
    .attr("y2", y);
}