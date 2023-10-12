const plotlib = require("nodeplotlib");
const fs = require("fs");

fs.readFile("stats.json", (err, data) => {
  if (err) throw err;

  let heapSizes = JSON.parse(data);

  console.log(`Plotting ${heapSizes.join(", ")}`);

  let data = [
    {
      y: heapSizes,
      type: "line",
    },
  ];

  plotlib.plot(data);
});
