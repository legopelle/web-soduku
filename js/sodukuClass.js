/* jshint strict: true */

function Soduku(mat) {
  "use strict";
  this.mat = mat;

  //Legal digits
  this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

Soduku.prototype = {
  constructor: Soduku,
  rowTaken: function(row) {
    "use strict";

    var list = [];
    var value;

    for (var i = 0; i < 9; i++) {
      value = this.mat[row][i];

      if (value <= 9 && value >= 1) {
        list.push(value);
      }
    }

    return list;
  },
  colTaken: function(col) {
    "use strict";

    var list = [];
    var value;

    for (var i = 0; i < 9; i++) {
      value = this.mat[i][col];

      if (value <= 9 && value >= 1) {
        list.push(value);
      }

    }
    return list;
  },
  boxTaken: function (row, col) {
    "use strict";
    var subrow = Math.floor(row / 3);
    var subcol = Math.floor(col / 3);

    var list = [];

    var rowmin = subrow;
    var rowmax = rowmin + 2;

    var colmin = subcol;
    var colmax = colmin + 2;

    var value;
    for (var i=rowmin; i <= rowmax; i++) {
      for (var j=colmin; j <= colmax; j++) {
        value = this.mat[i][j];

        if (value <= 9 && value >= 1) {
          list.push(value);
        }
      }
    }

    return list;
  },
  taken: function (row, col) {
    "use strict";

    var takenRow = this.rowTaken(row);
    var takenCol = this.colTaken(col);
    var takenBox = this.boxTaken(row, col);

    var union = _.union(takenRow, takenCol);
    union = _.union(union, takenBox);

    return union;

  }

};

function tableToMat(table) {
  "use strict";
  var mat = [];
  var rowArray;

  var msg = document.getElementById("msg");
  msg.innerHTML = "";

  var tbody = table.getElementsByTagName("tbody")[0];

  var rows = tbody.getElementsByTagName("tr");
  var row;
  var cells;
  for(var i = 0; i < rows.length; i++) {
    rowArray = [];
    row = rows[i];

    cells = row.getElementsByTagName("td");
    var cell;
    var inputField;
    var value;
    for (var j = 0; j < cells.length; j++) {
      cell = cells[j];
      inputField = cell.getElementsByTagName("input")[0];
      value = parseInt(inputField.value, 10);

      rowArray.push(value);
    }
    mat.push(rowArray);
  }
  return mat;
}








