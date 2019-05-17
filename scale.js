let data = [110, 120, 23, 40, 49, 92, 12, 7];

let myScale = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range(0, 600);

document.getElementById("runBtn").addEventListener("click", runProgramme);

function runProgramme() {
  let container = d3
    .select("#container")
    .style("width", "400px")
    .style("height", "400px")
    .style("margin", "0 auto")
    .style("border", "1px solid red");

  var yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([1, 200])
    .clamp(true);

  let height = yScale(69);
  console.log("height: ", height);

  var xScale = d3
    .scaleBand()
    .domain(data)
    .range([0, 400])
    .padding(0.1)
    .round(true);

  for (let i = 0; i < data.length; i++) {
    var bar = container.append("div");
    bar
      .classed("bar", true)
      .style("width", xScale.bandwidth() + "px")
      .style("height", yScale(data[i]) + "px")
      .style("margin-left", xScale(data[i]) + "px");
  }
}
