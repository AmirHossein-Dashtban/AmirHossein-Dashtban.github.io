(function () {
	const t = document.createElement('link').relList;
	if (t && t.supports && t.supports('modulepreload')) return;
	for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
		s(i);
	new MutationObserver((i) => {
		for (const r of i)
			if (r.type === 'childList')
				for (const o of r.addedNodes)
					o.tagName === 'LINK' && o.rel === 'modulepreload' && s(o);
	}).observe(document, { childList: !0, subtree: !0 });
	function e(i) {
		const r = {};
		return (
			i.integrity && (r.integrity = i.integrity),
			i.referrerPolicy && (r.referrerPolicy = i.referrerPolicy),
			i.crossOrigin === 'use-credentials'
				? (r.credentials = 'include')
				: i.crossOrigin === 'anonymous'
				? (r.credentials = 'omit')
				: (r.credentials = 'same-origin'),
			r
		);
	}
	function s(i) {
		if (i.ep) return;
		i.ep = !0;
		const r = e(i);
		fetch(i.href, r);
	}
})();
var L = 'top',
	R = 'bottom',
	x = 'right',
	I = 'left',
	fe = 'auto',
	It = [L, R, x, I],
	pt = 'start',
	Ot = 'end',
	ss = 'clippingParents',
	ze = 'viewport',
	At = 'popper',
	is = 'reference',
	We = It.reduce(function (n, t) {
		return n.concat([t + '-' + pt, t + '-' + Ot]);
	}, []),
	Ge = [].concat(It, [fe]).reduce(function (n, t) {
		return n.concat([t, t + '-' + pt, t + '-' + Ot]);
	}, []),
	rs = 'beforeRead',
	os = 'read',
	as = 'afterRead',
	cs = 'beforeMain',
	ls = 'main',
	us = 'afterMain',
	ds = 'beforeWrite',
	hs = 'write',
	fs = 'afterWrite',
	ps = [rs, os, as, cs, ls, us, ds, hs, fs];
function z(n) {
	return n ? (n.nodeName || '').toLowerCase() : null;
}
function k(n) {
	if (n == null) return window;
	if (n.toString() !== '[object Window]') {
		var t = n.ownerDocument;
		return (t && t.defaultView) || window;
	}
	return n;
}
function _t(n) {
	var t = k(n).Element;
	return n instanceof t || n instanceof Element;
}
function V(n) {
	var t = k(n).HTMLElement;
	return n instanceof t || n instanceof HTMLElement;
}
function qe(n) {
	if (typeof ShadowRoot > 'u') return !1;
	var t = k(n).ShadowRoot;
	return n instanceof t || n instanceof ShadowRoot;
}
function li(n) {
	var t = n.state;
	Object.keys(t.elements).forEach(function (e) {
		var s = t.styles[e] || {},
			i = t.attributes[e] || {},
			r = t.elements[e];
		!V(r) ||
			!z(r) ||
			(Object.assign(r.style, s),
			Object.keys(i).forEach(function (o) {
				var a = i[o];
				a === !1
					? r.removeAttribute(o)
					: r.setAttribute(o, a === !0 ? '' : a);
			}));
	});
}
function ui(n) {
	var t = n.state,
		e = {
			popper: {
				position: t.options.strategy,
				left: '0',
				top: '0',
				margin: '0',
			},
			arrow: { position: 'absolute' },
			reference: {},
		};
	return (
		Object.assign(t.elements.popper.style, e.popper),
		(t.styles = e),
		t.elements.arrow && Object.assign(t.elements.arrow.style, e.arrow),
		function () {
			Object.keys(t.elements).forEach(function (s) {
				var i = t.elements[s],
					r = t.attributes[s] || {},
					o = Object.keys(
						t.styles.hasOwnProperty(s) ? t.styles[s] : e[s]
					),
					a = o.reduce(function (l, d) {
						return (l[d] = ''), l;
					}, {});
				!V(i) ||
					!z(i) ||
					(Object.assign(i.style, a),
					Object.keys(r).forEach(function (l) {
						i.removeAttribute(l);
					}));
			});
		}
	);
}
const Xe = {
	name: 'applyStyles',
	enabled: !0,
	phase: 'write',
	fn: li,
	effect: ui,
	requires: ['computeStyles'],
};
function Y(n) {
	return n.split('-')[0];
}
var ft = Math.max,
	le = Math.min,
	Ct = Math.round;
