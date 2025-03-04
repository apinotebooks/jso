let utils = {}

/*
 * Returns epoch, seconds since 1970.
 * Used for calculation of expire times.
 */
utils.epoch = function () {
	return Math.round(new Date().getTime() / 1000.0)
}

utils.debug = false

/*
 * Returns a random string used for state
 */
utils.uuid = function () {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
		return v.toString(16)
	})
}

/*
 * Takes a full url as input and expect it to have an encoded response
 * object as eigther a query string or an encoded fragment.
 * Returns the decoded object, or throws an error if no query string or fragment.
 */
utils.getResponseFromURL = function (url) {
	if (url.indexOf('#') !== -1) {
		return utils.parseQueryString(url.substring(url.indexOf('#') + 1))
	} else if (url.indexOf('?') !== -1) {
		return utils.parseQueryString(url.substring(url.indexOf('?') + 1))
	}
	return {}
}

utils.parseQueryString = function (qs) {
	var e,
		a = /\+/g,  // Regex for replacing addition symbol with a space
		r = /([^&;=]+)=?([^&;]*)/g,
		d = function (s) { return decodeURIComponent(s.replace(a, " ")) },
		q = qs,
		urlParams = {}

	/* jshint ignore:start */
	while (e = r.exec(q)) {
		urlParams[d(e[1])] = d(e[2])
	};
	/* jshint ignore:end */

	return urlParams
}





/**
 * Utility: scopeList(scopes )
 * Takes a list of scopes that might be overlapping, and removed duplicates,
 * then concatenates the list by spaces and returns a string.
 *
 * @param  {[type]} scopes [description]
 * @return {[type]}        [description]
 */
utils.scopeList = function (scopes) {
	return utils.uniqueList(scopes).join(' ')
}


utils.uniqueList = function (items) {
	var uniqueItems = {}
	var resultItems = []
	for (var i = 0; i < items.length; i++) {
		uniqueItems[items[i]] = 1
	}
	for (var key in uniqueItems) {
		if (uniqueItems.hasOwnProperty(key)) {
			resultItems.push(key)
		}
	}
	return resultItems
}



/**
 * A log wrapper, that only logs if logging is turned on in the config
 * @param  {string} msg Log message
 */
utils.log = function (msg) {
	if (!console) return
	if (!console.log) return
	if (!utils.debug) return

	let args = Array.prototype.slice.call(arguments)
	args.unshift('[JSO]')
	console.log.apply(console, args)

}

utils.encodeQS = function (params) {
	let res = ''
	var k, i = 0
	for (k in params) {
		res += (i++ === 0 ? '' : '&') + encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
	}
	return res
}

/*
 * Takes an URL as input and a params object.
 * Each property in the params is added to the url as query string parameters
 */
utils.encodeURL = function (url, params) {
	var res = url
	var k, i = 0
	var firstSeparator = (url.indexOf("?") === -1) ? '?' : '&'
	for (k in params) {
		res += (i++ === 0 ? firstSeparator : '&') + encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
	}
	return res
}


utils.sha256Hash = function (str) {
	return window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
}

// Base64 encode
utils.encode64 = function (buff) {
	return btoa(new Uint8Array(buff).reduce((s, b) => s + String.fromCharCode(b), ''));
}

/* 
 * Base64 url safe encoding of an array
 */
utils.base64UrlSafeEncode = function (buf) {
	const s = utils.encode64(buf).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
	return s
}


/* Calc code verifier if necessary
 */
utils.getCodeChallenge = function (code_verifier) {
	return utils.sha256Hash(code_verifier).then(
		(hashed) => {
			return utils.base64UrlSafeEncode(hashed)
		}
	).catch(
		(error) => { utils.log(error) }
	).finally(
		() => { return null }
	)
}

export default utils
