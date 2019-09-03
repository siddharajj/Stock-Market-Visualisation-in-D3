const width = 960;
const height = 500;
const config = {
  speed: 0.006,
  verticalTilt: -10,
  horizontalTilt: 0
}

let locations = [];
const svg = d3.select('svg')
    .attr('width', width).attr('height', height);
const markerGroup = svg.append('g');
const projection = d3.geoOrthographic();
const initialScale = projection.scale();
const path = d3.geoPath().projection(projection);
const center = [width/2, height/2];

drawGlobe();    
drawGraticule();
enableRotation();    

function drawGlobe() {  
    d3.queue()
        .defer(d3.json, 'world-110m.json')          
        .defer(d3.json, 'locations.json')
        .await((error, worldData, locationData) => {
            svg.selectAll(".segment")
                .data(topojson.feature(worldData, worldData.objects.countries).features)
                .enter().append("path")
                .attr("class", "segment")
                .attr("d", path)
                .style("stroke", "brown")
                .style("stroke-width", "1px")
                .style("fill", (d, i) => 'green');
                locations = locationData;
                drawMarkers();                   
        });
}

function drawGraticule() {
    const graticule = d3.geoGraticule()
        .step([10, 10]);

    svg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path)
        .style("fill", "#fff")
        .style("stroke", "lightblue");
}

function enableRotation() {
    d3.timer(function (elapsed) {
        projection.rotate([config.speed * elapsed - 120, config.verticalTilt, config.horizontalTilt]);
        svg.selectAll("path").attr("d", path);
        drawMarkers();
    });
}        

function drawMarkers() {
    const markers = markerGroup.selectAll('circle')
        .data(locations);
    markers
        .enter()
        .append('circle')
        .merge(markers)
        .attr('cx', d => projection([d.longitude, d.latitude])[0])
        .attr('cy', d => projection([d.longitude, d.latitude])[1])
        .attr('fill', d => {
            const coordinate = [d.longitude, d.latitude];
            gdistance = d3.geoDistance(coordinate, projection.invert(center));
            return gdistance > 1.57 ? 'none' : 'navy';
        })
        .attr('r', 7)
        .style("opacity","0.5");

    markerGroup.each(function () {
        this.parentNode.appendChild(this);
    });
}