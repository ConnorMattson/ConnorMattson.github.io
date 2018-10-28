// Copyright Connor Mattson 2018

$(document).ready(function() {
  $('.to-fade').css('display', 'none');
  $('.to-fade').fadeTo(500, 1);

  $('.inside-link').click(function(event) {
    event.preventDefault();
    newLocation = this.href;
    $('.to-fade').fadeOut(250, newpage);
  });


  function newpage() {
    window.location = newLocation;
  }
});

function strikethrough(item) {
  $(item).css('text-decoration', 'line-through');
  $(item).css('text-decoration-color', '#981B1E');
}

const getModalData = (function() {
  let data = [];

  const getData = function(dataName) {return data.filter((element) => element.title == dataName)[0]};

  const xhr = new XMLHttpRequest();
  let uri = "https://connormattson.github.io/media/projectInfo.json";
  xhr.open("GET", uri, true);
  xhr.onload = function() { data = JSON.parse(xhr.responseText).data; }
  xhr.send(null);

  return getData;
})();

function openModal(toDisplay) {
  $('#modal').css('display', 'flex');
  $('#modal').fadeTo(250, 1);

  let data = getModalData(toDisplay);
  document.getElementById('modal-title').innerHTML = data.title;
  document.getElementById('modal-text').innerHTML = data.content;
  document.getElementById('modal-image').innerHTML = "<img src='media/projects/" + data.image + "'/>";
  if (data.hasOwnProperty("link")) {
    document.getElementById('modal-text').innerHTML += "<br/>";
    data.link.forEach((link) => document.getElementById('modal-text').innerHTML += "<a href='" + link.url + "' target='blank'><img src='media/projects/" + link.img + "'/></a>");
  }
}

function closeModal() {
  $('#modal').fadeTo(250, 0)
  setTimeout(function() { $('#modal').css('display', 'none') }, 250)
}

function filterProblems() {
  let filter = document.getElementById("filter").value;
  let tableContents = "<tr><th> Filename </th><th> Problem Source </th><th> Problem </th><th> Points </th><th> Source code </th><th> Try me! </th></tr>\n";
  let github = "https://github.com/ConnorMattson/Misc-Scripts-and-Challenge-Solutions/blob/master";
  let pointValues = ["3", "10", "30", "100"];
  let allowedPoints = [];
  pointValues.forEach((element) => { if (document.getElementById(element).checked) allowedPoints.push(element) });

  let count = 0 // Used to count the number of elements after it has been filtered
  data.filter((element) => (element.filename.includes(filter) || element.problem.includes(filter)) && (allowedPoints.indexOf(element.points) > -1)) 
      .forEach(function(element) {
        tableContents += "<tr><td>" + element.filename + "</td>";
        tableContents += "<td><a href='" + element.problemLink + "'>" + element.problemSource + "</a></td>";
        tableContents += "<td>" + element.problem + "</td>";
        tableContents += "<td>" + element.points + "</td>";
        tableContents += "<td><a href='" + github + element.githubLink + "'><img src='https://connormattson.github.io/media/projects/GitHub.svg'></a></td>";
        tableContents += "<td> Coming soon... </td></tr>";
        count += 1;
      });
  document.getElementById("problemTable").innerHTML = tableContents;
  document.getElementById("howManyProblems").innerHTML = "There are " + data.length + " problems in the database. " + count + " are being displayed.";
}

function loadData() {
  data = []
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://connormattson.github.io/Misc-Scripts-and-Challenge-Solutions/problemData.json", true);

  xhr.onload  = (function(response) {
    data = JSON.parse(xhr.responseText).reverse();
    filterProblems("")
  });

  xhr.send(null);
}