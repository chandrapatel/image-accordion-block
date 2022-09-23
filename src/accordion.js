/**
 * Accordion Logic
 */

document.addEventListener( "DOMContentLoaded", function() {

	const accordion = document.getElementsByClassName( "accordion-title" );

	for ( let i = 0; i < accordion.length; i++ ) {

		accordion[i].addEventListener( "click", function() {

			const previousActive = document.getElementsByClassName( "accordion-title active" )[0];

			if ( previousActive && this !== previousActive ) {

				previousActive.classList.toggle( "active" );
				previousActive.nextElementSibling.style.display = "none";

			}

			this.classList.toggle( "active" );

			const panel = this.nextElementSibling;

			if ( panel.style.display === "block" ) {
				panel.style.display = "none";
			} else {
				panel.style.display = "block";
			}

		});

	}

});
