var salesData = [
  { Year: "2001", Qty: 3400 },
  { Year: "2002", Qty: 9821 },
  { Year: "2003", Qty: 4532 },
  { Year: "2004", Qty: 4532 },
  { Year: "2005", Qty: 1090 },
  { Year: "2006", Qty: 3400 },
  { Year: "2007", Qty: 7893 },
  { Year: "2008", Qty: 1043 },
  { Year: "2009", Qty: 3070 },
  { Year: "2010", Qty: 7020 },
  { Year: "2011", Qty: 2400 }
];

// erstellt ein Array von 20 zufälligen farben
var colors = d3.schemeCategory20c;
console.log("Colors__: ", d3.schemeCategory20c);

var svg = d3.select("#svg");

let padding = { top: 20, right: 30, bottom: 30, left: 50 };

var chartArea = {
  width: parseInt(svg.style("width")) - padding.left - padding.right,
  height: parseInt(svg.style("height")) - padding.top - padding.bottom
};

var yScale = d3
  .scaleLinear()
  .domain([0, d3.max(salesData, d => d.Qty)])
  .range([chartArea.height, 0])
  .nice();

var xScale = d3
  .scaleBand()
  .domain(salesData.map(d => d.Year))
  .range([0, chartArea.width])
  .padding(0.2);

var xAxis = svg
  .append("g")
  .classed("xAxis", true)
  .attr(
    "transform",
    "translate(" + padding.left + "," + (chartArea.height + padding.top) + ")"
  )
  .call(d3.axisBottom(xScale));

// Zeichnen der Y-Achse
var yAxisFn = d3.axisLeft(yScale);
var yAxis = svg
  .append("g")
  .classed("yAxis", true)
  .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

yAxisFn(yAxis);

// Bars bauen
var rectGrp = svg
  .append("g")
  .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

rectGrp
  .selectAll("rect")
  .data(salesData)
  .enter()
  .append("rect")
  .attr("width", xScale.bandwidth())
  .attr("height", d => chartArea.height - yScale(d.Qty))
  .attr("x", d => xScale(d.Year))
  .attr("y", d => yScale(d.Qty))
  .attr("fill", (d, i) => colors[i]);
