/* jshint:strict */

var body = document.getElementsByTagName("body")[0];

var tbl = document.createElement("table");
var tblBody = document.createElement("tbody");

for (i=0; i < 9; i++) {
  row = document.createElement("tr");

  for (j=0; j < 9; j++) {

    var value = Math.floor(10 * Math.random());
    console.log(value);
    console.log(value.toString());

    cell = document.createElement("td");
    cellText = document.createTextNode(value.toString());

    cell.appendChild(cellText);
    row.appendChild(cell);
  }

  tblBody.appendChild(row);

}

tbl.appendChild(tblBody);
body.appendChild(tbl);
