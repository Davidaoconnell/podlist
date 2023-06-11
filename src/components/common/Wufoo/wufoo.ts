/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function WufooForm() {
	(this.host = this.host || 'wufoo.com'),
		(this.userName = ''),
		(this.formHash = ''),
		(this.ssl = 'unset'),
		(this.autoResize = !0),
		(this.height = ''),
		(this.width = '100%'),
		(this.disabled = !1),
		(this.frameUrl = ''),
		(this.defaultValues = ''),
		(this.header = 'show'),
		(this.key = ''),
		(this.polling = !1),
		(this.resizeDone = ''),
		(this.initializeComplete = !1),
		(this.entSource = ''),
		(this.initialize = function (t) {
			for (var e in t) this[e] = t[e];
			(this.key = this.formHash + '' + Math.floor(1e6 * Math.random())),
				this.generateFrameUrl(),
				this.initializeComplete === !1 &&
					(this.addEvent(window, 'message', this.bindMethod(this.addSubmitListener, this)),
					this.addEvent(window, 'message', this.bindMethod(this.resizeWufooForm, this)),
					(this.initializeDone = !0));
		}),
		(this.generateFrameUrl = function () {
			var t = '',
				e = document.referrer;
			(e = e.replace(/\//g, 'wuslash')),
				(e = e.replace(/\+/g, 'wube')),
				(t += this.determineSecurity()),
				(t += this.userName + '.' + this.host + '/embed/' + this.formHash + '?'),
				(t += 'embedKey=' + this.key),
				'' !== this.entSrouce && (t = t + '&entsource=' + this.entSource),
				(t += '&referrer=' + encodeURIComponent(e)),
				'' != this.defaultValues && (t += '&' + this.defaultValues),
				0 == this.ssl && (t += '&secure=false'),
				this.disabled && (t += '&disable=true'),
				0 == this.autoResize && (t += '&scrolling=true'),
				'hide' == this.header && (t += '&header=hide'),
				(this.frameUrl = t);
		}),
		(this.generateFullPageUrl = function () {
			var t = '';
			return (
				(t += this.determineSecurity()),
				(t += this.userName + '.' + this.host + '/forms/' + this.formHash + '/'),
				0 == this.ssl && (t += 'http/true/'),
				t
			);
		}),
		(this.addResizeScript = function () {
			if (!this.polling) {
				var t = this;
				setTimeout(function () {
					var e = document.createElement('script');
					e.setAttribute(
						'src',
						document.location.protocol +
							'//' +
							t.host +
							'/forms/height.js?embedKey=' +
							t.key +
							'&variable=' +
							t.formHash +
							'&timestamp=' +
							new Date().getTime().toString()
					),
						e.setAttribute('type', 'text/javascript'),
						document.body.appendChild(e);
				}, 50);
			}
		}),
		(this.resizeForm = function (t) {
			1 == this.autoResize &&
				t.height &&
				((document.getElementById('wufooForm' + this.formHash).height = t.height),
				('1' == t.rules || this.isFunction(this.resizeDone)) &&
					(this.isFunction(this.resizeDone) && this.resizeDone(t.height),
					(__wufooCallBackFn = this.resizeDone),
					this.appendChildProxyFrame(t.protocol),
					__poll(this.formHash),
					(this.polling = !0)));
		}),
		(this.addSubmitListener = function (t) {
			(t.origin != 'http://' + this.userName + '.' + this.host &&
				t.origin != 'https://' + this.userName + '.' + this.host) ||
				'formSubmitted' != t.data ||
				(1 != document.querySelectorAll('.wufoo-form-container').length &&
					1 != document.getElementsByTagName('iframe').length) ||
				this.scrollToTop();
		}),
		(this.scrollToTop = function () {
			var t = document.getElementById('wufooForm' + this.formHash);
			t && t.scrollIntoView();
		}),
		(this.isFunction = function (t) {
			return 'function' == typeof t;
		}),
		(this.determineSecurity = function () {
			return 1 == this.ssl ? 'https://' : 'http://';
		}),
		(this.generateFrameMarkup = function () {
			var t = 'no';
			0 == this.autoResize && (t = 'auto');
			var e =
				'<iframe id="wufooForm' +
				this.formHash +
				'" class="wufoo-form-container" height="' +
				this.height +
				'" allowTransparency="true" sandbox="allow-top-navigation allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox" frameborder="0" scrolling="' +
				t +
				'" style="width:' +
				this.width +
				';border:none"src="' +
				this.frameUrl +
				'"><a href="' +
				this.generateFullPageUrl() +
				'" title="html form">Fill out my Wufoo form!</a></iframe>';
			return e;
		}),
		(this.display = function () {
			1 == this.async
				? (document.getElementById('wufoo-' + this.formHash).innerHTML = this.generateFrameMarkup())
				: document.write(this.generateFrameMarkup()),
				window.postMessage ||
					this.addEvent(
						document.getElementById('wufooForm' + this.formHash),
						'load',
						this.bindMethod(this.addResizeScript, this)
					);
		}),
		(this.resizeWufooForm = function (t) {
			if (
				(t.origin == 'http://' + this.userName + '.' + this.host ||
					t.origin == 'https://' + this.userName + '.' + this.host) &&
				this.autoResize === !0
			) {
				var e = t.data.split('|'),
					i = parseInt(e[0], 10),
					o = document.getElementById('wufooForm' + this.formHash);
				o && this.isMessageFromCorrectForm(e[1]) && (o.height = i),
					this.isFunction(this.resizeDone) && this.resizeDone(i);
			}
		}),
		(this.isMessageFromCorrectForm = function (t) {
			t = t || '';
			var e = t.substring(0, this.formHash.length);
			return e == this.formHash;
		}),
		(this.addEvent = function (t, e, i) {
			t.attachEvent
				? ((t['e' + e + i] = i),
				  (t[e + i] = function () {
						t['e' + e + i](window.event);
				  }),
				  t.attachEvent('on' + e, t[e + i]))
				: t.addEventListener(e, i, !1);
		}),
		(this.bindMethod = function (t, e) {
			return function () {
				t.methodReadyToRun && t.apply(e, arguments),
					'undefined' == typeof t.methodReadyToRun && (t.methodReadyToRun = !0);
			};
		}),
		(this.appendChildProxyFrame = function (t) {
			var e = 'wufooProxyFrame' + this.formHash;
			(__proxyFrameUrl = this.getChildProxyUrl(t)), this.appendIFrame(e, __proxyFrameUrl);
		}),
		(this.getChildProxyUrl = function (t) {
			var e = '';
			return (
				(e += t + '//'),
				(e += this.userName + '.' + this.host + '/forms/blank.htm'),
				(e += '#' + window.location.href)
			);
		}),
		(this.appendIFrame = function (t, e) {
			var i = document.getElementById(t);
			if (!i) {
				var o = document.createElement('iframe');
				o.setAttribute('id', t),
					o.setAttribute('name', t),
					o.setAttribute('height', '0px;'),
					o.setAttribute('style', 'position: absolute; left: -500px; top: 500px; width: 0px;'),
					o.setAttribute('src', e),
					document.body.appendChild(o);
			}
		}),
		(this.resizeIFrame = function (t) {
			if (window.postMessage) {
				iframe = document.getElementById('wufooForm' + t);
				var e = this.determineSecurity() + this.userName + '.' + this.host;
				iframe.contentWindow.postMessage('resize', e);
			}
		}),
		(this.attachOnResizeEvent = function () {
			'undefined' != typeof window.__wufooForms
				? window.__wufooForms.push(this)
				: ((window.__wufooForms = []),
				  window.__wufooForms.push(this),
				  (window.oldHandler = window.onresize)),
				(window.onresize = function () {
					for (i = 0; i < window.__wufooForms.length; i++)
						window.__wufooForms[i].resizeIFrame(window.__wufooForms[i].formHash);
					window.oldHandler && window.oldHandler();
				});
		});
}
function __poll(t) {
	var e = __getChildFrameHeight();
	e > 0 &&
		__currentHeight != e &&
		((__currentHeight = e),
		(document.getElementById('wufooForm' + t).height = e),
		'function' == typeof __wufooCallBackFn && __wufooCallBackFn(e)),
		setTimeout("__poll('" + t + "')", 500);
}
function __getChildFrameHeight() {
	var t = window.location.hash.split('=');
	return t[1];
}
var __currentHeight = 0,
	__wufooCallBackFn = '';
