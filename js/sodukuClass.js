/* jshint strict: true */

Soduku.prototype = {
  constructor: Soduku,
  NUMBERS: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  rowTaken: function(row, col) {
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
  colTaken: function(row, col) {
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

    var rowmin = subrow * 3;
    var rowmax = rowmin + 2;

    var colmin = subcol * 3;
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

    var takenRow = this.rowTaken(row, col);
    var takenCol = this.colTaken(col, col);
    var takenBox = this.boxTaken(row, col);

    var union = _.union(takenRow, takenCol);
    union = _.union(union, takenBox);

    return union;

  },
  available: function (row, col) {
    "use strict";

    var taken = this.taken(row, col);
    var available = _.difference(this.NUMBERS, taken);

    return available;
  }
};

function Soduku(mat) {
  "use strict";

  this.empty = [];
  this.mat = mat;

  var available;
  for(var i=0; i < 9; i++) {
    for (var j=0; j < 9; j++) {

      if (this.mat[i][j] === 0) {
        available = this.available(i, j);
        this.empty.push([i, j, available]);
      }
    }
  }

}

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
      
      if (value <= 9 && value >= 1) {
      rowArray.push(value);
      } else {
        rowArray.push(0);
      }
    }
    mat.push(rowArray);
  }
  return mat;
}








