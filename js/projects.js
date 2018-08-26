// Copyright Connor Mattson 2018

const getModalData = (function() {
	let data = [];

	const getData = function(dataName) {return data.filter((element) => element.title == dataName)[0]};

	const xhr = new XMLHttpRequest();
	let uri = "https://connormattson.github.io/media/projectInfo.json";
	xhr.open("GET", uri, true);
	xhr.onload = function() { data = JSON.parse(xhr.responseText).data;	}
	xhr.send(null);

	return getData;
})();

$(document).ready(function() {
	var modal = document.getElementById('modal');
	var span = document.getElementsByClassName("close-modal")[0];

	window.onclick = function(event) { if (event.target == modal) closeModal();	}
});

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