function Be() {
	var n = navigator.userAgentData;
	return n != null && n.brands && Array.isArray(n.brands)
		? n.brands
				.map(function (t) {
					return t.brand + '/' + t.version;
				})
				.join(' ')
		: navigator.userAgent;
}
function _s() {
	return !/^((?!chrome|android).)*safari/i.test(Be());
}
function Nt(n, t, e) {
	t === void 0 && (t = !1), e === void 0 && (e = !1);
	var s = n.getBoundingClientRect(),
		i = 1,
		r = 1;
	t &&
		V(n) &&
		((i = (n.offsetWidth > 0 && Ct(s.width) / n.offsetWidth) || 1),
		(r = (n.offsetHeight > 0 && Ct(s.height) / n.offsetHeight) || 1));
	var o = _t(n) ? k(n) : window,
		a = o.visualViewport,
		l = !_s() && e,
		d = (s.left + (l && a ? a.offsetLeft : 0)) / i,
		u = (s.top + (l && a ? a.offsetTop : 0)) / r,
		p = s.width / i,
		_ = s.height / r;
	return {
		width: p,
		height: _,
		top: u,
		right: d + p,
		bottom: u + _,
		left: d,
		x: d,
		y: u,
	};
}
function Qe(n) {
	var t = Nt(n),
		e = n.offsetWidth,
		s = n.offsetHeight;
	return (
		Math.abs(t.width - e) <= 1 && (e = t.width),
		Math.abs(t.height - s) <= 1 && (s = t.height),
		{ x: n.offsetLeft, y: n.offsetTop, width: e, height: s }
	);
}
function ms(n, t) {
	var e = t.getRootNode && t.getRootNode();
	if (n.contains(t)) return !0;
	if (e && qe(e)) {
		var s = t;
		do {
			if (s && n.isSameNode(s)) return !0;
			s = s.parentNode || s.host;
		} while (s);
	}
	return !1;
}
function X(n) {
	return k(n).getComputedStyle(n);
}
function di(n) {
	return ['table', 'td', 'th'].indexOf(z(n)) >= 0;
}
function st(n) {
	return ((_t(n) ? n.ownerDocument : n.document) || window.document)
		.documentElement;
}
function pe(n) {
	return z(n) === 'html'
		? n
		: n.assignedSlot || n.parentNode || (qe(n) ? n.host : null) || st(n);
}
function An(n) {
	return !V(n) || X(n).position === 'fixed' ? null : n.offsetParent;
}
function hi(n) {
	var t = /firefox/i.test(Be()),
		e = /Trident/i.test(Be());
	if (e && V(n)) {
		var s = X(n);
		if (s.position === 'fixed') return null;
	}
	var i = pe(n);
	for (qe(i) && (i = i.host); V(i) && ['html', 'body'].indexOf(z(i)) < 0; ) {
		var r = X(i);
		if (
			r.transform !== 'none' ||
			r.perspective !== 'none' ||
			r.contain === 'paint' ||
			['transform', 'perspective'].indexOf(r.willChange) !== -1 ||
			(t && r.willChange === 'filter') ||
			(t && r.filter && r.filter !== 'none')
		)
			return i;
		i = i.parentNode;
	}
	return null;
}
function Ft(n) {
	for (var t = k(n), e = An(n); e && di(e) && X(e).position === 'static'; )
		e = An(e);
	return e &&
		(z(e) === 'html' || (z(e) === 'body' && X(e).position === 'static'))
		? t
		: e || hi(n) || t;
}
function Ze(n) {
	return ['top', 'bottom'].indexOf(n) >= 0 ? 'x' : 'y';
}
function Wt(n, t, e) {
	return ft(n, le(t, e));
}
function fi(n, t, e) {
	var s = Wt(n, t, e);
	return s > e ? e : s;
}
function gs() {
	return { top: 0, right: 0, bottom: 0, left: 0 };
}
function Es(n) {
	return Object.assign({}, gs(), n);
}
function vs(n, t) {
	return t.reduce(function (e, s) {
		return (e[s] = n), e;
	}, {});
}
var pi = function (t, e) {
	return (
		(t =
			typeof t == 'function'
				? t(Object.assign({}, e.rects, { placement: e.placement }))
				: t),
		Es(typeof t != 'number' ? t : vs(t, It))
	);
};
function _i(n) {
	var t,
		e = n.state,
		s = n.name,
		i = n.options,
		r = e.elements.arrow,
		o = e.modifiersData.popperOffsets,
		a = Y(e.placement),
		l = Ze(a),
		d = [I, x].indexOf(a) >= 0,
		u = d ? 'height' : 'width';
	if (!(!r || !o)) {
		var p = pi(i.padding, e),
			_ = Qe(r),
			f = l === 'y' ? L : I,
			A = l === 'y' ? R : x,
			m =
				e.rects.reference[u] +
				e.rects.reference[l] -
				o[l] -
				e.rects.popper[u],
			E = o[l] - e.rects.reference[l],
			T = Ft(r),
			w = T ? (l === 'y' ? T.clientHeight || 0 : T.clientWidth || 0) : 0,
			O = m / 2 - E / 2,
			g = p[f],
			v = w - _[u] - p[A],
			b = w / 2 - _[u] / 2 + O,
			y = Wt(g, b, v),
			S = l;
		e.modifiersData[s] =
			((t = {}), (t[S] = y), (t.centerOffset = y - b), t);
	}
}
function mi(n) {
	var t = n.state,
		e = n.options,
		s = e.element,
		i = s === void 0 ? '[data-popper-arrow]' : s;
	i != null &&
		((typeof i == 'string' &&
			((i = t.elements.popper.querySelector(i)), !i)) ||
			(ms(t.elements.popper, i) && (t.elements.arrow = i)));
}
const bs = {
	name: 'arrow',
	enabled: !0,
	phase: 'main',
	fn: _i,
	effect: mi,
	requires: ['popperOffsets'],
	requiresIfExists: ['preventOverflow'],
};
function St(n) {
	return n.split('-')[1];
}
var gi = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };
function Ei(n, t) {
	var e = n.x,
		s = n.y,
		i = t.devicePixelRatio || 1;
	return { x: Ct(e * i) / i || 0, y: Ct(s * i) / i || 0 };
}
function Tn(n) {
	var t,
		e = n.popper,
		s = n.popperRect,
		i = n.placement,
		r = n.variation,
		o = n.offsets,
		a = n.position,
		l = n.gpuAcceleration,
		d = n.adaptive,
		u = n.roundOffsets,
		p = n.isFixed,
		_ = o.x,
		f = _ === void 0 ? 0 : _,
		A = o.y,
		m = A === void 0 ? 0 : A,
		E = typeof u == 'function' ? u({ x: f, y: m }) : { x: f, y: m };
	(f = E.x), (m = E.y);
	var T = o.hasOwnProperty('x'),
		w = o.hasOwnProperty('y'),
		O = I,
		g = L,
		v = window;
	if (d) {
		var b = Ft(e),
			y = 'clientHeight',
			S = 'clientWidth';
		if (
			(b === k(e) &&
				((b = st(e)),
				X(b).position !== 'static' &&
					a === 'absolute' &&
					((y = 'scrollHeight'), (S = 'scrollWidth'))),
			(b = b),
			i === L || ((i === I || i === x) && r === Ot))
		) {
			g = R;
			var N =
				p && b === v && v.visualViewport
					? v.visualViewport.height
					: b[y];
			(m -= N - s.height), (m *= l ? 1 : -1);
		}
		if (i === I || ((i === L || i === R) && r === Ot)) {
			O = x;
			var C =
				p && b === v && v.visualViewport
					? v.visualViewport.width
					: b[S];
			(f -= C - s.width), (f *= l ? 1 : -1);
		}
	}
	var D = Object.assign({ position: a }, d && gi),
		j = u === !0 ? Ei({ x: f, y: m }, k(e)) : { x: f, y: m };
	if (((f = j.x), (m = j.y), l)) {
		var $;
		return Object.assign(
			{},
			D,
			(($ = {}),
			($[g] = w ? '0' : ''),
			($[O] = T ? '0' : ''),
			($.transform =
				(v.devicePixelRatio || 1) <= 1
					? 'translate(' + f + 'px, ' + m + 'px)'
					: 'translate3d(' + f + 'px, ' + m + 'px, 0)'),
			$)
		);
	}
	return Object.assign(
		{},
		D,
		((t = {}),
		(t[g] = w ? m + 'px' : ''),
		(t[O] = T ? f + 'px' : ''),
		(t.transform = ''),
		t)
	);
}
function vi(n) {
	var t = n.state,
		e = n.options,
		s = e.gpuAcceleration,
		i = s === void 0 ? !0 : s,
		r = e.adaptive,
		o = r === void 0 ? !0 : r,
		a = e.roundOffsets,
		l = a === void 0 ? !0 : a,
		d = {
			placement: Y(t.placement),
			variation: St(t.placement),
			popper: t.elements.popper,
			popperRect: t.rects.popper,
			gpuAcceleration: i,
			isFixed: t.options.strategy === 'fixed',
		};
	t.modifiersData.popperOffsets != null &&
		(t.styles.popper = Object.assign(
			{},
			t.styles.popper,
			Tn(
				Object.assign({}, d, {
					offsets: t.modifiersData.popperOffsets,
					position: t.options.strategy,
					adaptive: o,
					roundOffsets: l,
				})
			)
		)),
		t.modifiersData.arrow != null &&
			(t.styles.arrow = Object.assign(
				{},
				t.styles.arrow,
				Tn(
					Object.assign({}, d, {
						offsets: t.modifiersData.arrow,
						position: 'absolute',
						adaptive: !1,
						roundOffsets: l,
					})
				)
			)),
		(t.attributes.popper = Object.assign({}, t.attributes.popper, {
			'data-popper-placement': t.placement,
		}));
}
const Je = {
	name: 'computeStyles',
	enabled: !0,
	phase: 'beforeWrite',
	fn: vi,
	data: {},
};
var Jt = { passive: !0 };
function bi(n) {
	var t = n.state,
		e = n.instance,
		s = n.options,
		i = s.scroll,
		r = i === void 0 ? !0 : i,
		o = s.resize,
		a = o === void 0 ? !0 : o,
		l = k(t.elements.popper),
		d = [].concat(t.scrollParents.reference, t.scrollParents.popper);
	return (
		r &&
			d.forEach(function (u) {
				u.addEventListener('scroll', e.update, Jt);
			}),
		a && l.addEventListener('resize', e.update, Jt),
		function () {
			r &&
				d.forEach(function (u) {
					u.removeEventListener('scroll', e.update, Jt);
				}),
				a && l.removeEventListener('resize', e.update, Jt);
		}
	);
}
const tn = {
	name: 'eventListeners',
	enabled: !0,
	phase: 'write',
	fn: function () {},
	effect: bi,
	data: {},
};
var Ai = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
function oe(n) {
	return n.replace(/left|right|bottom|top/g, function (t) {
		return Ai[t];
	});
}
var Ti = { start: 'end', end: 'start' };
function yn(n) {
	return n.replace(/start|end/g, function (t) {
		return Ti[t];
	});
}
function en(n) {
	var t = k(n),
		e = t.pageXOffset,
		s = t.pageYOffset;
	return { scrollLeft: e, scrollTop: s };
}
function nn(n) {
	return Nt(st(n)).left + en(n).scrollLeft;
}
function yi(n, t) {
	var e = k(n),
		s = st(n),
		i = e.visualViewport,
		r = s.clientWidth,
		o = s.clientHeight,
		a = 0,
		l = 0;
	if (i) {
		(r = i.width), (o = i.height);
		var d = _s();
		(d || (!d && t === 'fixed')) && ((a = i.offsetLeft), (l = i.offsetTop));
	}
	return { width: r, height: o, x: a + nn(n), y: l };
}
function wi(n) {
	var t,
		e = st(n),
		s = en(n),
		i = (t = n.ownerDocument) == null ? void 0 : t.body,
		r = ft(
			e.scrollWidth,
			e.clientWidth,
			i ? i.scrollWidth : 0,
			i ? i.clientWidth : 0
		),
		o = ft(
			e.scrollHeight,
			e.clientHeight,
			i ? i.scrollHeight : 0,
			i ? i.clientHeight : 0
		),
		a = -s.scrollLeft + nn(n),
		l = -s.scrollTop;
	return (
		X(i || e).direction === 'rtl' &&
			(a += ft(e.clientWidth, i ? i.clientWidth : 0) - r),
		{ width: r, height: o, x: a, y: l }
	);
}
function sn(n) {
	var t = X(n),
		e = t.overflow,
		s = t.overflowX,
		i = t.overflowY;
	return /auto|scroll|overlay|hidden/.test(e + i + s);
}
function As(n) {
	return ['html', 'body', '#document'].indexOf(z(n)) >= 0
		? n.ownerDocument.body
		: V(n) && sn(n)
		? n
		: As(pe(n));
}
function Bt(n, t) {
	var e;
	t === void 0 && (t = []);
	var s = As(n),
		i = s === ((e = n.ownerDocument) == null ? void 0 : e.body),
		r = k(s),
		o = i ? [r].concat(r.visualViewport || [], sn(s) ? s : []) : s,
		a = t.concat(o);
	return i ? a : a.concat(Bt(pe(o)));
}
function je(n) {
	return Object.assign({}, n, {
		left: n.x,
		top: n.y,
		right: n.x + n.width,
		bottom: n.y + n.height,
	});
}
function Oi(n, t) {
	var e = Nt(n, !1, t === 'fixed');
	return (
		(e.top = e.top + n.clientTop),
		(e.left = e.left + n.clientLeft),
		(e.bottom = e.top + n.clientHeight),
		(e.right = e.left + n.clientWidth),
		(e.width = n.clientWidth),
		(e.height = n.clientHeight),
		(e.x = e.left),
		(e.y = e.top),
		e
	);
}
function wn(n, t, e) {
	return t === ze ? je(yi(n, e)) : _t(t) ? Oi(t, e) : je(wi(st(n)));
}
function Ci(n) {
	var t = Bt(pe(n)),
		e = ['absolute', 'fixed'].indexOf(X(n).position) >= 0,
		s = e && V(n) ? Ft(n) : n;
	return _t(s)
		? t.filter(function (i) {
				return _t(i) && ms(i, s) && z(i) !== 'body';
		  })
		: [];
}
function Ni(n, t, e, s) {
	var i = t === 'clippingParents' ? Ci(n) : [].concat(t),
		r = [].concat(i, [e]),
		o = r[0],
		a = r.reduce(function (l, d) {
			var u = wn(n, d, s);
			return (
				(l.top = ft(u.top, l.top)),
				(l.right = le(u.right, l.right)),
				(l.bottom = le(u.bottom, l.bottom)),
				(l.left = ft(u.left, l.left)),
				l
			);
		}, wn(n, o, s));
	return (
		(a.width = a.right - a.left),
		(a.height = a.bottom - a.top),
		(a.x = a.left),
		(a.y = a.top),
		a
	);
}
function Ts(n) {
	var t = n.reference,
		e = n.element,
		s = n.placement,
		i = s ? Y(s) : null,
		r = s ? St(s) : null,
		o = t.x + t.width / 2 - e.width / 2,
		a = t.y + t.height / 2 - e.height / 2,
		l;
	switch (i) {
		case L:
			l = { x: o, y: t.y - e.height };
			break;
		case R:
			l = { x: o, y: t.y + t.height };
			break;
		case x:
			l = { x: t.x + t.width, y: a };
			break;
		case I:
			l = { x: t.x - e.width, y: a };
			break;
		default:
			l = { x: t.x, y: t.y };
	}
	var d = i ? Ze(i) : null;
	if (d != null) {
		var u = d === 'y' ? 'height' : 'width';
		switch (r) {
			case pt:
				l[d] = l[d] - (t[u] / 2 - e[u] / 2);
				break;
			case Ot:
				l[d] = l[d] + (t[u] / 2 - e[u] / 2);
				break;
		}
	}
	return l;
}
function Dt(n, t) {
	t === void 0 && (t = {});
	var e = t,
		s = e.placement,
		i = s === void 0 ? n.placement : s,
		r = e.strategy,
		o = r === void 0 ? n.strategy : r,
		a = e.boundary,
		l = a === void 0 ? ss : a,
		d = e.rootBoundary,
		u = d === void 0 ? ze : d,
		p = e.elementContext,
		_ = p === void 0 ? At : p,
		f = e.altBoundary,
		A = f === void 0 ? !1 : f,
		m = e.padding,
		E = m === void 0 ? 0 : m,
		T = Es(typeof E != 'number' ? E : vs(E, It)),
		w = _ === At ? is : At,
		O = n.rects.popper,
		g = n.elements[A ? w : _],
		v = Ni(_t(g) ? g : g.contextElement || st(n.elements.popper), l, u, o),
		b = Nt(n.elements.reference),
		y = Ts({
			reference: b,
			element: O,
			strategy: 'absolute',
			placement: i,
		}),
		S = je(Object.assign({}, O, y)),
		N = _ === At ? S : b,
		C = {
			top: v.top - N.top + T.top,
			bottom: N.bottom - v.bottom + T.bottom,
			left: v.left - N.left + T.left,
			right: N.right - v.right + T.right,
		},
		D = n.modifiersData.offset;
	if (_ === At && D) {
		var j = D[i];
		Object.keys(C).forEach(function ($) {
			var ot = [x, R].indexOf($) >= 0 ? 1 : -1,
				at = [L, R].indexOf($) >= 0 ? 'y' : 'x';
			C[$] += j[at] * ot;
		});
	}
	return C;
}
function Si(n, t) {
	t === void 0 && (t = {});
	var e = t,
		s = e.placement,
		i = e.boundary,
		r = e.rootBoundary,
		o = e.padding,
		a = e.flipVariations,
		l = e.allowedAutoPlacements,
		d = l === void 0 ? Ge : l,
		u = St(s),
		p = u
			? a
				? We
				: We.filter(function (A) {
						return St(A) === u;
				  })
			: It,
		_ = p.filter(function (A) {
			return d.indexOf(A) >= 0;
		});
	_.length === 0 && (_ = p);
	var f = _.reduce(function (A, m) {
		return (
			(A[m] = Dt(n, {
				placement: m,
				boundary: i,
				rootBoundary: r,
				padding: o,
			})[Y(m)]),
			A
		);
	}, {});
	return Object.keys(f).sort(function (A, m) {
		return f[A] - f[m];
	});
}
function Di(n) {
	if (Y(n) === fe) return [];
	var t = oe(n);
	return [yn(n), t, yn(t)];
}
function $i(n) {
	var t = n.state,
		e = n.options,
		s = n.name;
	if (!t.modifiersData[s]._skip) {
		for (
			var i = e.mainAxis,
				r = i === void 0 ? !0 : i,
				o = e.altAxis,
				a = o === void 0 ? !0 : o,
				l = e.fallbackPlacements,
				d = e.padding,
				u = e.boundary,
				p = e.rootBoundary,
				_ = e.altBoundary,
				f = e.flipVariations,
				A = f === void 0 ? !0 : f,
				m = e.allowedAutoPlacements,
				E = t.options.placement,
				T = Y(E),
				w = T === E,
				O = l || (w || !A ? [oe(E)] : Di(E)),
				g = [E].concat(O).reduce(function (Et, Z) {
					return Et.concat(
						Y(Z) === fe
							? Si(t, {
									placement: Z,
									boundary: u,
									rootBoundary: p,
									padding: d,
									flipVariations: A,
									allowedAutoPlacements: m,
							  })
							: Z
					);
				}, []),
				v = t.rects.reference,
				b = t.rects.popper,
				y = new Map(),
				S = !0,
				N = g[0],
				C = 0;
			C < g.length;
			C++
		) {
			var D = g[C],
				j = Y(D),
				$ = St(D) === pt,
				ot = [L, R].indexOf(j) >= 0,
				at = ot ? 'width' : 'height',
				M = Dt(t, {
					placement: D,
					boundary: u,
					rootBoundary: p,
					altBoundary: _,
					padding: d,
				}),
				F = ot ? ($ ? x : I) : $ ? R : L;
			v[at] > b[at] && (F = oe(F));
			var Gt = oe(F),
				ct = [];
			if (
				(r && ct.push(M[j] <= 0),
				a && ct.push(M[F] <= 0, M[Gt] <= 0),
				ct.every(function (Et) {
					return Et;
				}))
			) {
				(N = D), (S = !1);
				break;
			}
			y.set(D, ct);
		}
		if (S)
			for (
				var qt = A ? 3 : 1,
					Ae = function (Z) {
						var kt = g.find(function (Qt) {
							var lt = y.get(Qt);
							if (lt)
								return lt.slice(0, Z).every(function (Te) {
									return Te;
								});
						});
						if (kt) return (N = kt), 'break';
					},
					xt = qt;
				xt > 0;
				xt--
			) {
				var Xt = Ae(xt);
				if (Xt === 'break') break;
			}
		t.placement !== N &&
			((t.modifiersData[s]._skip = !0),
			(t.placement = N),
			(t.reset = !0));
	}
}
const ys = {
	name: 'flip',
	enabled: !0,
	phase: 'main',
	fn: $i,
	requiresIfExists: ['offset'],
	data: { _skip: !1 },
};
function On(n, t, e) {
	return (
		e === void 0 && (e = { x: 0, y: 0 }),
		{
			top: n.top - t.height - e.y,
			right: n.right - t.width + e.x,
			bottom: n.bottom - t.height + e.y,
			left: n.left - t.width - e.x,
		}
	);
}
function Cn(n) {
	return [L, x, R, I].some(function (t) {
		return n[t] >= 0;
	});
}
function Li(n) {
	var t = n.state,
		e = n.name,
		s = t.rects.reference,
		i = t.rects.popper,
		r = t.modifiersData.preventOverflow,
		o = Dt(t, { elementContext: 'reference' }),
		a = Dt(t, { altBoundary: !0 }),
		l = On(o, s),
		d = On(a, i, r),
		u = Cn(l),
		p = Cn(d);
	(t.modifiersData[e] = {
		referenceClippingOffsets: l,
		popperEscapeOffsets: d,
		isReferenceHidden: u,
		hasPopperEscaped: p,
	}),
		(t.attributes.popper = Object.assign({}, t.attributes.popper, {
			'data-popper-reference-hidden': u,
			'data-popper-escaped': p,
		}));
}
const ws = {
	name: 'hide',
	enabled: !0,
	phase: 'main',
	requiresIfExists: ['preventOverflow'],
	fn: Li,
};
function Ii(n, t, e) {
	var s = Y(n),
		i = [I, L].indexOf(s) >= 0 ? -1 : 1,
		r =
			typeof e == 'function'
				? e(Object.assign({}, t, { placement: n }))
				: e,
		o = r[0],
		a = r[1];
	return (
		(o = o || 0),
		(a = (a || 0) * i),
		[I, x].indexOf(s) >= 0 ? { x: a, y: o } : { x: o, y: a }
	);
}
function Pi(n) {
	var t = n.state,
		e = n.options,
		s = n.name,
		i = e.offset,
		r = i === void 0 ? [0, 0] : i,
		o = Ge.reduce(function (u, p) {
			return (u[p] = Ii(p, t.rects, r)), u;
		}, {}),
		a = o[t.placement],
		l = a.x,
		d = a.y;
	t.modifiersData.popperOffsets != null &&
		((t.modifiersData.popperOffsets.x += l),
		(t.modifiersData.popperOffsets.y += d)),
		(t.modifiersData[s] = o);
}
const Os = {
	name: 'offset',
	enabled: !0,
	phase: 'main',
	requires: ['popperOffsets'],
	fn: Pi,
};
function Mi(n) {
	var t = n.state,
		e = n.name;
	t.modifiersData[e] = Ts({
		reference: t.rects.reference,
		element: t.rects.popper,
		strategy: 'absolute',
		placement: t.placement,
	});
}
const rn = {
	name: 'popperOffsets',
	enabled: !0,
	phase: 'read',
	fn: Mi,
	data: {},
};
function Ri(n) {
	return n === 'x' ? 'y' : 'x';
}
function xi(n) {
	var t = n.state,
		e = n.options,
		s = n.name,
		i = e.mainAxis,
		r = i === void 0 ? !0 : i,
		o = e.altAxis,
		a = o === void 0 ? !1 : o,
		l = e.boundary,
		d = e.rootBoundary,
		u = e.altBoundary,
		p = e.padding,
		_ = e.tether,
		f = _ === void 0 ? !0 : _,
		A = e.tetherOffset,
		m = A === void 0 ? 0 : A,
		E = Dt(t, { boundary: l, rootBoundary: d, padding: p, altBoundary: u }),
		T = Y(t.placement),
		w = St(t.placement),
		O = !w,
		g = Ze(T),
		v = Ri(g),
		b = t.modifiersData.popperOffsets,
		y = t.rects.reference,
		S = t.rects.popper,
		N =
			typeof m == 'function'
				? m(Object.assign({}, t.rects, { placement: t.placement }))
				: m,
		C =
			typeof N == 'number'
				? { mainAxis: N, altAxis: N }
				: Object.assign({ mainAxis: 0, altAxis: 0 }, N),
		D = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
		j = { x: 0, y: 0 };
	if (b) {
		if (r) {
			var $,
				ot = g === 'y' ? L : I,
				at = g === 'y' ? R : x,
				M = g === 'y' ? 'height' : 'width',
				F = b[g],
				Gt = F + E[ot],
				ct = F - E[at],
				qt = f ? -S[M] / 2 : 0,
				Ae = w === pt ? y[M] : S[M],
				xt = w === pt ? -S[M] : -y[M],
				Xt = t.elements.arrow,
				Et = f && Xt ? Qe(Xt) : { width: 0, height: 0 },
				Z = t.modifiersData['arrow#persistent']
					? t.modifiersData['arrow#persistent'].padding
					: gs(),
				kt = Z[ot],
				Qt = Z[at],
				lt = Wt(0, y[M], Et[M]),
				Te = O
					? y[M] / 2 - qt - lt - kt - C.mainAxis
					: Ae - lt - kt - C.mainAxis,
				si = O
					? -y[M] / 2 + qt + lt + Qt + C.mainAxis
					: xt + lt + Qt + C.mainAxis,
				ye = t.elements.arrow && Ft(t.elements.arrow),
				ii = ye
					? g === 'y'
						? ye.clientTop || 0
						: ye.clientLeft || 0
					: 0,
				hn = ($ = D == null ? void 0 : D[g]) != null ? $ : 0,
				ri = F + Te - hn - ii,
				oi = F + si - hn,
				fn = Wt(f ? le(Gt, ri) : Gt, F, f ? ft(ct, oi) : ct);
			(b[g] = fn), (j[g] = fn - F);
		}
		if (a) {
			var pn,
				ai = g === 'x' ? L : I,
				ci = g === 'x' ? R : x,
				ut = b[v],
				Zt = v === 'y' ? 'height' : 'width',
				_n = ut + E[ai],
				mn = ut - E[ci],
				we = [L, I].indexOf(T) !== -1,
				gn = (pn = D == null ? void 0 : D[v]) != null ? pn : 0,
				En = we ? _n : ut - y[Zt] - S[Zt] - gn + C.altAxis,
				vn = we ? ut + y[Zt] + S[Zt] - gn - C.altAxis : mn,
				bn =
					f && we ? fi(En, ut, vn) : Wt(f ? En : _n, ut, f ? vn : mn);
			(b[v] = bn), (j[v] = bn - ut);
		}
		t.modifiersData[s] = j;
	}
}
const Cs = {
	name: 'preventOverflow',
	enabled: !0,
	phase: 'main',
	fn: xi,
	requiresIfExists: ['offset'],
};
function ki(n) {
	return { scrollLeft: n.scrollLeft, scrollTop: n.scrollTop };
}
function Vi(n) {
	return n === k(n) || !V(n) ? en(n) : ki(n);
}
function Hi(n) {
	var t = n.getBoundingClientRect(),
		e = Ct(t.width) / n.offsetWidth || 1,
		s = Ct(t.height) / n.offsetHeight || 1;
	return e !== 1 || s !== 1;
}
function Wi(n, t, e) {
	e === void 0 && (e = !1);
	var s = V(t),
		i = V(t) && Hi(t),
		r = st(t),
		o = Nt(n, i, e),
		a = { scrollLeft: 0, scrollTop: 0 },
		l = { x: 0, y: 0 };
	return (
		(s || (!s && !e)) &&
			((z(t) !== 'body' || sn(r)) && (a = Vi(t)),
			V(t)
				? ((l = Nt(t, !0)), (l.x += t.clientLeft), (l.y += t.clientTop))
				: r && (l.x = nn(r))),
		{
			x: o.left + a.scrollLeft - l.x,
			y: o.top + a.scrollTop - l.y,
			width: o.width,
			height: o.height,
		}
	);
}
function Bi(n) {
	var t = new Map(),
		e = new Set(),
		s = [];
	n.forEach(function (r) {
		t.set(r.name, r);
	});
	function i(r) {
		e.add(r.name);
		var o = [].concat(r.requires || [], r.requiresIfExists || []);
		o.forEach(function (a) {
			if (!e.has(a)) {
				var l = t.get(a);
				l && i(l);
			}
		}),
			s.push(r);
	}
	return (
		n.forEach(function (r) {
			e.has(r.name) || i(r);
		}),
		s
	);
}
function ji(n) {
	var t = Bi(n);
	return ps.reduce(function (e, s) {
		return e.concat(
			t.filter(function (i) {
				return i.phase === s;
			})
		);
	}, []);
}
function Fi(n) {
	var t;
	return function () {
		return (
			t ||
				(t = new Promise(function (e) {
					Promise.resolve().then(function () {
						(t = void 0), e(n());
					});
				})),
			t
		);
	};
}
function Ki(n) {
	var t = n.reduce(function (e, s) {
		var i = e[s.name];
		return (
			(e[s.name] = i
				? Object.assign({}, i, s, {
						options: Object.assign({}, i.options, s.options),
						data: Object.assign({}, i.data, s.data),
				  })
				: s),
			e
		);
	}, {});
	return Object.keys(t).map(function (e) {
		return t[e];
	});
}
var Nn = { placement: 'bottom', modifiers: [], strategy: 'absolute' };
function Sn() {
	for (var n = arguments.length, t = new Array(n), e = 0; e < n; e++)
		t[e] = arguments[e];
	return !t.some(function (s) {
		return !(s && typeof s.getBoundingClientRect == 'function');
	});
}
function _e(n) {
	n === void 0 && (n = {});
	var t = n,
		e = t.defaultModifiers,
		s = e === void 0 ? [] : e,
		i = t.defaultOptions,
		r = i === void 0 ? Nn : i;
	return function (a, l, d) {
		d === void 0 && (d = r);
		var u = {
				placement: 'bottom',
				orderedModifiers: [],
				options: Object.assign({}, Nn, r),
				modifiersData: {},
				elements: { reference: a, popper: l },
				attributes: {},
				styles: {},
			},
			p = [],
			_ = !1,
			f = {
				state: u,
				setOptions: function (T) {
					var w = typeof T == 'function' ? T(u.options) : T;
					m(),
						(u.options = Object.assign({}, r, u.options, w)),
						(u.scrollParents = {
							reference: _t(a)
								? Bt(a)
								: a.contextElement
								? Bt(a.contextElement)
								: [],
							popper: Bt(l),
						});
					var O = ji(Ki([].concat(s, u.options.modifiers)));
					return (
						(u.orderedModifiers = O.filter(function (g) {
							return g.enabled;
						})),
						A(),
						f.update()
					);
				},
				forceUpdate: function () {
					if (!_) {
						var T = u.elements,
							w = T.reference,
							O = T.popper;
						if (Sn(w, O)) {
							(u.rects = {
								reference: Wi(
									w,
									Ft(O),
									u.options.strategy === 'fixed'
								),
								popper: Qe(O),
							}),
								(u.reset = !1),
								(u.placement = u.options.placement),
								u.orderedModifiers.forEach(function (C) {
									return (u.modifiersData[C.name] =
										Object.assign({}, C.data));
								});
							for (
								var g = 0;
								g < u.orderedModifiers.length;
								g++
							) {
								if (u.reset === !0) {
									(u.reset = !1), (g = -1);
									continue;
								}
								var v = u.orderedModifiers[g],
									b = v.fn,
									y = v.options,
									S = y === void 0 ? {} : y,
									N = v.name;
								typeof b == 'function' &&
									(u =
										b({
											state: u,
											options: S,
											name: N,
											instance: f,
										}) || u);
							}
						}
					}
				},
				update: Fi(function () {
					return new Promise(function (E) {
						f.forceUpdate(), E(u);
					});
				}),
				destroy: function () {
					m(), (_ = !0);
				},
			};
		if (!Sn(a, l)) return f;
		f.setOptions(d).then(function (E) {
			!_ && d.onFirstUpdate && d.onFirstUpdate(E);
		});
		function A() {
			u.orderedModifiers.forEach(function (E) {
				var T = E.name,
					w = E.options,
					O = w === void 0 ? {} : w,
					g = E.effect;
				if (typeof g == 'function') {
					var v = g({ state: u, name: T, instance: f, options: O }),
						b = function () {};
					p.push(v || b);
				}
			});
		}
		function m() {
			p.forEach(function (E) {
				return E();
			}),
				(p = []);
		}
		return f;
	};
}
var Yi = _e(),
	Ui = [tn, rn, Je, Xe],
	zi = _e({ defaultModifiers: Ui }),
	Gi = [tn, rn, Je, Xe, Os, ys, Cs, bs, ws],
	on = _e({ defaultModifiers: Gi });
