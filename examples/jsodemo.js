this.jsodemo = (function () {
    var token = null;
  
    // var request = ['openid', 'profile'];
    var userinfoEndpoint = "";

    var authClient = new jso.JSO({
        connector_name: "o365",
        client_id: "b75fd212-b8ef-44ce-8e3c-585419557ea7",
        redirect_uri: "http://localhost:3000/popupCallback.html",
        authorization: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
        token: "https://login.microsoftonline.com/common/oauth2/v2.0/token",

        response_type: "code",        
        
        scopes: ['openid', 'profile'],

        response_type: 'id_token token',

        debug: true
    });


    return {
        oauthCallback: function (href) {
            debugger;
            authClient.callback(href);
        },
        process: function () {            
            jsodemo.updateStatus("Checking token...");            
            this.token = authClient.getToken();
            if (this.token) {
                debugger;
                this.updateStatus("Token is valid: " + this.token.access_token);
                jsodemo.validToken();
                console.log(this.token.access_token);
            } else {
                jsodemo.clearStatus();
                this.printLoginOptions();
            }
        },
        printLogoutOptions: function () {
            var html = "<button id='logout'>Logout</button>";
            jsodemo.updateMenu(html);
            $(document).off('click', "#logout");
            $(document).on("click", "#logout", function (e) { jsodemo.logout() });
        },
        printLoginOptions: function () {
            var html = "<button id='popupLogin'>Popup login</button>";
            // html += "<button id='login'>Login</button>";            
            // html += "<button id='iframeLogin'>Iframe login</button>";

            jsodemo.updateMenu(html);

            // $(document).off('click', "#login");
            // $(document).on ("click", "#login",function(e) {jsodemo.login()});
            $(document).off('click', "#popupLogin");
            $(document).on("click", "#popupLogin", function (e) { jsodemo.popupLogin() });
            // $(document).off('click', "#iframeLogin");
            // $(document).on ("click", "#iframeLogin",function(e) {jsodemo.hiddenIframeLogin()});
        },
        validToken: function () {
            jsodemo.printLogoutOptions();
            jsodemo.getUserInfo(function (data) {
                jsodemo.updateContent(JSON.stringify(data));
            });
        },
        _get: function (url, callback) {
            var self = this;
            $.ajax({
                url: url,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + self.token.access_token)
                }, success: function (data) {
                    callback(data)
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    let errMsg = '_get error:' + errorThrown;
                    alert(errMsg);
                    console.log(errMsg);
                }
            });
        },
        _post: function (url, data, callback) {
            var self = this;
            $.ajax({
                type: "POST",
                url: url,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + self.token.access_token)
                },
                data: data,
                success: function (result) {
                    callback(result)
                },
                error(XMLHttpRequest, textStatus, errorThrown) {
                    let errMsg = '_post error:' + errorThrown;
                    alert(errMsg);
                    console.log(errMsg);
                }
            });
        },
        getUserInfo: function (callback) {
            if (userinfoEndpoint) {
                let url = userinfoEndpoint;
                this._get(url, callback);
            }
        },

        logout: function () {
            authClient.wipeTokens()
            this.clearStatus();
            this.clearContent();
            jsodemo.printLoginOptions();
        },
        login: function () {
            window.loginType = "login";
            let token = authClient.getToken(opts);
            authClient.setLoader(jso.HTTPRedirect)
            authClient.getToken(opts)
                .then((token) => {
                    dashboard.dataporten.valideToken();
                    console.log("I got the token: ", token)
                })
        },
        popupLogin: function () {
            var self = this;            
            //window.loginType = "popupLogin";
            //authClient.setLoader(jso.Popup);
            authClient.authorize();
        },
        hiddenIframeLogin: function () {
            window.loginType = "iframeLogin";
            var self = this;
            var silent_opts = this.getSilentOpts();
            authClient.setLoader(jso.IFramePassive)
            authClient.getToken(silent_opts)
                .then((token) => {
                    console.log("I got the token: ", token)
                    self.token = token;
                    self.validToken();
                })
                .catch((err) => {
                    console.error("Error from passive loader", err)
                    alert("iframe passive login only works if you are already logged in:" + err);
                })
        },
        updateMenu: function (s) {
            $("#menu").html(s);
        },
        updateStatus: function (s) {
            $("#status").html(s);
        },
        clearStatus: function () {
            $("#status").html("");
        },
        updateContent: function (s) {
            $("#content").html(s);
        },
        appendContent: function (s) {
            $("#content").append(s);
        },
        clearContent: function () {
            $("#content").html("");
        }
    }
})();