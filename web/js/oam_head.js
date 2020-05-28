
//<![CDATA[
Object.defineProperty(window, 'oam', { writable: false, value: {} });
Object.defineProperty(window, 'oa', { writable: false, value: oam });
var oa_preloadid, oa_jsonp_preload; (function () {
    var sA = 'setAttribute', h = document.head || document.getElementsByTagName('head')[0], qc = "cachebust=a1dee609", loc = location, oasrv = (loc.search.match(/[\?&]oaserver=([^&]+)/) || [])[1], pr = loc.protocol; if (!/^http/.test(pr)) pr = 'http:';
    if (oasrv && !/^http/.test(oasrv)) oasrv = pr + '//' + oasrv.replace(/^[^\/]*\/\//, ''); if (typeof oam == 'undefined') oam = {};
    var oru = f('http://www.outdooractive.com/alpportal/oam_head.js?proj=api-dev-oa&key=yourtest-outdoora-ctiveapi&lang=en&build=mini')
        , jsAbs = f('http://www.outdooractive.com/js');
    function f(s) { return oasrv ? (/\/\//.test(s) ? s.replace(/^[^\/]*\/\/[^\/]+/, oasrv) : oasrv + s) : s.replace(/^[^\/]+\/\//, pr + '//'); }
    oam._ORIGIN_URL = oru;
    oam._CRR_SERVER = 'https://bgcms.outdooractive.com/';
    oam._ORIGIN_BUILD = 'mini';
    if (!oam._default_head) {
        oam._default_head = 1;
        var base = (function () {
            var r = oasrv || 'http://www.outdooractive.com'
                .replace(/^\w+:/, pr)
                .replace(/\/$/, "")
                , lH = loc.host
                , fu = /^(https?)?\/\//.test(r);
            if (fu) r = r.replace(/\/api\//, '/');
            if (fu && 0 > r.indexOf(lH) && 0 > r.indexOf("alpportal")) r += "/alpportal";
            return r;
        })()
            , o =
            {
                base: base
                , css:
                    [
                        { media: "screen, projection", href: "/alpportal/css/oam_style.css?a1dee609" }
                        , { ifIE: 1, media: "screen, projection", href: "/alpportal/css/oam_style.css?a1dee609" }
                    ]
                , js:
                    [

                        { code: "alpConfig={cachebust:'a1dee609',cssBase:'" + jsAbs + "/',context:'/mobile' , language: 'en', mapbox : { access_token: 'pk.eyJ1Ijoib3V0ZG9vcmFjdGl2ZSIsImEiOiJjaXZhb3RrcDcwMDQ4MnpwcDBsbmQzcWNlIn0.jFpVbLsLUme2ALS56EMxKA' }};" }
                    ]
                , cssLater:
                    [

                    ]
            }
            , base = o.base.replace(/\/$/, "");
        if (false || false || /\bloader\b/.test(loc.search))
            o.js.push({ src: jsAbs + '/alp/src_mode_loader.js' });
        o.js.push({ src: jsAbs + '/oam/api_mini.js' });
        var d = document, cE = 'createElement', sA = 'setAttribute', fC = 'firstChild', aC = 'appendChild', cDF = 'createDocumentFragment', n, i, v, fr, lk, IE, sc, cba, cb, ojpu, ojp;

        if (oa_preloadid) {
            ojpu = abs('/api/oois/jsonp/' + oa_preloadid + '?' + ('jsapi=1&project=api-dev-oa&display=external&lang=en&edit=&categoryHandling=fallback'.split('&').sort().join('&')));
            (ojp = oa_jsonp_preload || (oa_jsonp_preload = {}))[ojpu] = 1;
            var xhr = new XMLHttpRequest();
            xhr.addEventListener('load', function (e) { ojp[ojpu] = new Function('return ' + e.target.response + ';')(); });
            xhr.open('GET', ojpu, true);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.send();
        }

        for (n = o.js.length, i = 0; i < n; i++) {
            v = o.js[i];
            if (v.src)
                d.write('\x3Cscript src="' + abs(v.src) + '" type="text/javascript"\x3E\x3C/script\x3E');
            else
                d.write('\x3Cscript type="text/javascript"\x3E' + v.code + '\x3C/script\x3E');
        }


        for (n = o.css.length, i = 0; i < n; i++) {
            v = o.css[i];
            v.ifIE && d.write('\x3C!--[if IE]\x3E');
            d.write('\x3Clink href="' + abs(v.href) + '" ' + (v.media ? 'media="' + v.media + '" ' : '') + ' rel="stylesheet" type="text/css" /\x3E');
            v.ifIE && d.write('\x3C![endif]--\x3E');
        }

        if (o.cssLater && o.cssLater.length) setTimeout(cssLater, 100);
    }

    function cssLater() {
        var z, v, n, i;
        for (n = o.cssLater.length, i = 0; i < n; i++) {
            v = o.cssLater[i];
            z = d[cE]('link');
            z[sA]('href', abs(v.href));
            z[sA]('rel', 'stylesheet');
            z[sA]('type', 'text/css');
            if (v.media) z[sA]('media', v.media);
            h[aC](z);
        }
    }
    function abs(u) {
        u = u.replace(/^https?:\/\//, '//');
        u = /^\/\//.test(u) ? pr + u : base + u.replace(/^([^\/])/, "/$1");
        u = u.replace(/\?(cachebust=)?\d+&?/, '?');
        var v = u.split('?'), w = v[1] || '';
        return v[0] + '?' + qc + (w ? '&' : '') + w;
    }
})();
//]]>