const Ns = Object.freeze(
	Object.defineProperty(
		{
			__proto__: null,
			afterMain: us,
			afterRead: as,
			afterWrite: fs,
			applyStyles: Xe,
			arrow: bs,
			auto: fe,
			basePlacements: It,
			beforeMain: cs,
			beforeRead: rs,
			beforeWrite: ds,
			bottom: R,
			clippingParents: ss,
			computeStyles: Je,
			createPopper: on,
			createPopperBase: Yi,
			createPopperLite: zi,
			detectOverflow: Dt,
			end: Ot,
			eventListeners: tn,
			flip: ys,
			hide: ws,
			left: I,
			main: ls,
			modifierPhases: ps,
			offset: Os,
			placements: Ge,
			popper: At,
			popperGenerator: _e,
			popperOffsets: rn,
			preventOverflow: Cs,
			read: os,
			reference: is,
			right: x,
			start: pt,
			top: L,
			variationPlacements: We,
			viewport: ze,
			write: hs,
		},
		Symbol.toStringTag,
		{ value: 'Module' }
	)
);
/*!
 * Bootstrap v5.3.3 (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */ const J = new Map(),
	Oe = {
		set(n, t, e) {
			J.has(n) || J.set(n, new Map());
			const s = J.get(n);
			if (!s.has(t) && s.size !== 0) {
				console.error(
					`Bootstrap doesn't allow more than one instance per element. Bound instance: ${
						Array.from(s.keys())[0]
					}.`
				);
				return;
			}
			s.set(t, e);
		},
		get(n, t) {
			return (J.has(n) && J.get(n).get(t)) || null;
		},
		remove(n, t) {
			if (!J.has(n)) return;
			const e = J.get(n);
			e.delete(t), e.size === 0 && J.delete(n);
		},
	},
	qi = 1e6,
	Xi = 1e3,
	Fe = 'transitionend',
	Ss = (n) => (
		n &&
			window.CSS &&
			window.CSS.escape &&
			(n = n.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`)),
		n
	),
	Qi = (n) =>
		n == null
			? `${n}`
			: Object.prototype.toString
					.call(n)
					.match(/\s([a-z]+)/i)[1]
					.toLowerCase(),
	Zi = (n) => {
		do n += Math.floor(Math.random() * qi);
		while (document.getElementById(n));
		return n;
	},
	Ji = (n) => {
		if (!n) return 0;
		let { transitionDuration: t, transitionDelay: e } =
			window.getComputedStyle(n);
		const s = Number.parseFloat(t),
			i = Number.parseFloat(e);
		return !s && !i
			? 0
			: ((t = t.split(',')[0]),
			  (e = e.split(',')[0]),
			  (Number.parseFloat(t) + Number.parseFloat(e)) * Xi);
	},
	Ds = (n) => {
		n.dispatchEvent(new Event(Fe));
	},
	G = (n) =>
		!n || typeof n != 'object'
			? !1
			: (typeof n.jquery < 'u' && (n = n[0]), typeof n.nodeType < 'u'),
	tt = (n) =>
		G(n)
			? n.jquery
				? n[0]
				: n
			: typeof n == 'string' && n.length > 0
			? document.querySelector(Ss(n))
			: null,
	Pt = (n) => {
		if (!G(n) || n.getClientRects().length === 0) return !1;
		const t =
				getComputedStyle(n).getPropertyValue('visibility') ===
				'visible',
			e = n.closest('details:not([open])');
		if (!e) return t;
		if (e !== n) {
			const s = n.closest('summary');
			if ((s && s.parentNode !== e) || s === null) return !1;
		}
		return t;
	},
	et = (n) =>
		!n ||
		n.nodeType !== Node.ELEMENT_NODE ||
		n.classList.contains('disabled')
			? !0
			: typeof n.disabled < 'u'
			? n.disabled
			: n.hasAttribute('disabled') &&
			  n.getAttribute('disabled') !== 'false',
	$s = (n) => {
		if (!document.documentElement.attachShadow) return null;
		if (typeof n.getRootNode == 'function') {
			const t = n.getRootNode();
			return t instanceof ShadowRoot ? t : null;
		}
		return n instanceof ShadowRoot
			? n
			: n.parentNode
			? $s(n.parentNode)
			: null;
	},
	ue = () => {},
	Kt = (n) => {
		n.offsetHeight;
	},
	Ls = () =>
		window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')
			? window.jQuery
			: null,
	Ce = [],
	tr = (n) => {
		document.readyState === 'loading'
			? (Ce.length ||
					document.addEventListener('DOMContentLoaded', () => {
						for (const t of Ce) t();
					}),
			  Ce.push(n))
			: n();
	},
	H = () => document.documentElement.dir === 'rtl',
	B = (n) => {
		tr(() => {
			const t = Ls();
			if (t) {
				const e = n.NAME,
					s = t.fn[e];
				(t.fn[e] = n.jQueryInterface),
					(t.fn[e].Constructor = n),
					(t.fn[e].noConflict = () => (
						(t.fn[e] = s), n.jQueryInterface
					));
			}
		});
	},
	P = (n, t = [], e = n) => (typeof n == 'function' ? n(...t) : e),
	Is = (n, t, e = !0) => {
		if (!e) {
			P(n);
			return;
		}
		const i = Ji(t) + 5;
		let r = !1;
		const o = ({ target: a }) => {
			a === t && ((r = !0), t.removeEventListener(Fe, o), P(n));
		};
		t.addEventListener(Fe, o),
			setTimeout(() => {
				r || Ds(t);
			}, i);
	},
	an = (n, t, e, s) => {
		const i = n.length;
		let r = n.indexOf(t);
		return r === -1
			? !e && s
				? n[i - 1]
				: n[0]
			: ((r += e ? 1 : -1),
			  s && (r = (r + i) % i),
			  n[Math.max(0, Math.min(r, i - 1))]);
	},
	er = /[^.]*(?=\..*)\.|.*/,
	nr = /\..*/,
	sr = /::\d+$/,
	Ne = {};
let Dn = 1;
const Ps = { mouseenter: 'mouseover', mouseleave: 'mouseout' },
	ir = new Set([
		'click',
		'dblclick',
		'mouseup',
		'mousedown',
		'contextmenu',
		'mousewheel',
		'DOMMouseScroll',
		'mouseover',
		'mouseout',
		'mousemove',
		'selectstart',
		'selectend',
		'keydown',
		'keypress',
		'keyup',
		'orientationchange',
		'touchstart',
		'touchmove',
		'touchend',
		'touchcancel',
		'pointerdown',
		'pointermove',
		'pointerup',
		'pointerleave',
		'pointercancel',
		'gesturestart',
		'gesturechange',
		'gestureend',
		'focus',
		'blur',
		'change',
		'reset',
		'select',
		'submit',
		'focusin',
		'focusout',
		'load',
		'unload',
		'beforeunload',
		'resize',
		'move',
		'DOMContentLoaded',
		'readystatechange',
		'error',
		'abort',
		'scroll',
	]);
function Ms(n, t) {
	return (t && `${t}::${Dn++}`) || n.uidEvent || Dn++;
}
function Rs(n) {
	const t = Ms(n);
	return (n.uidEvent = t), (Ne[t] = Ne[t] || {}), Ne[t];
}
function rr(n, t) {
	return function e(s) {
		return (
			cn(s, { delegateTarget: n }),
			e.oneOff && c.off(n, s.type, t),
			t.apply(n, [s])
		);
	};
}
function or(n, t, e) {
	return function s(i) {
		const r = n.querySelectorAll(t);
		for (let { target: o } = i; o && o !== this; o = o.parentNode)
			for (const a of r)
				if (a === o)
					return (
						cn(i, { delegateTarget: o }),
						s.oneOff && c.off(n, i.type, t, e),
						e.apply(o, [i])
					);
	};
}
function xs(n, t, e = null) {
	return Object.values(n).find(
		(s) => s.callable === t && s.delegationSelector === e
	);
}
function ks(n, t, e) {
	const s = typeof t == 'string',
		i = s ? e : t || e;
	let r = Vs(n);
	return ir.has(r) || (r = n), [s, i, r];
}
function $n(n, t, e, s, i) {
	if (typeof t != 'string' || !n) return;
	let [r, o, a] = ks(t, e, s);
	t in Ps &&
		(o = ((A) =>
			function (m) {
				if (
					!m.relatedTarget ||
					(m.relatedTarget !== m.delegateTarget &&
						!m.delegateTarget.contains(m.relatedTarget))
				)
					return A.call(this, m);
			})(o));
	const l = Rs(n),
		d = l[a] || (l[a] = {}),
		u = xs(d, o, r ? e : null);
	if (u) {
		u.oneOff = u.oneOff && i;
		return;
	}
	const p = Ms(o, t.replace(er, '')),
		_ = r ? or(n, e, o) : rr(n, o);
	(_.delegationSelector = r ? e : null),
		(_.callable = o),
		(_.oneOff = i),
		(_.uidEvent = p),
		(d[p] = _),
		n.addEventListener(a, _, r);
}
function Ke(n, t, e, s, i) {
	const r = xs(t[e], s, i);
	r && (n.removeEventListener(e, r, !!i), delete t[e][r.uidEvent]);
}
function ar(n, t, e, s) {
	const i = t[e] || {};
	for (const [r, o] of Object.entries(i))
		r.includes(s) && Ke(n, t, e, o.callable, o.delegationSelector);
}
function Vs(n) {
	return (n = n.replace(nr, '')), Ps[n] || n;
}
const c = {
	on(n, t, e, s) {
		$n(n, t, e, s, !1);
	},
	one(n, t, e, s) {
		$n(n, t, e, s, !0);
	},
	off(n, t, e, s) {
		if (typeof t != 'string' || !n) return;
		const [i, r, o] = ks(t, e, s),
			a = o !== t,
			l = Rs(n),
			d = l[o] || {},
			u = t.startsWith('.');
		if (typeof r < 'u') {
			if (!Object.keys(d).length) return;
			Ke(n, l, o, r, i ? e : null);
			return;
		}
		if (u) for (const p of Object.keys(l)) ar(n, l, p, t.slice(1));
		for (const [p, _] of Object.entries(d)) {
			const f = p.replace(sr, '');
			(!a || t.includes(f)) &&
				Ke(n, l, o, _.callable, _.delegationSelector);
		}
	},
	trigger(n, t, e) {
		if (typeof t != 'string' || !n) return null;
		const s = Ls(),
			i = Vs(t),
			r = t !== i;
		let o = null,
			a = !0,
			l = !0,
			d = !1;
		r &&
			s &&
			((o = s.Event(t, e)),
			s(n).trigger(o),
			(a = !o.isPropagationStopped()),
			(l = !o.isImmediatePropagationStopped()),
			(d = o.isDefaultPrevented()));
		const u = cn(new Event(t, { bubbles: a, cancelable: !0 }), e);
		return (
			d && u.preventDefault(),
			l && n.dispatchEvent(u),
			u.defaultPrevented && o && o.preventDefault(),
			u
		);
	},
};
function cn(n, t = {}) {
	for (const [e, s] of Object.entries(t))
		try {
			n[e] = s;
		} catch {
			Object.defineProperty(n, e, {
				configurable: !0,
				get() {
					return s;
				},
			});
		}
	return n;
}
function Ln(n) {
	if (n === 'true') return !0;
	if (n === 'false') return !1;
	if (n === Number(n).toString()) return Number(n);
	if (n === '' || n === 'null') return null;
	if (typeof n != 'string') return n;
	try {
		return JSON.parse(decodeURIComponent(n));
	} catch {
		return n;
	}
}
function Se(n) {
	return n.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const q = {
	setDataAttribute(n, t, e) {
		n.setAttribute(`data-bs-${Se(t)}`, e);
	},
	removeDataAttribute(n, t) {
		n.removeAttribute(`data-bs-${Se(t)}`);
	},
	getDataAttributes(n) {
		if (!n) return {};
		const t = {},
			e = Object.keys(n.dataset).filter(
				(s) => s.startsWith('bs') && !s.startsWith('bsConfig')
			);
		for (const s of e) {
			let i = s.replace(/^bs/, '');
			(i = i.charAt(0).toLowerCase() + i.slice(1, i.length)),
				(t[i] = Ln(n.dataset[s]));
		}
		return t;
	},
	getDataAttribute(n, t) {
		return Ln(n.getAttribute(`data-bs-${Se(t)}`));
	},
};
class Yt {
	static get Default() {
		return {};
	}
	static get DefaultType() {
		return {};
	}
	static get NAME() {
		throw new Error(
			'You have to implement the static method "NAME", for each component!'
		);
	}
	_getConfig(t) {
		return (
			(t = this._mergeConfigObj(t)),
			(t = this._configAfterMerge(t)),
			this._typeCheckConfig(t),
			t
		);
	}
	_configAfterMerge(t) {
		return t;
	}
	_mergeConfigObj(t, e) {
		const s = G(e) ? q.getDataAttribute(e, 'config') : {};
		return {
			...this.constructor.Default,
			...(typeof s == 'object' ? s : {}),
			...(G(e) ? q.getDataAttributes(e) : {}),
			...(typeof t == 'object' ? t : {}),
		};
	}
	_typeCheckConfig(t, e = this.constructor.DefaultType) {
		for (const [s, i] of Object.entries(e)) {
			const r = t[s],
				o = G(r) ? 'element' : Qi(r);
			if (!new RegExp(i).test(o))
				throw new TypeError(
					`${this.constructor.NAME.toUpperCase()}: Option "${s}" provided type "${o}" but expected type "${i}".`
				);
		}
	}
}
const cr = '5.3.3';
class K extends Yt {
	constructor(t, e) {
		super(),
			(t = tt(t)),
			t &&
				((this._element = t),
				(this._config = this._getConfig(e)),
				Oe.set(this._element, this.constructor.DATA_KEY, this));
	}
	dispose() {
		Oe.remove(this._element, this.constructor.DATA_KEY),
			c.off(this._element, this.constructor.EVENT_KEY);
		for (const t of Object.getOwnPropertyNames(this)) this[t] = null;
	}
	_queueCallback(t, e, s = !0) {
		Is(t, e, s);
	}
	_getConfig(t) {
		return (
			(t = this._mergeConfigObj(t, this._element)),
			(t = this._configAfterMerge(t)),
			this._typeCheckConfig(t),
			t
		);
	}
	static getInstance(t) {
		return Oe.get(tt(t), this.DATA_KEY);
	}
	static getOrCreateInstance(t, e = {}) {
		return (
			this.getInstance(t) || new this(t, typeof e == 'object' ? e : null)
		);
	}
	static get VERSION() {
		return cr;
	}
	static get DATA_KEY() {
		return `bs.${this.NAME}`;
	}
	static get EVENT_KEY() {
		return `.${this.DATA_KEY}`;
	}
	static eventName(t) {
		return `${t}${this.EVENT_KEY}`;
	}
}
const De = (n) => {
		let t = n.getAttribute('data-bs-target');
		if (!t || t === '#') {
			let e = n.getAttribute('href');
			if (!e || (!e.includes('#') && !e.startsWith('.'))) return null;
			e.includes('#') &&
				!e.startsWith('#') &&
				(e = `#${e.split('#')[1]}`),
				(t = e && e !== '#' ? e.trim() : null);
		}
		return t
			? t
					.split(',')
					.map((e) => Ss(e))
					.join(',')
			: null;
	},
	h = {
		find(n, t = document.documentElement) {
			return [].concat(...Element.prototype.querySelectorAll.call(t, n));
		},
		findOne(n, t = document.documentElement) {
			return Element.prototype.querySelector.call(t, n);
		},
		children(n, t) {
			return [].concat(...n.children).filter((e) => e.matches(t));
		},
		parents(n, t) {
			const e = [];
			let s = n.parentNode.closest(t);
			for (; s; ) e.push(s), (s = s.parentNode.closest(t));
			return e;
		},
		prev(n, t) {
			let e = n.previousElementSibling;
			for (; e; ) {
				if (e.matches(t)) return [e];
				e = e.previousElementSibling;
			}
			return [];
		},
		next(n, t) {
			let e = n.nextElementSibling;
			for (; e; ) {
				if (e.matches(t)) return [e];
				e = e.nextElementSibling;
			}
			return [];
		},
		focusableChildren(n) {
			const t = [
				'a',
				'button',
				'input',
				'textarea',
				'select',
				'details',
				'[tabindex]',
				'[contenteditable="true"]',
			]
				.map((e) => `${e}:not([tabindex^="-"])`)
				.join(',');
			return this.find(t, n).filter((e) => !et(e) && Pt(e));
		},
		getSelectorFromElement(n) {
			const t = De(n);
			return t && h.findOne(t) ? t : null;
		},
		getElementFromSelector(n) {
			const t = De(n);
			return t ? h.findOne(t) : null;
		},
		getMultipleElementsFromSelector(n) {
			const t = De(n);
			return t ? h.find(t) : [];
		},
	},
	me = (n, t = 'hide') => {
		const e = `click.dismiss${n.EVENT_KEY}`,
			s = n.NAME;
		c.on(document, e, `[data-bs-dismiss="${s}"]`, function (i) {
			if (
				(['A', 'AREA'].includes(this.tagName) && i.preventDefault(),
				et(this))
			)
				return;
			const r = h.getElementFromSelector(this) || this.closest(`.${s}`);
			n.getOrCreateInstance(r)[t]();
		});
	},
	lr = 'alert',
	ur = 'bs.alert',
	Hs = `.${ur}`,
	dr = `close${Hs}`,
	hr = `closed${Hs}`,
	fr = 'fade',
	pr = 'show';
