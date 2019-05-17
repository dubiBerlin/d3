let statData = [
	{
		name: "John",
		lastname: "McEnroe",
		id: "eki3404x",
		storeid: "di340233",
		storename: "Willies",
		monthlyData: [
			{ month: "April", amount: 3459 },
			{ month: "Mai", amount: 1234 },
			{ month: "June", amount: 9263 }
		]
	},
	{
		name: "Boris",
		lastname: "Becker",
		id: "lo23xsA",
		storeid: "di340233",
		storename: "Willies",
		monthlyData: [
			{ month: "April", amount: 3459 },
			{ month: "Mai", amount: 1234 },
			{ month: "June", amount: 9263 }
		]
	},
	{
		name: "Steffi",
		lastname: "Graf",
		id: "dfl30yxwW",
		storeid: "AlK038xXd",
		storename: "HairStar",
		monthlyData: [
			{ month: "April", amount: 2000 },
			{ month: "Mai", amount: 1234 },
			{ month: "June", amount: 5629 }
		]
	},
	{
		name: "Andre",
		lastname: "Agasi",
		id: "odpp023xM",
		storeid: "AlK038xXd",
		storename: "HairStar",
		monthlyData: [
			{ month: "April", amount: 6238 },
			{ month: "Mai", amount: 2309 },
			{ month: "June", amount: 2837 }
		]
	},
	{
		name: "Ivan",
		lastname: "Lendl",
		storeid: "AlK038xXd",
		storename: "HairStar",
		id: "podjd830yxc",
		monthlyData: [
			{ month: "April", amount: 3490 },
			{ month: "Mai", amount: 9381 },
			{ month: "June", amount: 3904 }
		]
	}
]

var data = [
	{
		Group: "Mars",
		count: 10,
		months: "June"
	},
	{
		Group: "Jupiter",
		count: 50,
		months: "June"
	},
	{
		Group: "Mars",
		count: 70,
		months: "July"
	},
	{
		Group: "Jupiter",
		count: 60,
		months: "July"
	}
]

// if Umsatz nach Monate und Unterteilung nach Filiale
// muss das Objekt so aussehen.
let domainSplitInStores = [
	{
		storename: "Willies",
		monthlyData: [
			// amount = Summe aller amounts of employees
			{ month: "April", amount: "3459" },
			{ month: "Mai", amount: "1234" },
			{ month: "June", amount: "9263" }
		]
	},
	{
		storename: "HairStar",
		monthlyData: [
			// amount = Summe aller amounts of employees
			{ month: "April", amount: "3459" },
			{ month: "Mai", amount: "1234" },
			{ month: "June", amount: "9263" }
		]
	},
	{
		storename: "BothSores", // Beide Stores zusammen
		monthlyData: [
			// amount = Summe aller max amounts von beiden Stores
			{ month: "April", amount: "3459" },
			{ month: "Mai", amount: "1234" },
			{ month: "June", amount: "9263" }
		]
	}
]

function getMonthlyDataObj(employee) {
	let monthlyData = []

	employee.monthlyData.forEach(monthDat => {
		let md = Object.assign({}, monthDat)
		md.amount = 0
		monthlyData.push(md)
	})
	return monthlyData
}

/**
 *
 * @param {*} employees
 *
 * creates an array of objects.
 * a object looks like this
 * {
 *   storename:"Willies",
 *   monthlyData:[{month:"April",amount:2345},{month:"Mai",amount:3403},{month:"June",amount:1000}]
 * }
 */
function createStoreObjectsDomain(employees) {
	let storeObjects = []
	let totalStore = { storename: "totalStore", monthlyData: [] }
	if (employees.length > 0) {
		totalStore.monthlyData = getMonthlyDataObj(employees[0])
		storeObjects.push(totalStore)

		storenames.forEach(storename => {
			let storeEmpls = employees.filter(employee => employee.storename === storename)
			if (storeEmpls.length > 0) {
				let monthlyData = getMonthlyDataObj(storeEmpls[0])
				let storeObj = { storename, monthlyData }

				storeEmpls.forEach(employee => {
					let amount = 0
					for (let i = 0; i < employee.monthlyData.length; i++) {
						amount = parseInt(employee.monthlyData[i].amount)
						totalStore.monthlyData[i].amount += amount
						storeObj.monthlyData[i].amount += amount
					}
				})
				storeObjects.push(storeObj)
			}
			console.log("storeObjects: ", storeObjects)
		})
	}
	return storeObjects
}

let storenames = ["Willies", "HairStar"]
let months = ["April", "Mai", "June"]
let storesData = createStoreObjectsDomain(statData)

