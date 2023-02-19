const table = document.getElementById("table");
const table1 = document.getElementById("maintable");
var count = 5;
var btn = document.getElementById("btn");
// <---------------------------------- New Row Add Function---------------------------------------->

btn.addEventListener("click", addrow);
let trueFalse = 0;
let tfArray = [];
function addrow() {
  var row1 = document.createElement("tr");
  row1.className = "row1";
  var col = document.createElement("td");
  col.className = "col1";
  count++;
  col.setAttribute("data-label", "No");
  col.innerHTML = count;
  row1.appendChild(col);
  const col1 = document.createElement("td");
  col1.setAttribute("data-label", "Name");
  col1.innerHTML = '<input class="name" type="text" name=""  id="" >';
  row1.appendChild(col1);
  const col2 = document.createElement("td");
  col2.setAttribute("data-label", "Subject");
  col2.innerHTML = '<input class="subject" type="text" name=""  id="" >';
  row1.appendChild(col2);
  const col3 = document.createElement("td");
  col3.setAttribute("data-label","Marks" );
  col3.innerHTML = `<input class="mark">`;
  row1.appendChild(col3);
  const col4 = document.createElement("td");
  col4.innerHTML =
    '<button class="btn btn-outline-primary"> Accept</button> <button class="btn btn-outline-danger" >Reject</button >';
  row1.appendChild(col4);
  const col5 = document.createElement("td");
  col5.innerHTML =
    '<button class="remove-row bg-transparent border-0" id="index" ><i class="fa fa-minus remove-row1" aria-hidden="true"></i></button>';
  row1.appendChild(col5);
  table.appendChild(row1);
}
// <--------------------------------- Remove Row Function------------------------------------------->

table.addEventListener("click", function (e) {
  event.preventDefault();

  if (e.target.classList.contains("remove-row")) {
    const row = e.target.parentNode.parentNode;
    var in1 = e.target.parentNode.parentNode.rowIndex;
    Swal.fire({
      title: "Are you sure delete row " + in1 + "?",
      text: "You won't be able to revert this!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        row.remove();
        count--;
        indexing();
      }
    });
  } else if (e.target.classList.contains("remove-row1")) {
    const row = e.target.parentNode.parentNode.parentNode;
    var in1 = e.target.parentNode.parentNode.parentNode.rowIndex;
    Swal.fire({
      title: "Are you sure delete row " + in1 + "?",
      text: "You won't be able to revert this!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        row.remove();
        count--;
        indexing();
      }
    });
  }
});
// <------------------------------- Indexing of Table 1------------------------------------------->
function indexing() {
  var index1 = document.getElementsByClassName("col1");
  for (let i = 0; i < index1.length; i++) {
    index1[i].innerHTML = i + 1;
  }
}
// <------------------------------- Generate Table Function--------------------------------------->

function displaytable(event) {
  trueFalse = 0;
  let flag=0;
  tfArray = [];
  event.preventDefault();
  if (validation()) {
    document.getElementById("tbody1").innerHTML = "";
    document.getElementById("th1").innerHTML = "";
    var tab2 = document.getElementById("tbody1");
    var th1 = document.getElementById("th1");
    for (k = 0; k < maintable.rows.length; k++) {
      var objCells = maintable.rows.item(k).cells;
      if (k != 0) {
        if (
          objCells.item(4).firstElementChild.classList.contains("btn-primary")
        ) {
          tfArray.push(1);
          trueFalse = 1;
          flag=1;
        } else {
          tfArray.push(0);
          trueFalse = 0;
        }
        console.log(trueFalse);
        if (
          tfArray[0] ||
          tfArray[1] ||
          tfArray[2] ||
          tfArray[3] ||
          tfArray[4]
        ) {
          document.getElementById("divtab").style.display = "block";
          document.getElementById("divtab1").style.display = "block";
          document.getElementById("myInput").style.display = "block";
          document.getElementById("lastdiv").style.display = "block";
          document.getElementById("tab2").style.display = "table";
        } else {
          
          document.getElementById("divtab").style.display = "none";
          document.getElementById("divtab1").style.display = "none";
          document.getElementById("myInput").style.display = "none";
          document.getElementById("lastdiv").style.display = "none";
          document.getElementById("tab2").style.display = "none";
        }
      }

      var row12 = document.createElement("tr");
      for (var j = 0; j < 4; j++) {
        if (k == 0) {
          var col12 = document.createElement("th");
          col12.innerHTML = objCells.item(j).innerHTML;
          row12.appendChild(col12);
          th1.appendChild(row12);
        } else if (j > 0 && j < 4 && k > 0 && trueFalse) {
          var col12 = document.createElement("td");
          col12.innerHTML = objCells.item(j).children[0].value;
          row12.appendChild(col12);
          tab2.appendChild(row12);
        } else if (trueFalse) {
          var col12 = document.createElement("td");
          col12.innerHTML = objCells.item(j).innerHTML;
          row12.appendChild(col12);
          tab2.appendChild(row12);
      
        }
      }
    }
    if(!flag){
    alert("At Least Accept One Result");}
    var var2 =
      document.getElementById("th1").firstElementChild.firstElementChild
        .nextElementSibling;
    var2.innerHTML = `Name<i class="fa fa-sort" aria-hidden="true"></i>`;
    var2.setAttribute("onclick", "sortTable(1)");
    var var3 =
      document.getElementById("th1").firstElementChild.firstElementChild
        .nextElementSibling.nextElementSibling;
    var3.innerHTML = `Subject<i class="fa fa-sort" aria-hidden="true"></i>`;
    var3.setAttribute("onclick", "sortTable(2) ");
    getresult();
    red();
  }
}
function validation() {
  let flag = true;
  document.querySelectorAll(".name,.subject").forEach((ele) => {
    var pattern = /[a-zA-Z]+$/;
    if (!pattern.test(ele.value)) {
      ele.nextElementSibling?.remove();
      let errText = document.createElement("p");
      errText.style.color = "red";
      errText.innerHTML = "Please Fill ";
      ele.parentNode.appendChild(errText);
      flag = false;
    } else {
      ele.nextElementSibling?.remove();
    }
  });
  document.querySelectorAll(".mark").forEach((ele) => {
    var pattern = /^[0-9]$|^[1-9][0-9]$|^(100)$/;
    if (!pattern.test(ele.value)) {
      ele.nextElementSibling?.remove();
      let errText = document.createElement("p");
      errText.style.color = "red";
      errText.innerHTML = "Please Fill ";
      ele.parentNode.appendChild(errText);
      flag = false;
    } else {
      ele.nextElementSibling?.remove();
    }
  });

  return flag;
}
// <----------------------------------- Searching ----------------------------------------------->

