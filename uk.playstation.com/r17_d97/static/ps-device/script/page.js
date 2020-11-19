/**
 * PS3/PS Vita landing page
 */
 $(document).ready(function() {

	// For resizing the viewport on the PS3 to full-screen
	var initWindow = function() {
		if (navigator.userAgent.indexOf("PLAYSTATION") != -1) {
			window.resizeBy(1, 1);
		}

		// Truncation for teasers on PS3/PS Vita
		$("h1, h2").dotdotdot({
			wrap: 'letter'
		});
	}

	var initSearch = function() {

		if (navigator.userAgent.indexOf("PLAYSTATION") != -1) {

			// Init search field in case already populated
			var $searchInput = $("#search-input");

				$searchInput.val("");

				// Set blur event to check if populated and remove background image
				$searchInput.on("blur", function() {
					this.className = ( this.value != "" ) ? "" : "display";
			});
		}
	}

	initWindow();

	initSearch();

	// Rendering bug on PS Vita causing images not to display initially
	if (navigator.userAgent.indexOf("PlayStation Vita") != -1) {

		setTimeout(function() {

			$("img").each(function() {

				var $this = $(this);
				$this.attr("src", this.src);
			})
		}, 1000);
	}

	if (navigator.userAgent.indexOf("PLAYSTATION") != -1) {
		window.onresize = initWindow;
	}
});