var margin = { top: 20, right: 20, bottom: 30, left: 40 },
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom,
	innerWidth = width - margin.left - margin.right,
	innerHeight = height - margin.top - margin.bottom

var svg = d3
	.select("svg")
	.append("g")
	.attr("transform", "translate(5,0)")

var x = d3
	.scaleBand()
	.rangeRound([0, width])
	.padding(0.1)

x.domain(
	months.map(function(month) {
		return month
	})
)

var x1 = d3
	.scaleBand()
	.rangeRound([0, x.bandwidth()])
	.padding(0.05)
	.domain(
		storesData.map(function(d) {
			console.log("DDDD: ", d.storename)
			return d.storename
		})
	)

var y = d3
	.scaleLinear()
	.domain([0, max_total_amount_stores])
	.rangeRound([height, 0])

var groups = svg
	.selectAll(null)
	.data(storesData)
	.enter()
	.append("g")
	.attr("transform", function(d) {
		d.monthlyData.map(function(data) {
			return "translate(" + x(data.month) + ",0)"
		})
	})

var max_total_amount_stores = 40000

var bars = groups
	.selectAll(null)
	.data(function(d) {
		return [d]
	})
	.enter()
	.append("rect")
	.attr("x", function(d, i) {
		console.log("d: ", d, "\ni: ", i)
		// d.map(function(d, i) {
		// 	console.log("groups \ni: ", i, "\nd: ", d)
		// 	console.log("DDDDD_ ", x1(d.month))
		return x1(d.storename)
		// })
	})
	.attr("y", function(d, i) {
		console.log("i: ", i)
	})
	.attr("width", x1.bandwidth())
	.attr("height", function(d) {
		return 100
		// d.map(function(d) {
		// 	return 1000 // height - y(parseInt(d.amount))
		// })
	})
// .attr("fill", function(d) {
// 	return color(d.Group)
// })

svg
	.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(x))

svg
	.append("g")
	.attr("class", "axis")
	.call(d3.axisLeft(y).ticks(null, "s"))
	.append("text")
	.attr("x", 2)
	.attr("y", 100)
	.attr("dy", "0.32em")
	.attr("fill", "#000")
	.attr("font-weight", "bold")
	.attr("text-anchor", "start")
	.text("Umsatz")

/*************** mein stuff end ********************************/
/**************************************************************
 * **************************************************************
 */

/************************ beispiel ************* */

// const keys = Object.keys(data[0]).slice(1)

// var svg = d3
// 	.select("svg")
// 	.append("g")
// 	.attr("transform", "translate(5,0)")

// const x0 = d3
// 	.scaleBand()
// 	.rangeRound([0, innerWidth])
// 	.paddingInner(0.1)

// const x1 = d3.scaleBand().padding(0.05)

// const y = d3.scaleLinear().rangeRound([innerHeight, 0])

// const z = d3
// 	.scaleOrdinal()
// 	.range(["#AA8139", "#AA9439", "#3C3176", "#2C4770", "#96A537", "#68266F", "#492E74"])

// x0.domain(data.map(d => d.State))
// x1.domain(keys).rangeRound([0, x0.bandwidth()])
// y.domain([0, d3.max(data, d => d3.max(keys, key => d[key]))]).nice()

// svg
// 	.append("g")
// 	.selectAll("g")
// 	.data(data)
// 	.enter()
// 	.append("g")
// 	.attr("transform", d => "translate(" + x0(d.State) + ",0)")
// 	.selectAll("rect")
// 	.data(d =>
// 		keys.map(key => {
// 			return { key: key, value: d[key] }
// 		})
// 	)
// 	.enter()
// 	.append("rect")
// 	.attr("x", d => x1(d.key))
// 	.attr("y", d => y(d.value))
// 	.attr("width", x1.bandwidth())
// 	.transition()
// 	.duration(1000)
// 	.attr("height", d => innerHeight - y(d.value))
// 	.attr("fill", d => z(d.key))

// svg
// 	.append("g")
// 	.attr("class", "axis-bottom")
// 	.attr("transform", "translate(0," + innerHeight + ")")
// 	.call(d3.axisBottom(x0))

// svg
// 	.append("g")
// 	.attr("class", "axis-left")
// 	.call(d3.axisLeft(y).ticks(null, "s"))
// 	.append("text")
// 	.attr("x", 10)
// 	.attr("y", y(y.ticks().pop()) + 10)
// 	.attr("dy", "0.32em")
// 	.attr("fill", "#000")
// 	.style("transform", "rotate(-90deg)")
// 	.attr("font-weight", "bold")
// 	.attr("text-anchor", "end")
// 	.text("Population")
