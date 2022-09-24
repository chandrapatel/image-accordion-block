/**
 * Accordion Logic
 *
 * @see https://www.w3schools.com/howto/howto_js_accordion.asp
 */

document.addEventListener( "DOMContentLoaded", function() {

	const accordion = document.getElementsByClassName( "accordion-title" );
	const accordionImages = document.querySelectorAll( ".accordion-images img" );

	for ( let i = 0; i < accordion.length; i++ ) {

		accordion[i].addEventListener( "click", function() {

			const previousActive = document.getElementsByClassName( "accordion-title active" )[0];

			if ( previousActive && this !== previousActive ) {

				previousActive.classList.toggle( "active" );
				previousActive.nextElementSibling.style.display = "none";

				accordionImages.forEach( function ( accordionImage ) {
					accordionImage.style.display = "none";
				});

				accordionImages[0].style.display = "block";

			}

			this.classList.toggle( "active" );

			const panel = this.nextElementSibling;

			if ( panel.style.display === "block" ) {
				panel.style.display = "none";
				accordionImages[ i + 1 ].style.display = "none";
				accordionImages[0].style.display = "block";
			} else {
				panel.style.display = "block";

				accordionImages[0].style.display = "none";
				accordionImages[ i + 1 ].style.display = "block";
			}

		});

	}

});
