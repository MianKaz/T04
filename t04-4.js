// Load the tvBrandCount.csv file from /data
d3.csv("data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count // '+' converts string to number
    };
}).then(data => {
    console.log(data); // inspect the parsed rows
});