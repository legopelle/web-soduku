/* jshint strict: true */

(function() {
  "use strict"; 
  var body = document.getElementsByTagName("body")[0];
  var tableDiv = document.getElementById("tablediv");

  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  for (var i=0; i < 9; i++) {
    var row = document.createElement("tr");

    for (var j=0; j < 9; j++) {

      var cell = document.createElement("td");
      //cellText = document.createTextNode(value.toString());
      var cellInput = document.createElement("input");
      cellInput.setAttribute("type", "text");
      //cellInput.setAttribute("min", 1);
      //cellInput.setAttribute("max", 9);

      cell.style.backgroundColor = isGrey(i, j) ? "LavenderBlush" : "Gainsboro";

      cell.appendChild(cellInput);
      row.appendChild(cell);
    }

    tblBody.appendChild(row);

  }

  tbl.appendChild(tblBody);
  tableDiv.appendChild(tbl);


})();

function isGrey(x, y) {
  "use strict";
  var r = Math.floor(x / 3.0);
  var c = Math.floor(y / 3.0);

  if (Math.pow(-1, r + c)  == 1) {
    return 1;
  } else {
    return 0;
  }
}

function solve() {
  "use strict";

  var body = document.getElementsByTagName("body")[0];
  var tbl = body.getElementsByTagName("table")[0];
  var mySuduko = new Soduku(tableToMat(tbl));

  var taken;
  for (var i=0; i < 3; i++) {
    for (var j=0; j < 3; j++) {
      taken = mySuduko.boxTaken(i, j);
    }
  }
}

function populate() {
  "use strict";

  var matrix = [
    [7, 1, 0, 5, 0, 2, 6, 4, 0],
    [5, 0, 2, 0, 0, 1, 3, 0, 7],
    [0, 0, 0, 0, 6, 7, 0, 0, 5],
    [6, 0, 0, 0, 7, 0, 2, 0, 9],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 5, 2, 9, 0, 0, 0, 4],
    [4, 0, 0, 7, 2, 0, 0, 0, 0],
    [9,0, 1, 6, 0, 0, 4, 0, 2,],
    [0, 2, 6, 1, 0, 9, 0, 7, 3]
  ];

  var body = document.getElementsByTagName("body")[0];
  var table = body.getElementsByTagName("table")[0];
  var tbody = table.getElementsByTagName("tbody")[0];
  var rows = tbody.getElementsByTagName("tr");

  for (var i=0; i < 9; i++) {
    var row = rows[i];
    var cells = row.getElementsByTagName("td");
    for (var j=0; j < 9; j++) {
      var cell = cells[j];
      var inputField = cell.getElementsByTagName("input")[0];

      if (matrix[i][j] != 0) {
        inputField.value = matrix[i][j];
      }
    }
  }

}
