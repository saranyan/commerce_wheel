var radius = 960/2;
var m = [20, 120, 20, 120],
    w = 1200 - m[1] - m[3],
    h = 800 - m[0] - m[2],
    i = 0,
    root;


var tree = d3.layout.tree()
    .size([360, radius - 200])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2); });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x/ 180 * Math.PI]; });

	
var vis = d3.select("#chart").append("svg")
    .attr("width", radius * 2)
    .attr("height", radius * 2)
  .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");


var circle = vis.append("circle")
		.attr("r", 300)
		.attr("class", "foo")
		.attr("id", "maincircle");
circle.style("fill", "#057d9f");
//circle.style("fill", "#cde7f6");

d3.json("temp.json", function(json) {
  var nodes = tree.nodes(json);
  
  var link = vis.selectAll("path.link")
      .data(tree.links(nodes))
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = vis.selectAll("g.node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
	  .attr("id", function(d){ return d.name.replace(/\./,'') })
      .attr("transform", function(d) { 
		//return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
		 	if(d.name == "X.commerce") {
		  		return "rotate(0)translate(0,20)"
					} 
	  		else {
	  			return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; 
	  		}
		})
 
  node.append("circle")
      .attr("r", function(d){ return d.name ? size(d.name) : 10})
	  .style("fill", function(d){ return d.name ? color(d.name) : "#fff"})
	  .on("click", click);
	  
  
  node.append("svg").append("foreignObject")
	  .attr("width", 100)
	  .attr("height", 150)
	  .attr("x", function(d) { 
		if(d.name == "X.commerce"){
			return -20;
		}
		else 
		{
		   //return d.x < 180 ? spacing(d.name) : -1*spacing(d.name); 
		}
	   })
	  .attr("transform", function(d){
		if(d.name == "X.commerce"){
			return "translate(-10,-10)"
		}
		else 
		{
		   //return d.x < 180 ? spacing(d.name) : -1*spacing(d.name); 
		}	
		})
	  .append("xhtml:body")
	    .style("font", "12px 'Helvetica'")
		.style("display", function(d) {
			return (d.name == "X.commerce" ? "none" : "block");
		})
		.style("background-color","transparent")
		.style("margin-left", "20px")
		.style("color", "#fbfbfb")
		
	    .html(function(d) { 
		
		  return (typeof links(d.name)) !== "undefined" ? ((typeof logos(d.name)) !== "undefined" ? ('<img src="'+logos(d.name)+'"></img>'+'<a href="'+ links(d.name)+'" target=_blank>'+d.name+'</a>'): '<a href="'+ links(d.name)+'" target=_blank>'+d.name+'</a>'): d.name.split(' ').join('<br/>'); 
		
		
		});
	

/*
  node.append("text")
      .attr("dx", function(d) { return d.x < 180 ? -1*spacing(d.name) : spacing(d.name); })
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
	  .style("font-size", function(d){ return d.name ? font(d.name) : "11px"})
	.append("svg").append('foreignObject').append('xhtml:body')
      	.html(function(d) { return d.name.split(' ').join('<br/>'); })
*/   
d3.select('g#Xcommerce.node').append('svg:image').attr('x',-20).attr('y',-20).attr('width',40).attr('height',40).attr('xlink:href','images/x_com.png')
});

function update(source) {
  	console.log('now update it')
	console.log(source.name);
	
}

function links(name){
	var obj1 = {"Magento":"http://www.magentocommerce.com/api/rest/introduction.html","Hunch":"http://hunch.com/developers/v1/","Redlaser":"http://redlaser.com","Milo":"http://milo.com/api-docs/", "eBay" : "https://www.x.com/developers/ebay", "PayPal":"https://www.x.com/developers/paypal", "card.io":"https://www.card.io/integrate/","Where":"https://advertising.paypal.com/"};
   return obj1[name];
}

function color(name){
	var obj1 = {"X.commerce" : "#ffffff","Store":"#329ebc","Predictions":"#329ebc","Discovery":"#329ebc","Location":"#329ebc", "GeoFencing" : "#329ebc", "Payment":"#329ebc"};
   return obj1[name];
}

function logos(name){
	var obj1 = {"eBay" : "images/ebay.png", "Magento" : "images/magento.png", "Milo" : "images/milo.png", "Hunch" : "images/hunch.png", "Redlaser" : "images/redlaser.png", "Where" : "images/where.png", "card.io" : "images/card_io.png","PayPal":"images/paypal.png"};
   return obj1[name];
}
function size(name){
	var stage1 = 20;
	var stage2 = 30;
	
	var obj1 = {"X.commerce" : stage1,"Store":stage2,"Predictions":stage2,"Discovery":stage2,"Location":stage2, "GeoFencing" : stage2, "Payment":stage2};
   return obj1[name];
}

function font(name){
	var stage1 = "15px";
	var stage2 = "13px";
	
	var obj1 = {"X.commerce" : stage1,"Store":stage2,"Predictions":stage2,"Discovery":stage2,"Location":stage2, "GeoFencing" : stage2, "Payment":stage2};
   return obj1[name];
}

function spacing(name){
	var stage1 = "50";
	var stage2 = "20";
	
	var obj1 = {"X.commerce" : stage1,"Store":stage2,"Predictions":stage2,"Discovery":stage2,"Location":stage2, "GeoFencing" : stage2, "Payment":stage2};
   return obj1[name];
}

// Toggle children on click.
function click(d) {
	//console.log(d.name);
	//console.log(d.children);
  // if (d.children) {
  //     d._children = d.children;
  //     d.children = null;
  //   } else {
  //     d.children = d._children;
  //     d._children = null;
  //   }
     toggle(d);
}



// Toggle children.
function toggle(d) {
 
 update(root=d);
}