let data = [
  {
    name: "Hans",
    amount: 0
  },
  { name: "Mira", amount: 0, color: "" },
  { name: "Daniel", amount: 0, color: "" },
  { name: "Robert", amount: 0, color: "" },
  { name: "Goran", amount: 0, color: "" },
  { name: "Kico", amount: 0, color: "" }
];

data.forEach(dat => (dat.color = getRandomColor()));

let xs = 50;
let y = 10;
let btnHasBeenClicked = false;

document.getElementById("myBtn").addEventListener("click", getData);

var x = d3
  .scaleLinear()
  .range([0, 600])
  .domain([0, 1000]);

var xAxisGenerator = d3.axisBottom().scale(x);

var svg = d3
  .select("svg")
  .append("g")
  .attr("transform", "translate(5,0)");

var xAxis = svg
  .append("g")
  .attr("transform", "translate(0,225)")
  .call(xAxisGenerator);

var bars = svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", x(0))
  .attr("y", function(d, i) {
    return (i + 5) * 20;
  })
  .attr("width", 0)
  .attr("height", 20)
  .style("fill", function(d) {
    return d.color;
  });

function updateXaxis(data) {
  let max = d3.max(data, d => d.amount);
  x.domain([0, max]);
  xAxis
    .transition()
    .duration(1000)
    .call(d3.axisBottom(x));
}

function getData() {
  // data.forEach(dat => (dat.amount = getRandomNr()));
  data = createRandomData();
  console.log("data: ", data, "\nlength:", data.length);
  updateXaxis(data);

  let rects = d3
    .select(".svg_canvas")
    .selectAll("rect")
    .remove()
    .exit()
    .data(data);

  rects
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", (d, i) => (i + 5) * 20)
    .transition()
    .duration(1000)
    .attr("width", (d, i) => x(d.amount))
    .attr("height", "20")
    .attr("fill", d => d.color);
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomNr() {
  return Math.floor(Math.random() * 1000) + 1;
}

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function createRandomData() {
  let number = Math.floor(Math.random() * 10);
  let counter = 0;

  let data = [];

  while (counter < number) {
    let obj = {
      name: makeid(6),
      amount: getRandomNr(),
      color: getRandomColor()
    };
    data.push(obj);
    counter++;
  }
  return data;
}
