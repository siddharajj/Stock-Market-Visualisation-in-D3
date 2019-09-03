function searchTree(obj,search,path){
    if(obj.name === search){ //if search is found return, add the object to the path and return it
        path.push(obj);
        return path;
    }
    else if(obj.children || obj._children){ //if children are collapsed d3 object will have them instantiated as _children
        var children = (obj.children) ? obj.children : obj._children;
        for(var i=0;i<children.length;i++){
            path.push(obj);// we assume this path is the right one
            var found = searchTree(children[i],search,path);
            if(found){// we were right, this should return the bubbled-up path from the first if statement
                return found;
            }
            else{//we were wrong, remove this parent from the path and continue iterating
                path.pop();
            }
        }
    }
    else{//not the right object, return false so it will continue to iterate in the loop
        return false;
    }
}

function extract_select2_data(node,leaves,index){
        if (node.children){
            for(var i = 0;i<node.children.length;i++){
                index = extract_select2_data(node.children[i],leaves,index)[0];
            }
        }
        else {
            leaves.push({id:++index,text:node.name});
        }
        return [index,leaves];
}



var margin = {top: 20, right: 0, bottom: 20, left: 100},
    width = 1200 - margin.right - margin.left,
    height = 900 - margin.top - margin.bottom;

var i = 0,
    duration = 750,
    root,
    select2_data;


var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("div#vis1").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//recursively collapse children
function collapse(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
}

// Toggle children on click.
function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    }
    else{
        d.children = d._children;
        d._children = null;
    }
    update(d);
}

function openPaths(paths){
    for(var i =0;i<paths.length;i++){
        if(paths[i].id !== "1"){//i.e. not root
            paths[i].class = 'found';
            if(paths[i]._children){ //if children are hidden: open them, otherwise: don't do anything
                paths[i].children = paths[i]._children;
                paths[i]._children = null;
            }
            update(paths[i]);
        }
    }
}

d3.json("search_tree.json", function(error,values){
    root = values;
    select2_data = extract_select2_data(values,[],0)[1];//I know, not the prettiest...
    root.x0 = height/2 ;
    root.y0 = 0;
    root.children.forEach(collapse);
    update(root);
    $("#search").select2({
        data: select2_data,
        containerCssClass: "search"
    });
});

//attach search box listener
$("#search").on("select2-selecting", function(e) {
    var paths = searchTree(root,e.object.text,[]);
    if(typeof(paths) !== "undefined"){
        openPaths(paths);
    }
    else{
        alert(e.object.text+" not found!");
    }
})

d3.select(self.frameElement).style("height", "900px");

function update(source) {
    var nodes = tree.nodes(root).reverse(),
    links = tree.links(nodes);

    nodes.forEach(function(d) { d.y = d.depth * 220; });

    var node = svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
    .on("click", click);

    nodeEnter.append("circle")
    .attr("r", 1e-6)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "lightgreen"; })
    .style("opacity",0.7);

    nodeEnter.append("text")
        .attr("x", function(d) { return d.children || d._children ? -12 : 12; })
        .attr("dy", ".3em")
        .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1e-6)
        .style("fill","lightyellow")
        .style("font-size",15)
        .style("font-weight",600);

    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle")
        .attr("r", 7)
        .style("opacity",0.7)
        .style("fill", function(d) {
            if(d.class === "found"){
                return "red"; //red
            }
            else if(d._children){
                return "yellow";
            }
            else{
                return "white";
            }
        })
        .style("stroke", function(d) {
            if(d.class === "found"){
                return "#ff4136"; //red
            }
        else if(d._children){
                return "yellow";
            }
        else{
            return "white"
        }
    });

    nodeUpdate.select("text")
        .style("fill-opacity", 1)
        .style("fill", "lightyellow");

    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6)
        .style("opacity",0.7);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6)
        .style("fill", "lightyellow");
        

    var link = svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
        });

    link.transition()
        .duration(duration)
        .attr("d", diagonal)
        .style("stroke",function(d){
            if(d.target.class==="found"){
                return "white";
            }
        else if(d._children){
                return "#ff4136";
            }
        else{
            return "#555";
        }
        });

    link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
        })
        .remove();

    nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
}