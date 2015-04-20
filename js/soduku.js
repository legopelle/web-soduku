/* jshint strict: true */

(function() {
  "use strict";

  var body = document.getElementsByTagName("body")[0];
  var tableDiv = document.getElementById("tablediv");

  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");
  tblBody.setAttribute("id", "tablebody");

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

function sleep(miliseconds) {
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {
  }
}

function getTableInputs() {
  "use strict";

  var tableInputs = [];
  var tblBody = document.getElementById("tablebody");

  var rows = tblBody.getElementsByTagName("tr");
  var cells, row, cell, input;
  var tablerow;
  for (var i=0; i < 9; i++) {
    row = rows[i];

    cells = row.getElementsByTagName("td");
    tablerow = [];
    for(var j=0; j < 9; j++) {
      cell = cells[j];
      input = cell.getElementsByTagName("input")[0];

      tablerow.push(input);
    }
    tableInputs.push(tablerow);
  }
  return tableInputs;
}



function solve() {
  "use strict";

  // Create Soduku object from table
  var body = document.getElementsByTagName("body")[0];
  var tbl = body.getElementsByTagName("table")[0];
  var mySuduko = new Soduku(tableToMat(tbl));

  // References to input fields
  var tableInputs = getTableInputs();

  var unsolved = mySuduko.empty.length;
  var row, col, avail, cell;
  var taken, rowtag, coltag, input;
  var solved = [];
  while (unsolved > 0) {

    for (var i = unsolved - 1; i >= 0; i--) {
      // Traverse in reverse since
      // we're array alterin'

      cell = mySuduko.empty[i];
      row = cell[0];
      col = cell[1];

      avail = mySuduko.available(row, col);

      if (avail.length === 1) {
        // Remove cells with one option left
        mySuduko.mat[row][col] = avail[0];
        mySuduko.empty.splice(i, 1);

        // Print and color solution
        setValue(tableInputs[row][col], avail[0], "red");
      }
    }

    // Rest and recalculate
    solved = [];
    unsolved = mySuduko.empty.length;
  }

}

function setValue(input, value, color) {
  "use strict";
  input.value = value;
  input.style.color = color;
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

      if (matrix[i][j] !== 0) {
        inputField.value = matrix[i][j];
      }
    }
  }

}
