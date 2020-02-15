const barGraph = (selector) => {
  // gridlines in y axis function
  function make_y_gridlines() {
    return d3.axisLeft(y)
        .ticks(5)
  }

  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
  var y = d3.scaleLinear()
          .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select(selector).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

          const data = [
            { Region: "Asia", Passengers: 5566812 },
            { Region: "Australia / Oceania", Passengers: 750051 },
            { Region: "Canada", Passengers: 1790919 },
            { Region: "Central America", Passengers: 377726 },
            { Region: "Europe", Passengers: 3959408 },
            { Region: "Mexico", Passengers: 1327740 },
            { Region: "Middle East", Passengers: 484219 }
          ];

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.Region; }));
  y.domain([0, d3.max(data, function(d) { return d.Passengers; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.Region); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d.Passengers); })
    .attr("height", function(d) { return height - y(d.Passengers); });

    // add the Y gridlines
    svg.append("g")
        .attr("class", "grid")
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
        );

  // add the x Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
    .call(d3.axisLeft(y).ticks(5, "s"));

    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width/2)
        .attr("y", margin.top + 10)
        .text("GEO Region");

    // Y axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left+20)
        .attr("x", -height/2 + 30)
        .text("Passenger Count")

    // title & citation
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", 480)
        //.attr("y", height + margin.top + 10)
        .text("2018 SFO International Travel");

}

barGraph('#chartB');
