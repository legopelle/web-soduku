/* jshint:strict */

var body = document.getElementsByTagName("body")[0];

var tbl = document.createElement("table");
var tblBody = document.createElement("tbody");

for (i=0; i < 9; i++) {
  row = document.createElement("tr");

  for (j=0; j < 9; j++) {

    var value = Math.floor(10 * Math.random());
    //console.log(value);
    //console.log(value.toString());

    cell = document.createElement("td");
    cellText = document.createTextNode(value.toString());
    
    cell.style.backgroundColor = isGrey(i, j) ? "LavenderBlush" : "Gainsboro";

    cell.appendChild(cellText);
    row.appendChild(cell);
  }

  tblBody.appendChild(row);

}

tbl.appendChild(tblBody);
body.appendChild(tbl);

function isGrey(x, y) {
  var r = Math.floor(x / 3.0);
  var c = Math.floor(y / 3.0);

  if (Math.pow(-1, r + c)  == 1) {
    return 1;
  } else {
    return 0;
  }
}
