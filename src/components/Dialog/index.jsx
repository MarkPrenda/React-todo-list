import React from "react";
import "./dialog.style.css";
export function Dialog() {
	const dialog = document.querySelector("dialog");
	const showButton = document.querySelector("dialog + button");
	const closeButton = document.querySelector("dialog button");

	// "Show the dialog" button opens the dialog modally
	showButton.addEventListener("click", () => {
		dialog.showModal();
	});

	// "Close" button closes the dialog
	closeButton.addEventListener("click", () => {
		dialog.close();
	});

	return (
		<React.Fragment>
			<dialog>
				<button autofocus>Close</button>
				<p>This modal dialog has a groovy backdrop!</p>
			</dialog>
			<button autofocus>Show the dialog</button>
		</React.Fragment>
	);
}
