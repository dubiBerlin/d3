var dataSet = [
	{ height: 80, color: "green" },
	{ height: 123, color: "red" },
	{ height: 32, color: "orange" },
	{ height: 125, color: "green" },
	{ height: 100, color: "red" },
	{ height: 45, color: "orange" },
	{ height: 180, color: "green" }
]

d3.select("svg")
	.selectAll("rect")
	.data(dataSet)
	.enter()
	.filter(function(d) {
		return d.height > 90
	})
	.append("rect")
	.attr("x", function(d, i) {
		return i * 45
	})
	.attr("y", 40)
	.attr("width", 40)
	.attr("height", function(d) {
		return d.height
	})
	.style("fill", function(d) {
		return d.color
	})
