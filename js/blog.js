$(document).ready(function() {
	var link = document.getElementById('reflectedLink');
    var input = document.getElementById('blog-search-input');
    input.onchange = input.onkeyup= function() {
    	link.search= 'search?q='+encodeURIComponent(input.value);
    	link.firstChild.data= link.href;
    };

	$('#blog-search').on({
	    mouseenter: function () {
	        clearTimeout($(this).data('timeoutId'));
		    $('#blog-search').animate({width: '13%'}, 100);
			$('#blog-search-input').css('display', 'inline');
			$('#blog-nav').css('margin-top', '0.98vh');
			$('.blog-search-items img').css('transform', 'translate(50%, 1px)');
	    },
	    mouseleave: function () {
	        var someElement = $(this),
	        timeoutId = setTimeout(function(){
	            $('#blog-search').animate({width: '1.5%'}, 100);
				$('#blog-search-input').css('display', 'none');
				$('#blog-nav').css('margin-top', '1vh');
				$('.blog-search-items img').css('transform', 'translate(25%, 1px)');
	        }, 1000);
		    //set the timeoutId, allowing us to clear this trigger if the mouse comes back over
		    someElement.data('timeoutId', timeoutId); 
	    },
	    click: function() {
	    	$('#blog-search-input').focus()
	    }
	});
});

var currentlySorted = []
var catgeories = ['ai', 'security', 'operations-research', 'miscellaneous']

function sortBlog(sortingCategory) {
	// If this is the first category added, dulls out the rest
	if (currentlySorted.length == 0) {
		for (var i = 0; i < catgeories.length; i += 1) {
			$('#blog-category-'+catgeories[i]).css('color', 'lightgray')
		}
		$('#blog-category-clearFilter').css('visibility', 'visible')
		$('#blog-category-clearFilter').css('cursor', 'pointer')
		$('#blog-category-clearFilter').fadeTo(200, 1)
	}

	// Should the category be added or removed from filters?
	if (currentlySorted.includes(sortingCategory)) {
		currentlySorted.splice(currentlySorted.indexOf(sortingCategory),1)
		$('#blog-category-'+sortingCategory).css('color', 'lightgray')
		
	}
	else {
		currentlySorted.push(sortingCategory)
		$('#blog-category-'+sortingCategory).css('color', 'black')
	}

	// Filters the content
	if (currentlySorted.length == 0) clearFilter()
	else {
		for (var i = 0; i < catgeories.length; i += 1) {
			if (currentlySorted.includes(catgeories[i])) $('.blog-'+catgeories[i]).fadeIn(250)
			else $('.blog-'+catgeories[i]).fadeOut(250)
		}
	}
}

function clearFilter() {
	currentlySorted = []
	for (var i = 0; i < catgeories.length; i += 1) {
		$('.blog-'+catgeories[i]).fadeIn(250)
		$('#blog-category-'+catgeories[i]).css('color', 'lightgray')
		$('.blog-'+catgeories[i]).fadeIn(250)
	}
	$('#blog-category-clearFilter').fadeTo(100, 0)
	$('#blog-category-clearFilter').css('cursor', 'default')
}

function fadeInBlog(element) {
	if (!currentlySorted.includes(element)) $('#blog-category-'+element).css('color', 'black')
}

function fadeOutBlog(element) {
	if (!currentlySorted.includes(element)) $('#blog-category-'+element).css('color', 'lightgray')
}

function clearFilterHover() {
	for (var i = 0; i < currentlySorted.length; i += 1) {
		$('#blog-category-'+currentlySorted[i]).css('color', '#981B1E');
	}
}

function clearFilterHoverOff() {
	for (var i = 0; i < currentlySorted.length; i += 1) {
		$('#blog-category-'+currentlySorted[i]).css('color', 'black');
	}
}