class ge extends K {
	static get NAME() {
		return lr;
	}
	close() {
		if (c.trigger(this._element, dr).defaultPrevented) return;
		this._element.classList.remove(pr);
		const e = this._element.classList.contains(fr);
		this._queueCallback(() => this._destroyElement(), this._element, e);
	}
	_destroyElement() {
		this._element.remove(), c.trigger(this._element, hr), this.dispose();
	}
	static jQueryInterface(t) {
		return this.each(function () {
			const e = ge.getOrCreateInstance(this);
			if (typeof t == 'string') {
				if (e[t] === void 0 || t.startsWith('_') || t === 'constructor')
					throw new TypeError(`No method named "${t}"`);
				e[t](this);
			}
		});
	}
}
me(ge, 'close');
B(ge);
const _r = 'button',
	mr = 'bs.button',
	gr = `.${mr}`,
	Er = '.data-api',
	vr = 'active',
	In = '[data-bs-toggle="button"]',
	br = `click${gr}${Er}`;
class Ee extends K {
	static get NAME() {
		return _r;
	}
	toggle() {
		this._element.setAttribute(
			'aria-pressed',
			this._element.classList.toggle(vr)
		);
	}
	static jQueryInterface(t) {
		return this.each(function () {
			const e = Ee.getOrCreateInstance(this);
			t === 'toggle' && e[t]();
		});
	}
}
c.on(document, br, In, (n) => {
	n.preventDefault();
	const t = n.target.closest(In);
	Ee.getOrCreateInstance(t).toggle();
});
B(Ee);
const Ar = 'swipe',
	Mt = '.bs.swipe',
	Tr = `touchstart${Mt}`,
	yr = `touchmove${Mt}`,
	wr = `touchend${Mt}`,
	Or = `pointerdown${Mt}`,
	Cr = `pointerup${Mt}`,
	Nr = 'touch',
	Sr = 'pen',
	Dr = 'pointer-event',
	$r = 40,
	Lr = { endCallback: null, leftCallback: null, rightCallback: null },
	Ir = {
		endCallback: '(function|null)',
		leftCallback: '(function|null)',
		rightCallback: '(function|null)',
	};
class de extends Yt {
	constructor(t, e) {
		super(),
			(this._element = t),
			!(!t || !de.isSupported()) &&
				((this._config = this._getConfig(e)),
				(this._deltaX = 0),
				(this._supportPointerEvents = !!window.PointerEvent),
				this._initEvents());
	}
	static get Default() {
		return Lr;
	}
	static get DefaultType() {
		return Ir;
	}
	static get NAME() {
		return Ar;
	}
	dispose() {
		c.off(this._element, Mt);
	}
	_start(t) {
		if (!this._supportPointerEvents) {
			this._deltaX = t.touches[0].clientX;
			return;
		}
		this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX);
	}
	_end(t) {
		this._eventIsPointerPenTouch(t) &&
			(this._deltaX = t.clientX - this._deltaX),
			this._handleSwipe(),
			P(this._config.endCallback);
	}
	_move(t) {
		this._deltaX =
			t.touches && t.touches.length > 1
				? 0
				: t.touches[0].clientX - this._deltaX;
	}
	_handleSwipe() {
		const t = Math.abs(this._deltaX);
		if (t <= $r) return;
		const e = t / this._deltaX;
		(this._deltaX = 0),
			e &&
				P(
					e > 0
						? this._config.rightCallback
						: this._config.leftCallback
				);
	}
	_initEvents() {
		this._supportPointerEvents
			? (c.on(this._element, Or, (t) => this._start(t)),
			  c.on(this._element, Cr, (t) => this._end(t)),
			  this._element.classList.add(Dr))
			: (c.on(this._element, Tr, (t) => this._start(t)),
			  c.on(this._element, yr, (t) => this._move(t)),
			  c.on(this._element, wr, (t) => this._end(t)));
	}
	_eventIsPointerPenTouch(t) {
		return (
			this._supportPointerEvents &&
			(t.pointerType === Sr || t.pointerType === Nr)
		);
	}
	static isSupported() {
		return (
			'ontouchstart' in document.documentElement ||
			navigator.maxTouchPoints > 0
		);
	}
}
const Pr = 'carousel',
	Mr = 'bs.carousel',
	it = `.${Mr}`,
	Ws = '.data-api',
	Rr = 'ArrowLeft',
	xr = 'ArrowRight',
	kr = 500,
	Vt = 'next',
	vt = 'prev',
	Tt = 'left',
	ae = 'right',
	Vr = `slide${it}`,
	$e = `slid${it}`,
	Hr = `keydown${it}`,
	Wr = `mouseenter${it}`,
	Br = `mouseleave${it}`,
	jr = `dragstart${it}`,
	Fr = `load${it}${Ws}`,
	Kr = `click${it}${Ws}`,
	Bs = 'carousel',
	te = 'active',
	Yr = 'slide',
	Ur = 'carousel-item-end',
	zr = 'carousel-item-start',
	Gr = 'carousel-item-next',
	qr = 'carousel-item-prev',
	js = '.active',
	Fs = '.carousel-item',
	Xr = js + Fs,
	Qr = '.carousel-item img',
	Zr = '.carousel-indicators',
	Jr = '[data-bs-slide], [data-bs-slide-to]',
	to = '[data-bs-ride="carousel"]',
	eo = { [Rr]: ae, [xr]: Tt },
	no = {
		interval: 5e3,
		keyboard: !0,
		pause: 'hover',
		ride: !1,
		touch: !0,
		wrap: !0,
	},
	so = {
		interval: '(number|boolean)',
		keyboard: 'boolean',
		pause: '(string|boolean)',
		ride: '(boolean|string)',
		touch: 'boolean',
		wrap: 'boolean',
	};
