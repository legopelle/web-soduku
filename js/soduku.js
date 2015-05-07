
(function() {
  "use strict";

  var inputNumber;

  var tbl = document.getElementById("sodukuTable");
  var tblBody = document.createElement("tbody");
  tblBody.setAttribute("id", "tablebody");

  for (var i = 0; i < 9; i++) {
    var row = document.createElement("tr");

    for (var j = 0; j < 9; j++) {

      var cell = document.createElement("td");

      var cellInput = document.createElement("input");
      cellInput.setAttribute("type", "text");
      cellInput.setAttribute("id", i + "," + j);

      $(cell).addClass(isEvenBox(i, j) ? 'even' : 'odd');

      cell.appendChild(cellInput);
      row.appendChild(cell);
    }

    tblBody.appendChild(row);

  }

  tbl.appendChild(tblBody);

  $('.numpad').click(function() {
    $('.numpad').removeClass('highlight');
    inputNumber = $(this).attr('id');
    $(this).addClass('highlight');
  });

  $('input').click(function() {
    if (inputNumber !== '0') {
      $(this).val(inputNumber);
    }
    $('.numpad').removeClass('highlight');
    inputNumber = '0';
  });


  $("td").hover(
    function() {
      $(this).addClass('highlight');
    },
    function() {
      $(this).removeClass('highlight');
    }
  );
  /* 
     $("tr").hover(
     function() {
     $(this).addClass('highlight', 1);
     },
     function() {
     $(this).removeClass('highlight', 0.5);
     }
     );
     */
})();

function isEven(i, j) {
  "use strict";

  if (Math.pow(-1, i+j) == 1) {
    return 1;
  } else {
    return 0;
  }
}

function isEvenBox(x, y) {
  "use strict";
  var r = Math.floor(x / 3.0);
  var c = Math.floor(y / 3.0);

  return isEven(r, c);
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
  var tbl = document.getElementById("sodukuTable");
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

function unsolve() {
  "use strict";

  var tableInputs = getTableInputs();

  for(var i=0; i < 9; i++) {
    for (var j=0; j < 9; j++) {
      if (tableInputs[i][j].style.color === "red") {
        tableInputs[i][j].value = "";
      }
    }
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

function rgbToString(r, g, b) {
  "use strict";

  return "rgb(" + r + "," + g + "," + b + ")";
}

function stringToRgb(rgb) {
  "use strict";

  var re = /rgb\((\d+),\s+(\d+),\s+(\d+)\)/;
  var result = re.exec(rgb);

  return result.slice(1,4);
}

function makeLighter(rgb) {
  "use strict";

  var color = stringToRgb(rgb);

  //for(var i=0; i < 3; i++) {
  color[2] = parseInt(color[2], 10) - 10;
  //}

  return rgbToString(color[0], color[1], color[2]);
}
