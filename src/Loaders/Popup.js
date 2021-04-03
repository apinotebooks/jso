import BasicLoader from './BasicLoader'

export default class Popup extends BasicLoader {

	execute() {

		/*
		* In the popup's scripts, running on <http://example.org>:
		*/
		return new Promise((resolve, reject) => {

			// window.addEventListener("jso_message", function(event) {
			// 	console.log("Sent a message to event.origin " + event.origin + " and got the following in response:")
			// 	console.log("<em>", event.data, "</em>")
			// 	var url = newwindow.location.href
			// 	// console.error("Popup location is ", url, newwindow.location)
			//   resolve(url)
			// })

			window.popupCompleted = function () {
				var url = newwindow.location.href;
				resolve(url)
			}

			var w = 400;
			var h = 600;
			var left = (screen.width/2)-(w/2);
			var top = (screen.height/2)-(h/2);

			var newwindow = window.open(this.url, 'jso-popup-auth', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
			if (newwindow === null) {
				throw new Error("Error loading popup window");
			}

			if (window.focus) {
				newwindow.focus();
			}

		})
	}
}
