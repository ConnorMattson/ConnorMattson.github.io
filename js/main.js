$(document).ready(function() {
	$('.to-fade').css('display', 'none');
	$('.to-fade').fadeIn(250);

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