class Ut extends K {
	constructor(t, e) {
		super(t, e),
			(this._interval = null),
			(this._activeElement = null),
			(this._isSliding = !1),
			(this.touchTimeout = null),
			(this._swipeHelper = null),
			(this._indicatorsElement = h.findOne(Zr, this._element)),
			this._addEventListeners(),
			this._config.ride === Bs && this.cycle();
	}
	static get Default() {
		return no;
	}
	static get DefaultType() {
		return so;
	}
	static get NAME() {
		return Pr;
	}
	next() {
		this._slide(Vt);
	}
	nextWhenVisible() {
		!document.hidden && Pt(this._element) && this.next();
	}
	prev() {
		this._slide(vt);
	}
	pause() {
		this._isSliding && Ds(this._element), this._clearInterval();
	}
	cycle() {
		this._clearInterval(),
			this._updateInterval(),
			(this._interval = setInterval(
				() => this.nextWhenVisible(),
				this._config.interval
			));
	}
	_maybeEnableCycle() {
		if (this._config.ride) {
			if (this._isSliding) {
				c.one(this._element, $e, () => this.cycle());
				return;
			}
			this.cycle();
		}
	}
	to(t) {
		const e = this._getItems();
		if (t > e.length - 1 || t < 0) return;
		if (this._isSliding) {
			c.one(this._element, $e, () => this.to(t));
			return;
		}
		const s = this._getItemIndex(this._getActive());
		if (s === t) return;
		const i = t > s ? Vt : vt;
		this._slide(i, e[t]);
	}
	dispose() {
		this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
	}
	_configAfterMerge(t) {
		return (t.defaultInterval = t.interval), t;
	}
	_addEventListeners() {
		this._config.keyboard &&
			c.on(this._element, Hr, (t) => this._keydown(t)),
			this._config.pause === 'hover' &&
				(c.on(this._element, Wr, () => this.pause()),
				c.on(this._element, Br, () => this._maybeEnableCycle())),
			this._config.touch &&
				de.isSupported() &&
				this._addTouchEventListeners();
	}
	_addTouchEventListeners() {
		for (const s of h.find(Qr, this._element))
			c.on(s, jr, (i) => i.preventDefault());
		const e = {
			leftCallback: () => this._slide(this._directionToOrder(Tt)),
			rightCallback: () => this._slide(this._directionToOrder(ae)),
			endCallback: () => {
				this._config.pause === 'hover' &&
					(this.pause(),
					this.touchTimeout && clearTimeout(this.touchTimeout),
					(this.touchTimeout = setTimeout(
						() => this._maybeEnableCycle(),
						kr + this._config.interval
					)));
			},
		};
		this._swipeHelper = new de(this._element, e);
	}
	_keydown(t) {
		if (/input|textarea/i.test(t.target.tagName)) return;
		const e = eo[t.key];
		e && (t.preventDefault(), this._slide(this._directionToOrder(e)));
	}
	_getItemIndex(t) {
		return this._getItems().indexOf(t);
	}
	_setActiveIndicatorElement(t) {
		if (!this._indicatorsElement) return;
		const e = h.findOne(js, this._indicatorsElement);
		e.classList.remove(te), e.removeAttribute('aria-current');
		const s = h.findOne(
			`[data-bs-slide-to="${t}"]`,
			this._indicatorsElement
		);
		s && (s.classList.add(te), s.setAttribute('aria-current', 'true'));
	}
	_updateInterval() {
		const t = this._activeElement || this._getActive();
		if (!t) return;
		const e = Number.parseInt(t.getAttribute('data-bs-interval'), 10);
		this._config.interval = e || this._config.defaultInterval;
	}
	_slide(t, e = null) {
		if (this._isSliding) return;
		const s = this._getActive(),
			i = t === Vt,
			r = e || an(this._getItems(), s, i, this._config.wrap);
		if (r === s) return;
		const o = this._getItemIndex(r),
			a = (f) =>
				c.trigger(this._element, f, {
					relatedTarget: r,
					direction: this._orderToDirection(t),
					from: this._getItemIndex(s),
					to: o,
				});
		if (a(Vr).defaultPrevented || !s || !r) return;
		const d = !!this._interval;
		this.pause(),
			(this._isSliding = !0),
			this._setActiveIndicatorElement(o),
			(this._activeElement = r);
		const u = i ? zr : Ur,
			p = i ? Gr : qr;
		r.classList.add(p), Kt(r), s.classList.add(u), r.classList.add(u);
		const _ = () => {
			r.classList.remove(u, p),
				r.classList.add(te),
				s.classList.remove(te, p, u),
				(this._isSliding = !1),
				a($e);
		};
		this._queueCallback(_, s, this._isAnimated()), d && this.cycle();
	}
	_isAnimated() {
		return this._element.classList.contains(Yr);
	}
	_getActive() {
		return h.findOne(Xr, this._element);
	}
	_getItems() {
		return h.find(Fs, this._element);
	}
	_clearInterval() {
		this._interval &&
			(clearInterval(this._interval), (this._interval = null));
	}
	_directionToOrder(t) {
		return H() ? (t === Tt ? vt : Vt) : t === Tt ? Vt : vt;
	}
	_orderToDirection(t) {
		return H() ? (t === vt ? Tt : ae) : t === vt ? ae : Tt;
	}
	static jQueryInterface(t) {
		return this.each(function () {
			const e = Ut.getOrCreateInstance(this, t);
			if (typeof t == 'number') {
				e.to(t);
				return;
			}
			if (typeof t == 'string') {
				if (e[t] === void 0 || t.startsWith('_') || t === 'constructor')
					throw new TypeError(`No method named "${t}"`);
				e[t]();
			}
		});
	}
}
c.on(document, Kr, Jr, function (n) {
	const t = h.getElementFromSelector(this);
	if (!t || !t.classList.contains(Bs)) return;
	n.preventDefault();
	const e = Ut.getOrCreateInstance(t),
		s = this.getAttribute('data-bs-slide-to');
	if (s) {
		e.to(s), e._maybeEnableCycle();
		return;
	}
	if (q.getDataAttribute(this, 'slide') === 'next') {
		e.next(), e._maybeEnableCycle();
		return;
	}
	e.prev(), e._maybeEnableCycle();
});
c.on(window, Fr, () => {
	const n = h.find(to);
	for (const t of n) Ut.getOrCreateInstance(t);
});
B(Ut);
const io = 'collapse',
	ro = 'bs.collapse',
	zt = `.${ro}`,
	oo = '.data-api',
	ao = `show${zt}`,
	co = `shown${zt}`,
	lo = `hide${zt}`,
	uo = `hidden${zt}`,
	ho = `click${zt}${oo}`,
	Le = 'show',
	wt = 'collapse',
	ee = 'collapsing',
	fo = 'collapsed',
	po = `:scope .${wt} .${wt}`,
	_o = 'collapse-horizontal',
	mo = 'width',
	go = 'height',
	Eo = '.collapse.show, .collapse.collapsing',
	Ye = '[data-bs-toggle="collapse"]',
	vo = { parent: null, toggle: !0 },
	bo = { parent: '(null|element)', toggle: 'boolean' };
class jt extends K {
	constructor(t, e) {
		super(t, e), (this._isTransitioning = !1), (this._triggerArray = []);
		const s = h.find(Ye);
		for (const i of s) {
			const r = h.getSelectorFromElement(i),
				o = h.find(r).filter((a) => a === this._element);
			r !== null && o.length && this._triggerArray.push(i);
		}
		this._initializeChildren(),
			this._config.parent ||
				this._addAriaAndCollapsedClass(
					this._triggerArray,
					this._isShown()
				),
			this._config.toggle && this.toggle();
	}
	static get Default() {
		return vo;
	}
	static get DefaultType() {
		return bo;
	}
	static get NAME() {
		return io;
	}
	toggle() {
		this._isShown() ? this.hide() : this.show();
	}
	show() {
		if (this._isTransitioning || this._isShown()) return;
		let t = [];
		if (
			(this._config.parent &&
				(t = this._getFirstLevelChildren(Eo)
					.filter((a) => a !== this._element)
					.map((a) => jt.getOrCreateInstance(a, { toggle: !1 }))),
			(t.length && t[0]._isTransitioning) ||
				c.trigger(this._element, ao).defaultPrevented)
		)
			return;
		for (const a of t) a.hide();
		const s = this._getDimension();
		this._element.classList.remove(wt),
			this._element.classList.add(ee),
			(this._element.style[s] = 0),
			this._addAriaAndCollapsedClass(this._triggerArray, !0),
			(this._isTransitioning = !0);
		const i = () => {
				(this._isTransitioning = !1),
					this._element.classList.remove(ee),
					this._element.classList.add(wt, Le),
					(this._element.style[s] = ''),
					c.trigger(this._element, co);
			},
			o = `scroll${s[0].toUpperCase() + s.slice(1)}`;
		this._queueCallback(i, this._element, !0),
			(this._element.style[s] = `${this._element[o]}px`);
	}
	hide() {
		if (
			this._isTransitioning ||
			!this._isShown() ||
			c.trigger(this._element, lo).defaultPrevented
		)
			return;
		const e = this._getDimension();
		(this._element.style[e] = `${
			this._element.getBoundingClientRect()[e]
		}px`),
			Kt(this._element),
			this._element.classList.add(ee),
			this._element.classList.remove(wt, Le);
		for (const i of this._triggerArray) {
			const r = h.getElementFromSelector(i);
			r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
		}
		this._isTransitioning = !0;
		const s = () => {
			(this._isTransitioning = !1),
				this._element.classList.remove(ee),
				this._element.classList.add(wt),
				c.trigger(this._element, uo);
		};
		(this._element.style[e] = ''),
			this._queueCallback(s, this._element, !0);
	}
	_isShown(t = this._element) {
		return t.classList.contains(Le);
	}
	_configAfterMerge(t) {
		return (t.toggle = !!t.toggle), (t.parent = tt(t.parent)), t;
	}
	_getDimension() {
		return this._element.classList.contains(_o) ? mo : go;
	}
	_initializeChildren() {
		if (!this._config.parent) return;
		const t = this._getFirstLevelChildren(Ye);
		for (const e of t) {
			const s = h.getElementFromSelector(e);
			s && this._addAriaAndCollapsedClass([e], this._isShown(s));
		}
	}
	_getFirstLevelChildren(t) {
		const e = h.find(po, this._config.parent);
		return h.find(t, this._config.parent).filter((s) => !e.includes(s));
	}
	_addAriaAndCollapsedClass(t, e) {
		if (t.length)
			for (const s of t)
				s.classList.toggle(fo, !e), s.setAttribute('aria-expanded', e);
	}
	static jQueryInterface(t) {
		const e = {};
		return (
			typeof t == 'string' && /show|hide/.test(t) && (e.toggle = !1),
			this.each(function () {
				const s = jt.getOrCreateInstance(this, e);
				if (typeof t == 'string') {
					if (typeof s[t] > 'u')
						throw new TypeError(`No method named "${t}"`);
					s[t]();
				}
			})
		);
	}
}
c.on(document, ho, Ye, function (n) {
	(n.target.tagName === 'A' ||
		(n.delegateTarget && n.delegateTarget.tagName === 'A')) &&
		n.preventDefault();
	for (const t of h.getMultipleElementsFromSelector(this))
		jt.getOrCreateInstance(t, { toggle: !1 }).toggle();
});
B(jt);
const Pn = 'dropdown',
	Ao = 'bs.dropdown',
	mt = `.${Ao}`,
	ln = '.data-api',
	To = 'Escape',
	Mn = 'Tab',
	yo = 'ArrowUp',
	Rn = 'ArrowDown',
	wo = 2,
	Oo = `hide${mt}`,
	Co = `hidden${mt}`,
	No = `show${mt}`,
	So = `shown${mt}`,
	Ks = `click${mt}${ln}`,
	Ys = `keydown${mt}${ln}`,
	Do = `keyup${mt}${ln}`,
	yt = 'show',
	$o = 'dropup',
	Lo = 'dropend',
	Io = 'dropstart',
	Po = 'dropup-center',
	Mo = 'dropdown-center',
	dt = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
	Ro = `${dt}.${yt}`,
	ce = '.dropdown-menu',
	xo = '.navbar',
	ko = '.navbar-nav',
	Vo = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)',
	Ho = H() ? 'top-end' : 'top-start',
	Wo = H() ? 'top-start' : 'top-end',
	Bo = H() ? 'bottom-end' : 'bottom-start',
	jo = H() ? 'bottom-start' : 'bottom-end',
	Fo = H() ? 'left-start' : 'right-start',
	Ko = H() ? 'right-start' : 'left-start',
	Yo = 'top',
	Uo = 'bottom',
	zo = {
		autoClose: !0,
		boundary: 'clippingParents',
		display: 'dynamic',
		offset: [0, 2],
		popperConfig: null,
		reference: 'toggle',
	},
	Go = {
		autoClose: '(boolean|string)',
		boundary: '(string|element)',
		display: 'string',
		offset: '(array|string|function)',
		popperConfig: '(null|object|function)',
		reference: '(string|element|object)',
	};
