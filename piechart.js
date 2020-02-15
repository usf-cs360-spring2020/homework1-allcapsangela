// code taken & modified from https://travishorn.com/self-contained-d3-pie-chart-function-e5b7422be676
// color scheme, sizing, label position modified

const pieChart = (selector, data) => {
  const size = 500;
  const fourth = size / 5;
  const half = size / 4;
  const labelOffset = (size / 5);
  const total = data.reduce((acc, cur) => acc + cur.value, 0);
  const container = d3.select(selector);

  const chart = container.append('svg')
    .style('width', '100%')
    .attr('viewBox', `0 0 ${size} ${size}`);

  //var titleText = text.attr("x", 10).attr("y", 10).text("SFO 2018").attr("font-size", "20px");
  //var title = container.selectAll("text").enter().append("text");

  const plotArea = chart.append('g')
    .attr('transform', `translate(${230}, ${130})`);

    // const WHATEVER = chart.append WHATEVER

  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.Region))
    .range(d3.schemeTableau10);

  const pie = d3.pie()
    .sort(null)
    .value(d => d.Passengers);

  const arcs = pie(data);

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(fourth);

  const arcLabel = d3.arc()
    .innerRadius(labelOffset)
    .outerRadius(labelOffset);

  plotArea.selectAll('path')
    .data(arcs)
    .enter()
    .append('path')
    .attr('fill', d => color(d.data.Region))
  //.attr('stroke', 'white')
    .attr('d', arc);

  const labels = plotArea.selectAll('text')
    .data(arcs)
    .enter()
    .append('text')
    .style('text-anchor', 'middle')
    .style('alignment-baseline', 'middle')
    .style('font-size', '10px')
    .attr('transform', d => `translate(${arcLabel.centroid(d)})`)

  labels.append('tspan')
    .attr('y', '0.6em')
    .attr('x', 0)
    //.style('font-weight', 'bold')
    .text(d => `${d.data.Region}`);
};

const data = [
  { Region: "Asia", Passengers: 5566812 },
  { Region: "Australia / Oceania", Passengers: 750051 },
  { Region: "Canada", Passengers: 1790919 },
  { Region: "Central America", Passengers: 377726 },
  { Region: "Europe", Passengers: 3959408 },
  { Region: "Mexico", Passengers: 1327740 },
  { Region: "Middle East", Passengers: 484219 },
  { Region: "US", Passengers: 43489998 }
];

pieChart('#chartA', data);
