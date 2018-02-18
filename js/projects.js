// Copyright Connor Mattson 2018

$(document).ready(function() {
	var modal = document.getElementById('modal');
	var span = document.getElementsByClassName("close-modal")[0];

	window.onclick = function(event) {
		if (event.target == modal) closeModal();
	}
});

function openModal(toDisplay) {
	$('#modal').css('display', 'block')
	$('#modal').fadeTo(250, 1)
	document.getElementById('modal-content').src = 'projects/' + toDisplay + '.html'
}

function closeModal() {
	$('#modal').fadeTo(250, 0)
    $('#modal').css('display', 'none')
}