function Searching() {
  var input, filter, table, tr, name, subject, i, name1, sub1;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("tab2");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    name = tr[i].getElementsByTagName("td")[1];
    subject = tr[i].getElementsByTagName("td")[2];
    if (name || subject) {
      name1 = name.textContent || name.innerText;
      sub1 = subject.textContent || subject.innerText;
      if (
        name1.toUpperCase().indexOf(filter) > -1 ||
        sub1.toUpperCase().indexOf(filter) > -1
      ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
// <---------------------------------------sorting----------------------------------------------->

function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("tab2");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
// <------------------------------- Red Color to failed td--------------------------------------->

function red() {
  let outTbody = document.getElementById("tbody1");
  for (let index = 0; index < outTbody.rows.length; index++) {
    let rowV = outTbody.childNodes[index];
    let markV = parseInt(outTbody.childNodes[index].lastChild.innerHTML);
    if (markV < 33) {
      rowV.style.backgroundColor = "#f103039e";
    }
  }
}
// <------------------------------- Button Hold Color--------------------------------------->
table.addEventListener("click", function (th) {
  if (th.target.classList.contains("btn-outline-primary")) {
    const btn1 = th.target;
    btn1.setAttribute("class", "btn btn-primary");
    btn1.nextElementSibling.setAttribute("class", "btn btn-outline-danger");
  } else if (th.target.classList.contains("btn-outline-danger")) {
    const btn1 = th.target;
    btn1.setAttribute("class", "btn btn-danger");
    btn1.previousElementSibling.setAttribute(
      "class",
      "btn btn-outline-primary"
    );
  }
});

// <------------------------------- New Percentage Table--------------------------------------->

function getresult() {
  var percent = [];
  var tabname = [];
  var tabmark = [];
  var Name = [];
  var mark = [];
  for (k = 0; k < table.rows.length; k++) {
    if (tfArray[k]) {
      var objCells = table.rows.item(k).cells;
      for (var j = 0; j < 4; j++) {
        if (j == 1) {
          var col12 = document.createElement("td");
          col12.innerHTML = objCells.item(j).children[0].value;
          var names = col12.textContent;
          Name.push(names);
        }
        if (j == 3) {
          var col12 = document.createElement("td");
          col12.innerHTML = objCells.item(j).children[0].value;
          var Marks = col12.textContent;
          mark.push(Marks);
        }
      }
    }
  }

  // <------------------------------- Name Marks Mapping--------------------------------------->

  var result = {};
  count1();
  for (let i = 0; i < Name.length; i++) {
    if (result.hasOwnProperty(Name[i])) {
      result[Name[i]] = parseInt(result[Name[i]]) + parseInt(mark[i]);
      Name.splice(i, 0);
    } else {
      result[Name[i]] = mark[i];
    }
  }
  Object.keys(result).map(function (p) {
    tabname.push(p);
    tabmark.push(result[p]);
  });
  for (let index = 0; index < tabname.length; index++) {
    percent.push(
      (parseInt(tabmark[index]) / parseInt(occurence[index])).toFixed(2)
    );
    // console.log(result);
  }
  // console.log(percent);
  var tab3 = document.getElementById("tbody2");
  var c = 1;
  tab3.innerHTML = "";
  for (let k = 0; k < tabname.length; k++) {
    var row1 = document.createElement("tr");
    for (var j = 0; j < 2; j++) {
      if (j == 0) {
        var col12 = document.createElement("td");
        col12.innerHTML = c;
        c++;
        row1.appendChild(col12);
        tab3.appendChild(row1);
      }
      if (j == 1) {
        var col12 = document.createElement("td");
        col12.innerHTML = percent[k] + " %";
        row1.appendChild(col12);
        tab3.appendChild(row1);
      } else {
        var col12 = document.createElement("td");
        col12.innerHTML = tabname[k];
        row1.appendChild(col12);
        tab3.appendChild(row1);
      }
    }
  }
  var outTbody1 = document.getElementById("tbody2");
  for (let index = 0; index < outTbody1.rows.length; index++) {
    let rowV = outTbody1.childNodes[index];
    let markV = parseInt(outTbody1.childNodes[index].lastChild.innerHTML);
    if (markV < 33) {
      rowV.style.backgroundColor = "#f103039e";
    }
  }
  // <------------------------------- occurence count and print--------------------------------------->
  function count1() {
    const occ = {};
    for (const name of Name) {
      occ[name] = occ[name] ? occ[name] + 1 : 1;
    }
    occurence = Object.values(occ);
  }
}
