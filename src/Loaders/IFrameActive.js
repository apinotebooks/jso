import BasicLoader from './BasicLoader'
import utils from '../utils'

export default class IFrameActive extends BasicLoader {

  execute() {

	  return new Promise((resolve, reject) => {

      /*
      // Create IE + others compatible event handler
      var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"
      var eventer = window[eventMethod]
      var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message"
      */

      // Using a specific expected name for now.  Would be better if the loader constructor also passed in
      //  "opts" structure, so each loader might add specific initialization properties necessary fo the
      //  particular loader
      let theIframe = document.getElementById("jsoActiveIframe");

      function doIframeLoad() {
        let oWin = theIframe.contentWindow;

          // When page is loaded try to post a message to it to get back the message
          try {
            theIframe.contentWindow.postMessage("JSO", window.location.origin);
          } catch (e) {
            // do nothing if this window is from a different domain and it fails
          }
          // In case we need to send a post message to the loaded iframe window before it
          // can send us a message
      }

      theIframe.addEventListener("load", doIframeLoad, true);


      let messageReceiver = (event) => {
        // Check origin
        if( event.origin != location.origin)
          return;
        var url = event.data.toString();
        if( -1 != url.indexOf("?code=") ) {
          resolve(url);
        }
      };

      // Setup call back function to receive postMessage from page loaded in iframe
      window.addEventListener("message", messageReceiver, false);
 
      theIframe.setAttribute("src", this.url);


			if (window.focus) {
        if( theIframe.contentWindow ) {
          theIframe.contentWindow.focus()
        }
			}

		})
	}
}
