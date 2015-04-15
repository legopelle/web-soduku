/* jshint strict: true */

function Soduku(mat) {
  "use strict";
  this.mat = mat;

  //Legal digits
  this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

Soduku.prototype = {
  constructor: Soduku,
  rowTaken:function(row) {
    "use strict"; 
    var list = [];
    
    for (var i = 0; i < 9; i++) {
      var value = this.mat[row][i];
      
      list.push(value);
      
    }
    return list;
  },
  colTaken:function(col) {
    "use strict";
    var list = [];

    for (var i = 0; i < 9; i++) {
      var value = this.mat[i][col];

      list.push(value);

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
        list.push(value);
      }
    }

    return list;
  },
  taken: function (row, col) {
    "use strict";
    var list = [];
    
    var taken = _.union(this.boxTaken(), this.rowTaken());
    taken = _.union(this.taken(), this.colTaken());
    //Remove duplicates
    var value;
    }

};

function tableToMat(table) {
  "use strict";
  var mat = [];
  var rowArray;

  var tbody = table.childNodes[0];

  var rows = tbody.childNodes;
  var row;
  var cells;
  for(var i = 0; i < rows.length; i++) {
    rowArray = [];
    row = rows[i];

    cells = row.childNodes;
    var cell;
    var inputField;
    var value;
    for (var j = 0; j < cells.length; j++) {
      cell = cells[j];
      inputField = cell.childNodes[0];
      value = inputField.data;
      rowArray.push(value);
    }
    mat.push(rowArray);
  }
  return mat;
}








