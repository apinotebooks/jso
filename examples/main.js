jQuery(function ($) {
  jsodemo.process();
});


window.addEventListener("message", (event) => {
  debugger;
  if (event.data.status == "oauth_callback_ok") {
    jsodemo.oauthCallback(event.data.href);
  } else {
    console.error("unexpected message" + event.data);
  } 
});

// event should update ui
document.addEventListener("signal-token-received", (event) => {
  jsodemo.process();
});
