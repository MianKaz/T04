const chartWidth = 1000;
const rowHeight = 38;
const margin = { top: 24, right: 72, bottom: 56, left: 190 };

d3.csv("data/tvBrandCount.csv", row => ({
    brand: row.brand,
    count: Number(row.count)
})).then(data => {
    data.sort((a, b) => d3.descending(a.count, b.count));

    const chartHeight = margin.top + margin.bottom + data.length * rowHeight;
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = data.length * rowHeight;
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count) * 1.1])
        .range([0, innerWidth]);
    const y = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, innerHeight])
        .padding(0.15);

    const svg = d3.select(".responsive-svg-container")
        .append("svg")
        .attr("viewBox", `0 0 ${chartWidth} ${chartHeight}`)
        .attr("role", "img")
        .attr("aria-label", "Television models by brand");

    svg.append("title")
        .text("Television models by brand");

    const chart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    chart.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d")));

    chart.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    chart.selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => y(d.brand))
        .attr("width", d => x(d.count))
        .attr("height", y.bandwidth())
        .attr("fill", "steelblue");

    chart.selectAll(".value-label")
        .data(data)
        .join("text")
        .attr("class", "value-label")
        .attr("x", d => x(d.count) + 6)
        .attr("y", d => y(d.brand) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .text(d => d.count);

    svg.append("text")
        .attr("x", margin.left + innerWidth / 2)
        .attr("y", chartHeight - 8)
        .attr("text-anchor", "middle")
        .text("Number of TV models");
}).catch(error => {
    console.error("Unable to load the television brand data.", error);
});