class U extends K {
	constructor(t, e) {
		super(t, e),
			(this._popper = null),
			(this._parent = this._element.parentNode),
			(this._menu =
				h.next(this._element, ce)[0] ||
				h.prev(this._element, ce)[0] ||
				h.findOne(ce, this._parent)),
			(this._inNavbar = this._detectNavbar());
	}
	static get Default() {
		return zo;
	}
	static get DefaultType() {
		return Go;
	}
	static get NAME() {
		return Pn;
	}
	toggle() {
		return this._isShown() ? this.hide() : this.show();
	}
	show() {
		if (et(this._element) || this._isShown()) return;
		const t = { relatedTarget: this._element };
		if (!c.trigger(this._element, No, t).defaultPrevented) {
			if (
				(this._createPopper(),
				'ontouchstart' in document.documentElement &&
					!this._parent.closest(ko))
			)
				for (const s of [].concat(...document.body.children))
					c.on(s, 'mouseover', ue);
			this._element.focus(),
				this._element.setAttribute('aria-expanded', !0),
				this._menu.classList.add(yt),
				this._element.classList.add(yt),
				c.trigger(this._element, So, t);
		}
	}
	hide() {
		if (et(this._element) || !this._isShown()) return;
		const t = { relatedTarget: this._element };
		this._completeHide(t);
	}
	dispose() {
		this._popper && this._popper.destroy(), super.dispose();
	}
	update() {
		(this._inNavbar = this._detectNavbar()),
			this._popper && this._popper.update();
	}
	_completeHide(t) {
		if (!c.trigger(this._element, Oo, t).defaultPrevented) {
			if ('ontouchstart' in document.documentElement)
				for (const s of [].concat(...document.body.children))
					c.off(s, 'mouseover', ue);
			this._popper && this._popper.destroy(),
				this._menu.classList.remove(yt),
				this._element.classList.remove(yt),
				this._element.setAttribute('aria-expanded', 'false'),
				q.removeDataAttribute(this._menu, 'popper'),
				c.trigger(this._element, Co, t);
		}
	}
	_getConfig(t) {
		if (
			((t = super._getConfig(t)),
			typeof t.reference == 'object' &&
				!G(t.reference) &&
				typeof t.reference.getBoundingClientRect != 'function')
		)
			throw new TypeError(
				`${Pn.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
			);
		return t;
	}
	_createPopper() {
		if (typeof Ns > 'u')
			throw new TypeError(
				"Bootstrap's dropdowns require Popper (https://popper.js.org)"
			);
		let t = this._element;
		this._config.reference === 'parent'
			? (t = this._parent)
			: G(this._config.reference)
			? (t = tt(this._config.reference))
			: typeof this._config.reference == 'object' &&
			  (t = this._config.reference);
		const e = this._getPopperConfig();
		this._popper = on(t, this._menu, e);
	}
	_isShown() {
		return this._menu.classList.contains(yt);
	}
	_getPlacement() {
		const t = this._parent;
		if (t.classList.contains(Lo)) return Fo;
		if (t.classList.contains(Io)) return Ko;
		if (t.classList.contains(Po)) return Yo;
		if (t.classList.contains(Mo)) return Uo;
		const e =
			getComputedStyle(this._menu)
				.getPropertyValue('--bs-position')
				.trim() === 'end';
		return t.classList.contains($o) ? (e ? Wo : Ho) : e ? jo : Bo;
	}
	_detectNavbar() {
		return this._element.closest(xo) !== null;
	}
	_getOffset() {
		const { offset: t } = this._config;
		return typeof t == 'string'
			? t.split(',').map((e) => Number.parseInt(e, 10))
			: typeof t == 'function'
			? (e) => t(e, this._element)
			: t;
	}
	_getPopperConfig() {
		const t = {
			placement: this._getPlacement(),
			modifiers: [
				{
					name: 'preventOverflow',
					options: { boundary: this._config.boundary },
				},
				{ name: 'offset', options: { offset: this._getOffset() } },
			],
		};
		return (
			(this._inNavbar || this._config.display === 'static') &&
				(q.setDataAttribute(this._menu, 'popper', 'static'),
				(t.modifiers = [{ name: 'applyStyles', enabled: !1 }])),
			{ ...t, ...P(this._config.popperConfig, [t]) }
		);
	}
	_selectMenuItem({ key: t, target: e }) {
		const s = h.find(Vo, this._menu).filter((i) => Pt(i));
		s.length && an(s, e, t === Rn, !s.includes(e)).focus();
	}
	static jQueryInterface(t) {
		return this.each(function () {
			const e = U.getOrCreateInstance(this, t);
			if (typeof t == 'string') {
				if (typeof e[t] > 'u')
					throw new TypeError(`No method named "${t}"`);
				e[t]();
			}
		});
	}
	static clearMenus(t) {
		if (t.button === wo || (t.type === 'keyup' && t.key !== Mn)) return;
		const e = h.find(Ro);
		for (const s of e) {
			const i = U.getInstance(s);
			if (!i || i._config.autoClose === !1) continue;
			const r = t.composedPath(),
				o = r.includes(i._menu);
			if (
				r.includes(i._element) ||
				(i._config.autoClose === 'inside' && !o) ||
				(i._config.autoClose === 'outside' && o) ||
				(i._menu.contains(t.target) &&
					((t.type === 'keyup' && t.key === Mn) ||
						/input|select|option|textarea|form/i.test(
							t.target.tagName
						)))
			)
				continue;
			const a = { relatedTarget: i._element };
			t.type === 'click' && (a.clickEvent = t), i._completeHide(a);
		}
	}
	static dataApiKeydownHandler(t) {
		const e = /input|textarea/i.test(t.target.tagName),
			s = t.key === To,
			i = [yo, Rn].includes(t.key);
		if ((!i && !s) || (e && !s)) return;
		t.preventDefault();
		const r = this.matches(dt)
				? this
				: h.prev(this, dt)[0] ||
				  h.next(this, dt)[0] ||
				  h.findOne(dt, t.delegateTarget.parentNode),
			o = U.getOrCreateInstance(r);
		if (i) {
			t.stopPropagation(), o.show(), o._selectMenuItem(t);
			return;
		}
		o._isShown() && (t.stopPropagation(), o.hide(), r.focus());
	}
}
c.on(document, Ys, dt, U.dataApiKeydownHandler);
c.on(document, Ys, ce, U.dataApiKeydownHandler);
c.on(document, Ks, U.clearMenus);
c.on(document, Do, U.clearMenus);
c.on(document, Ks, dt, function (n) {
	n.preventDefault(), U.getOrCreateInstance(this).toggle();
});
B(U);
const Us = 'backdrop',
	qo = 'fade',
	xn = 'show',
	kn = `mousedown.bs.${Us}`,
	Xo = {
		className: 'modal-backdrop',
		clickCallback: null,
		isAnimated: !1,
		isVisible: !0,
		rootElement: 'body',
	},
	Qo = {
		className: 'string',
		clickCallback: '(function|null)',
		isAnimated: 'boolean',
		isVisible: 'boolean',
		rootElement: '(element|string)',
	};
class zs extends Yt {
	constructor(t) {
		super(),
			(this._config = this._getConfig(t)),
			(this._isAppended = !1),
			(this._element = null);
	}
	static get Default() {
		return Xo;
	}
	static get DefaultType() {
		return Qo;
	}
	static get NAME() {
		return Us;
	}
	show(t) {
		if (!this._config.isVisible) {
			P(t);
			return;
		}
		this._append();
		const e = this._getElement();
		this._config.isAnimated && Kt(e),
			e.classList.add(xn),
			this._emulateAnimation(() => {
				P(t);
			});
	}
	hide(t) {
		if (!this._config.isVisible) {
			P(t);
			return;
		}
		this._getElement().classList.remove(xn),
			this._emulateAnimation(() => {
				this.dispose(), P(t);
			});
	}
	dispose() {
		this._isAppended &&
			(c.off(this._element, kn),
			this._element.remove(),
			(this._isAppended = !1));
	}
	_getElement() {
		if (!this._element) {
			const t = document.createElement('div');
			(t.className = this._config.className),
				this._config.isAnimated && t.classList.add(qo),
				(this._element = t);
		}
		return this._element;
	}
	_configAfterMerge(t) {
		return (t.rootElement = tt(t.rootElement)), t;
	}
	_append() {
		if (this._isAppended) return;
		const t = this._getElement();
		this._config.rootElement.append(t),
			c.on(t, kn, () => {
				P(this._config.clickCallback);
			}),
			(this._isAppended = !0);
	}
	_emulateAnimation(t) {
		Is(t, this._getElement(), this._config.isAnimated);
	}
}
const Zo = 'focustrap',
	Jo = 'bs.focustrap',
	he = `.${Jo}`,
	ta = `focusin${he}`,
	ea = `keydown.tab${he}`,
	na = 'Tab',
	sa = 'forward',
	Vn = 'backward',
	ia = { autofocus: !0, trapElement: null },
	ra = { autofocus: 'boolean', trapElement: 'element' };
class Gs extends Yt {
	constructor(t) {
		super(),
			(this._config = this._getConfig(t)),
			(this._isActive = !1),
			(this._lastTabNavDirection = null);
	}
	static get Default() {
		return ia;
	}
	static get DefaultType() {
		return ra;
	}
	static get NAME() {
		return Zo;
	}
	activate() {
		this._isActive ||
			(this._config.autofocus && this._config.trapElement.focus(),
			c.off(document, he),
			c.on(document, ta, (t) => this._handleFocusin(t)),
			c.on(document, ea, (t) => this._handleKeydown(t)),
			(this._isActive = !0));
	}
	deactivate() {
		this._isActive && ((this._isActive = !1), c.off(document, he));
	}
	_handleFocusin(t) {
		const { trapElement: e } = this._config;
		if (t.target === document || t.target === e || e.contains(t.target))
			return;
		const s = h.focusableChildren(e);
		s.length === 0
			? e.focus()
			: this._lastTabNavDirection === Vn
			? s[s.length - 1].focus()
			: s[0].focus();
	}
	_handleKeydown(t) {
		t.key === na && (this._lastTabNavDirection = t.shiftKey ? Vn : sa);
	}
}
const Hn = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
	Wn = '.sticky-top',
	ne = 'padding-right',
	Bn = 'margin-right';
class Ue {
	constructor() {
		this._element = document.body;
	}
	getWidth() {
		const t = document.documentElement.clientWidth;
		return Math.abs(window.innerWidth - t);
	}
	hide() {
		const t = this.getWidth();
		this._disableOverFlow(),
			this._setElementAttributes(this._element, ne, (e) => e + t),
			this._setElementAttributes(Hn, ne, (e) => e + t),
			this._setElementAttributes(Wn, Bn, (e) => e - t);
	}
	reset() {
		this._resetElementAttributes(this._element, 'overflow'),
			this._resetElementAttributes(this._element, ne),
			this._resetElementAttributes(Hn, ne),
			this._resetElementAttributes(Wn, Bn);
	}
	isOverflowing() {
		return this.getWidth() > 0;
	}
	_disableOverFlow() {
		this._saveInitialAttribute(this._element, 'overflow'),
			(this._element.style.overflow = 'hidden');
	}
	_setElementAttributes(t, e, s) {
		const i = this.getWidth(),
			r = (o) => {
				if (
					o !== this._element &&
					window.innerWidth > o.clientWidth + i
				)
					return;
				this._saveInitialAttribute(o, e);
				const a = window.getComputedStyle(o).getPropertyValue(e);
				o.style.setProperty(e, `${s(Number.parseFloat(a))}px`);
			};
		this._applyManipulationCallback(t, r);
	}
	_saveInitialAttribute(t, e) {
		const s = t.style.getPropertyValue(e);
		s && q.setDataAttribute(t, e, s);
	}
	_resetElementAttributes(t, e) {
		const s = (i) => {
			const r = q.getDataAttribute(i, e);
			if (r === null) {
				i.style.removeProperty(e);
				return;
			}
			q.removeDataAttribute(i, e), i.style.setProperty(e, r);
		};
		this._applyManipulationCallback(t, s);
	}
	_applyManipulationCallback(t, e) {
		if (G(t)) {
			e(t);
			return;
		}
		for (const s of h.find(t, this._element)) e(s);
	}
}
const oa = 'modal',
	aa = 'bs.modal',
	W = `.${aa}`,
	ca = '.data-api',
	la = 'Escape',
	ua = `hide${W}`,
	da = `hidePrevented${W}`,
	qs = `hidden${W}`,
	Xs = `show${W}`,
	ha = `shown${W}`,
	fa = `resize${W}`,
	pa = `click.dismiss${W}`,
	_a = `mousedown.dismiss${W}`,
	ma = `keydown.dismiss${W}`,
	ga = `click${W}${ca}`,
	jn = 'modal-open',
	Ea = 'fade',
	Fn = 'show',
	Ie = 'modal-static',
	va = '.modal.show',
	ba = '.modal-dialog',
	Aa = '.modal-body',
	Ta = '[data-bs-toggle="modal"]',
	ya = { backdrop: !0, focus: !0, keyboard: !0 },
	wa = {
		backdrop: '(boolean|string)',
		focus: 'boolean',
		keyboard: 'boolean',
	};
class $t extends K {
	constructor(t, e) {
		super(t, e),
			(this._dialog = h.findOne(ba, this._element)),
			(this._backdrop = this._initializeBackDrop()),
			(this._focustrap = this._initializeFocusTrap()),
			(this._isShown = !1),
			(this._isTransitioning = !1),
			(this._scrollBar = new Ue()),
			this._addEventListeners();
	}
	static get Default() {
		return ya;
	}
	static get DefaultType() {
		return wa;
	}
	static get NAME() {
		return oa;
	}
	toggle(t) {
		return this._isShown ? this.hide() : this.show(t);
	}
	show(t) {
		this._isShown ||
			this._isTransitioning ||
			c.trigger(this._element, Xs, { relatedTarget: t })
				.defaultPrevented ||
			((this._isShown = !0),
			(this._isTransitioning = !0),
			this._scrollBar.hide(),
			document.body.classList.add(jn),
			this._adjustDialog(),
			this._backdrop.show(() => this._showElement(t)));
	}
	hide() {
		!this._isShown ||
			this._isTransitioning ||
			c.trigger(this._element, ua).defaultPrevented ||
			((this._isShown = !1),
			(this._isTransitioning = !0),
			this._focustrap.deactivate(),
			this._element.classList.remove(Fn),
			this._queueCallback(
				() => this._hideModal(),
				this._element,
				this._isAnimated()
			));
	}
	dispose() {
		c.off(window, W),
			c.off(this._dialog, W),
			this._backdrop.dispose(),
			this._focustrap.deactivate(),
			super.dispose();
	}
	handleUpdate() {
		this._adjustDialog();
	}
	_initializeBackDrop() {
		return new zs({
			isVisible: !!this._config.backdrop,
			isAnimated: this._isAnimated(),
		});
	}
	_initializeFocusTrap() {
		return new Gs({ trapElement: this._element });
	}
	_showElement(t) {
		document.body.contains(this._element) ||
			document.body.append(this._element),
			(this._element.style.display = 'block'),
			this._element.removeAttribute('aria-hidden'),
			this._element.setAttribute('aria-modal', !0),
			this._element.setAttribute('role', 'dialog'),
			(this._element.scrollTop = 0);
		const e = h.findOne(Aa, this._dialog);
		e && (e.scrollTop = 0),
			Kt(this._element),
			this._element.classList.add(Fn);
		const s = () => {
			this._config.focus && this._focustrap.activate(),
				(this._isTransitioning = !1),
				c.trigger(this._element, ha, { relatedTarget: t });
		};
		this._queueCallback(s, this._dialog, this._isAnimated());
	}
	_addEventListeners() {
		c.on(this._element, ma, (t) => {
			if (t.key === la) {
				if (this._config.keyboard) {
					this.hide();
					return;
				}
				this._triggerBackdropTransition();
			}
		}),
			c.on(window, fa, () => {
				this._isShown && !this._isTransitioning && this._adjustDialog();
			}),
			c.on(this._element, _a, (t) => {
				c.one(this._element, pa, (e) => {
					if (
						!(
							this._element !== t.target ||
							this._element !== e.target
						)
					) {
						if (this._config.backdrop === 'static') {
							this._triggerBackdropTransition();
							return;
						}
						this._config.backdrop && this.hide();
					}
				});
			});
	}
	_hideModal() {
		(this._element.style.display = 'none'),
			this._element.setAttribute('aria-hidden', !0),
			this._element.removeAttribute('aria-modal'),
			this._element.removeAttribute('role'),
			(this._isTransitioning = !1),
			this._backdrop.hide(() => {
				document.body.classList.remove(jn),
					this._resetAdjustments(),
					this._scrollBar.reset(),
					c.trigger(this._element, qs);
			});
	}
	_isAnimated() {
		return this._element.classList.contains(Ea);
	}
	_triggerBackdropTransition() {
		if (c.trigger(this._element, da).defaultPrevented) return;
		const e =
				this._element.scrollHeight >
				document.documentElement.clientHeight,
			s = this._element.style.overflowY;
		s === 'hidden' ||
			this._element.classList.contains(Ie) ||
			(e || (this._element.style.overflowY = 'hidden'),
			this._element.classList.add(Ie),
			this._queueCallback(() => {
				this._element.classList.remove(Ie),
					this._queueCallback(() => {
						this._element.style.overflowY = s;
					}, this._dialog);
			}, this._dialog),
			this._element.focus());
	}
	_adjustDialog() {
		const t =
				this._element.scrollHeight >
				document.documentElement.clientHeight,
			e = this._scrollBar.getWidth(),
			s = e > 0;
		if (s && !t) {
			const i = H() ? 'paddingLeft' : 'paddingRight';
			this._element.style[i] = `${e}px`;
		}
		if (!s && t) {
			const i = H() ? 'paddingRight' : 'paddingLeft';
			this._element.style[i] = `${e}px`;
		}
	}
	_resetAdjustments() {
		(this._element.style.paddingLeft = ''),
			(this._element.style.paddingRight = '');
	}
	static jQueryInterface(t, e) {
		return this.each(function () {
			const s = $t.getOrCreateInstance(this, t);
			if (typeof t == 'string') {
				if (typeof s[t] > 'u')
					throw new TypeError(`No method named "${t}"`);
				s[t](e);
			}
		});
	}
}
c.on(document, ga, Ta, function (n) {
	const t = h.getElementFromSelector(this);
	['A', 'AREA'].includes(this.tagName) && n.preventDefault(),
		c.one(t, Xs, (i) => {
			i.defaultPrevented ||
				c.one(t, qs, () => {
					Pt(this) && this.focus();
				});
		});
	const e = h.findOne(va);
	e && $t.getInstance(e).hide(), $t.getOrCreateInstance(t).toggle(this);
});
me($t);
B($t);
const Oa = 'offcanvas',
	Ca = 'bs.offcanvas',
	Q = `.${Ca}`,
	Qs = '.data-api',
	Na = `load${Q}${Qs}`,
	Sa = 'Escape',
	Kn = 'show',
	Yn = 'showing',
	Un = 'hiding',
	Da = 'offcanvas-backdrop',
	Zs = '.offcanvas.show',
	$a = `show${Q}`,
	La = `shown${Q}`,
	Ia = `hide${Q}`,
	zn = `hidePrevented${Q}`,
	Js = `hidden${Q}`,
	Pa = `resize${Q}`,
	Ma = `click${Q}${Qs}`,
	Ra = `keydown.dismiss${Q}`,
	xa = '[data-bs-toggle="offcanvas"]',
	ka = { backdrop: !0, keyboard: !0, scroll: !1 },
	Va = {
		backdrop: '(boolean|string)',
		keyboard: 'boolean',
		scroll: 'boolean',
	};
class nt extends K {
	constructor(t, e) {
		super(t, e),
			(this._isShown = !1),
			(this._backdrop = this._initializeBackDrop()),
			(this._focustrap = this._initializeFocusTrap()),
			this._addEventListeners();
	}
	static get Default() {
		return ka;
	}
	static get DefaultType() {
		return Va;
	}
	static get NAME() {
		return Oa;
	}
	toggle(t) {
		return this._isShown ? this.hide() : this.show(t);
	}
	show(t) {
		if (
			this._isShown ||
			c.trigger(this._element, $a, { relatedTarget: t }).defaultPrevented
		)
			return;
		(this._isShown = !0),
			this._backdrop.show(),
			this._config.scroll || new Ue().hide(),
			this._element.setAttribute('aria-modal', !0),
			this._element.setAttribute('role', 'dialog'),
			this._element.classList.add(Yn);
		const s = () => {
			(!this._config.scroll || this._config.backdrop) &&
				this._focustrap.activate(),
				this._element.classList.add(Kn),
				this._element.classList.remove(Yn),
				c.trigger(this._element, La, { relatedTarget: t });
		};
		this._queueCallback(s, this._element, !0);
	}
	hide() {
		if (!this._isShown || c.trigger(this._element, Ia).defaultPrevented)
			return;
		this._focustrap.deactivate(),
			this._element.blur(),
			(this._isShown = !1),
			this._element.classList.add(Un),
			this._backdrop.hide();
		const e = () => {
			this._element.classList.remove(Kn, Un),
				this._element.removeAttribute('aria-modal'),
				this._element.removeAttribute('role'),
				this._config.scroll || new Ue().reset(),
				c.trigger(this._element, Js);
		};
		this._queueCallback(e, this._element, !0);
	}
	dispose() {
		this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
	}
	_initializeBackDrop() {
		const t = () => {
				if (this._config.backdrop === 'static') {
					c.trigger(this._element, zn);
					return;
				}
				this.hide();
			},
			e = !!this._config.backdrop;
		return new zs({
			className: Da,
			isVisible: e,
			isAnimated: !0,
			rootElement: this._element.parentNode,
			clickCallback: e ? t : null,
		});
	}
	_initializeFocusTrap() {
		return new Gs({ trapElement: this._element });
	}
	_addEventListeners() {
		c.on(this._element, Ra, (t) => {
			if (t.key === Sa) {
				if (this._config.keyboard) {
					this.hide();
					return;
				}
				c.trigger(this._element, zn);
			}
		});
	}
	static jQueryInterface(t) {
		return this.each(function () {
			const e = nt.getOrCreateInstance(this, t);
			if (typeof t == 'string') {
				if (e[t] === void 0 || t.startsWith('_') || t === 'constructor')
					throw new TypeError(`No method named "${t}"`);
				e[t](this);
			}
		});
	}
}
c.on(document, Ma, xa, function (n) {
	const t = h.getElementFromSelector(this);
	if ((['A', 'AREA'].includes(this.tagName) && n.preventDefault(), et(this)))
		return;
	c.one(t, Js, () => {
		Pt(this) && this.focus();
	});
	const e = h.findOne(Zs);
	e && e !== t && nt.getInstance(e).hide(),
		nt.getOrCreateInstance(t).toggle(this);
});
c.on(window, Na, () => {
	for (const n of h.find(Zs)) nt.getOrCreateInstance(n).show();
});
c.on(window, Pa, () => {
	for (const n of h.find('[aria-modal][class*=show][class*=offcanvas-]'))
		getComputedStyle(n).position !== 'fixed' &&
			nt.getOrCreateInstance(n).hide();
});
me(nt);
B(nt);
const Ha = /^aria-[\w-]*$/i,
	ti = {
		'*': ['class', 'dir', 'id', 'lang', 'role', Ha],
		a: ['target', 'href', 'title', 'rel'],
		area: [],
		b: [],
		br: [],
		col: [],
		code: [],
		dd: [],
		div: [],
		dl: [],
		dt: [],
		em: [],
		hr: [],
		h1: [],
		h2: [],
		h3: [],
		h4: [],
		h5: [],
		h6: [],
		i: [],
		img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
		li: [],
		ol: [],
		p: [],
		pre: [],
		s: [],
		small: [],
		span: [],
		sub: [],
		sup: [],
		strong: [],
		u: [],
		ul: [],
	},
	Wa = new Set([
		'background',
		'cite',
		'href',
		'itemtype',
		'longdesc',
		'poster',
		'src',
		'xlink:href',
	]),
	Ba = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
	ja = (n, t) => {
		const e = n.nodeName.toLowerCase();
		return t.includes(e)
			? Wa.has(e)
				? !!Ba.test(n.nodeValue)
				: !0
			: t.filter((s) => s instanceof RegExp).some((s) => s.test(e));
	};
function Fa(n, t, e) {
	if (!n.length) return n;
	if (e && typeof e == 'function') return e(n);
	const i = new window.DOMParser().parseFromString(n, 'text/html'),
		r = [].concat(...i.body.querySelectorAll('*'));
	for (const o of r) {
		const a = o.nodeName.toLowerCase();
		if (!Object.keys(t).includes(a)) {
			o.remove();
			continue;
		}
		const l = [].concat(...o.attributes),
			d = [].concat(t['*'] || [], t[a] || []);
		for (const u of l) ja(u, d) || o.removeAttribute(u.nodeName);
	}
	return i.body.innerHTML;
}
const Ka = 'TemplateFactory',
	Ya = {
		allowList: ti,
		content: {},
		extraClass: '',
		html: !1,
		sanitize: !0,
		sanitizeFn: null,
		template: '<div></div>',
	},
	Ua = {
		allowList: 'object',
		content: 'object',
		extraClass: '(string|function)',
		html: 'boolean',
		sanitize: 'boolean',
		sanitizeFn: '(null|function)',
		template: 'string',
	},
	za = {
		entry: '(string|element|function|null)',
		selector: '(string|element)',
	};
class Ga extends Yt {
	constructor(t) {
		super(), (this._config = this._getConfig(t));
	}
	static get Default() {
		return Ya;
	}
	static get DefaultType() {
		return Ua;
	}
	static get NAME() {
		return Ka;
	}
	getContent() {
		return Object.values(this._config.content)
			.map((t) => this._resolvePossibleFunction(t))
			.filter(Boolean);
	}
	hasContent() {
		return this.getContent().length > 0;
	}
	changeContent(t) {
		return (
			this._checkContent(t),
			(this._config.content = { ...this._config.content, ...t }),
			this
		);
	}
	toHtml() {
		const t = document.createElement('div');
		t.innerHTML = this._maybeSanitize(this._config.template);
		for (const [i, r] of Object.entries(this._config.content))
			this._setContent(t, r, i);
		const e = t.children[0],
			s = this._resolvePossibleFunction(this._config.extraClass);
		return s && e.classList.add(...s.split(' ')), e;
	}
	_typeCheckConfig(t) {
		super._typeCheckConfig(t), this._checkContent(t.content);
	}
	_checkContent(t) {
		for (const [e, s] of Object.entries(t))
			super._typeCheckConfig({ selector: e, entry: s }, za);
	}
	_setContent(t, e, s) {
		const i = h.findOne(s, t);
		if (i) {
			if (((e = this._resolvePossibleFunction(e)), !e)) {
				i.remove();
				return;
			}
			if (G(e)) {
				this._putElementInTemplate(tt(e), i);
				return;
			}
			if (this._config.html) {
				i.innerHTML = this._maybeSanitize(e);
				return;
			}
			i.textContent = e;
		}
	}
	_maybeSanitize(t) {
		return this._config.sanitize
			? Fa(t, this._config.allowList, this._config.sanitizeFn)
			: t;
	}
	_resolvePossibleFunction(t) {
		return P(t, [this]);
	}
	_putElementInTemplate(t, e) {
		if (this._config.html) {
			(e.innerHTML = ''), e.append(t);
			return;
		}
		e.textContent = t.textContent;
	}
}
const qa = 'tooltip',
	Xa = new Set(['sanitize', 'allowList', 'sanitizeFn']),
	Pe = 'fade',
	Qa = 'modal',
	se = 'show',
	Za = '.tooltip-inner',
	Gn = `.${Qa}`,
	qn = 'hide.bs.modal',
	Ht = 'hover',
	Me = 'focus',
	Ja = 'click',
	tc = 'manual',
	ec = 'hide',
	nc = 'hidden',
	sc = 'show',
	ic = 'shown',
	rc = 'inserted',
	oc = 'click',
	ac = 'focusin',
	cc = 'focusout',
	lc = 'mouseenter',
	uc = 'mouseleave',
	dc = {
		AUTO: 'auto',
		TOP: 'top',
		RIGHT: H() ? 'left' : 'right',
		BOTTOM: 'bottom',
		LEFT: H() ? 'right' : 'left',
	},
	hc = {
		allowList: ti,
		animation: !0,
		boundary: 'clippingParents',
		container: !1,
		customClass: '',
		delay: 0,
		fallbackPlacements: ['top', 'right', 'bottom', 'left'],
		html: !1,
		offset: [0, 6],
		placement: 'top',
		popperConfig: null,
		sanitize: !0,
		sanitizeFn: null,
		selector: !1,
		template:
			'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		title: '',
		trigger: 'hover focus',
	},
	fc = {
		allowList: 'object',
		animation: 'boolean',
		boundary: '(string|element)',
		container: '(string|element|boolean)',
		customClass: '(string|function)',
		delay: '(number|object)',
		fallbackPlacements: 'array',
		html: 'boolean',
		offset: '(array|string|function)',
		placement: '(string|function)',
		popperConfig: '(null|object|function)',
		sanitize: 'boolean',
		sanitizeFn: '(null|function)',
		selector: '(string|boolean)',
		template: 'string',
		title: '(string|element|function)',
		trigger: 'string',
	};
class Rt extends K {
	constructor(t, e) {
		if (typeof Ns > 'u')
			throw new TypeError(
				"Bootstrap's tooltips require Popper (https://popper.js.org)"
			);
		super(t, e),
			(this._isEnabled = !0),
			(this._timeout = 0),
			(this._isHovered = null),
			(this._activeTrigger = {}),
			(this._popper = null),
			(this._templateFactory = null),
			(this._newContent = null),
			(this.tip = null),
			this._setListeners(),
			this._config.selector || this._fixTitle();
	}
	static get Default() {
		return hc;
	}
	static get DefaultType() {
		return fc;
	}
	static get NAME() {
		return qa;
	}
	enable() {
		this._isEnabled = !0;
	}
	disable() {
		this._isEnabled = !1;
	}
	toggleEnabled() {
		this._isEnabled = !this._isEnabled;
	}
	toggle() {
		if (this._isEnabled) {
			if (
				((this._activeTrigger.click = !this._activeTrigger.click),
				this._isShown())
			) {
				this._leave();
				return;
			}
			this._enter();
		}
	}
	dispose() {
		clearTimeout(this._timeout),
			c.off(this._element.closest(Gn), qn, this._hideModalHandler),
			this._element.getAttribute('data-bs-original-title') &&
				this._element.setAttribute(
					'title',
					this._element.getAttribute('data-bs-original-title')
				),
			this._disposePopper(),
			super.dispose();
	}
	show() {
		if (this._element.style.display === 'none')
			throw new Error('Please use show on visible elements');
		if (!(this._isWithContent() && this._isEnabled)) return;
		const t = c.trigger(this._element, this.constructor.eventName(sc)),
			s = (
				$s(this._element) || this._element.ownerDocument.documentElement
			).contains(this._element);
		if (t.defaultPrevented || !s) return;
		this._disposePopper();
		const i = this._getTipElement();
		this._element.setAttribute('aria-describedby', i.getAttribute('id'));
		const { container: r } = this._config;
		if (
			(this._element.ownerDocument.documentElement.contains(this.tip) ||
				(r.append(i),
				c.trigger(this._element, this.constructor.eventName(rc))),
			(this._popper = this._createPopper(i)),
			i.classList.add(se),
			'ontouchstart' in document.documentElement)
		)
			for (const a of [].concat(...document.body.children))
				c.on(a, 'mouseover', ue);
		const o = () => {
			c.trigger(this._element, this.constructor.eventName(ic)),
				this._isHovered === !1 && this._leave(),
				(this._isHovered = !1);
		};
		this._queueCallback(o, this.tip, this._isAnimated());
	}
	hide() {
		if (
			!this._isShown() ||
			c.trigger(this._element, this.constructor.eventName(ec))
				.defaultPrevented
		)
			return;
		if (
			(this._getTipElement().classList.remove(se),
			'ontouchstart' in document.documentElement)
		)
			for (const i of [].concat(...document.body.children))
				c.off(i, 'mouseover', ue);
		(this._activeTrigger[Ja] = !1),
			(this._activeTrigger[Me] = !1),
			(this._activeTrigger[Ht] = !1),
			(this._isHovered = null);
		const s = () => {
			this._isWithActiveTrigger() ||
				(this._isHovered || this._disposePopper(),
				this._element.removeAttribute('aria-describedby'),
				c.trigger(this._element, this.constructor.eventName(nc)));
		};
		this._queueCallback(s, this.tip, this._isAnimated());
	}
	update() {
		this._popper && this._popper.update();
	}
	_isWithContent() {
		return !!this._getTitle();
	}
	_getTipElement() {
		return (
			this.tip ||
				(this.tip = this._createTipElement(
					this._newContent || this._getContentForTemplate()
				)),
			this.tip
		);
	}
	_createTipElement(t) {
		const e = this._getTemplateFactory(t).toHtml();
		if (!e) return null;
		e.classList.remove(Pe, se),
			e.classList.add(`bs-${this.constructor.NAME}-auto`);
		const s = Zi(this.constructor.NAME).toString();
		return (
			e.setAttribute('id', s),
			this._isAnimated() && e.classList.add(Pe),
			e
		);
	}
	setContent(t) {
		(this._newContent = t),
			this._isShown() && (this._disposePopper(), this.show());
	}
	_getTemplateFactory(t) {
		return (
			this._templateFactory
				? this._templateFactory.changeContent(t)
				: (this._templateFactory = new Ga({
						...this._config,
						content: t,
						extraClass: this._resolvePossibleFunction(
							this._config.customClass
						),
				  })),
			this._templateFactory
		);
	}
	_getContentForTemplate() {
		return { [Za]: this._getTitle() };
	}
	_getTitle() {
		return (
			this._resolvePossibleFunction(this._config.title) ||
			this._element.getAttribute('data-bs-original-title')
		);
	}
	_initializeOnDelegatedTarget(t) {
		return this.constructor.getOrCreateInstance(
			t.delegateTarget,
			this._getDelegateConfig()
		);
	}
	_isAnimated() {
		return (
			this._config.animation ||
			(this.tip && this.tip.classList.contains(Pe))
		);
	}
	_isShown() {
		return this.tip && this.tip.classList.contains(se);
	}
	_createPopper(t) {
		const e = P(this._config.placement, [this, t, this._element]),
			s = dc[e.toUpperCase()];
		return on(this._element, t, this._getPopperConfig(s));
	}
	_getOffset() {
		const { offset: t } = this._config;
		return typeof t == 'string'
			? t.split(',').map((e) => Number.parseInt(e, 10))
			: typeof t == 'function'
			? (e) => t(e, this._element)
			: t;
	}
	_resolvePossibleFunction(t) {
		return P(t, [this._element]);
	}
	_getPopperConfig(t) {
		const e = {
			placement: t,
			modifiers: [
				{
					name: 'flip',
					options: {
						fallbackPlacements: this._config.fallbackPlacements,
					},
				},
				{ name: 'offset', options: { offset: this._getOffset() } },
				{
					name: 'preventOverflow',
					options: { boundary: this._config.boundary },
				},
				{
					name: 'arrow',
					options: { element: `.${this.constructor.NAME}-arrow` },
				},
				{
					name: 'preSetPlacement',
					enabled: !0,
					phase: 'beforeMain',
					fn: (s) => {
						this._getTipElement().setAttribute(
							'data-popper-placement',
							s.state.placement
						);
					},
				},
			],
		};
		return { ...e, ...P(this._config.popperConfig, [e]) };
	}
	_setListeners() {
		const t = this._config.trigger.split(' ');
		for (const e of t)
			if (e === 'click')
				c.on(
					this._element,
					this.constructor.eventName(oc),
					this._config.selector,
					(s) => {
						this._initializeOnDelegatedTarget(s).toggle();
					}
				);
			else if (e !== tc) {
				const s =
						e === Ht
							? this.constructor.eventName(lc)
							: this.constructor.eventName(ac),
					i =
						e === Ht
							? this.constructor.eventName(uc)
							: this.constructor.eventName(cc);
				c.on(this._element, s, this._config.selector, (r) => {
					const o = this._initializeOnDelegatedTarget(r);
					(o._activeTrigger[r.type === 'focusin' ? Me : Ht] = !0),
						o._enter();
				}),
					c.on(this._element, i, this._config.selector, (r) => {
						const o = this._initializeOnDelegatedTarget(r);
						(o._activeTrigger[r.type === 'focusout' ? Me : Ht] =
							o._element.contains(r.relatedTarget)),
							o._leave();
					});
			}
		(this._hideModalHandler = () => {
			this._element && this.hide();
		}),
			c.on(this._element.closest(Gn), qn, this._hideModalHandler);
	}
	_fixTitle() {
		const t = this._element.getAttribute('title');
		t &&
			(!this._element.getAttribute('aria-label') &&
				!this._element.textContent.trim() &&
				this._element.setAttribute('aria-label', t),
			this._element.setAttribute('data-bs-original-title', t),
			this._element.removeAttribute('title'));
	}
	_enter() {
		if (this._isShown() || this._isHovered) {
			this._isHovered = !0;
			return;
		}
		(this._isHovered = !0),
			this._setTimeout(() => {
				this._isHovered && this.show();
			}, this._config.delay.show);
	}
	_leave() {
		this._isWithActiveTrigger() ||
			((this._isHovered = !1),
			this._setTimeout(() => {
				this._isHovered || this.hide();
			}, this._config.delay.hide));
	}
	_setTimeout(t, e) {
		clearTimeout(this._timeout), (this._timeout = setTimeout(t, e));
	}
	_isWithActiveTrigger() {
		return Object.values(this._activeTrigger).includes(!0);
	}
	_getConfig(t) {
		const e = q.getDataAttributes(this._element);
		for (const s of Object.keys(e)) Xa.has(s) && delete e[s];
		return (
			(t = { ...e, ...(typeof t == 'object' && t ? t : {}) }),
			(t = this._mergeConfigObj(t)),
			(t = this._configAfterMerge(t)),
			this._typeCheckConfig(t),
			t
		);
	}
	_configAfterMerge(t) {
		return (
			(t.container =
				t.container === !1 ? document.body : tt(t.container)),
			typeof t.delay == 'number' &&
				(t.delay = { show: t.delay, hide: t.delay }),
			typeof t.title == 'number' && (t.title = t.title.toString()),
			typeof t.content == 'number' && (t.content = t.content.toString()),
			t
		);
	}
	_getDelegateConfig() {
		const t = {};
		for (const [e, s] of Object.entries(this._config))
			this.constructor.Default[e] !== s && (t[e] = s);
		return (t.selector = !1), (t.trigger = 'manual'), t;
	}
	_disposePopper() {
		this._popper && (this._popper.destroy(), (this._popper = null)),
			this.tip && (this.tip.remove(), (this.tip = null));
	}
	static jQueryInterface(t) {
		return this.each(function () {
			const e = Rt.getOrCreateInstance(this, t);
			if (typeof t == 'string') {
				if (typeof e[t] > 'u')
					throw new TypeError(`No method named "${t}"`);
				e[t]();
			}
		});
	}
}
B(Rt);
const pc = 'popover',
	_c = '.popover-header',
	mc = '.popover-body',
	gc = {
		...Rt.Default,
		content: '',
		offset: [0, 8],
		placement: 'right',
		template:
			'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
		trigger: 'click',
	},
	Ec = { ...Rt.DefaultType, content: '(null|string|element|function)' };
class un extends Rt {
	static get Default() {
		return gc;
	}
	static get DefaultType() {
		return Ec;
	}
	static get NAME() {
		return pc;
	}
	_isWithContent() {
		return this._getTitle() || this._getContent();
	}
	_getContentForTemplate() {
		return { [_c]: this._getTitle(), [mc]: this._getContent() };
	}
	_getContent() {
		return this._resolvePossibleFunction(this._config.content);
	}
	static jQueryInterface(t) {
		return this.each(function () {
			const e = un.getOrCreateInstance(this, t);
			if (typeof t == 'string') {
				if (typeof e[t] > 'u')
					throw new TypeError(`No method named "${t}"`);
				e[t]();
			}
		});
	}
}
B(un);
const vc = 'scrollspy',
	bc = 'bs.scrollspy',
	dn = `.${bc}`,
	Ac = '.data-api',
	Tc = `activate${dn}`,
	Xn = `click${dn}`,
	yc = `load${dn}${Ac}`,
	wc = 'dropdown-item',
	bt = 'active',
	Oc = '[data-bs-spy="scroll"]',
	Re = '[href]',
	Cc = '.nav, .list-group',
	Qn = '.nav-link',
	Nc = '.nav-item',
	Sc = '.list-group-item',
	Dc = `${Qn}, ${Nc} > ${Qn}, ${Sc}`,
	$c = '.dropdown',
	Lc = '.dropdown-toggle',
	Ic = {
		offset: null,
		rootMargin: '0px 0px -25%',
		smoothScroll: !1,
		target: null,
		threshold: [0.1, 0.5, 1],
	},
	Pc = {
		offset: '(number|null)',
		rootMargin: 'string',
		smoothScroll: 'boolean',
		target: 'element',
		threshold: 'array',
	};
class ve extends K {
	constructor(t, e) {
		super(t, e),
			(this._targetLinks = new Map()),
			(this._observableSections = new Map()),
			(this._rootElement =
				getComputedStyle(this._element).overflowY === 'visible'
					? null
					: this._element),
			(this._activeTarget = null),
			(this._observer = null),
			(this._previousScrollData = {
				visibleEntryTop: 0,
				parentScrollTop: 0,
			}),
			this.refresh();
	}
	static get Default() {
		return Ic;
	}
	static get DefaultType() {
		return Pc;
	}
	static get NAME() {
		return vc;
	}
	refresh() {
		this._initializeTargetsAndObservables(),
			this._maybeEnableSmoothScroll(),
			this._observer
				? this._observer.disconnect()
				: (this._observer = this._getNewObserver());
		for (const t of this._observableSections.values())
			this._observer.observe(t);
	}
	dispose() {
		this._observer.disconnect(), super.dispose();
	}
	_configAfterMerge(t) {
		return (
			(t.target = tt(t.target) || document.body),
			(t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin),
			typeof t.threshold == 'string' &&
				(t.threshold = t.threshold
					.split(',')
					.map((e) => Number.parseFloat(e))),
			t
		);
	}
	_maybeEnableSmoothScroll() {
		this._config.smoothScroll &&
			(c.off(this._config.target, Xn),
			c.on(this._config.target, Xn, Re, (t) => {
				const e = this._observableSections.get(t.target.hash);
				if (e) {
					t.preventDefault();
					const s = this._rootElement || window,
						i = e.offsetTop - this._element.offsetTop;
					if (s.scrollTo) {
						s.scrollTo({ top: i, behavior: 'smooth' });
						return;
					}
					s.scrollTop = i;
				}
			}));
	}
	_getNewObserver() {
		const t = {
			root: this._rootElement,
			threshold: this._config.threshold,
			rootMargin: this._config.rootMargin,
		};
		return new IntersectionObserver((e) => this._observerCallback(e), t);
	}
	_observerCallback(t) {
		const e = (o) => this._targetLinks.get(`#${o.target.id}`),
			s = (o) => {
				(this._previousScrollData.visibleEntryTop = o.target.offsetTop),
					this._process(e(o));
			},
			i = (this._rootElement || document.documentElement).scrollTop,
			r = i >= this._previousScrollData.parentScrollTop;
		this._previousScrollData.parentScrollTop = i;
		for (const o of t) {
			if (!o.isIntersecting) {
				(this._activeTarget = null), this._clearActiveClass(e(o));
				continue;
			}
			const a =
				o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
			if (r && a) {
				if ((s(o), !i)) return;
				continue;
			}
			!r && !a && s(o);
		}
	}
	_initializeTargetsAndObservables() {
		(this._targetLinks = new Map()), (this._observableSections = new Map());
		const t = h.find(Re, this._config.target);
		for (const e of t) {
			if (!e.hash || et(e)) continue;
			const s = h.findOne(decodeURI(e.hash), this._element);
			Pt(s) &&
				(this._targetLinks.set(decodeURI(e.hash), e),
				this._observableSections.set(e.hash, s));
		}
	}
	_process(t) {
		this._activeTarget !== t &&
			(this._clearActiveClass(this._config.target),
			(this._activeTarget = t),
			t.classList.add(bt),
			this._activateParents(t),
			c.trigger(this._element, Tc, { relatedTarget: t }));
	}
	_activateParents(t) {
		if (t.classList.contains(wc)) {
			h.findOne(Lc, t.closest($c)).classList.add(bt);
			return;
		}
		for (const e of h.parents(t, Cc))
			for (const s of h.prev(e, Dc)) s.classList.add(bt);
	}
	_clearActiveClass(t) {
		t.classList.remove(bt);
		const e = h.find(`${Re}.${bt}`, t);
		for (const s of e) s.classList.remove(bt);
	}
	static jQueryInterface(t) {
		return this.each(function () {
			const e = ve.getOrCreateInstance(this, t);
			if (typeof t == 'string') {
				if (e[t] === void 0 || t.startsWith('_') || t === 'constructor')
					throw new TypeError(`No method named "${t}"`);
				e[t]();
			}
		});
	}
}
c.on(window, yc, () => {
	for (const n of h.find(Oc)) ve.getOrCreateInstance(n);
});
B(ve);
const Mc = 'tab',
	Rc = 'bs.tab',
	gt = `.${Rc}`,
	xc = `hide${gt}`,
	kc = `hidden${gt}`,
	Vc = `show${gt}`,
	Hc = `shown${gt}`,
	Wc = `click${gt}`,
	Bc = `keydown${gt}`,
	jc = `load${gt}`,
	Fc = 'ArrowLeft',
	Zn = 'ArrowRight',
	Kc = 'ArrowUp',
	Jn = 'ArrowDown',
	xe = 'Home',
	ts = 'End',
	ht = 'active',
	es = 'fade',
	ke = 'show',
	Yc = 'dropdown',
	ei = '.dropdown-toggle',
	Uc = '.dropdown-menu',
	Ve = `:not(${ei})`,
	zc = '.list-group, .nav, [role="tablist"]',
	Gc = '.nav-item, .list-group-item',
	qc = `.nav-link${Ve}, .list-group-item${Ve}, [role="tab"]${Ve}`,
	ni =
		'[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
	He = `${qc}, ${ni}`,
	Xc = `.${ht}[data-bs-toggle="tab"], .${ht}[data-bs-toggle="pill"], .${ht}[data-bs-toggle="list"]`;
class Lt extends K {
	constructor(t) {
		super(t),
			(this._parent = this._element.closest(zc)),
			this._parent &&
				(this._setInitialAttributes(this._parent, this._getChildren()),
				c.on(this._element, Bc, (e) => this._keydown(e)));
	}
	static get NAME() {
		return Mc;
	}
	show() {
		const t = this._element;
		if (this._elemIsActive(t)) return;
		const e = this._getActiveElem(),
			s = e ? c.trigger(e, xc, { relatedTarget: t }) : null;
		c.trigger(t, Vc, { relatedTarget: e }).defaultPrevented ||
			(s && s.defaultPrevented) ||
			(this._deactivate(e, t), this._activate(t, e));
	}
	_activate(t, e) {
		if (!t) return;
		t.classList.add(ht), this._activate(h.getElementFromSelector(t));
		const s = () => {
			if (t.getAttribute('role') !== 'tab') {
				t.classList.add(ke);
				return;
			}
			t.removeAttribute('tabindex'),
				t.setAttribute('aria-selected', !0),
				this._toggleDropDown(t, !0),
				c.trigger(t, Hc, { relatedTarget: e });
		};
		this._queueCallback(s, t, t.classList.contains(es));
	}
	_deactivate(t, e) {
		if (!t) return;
		t.classList.remove(ht),
			t.blur(),
			this._deactivate(h.getElementFromSelector(t));
		const s = () => {
			if (t.getAttribute('role') !== 'tab') {
				t.classList.remove(ke);
				return;
			}
			t.setAttribute('aria-selected', !1),
				t.setAttribute('tabindex', '-1'),
				this._toggleDropDown(t, !1),
				c.trigger(t, kc, { relatedTarget: e });
		};
		this._queueCallback(s, t, t.classList.contains(es));
	}
	_keydown(t) {
		if (![Fc, Zn, Kc, Jn, xe, ts].includes(t.key)) return;
		t.stopPropagation(), t.preventDefault();
		const e = this._getChildren().filter((i) => !et(i));
		let s;
		if ([xe, ts].includes(t.key)) s = e[t.key === xe ? 0 : e.length - 1];
		else {
			const i = [Zn, Jn].includes(t.key);
			s = an(e, t.target, i, !0);
		}
		s && (s.focus({ preventScroll: !0 }), Lt.getOrCreateInstance(s).show());
	}
	_getChildren() {
		return h.find(He, this._parent);
	}
	_getActiveElem() {
		return this._getChildren().find((t) => this._elemIsActive(t)) || null;
	}
	_setInitialAttributes(t, e) {
		this._setAttributeIfNotExists(t, 'role', 'tablist');
		for (const s of e) this._setInitialAttributesOnChild(s);
	}
	_setInitialAttributesOnChild(t) {
		t = this._getInnerElement(t);
		const e = this._elemIsActive(t),
			s = this._getOuterElement(t);
		t.setAttribute('aria-selected', e),
			s !== t && this._setAttributeIfNotExists(s, 'role', 'presentation'),
			e || t.setAttribute('tabindex', '-1'),
			this._setAttributeIfNotExists(t, 'role', 'tab'),
			this._setInitialAttributesOnTargetPanel(t);
	}
	_setInitialAttributesOnTargetPanel(t) {
		const e = h.getElementFromSelector(t);
		e &&
			(this._setAttributeIfNotExists(e, 'role', 'tabpanel'),
			t.id &&
				this._setAttributeIfNotExists(e, 'aria-labelledby', `${t.id}`));
	}
	_toggleDropDown(t, e) {
		const s = this._getOuterElement(t);
		if (!s.classList.contains(Yc)) return;
		const i = (r, o) => {
			const a = h.findOne(r, s);
			a && a.classList.toggle(o, e);
		};
		i(ei, ht), i(Uc, ke), s.setAttribute('aria-expanded', e);
	}
	_setAttributeIfNotExists(t, e, s) {
		t.hasAttribute(e) || t.setAttribute(e, s);
	}
	_elemIsActive(t) {
		return t.classList.contains(ht);
	}
	_getInnerElement(t) {
		return t.matches(He) ? t : h.findOne(He, t);
	}
	_getOuterElement(t) {
		return t.closest(Gc) || t;
	}
	static jQueryInterface(t) {
		return this.each(function () {
			const e = Lt.getOrCreateInstance(this);
			if (typeof t == 'string') {
				if (e[t] === void 0 || t.startsWith('_') || t === 'constructor')
					throw new TypeError(`No method named "${t}"`);
				e[t]();
			}
		});
	}
}
c.on(document, Wc, ni, function (n) {
	['A', 'AREA'].includes(this.tagName) && n.preventDefault(),
		!et(this) && Lt.getOrCreateInstance(this).show();
});
c.on(window, jc, () => {
	for (const n of h.find(Xc)) Lt.getOrCreateInstance(n);
});
B(Lt);
const Qc = 'toast',
	Zc = 'bs.toast',
	rt = `.${Zc}`,
	Jc = `mouseover${rt}`,
	tl = `mouseout${rt}`,
	el = `focusin${rt}`,
	nl = `focusout${rt}`,
	sl = `hide${rt}`,
	il = `hidden${rt}`,
	rl = `show${rt}`,
	ol = `shown${rt}`,
	al = 'fade',
	ns = 'hide',
	ie = 'show',
	re = 'showing',
	cl = { animation: 'boolean', autohide: 'boolean', delay: 'number' },
	ll = { animation: !0, autohide: !0, delay: 5e3 };
class be extends K {
	constructor(t, e) {
		super(t, e),
			(this._timeout = null),
			(this._hasMouseInteraction = !1),
			(this._hasKeyboardInteraction = !1),
			this._setListeners();
	}
	static get Default() {
		return ll;
	}
	static get DefaultType() {
		return cl;
	}
	static get NAME() {
		return Qc;
	}
	show() {
		if (c.trigger(this._element, rl).defaultPrevented) return;
		this._clearTimeout(),
			this._config.animation && this._element.classList.add(al);
		const e = () => {
			this._element.classList.remove(re),
				c.trigger(this._element, ol),
				this._maybeScheduleHide();
		};
		this._element.classList.remove(ns),
			Kt(this._element),
			this._element.classList.add(ie, re),
			this._queueCallback(e, this._element, this._config.animation);
	}
	hide() {
		if (!this.isShown() || c.trigger(this._element, sl).defaultPrevented)
			return;
		const e = () => {
			this._element.classList.add(ns),
				this._element.classList.remove(re, ie),
				c.trigger(this._element, il);
		};
		this._element.classList.add(re),
			this._queueCallback(e, this._element, this._config.animation);
	}
	dispose() {
		this._clearTimeout(),
			this.isShown() && this._element.classList.remove(ie),
			super.dispose();
	}
	isShown() {
		return this._element.classList.contains(ie);
	}
	_maybeScheduleHide() {
		this._config.autohide &&
			(this._hasMouseInteraction ||
				this._hasKeyboardInteraction ||
				(this._timeout = setTimeout(() => {
					this.hide();
				}, this._config.delay)));
	}
	_onInteraction(t, e) {
		switch (t.type) {
			case 'mouseover':
			case 'mouseout': {
				this._hasMouseInteraction = e;
				break;
			}
			case 'focusin':
			case 'focusout': {
				this._hasKeyboardInteraction = e;
				break;
			}
		}
		if (e) {
			this._clearTimeout();
			return;
		}
		const s = t.relatedTarget;
		this._element === s ||
			this._element.contains(s) ||
			this._maybeScheduleHide();
	}
	_setListeners() {
		c.on(this._element, Jc, (t) => this._onInteraction(t, !0)),
			c.on(this._element, tl, (t) => this._onInteraction(t, !1)),
			c.on(this._element, el, (t) => this._onInteraction(t, !0)),
			c.on(this._element, nl, (t) => this._onInteraction(t, !1));
	}
	_clearTimeout() {
		clearTimeout(this._timeout), (this._timeout = null);
	}
	static jQueryInterface(t) {
		return this.each(function () {
			const e = be.getOrCreateInstance(this, t);
			if (typeof t == 'string') {
				if (typeof e[t] > 'u')
					throw new TypeError(`No method named "${t}"`);
				e[t](this);
			}
		});
	}
}
me(be);
B(be);
