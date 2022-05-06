// Enter the following line in the terminal to activate the server
// python -m http.server
// http://127.0.0.1:8000

function init() {
  // Select the dropdown menu with id 'selDataset'
  var selector = d3.select("#selDataset");
  // Read data from samples.json and store it into argument 'data'
  d3.json("data/warehouse.json").then((data) => {
    console.log(data);
    // Assing names from the data.names

    console.log(Object.keys(data));

    var sampleNames = Object.keys(data);
    var warehouseName = sampleNames.filter(number => number > 0)
    console.log(warehouseName)

    // For each element, a dropdown menu 'option' is appended
    // The text and value is the id (sample)


    warehouseName.forEach((sample) => {
      selector
        .append("option")
        .text('Warehouse ' + sample)
        .property("value", sample);
    });


})}

init();



var tbody = d3.select("tbody");

function fillTable(warehouse) {
  d3.json("data/waves.json").then((data) => {
    console.log(data);
      
    tbody.html("");

    [data].forEach((dataRow) => {
      //console.log(Object.keys(dataRow.id).length);
      //console.log(Object.values(dataRow.Warehouse)[1]);
      
      for (var i = 0; i < Object.keys(dataRow.id).length; i++) {
        if (Object.values(dataRow.Warehouse)[i] == warehouse) {
          let row = tbody.append("tr");
          Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val[i]);
          });
        }
      }
    });
  });  
};
fillTable(10);

function addCharts(warehouse) {
  d3.json("data/warehouse.json").then((data) => {
    console.log(data);
    var labels = [];
    var values = [];
    
    [data].forEach((dataRow) => {
      labels = Object.values(dataRow.Status);
      values = Object.values(dataRow[warehouse]);
      console.log(labels);
      console.log(values);

      var data = [{
        labels: labels,
        values : values,
        type: "pie",
      }];
      var layout = {
        title: "Orders Status"
      };

      Plotly.newPlot("plot", data, layout);
    })
  })
}
addCharts(10);

d3.selectAll("#selDataset").on("change", updateData);

function updateData() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the dropdown menu item ID to a variable
  var dropdownMenuID = dropdownMenu.property("id");
  // Assign the dropdown menu option to a variable
  var selectedOption = dropdownMenu.property("value");

  fillTable(selectedOption);
  addCharts(selectedOption);

  // console.log(dropdownMenuID);
  // console.log(selectedOption);
}
