/**
 * Created by parodi on 28/10/2016.
 */
(function (ca) {
  function S (b, a) {
    var c = b.x - a.x, d = b.y - a.y;
    return c * c + d * d
  }

  function va (b) {
    var a = b.length;
    if (16 > a) {
      return !1;
    }
    var c, d = Infinity, f = -Infinity, e = Infinity, g = -Infinity;
    for (c = 0; c < a - 1; c += 2)d = Math.min(d, b[c]), f = Math.max(f, b[c]), e = Math.min(e, b[c + 1]), g = Math.max(g, b[c + 1]);
    c = f - d;
    g -= e;
    f = c / g;
    if (0.85 > f || 1.15 < f) {
      return !1;
    }
    d = {x: d + c / 2, y: e + g / 2};
    c = (c + g) / 4;
    e = c * c;
    for (c = 0; c < a - 1; c += 2)if (g = S({x: b[c], y: b[c + 1]}, d), 0.8 > g / e || 1.2 < g / e) {
      return !1;
    }
    return !0
  }

  function ja (b, a) {
    var c = {};
    b /= T;
    a /= T;
    var d = wa, f;
    f = 0 >= a ? 90 : 1 <= a ? -90 : (2 * xa(ya(D *
        (1 - 2 * a))) - J) / D * 180;
    c[d] = f;
    c[za] = 360 * (1 === b ? 1 : (b % 1 + 1) % 1) - 180;
    return c
  }

  function da (b, a) {
    var c = U(1, K(0, 0.5 - Aa(ka(Ba + J * b / 180)) / D / 2));
    return {x: (a / 360 + 0.5) * T << 0, y: c * T << 0}
  }

  function V (b) {
    for (var a = E + p, c = A + n, d = 0, f = b.length - 3; d < f; d += 2)if (b[d] > p && b[d] < a && b[d + 1] > n && b[d + 1] < c) {
      return !0;
    }
    return !1
  }

  function Ca () {
    $ || ($ = setInterval(function () {
      for (var b = F.items, a = !1, c = 0, d = b.length; c < d; c++)1 > b[c].scale && (b[c].scale += 0.1, 1 < b[c].scale && (b[c].scale = 1), a = !0);
      v.render();
      a || (clearInterval($), $ = null)
    }, 33))
  }

  function ea (b) {
    M = W +
        b.x;
    N = A + b.y;
    v.render(!0)
  }

  function la (b) {
    E = b.width;
    A = b.height;
    W = E / 2 << 0;
    fa = A / 2 << 0;
    M = W;
    N = A;
    v.setSize(E, A);
    ga = q - 50
  }

  function ma (b) {
    x = b;
    T = Da << x;
    b = ja(p + W, n + fa);
    var a = da(b.latitude, 0);
    na = da(b.latitude, 1).x - a.x;
    B = oa(0.95, x - G);
    ha = "" + H.alpha(B);
    aa = "" + ba.alpha(B);
    X = "" + O.alpha(B)
  }

  var u = Math, ya = u.exp, Aa = u.log, Ea = u.sin, Fa = u.cos, ka = u.tan, xa = u.atan, P = u.atan2, U = u.min, K = u.max, pa = u.sqrt, qa = u.ceil, oa = u.pow, ra = ra || Array, sa = sa || Array, u = /iP(ad|hone|od)/g.test(navigator.userAgent), t = !!~navigator.userAgent.indexOf("Trident"),
      Ga                                                                                                                                                                                                                                                 = !ca.requestAnimationFrame || u || t ? function (b) {
        b()
      } : ca.requestAnimationFrame, I                                                                                                                                                                                                                    = function (b) {
        function a (a, b, c) {
          0 > c && (c += 1);
          1 < c && (c -= 1);
          return c < 1 / 6 ? a + 6 * (b - a) * c : 0.5 > c ? b : c < 2 / 3 ? a + (b - a) * (2 / 3 - c) * 6 : a
        }

        var c = {
          aqua: "#00ffff",
          black: "#000000",
          blue: "#0000ff",
          fuchsia: "#ff00ff",
          gray: "#808080",
          grey: "#808080",
          green: "#008000",
          lime: "#00ff00",
          maroon: "#800000",
          navy: "#000080",
          olive: "#808000",
          orange: "#ffa500",
          purple: "#800080",
          red: "#ff0000",
          silver: "#c0c0c0",
          teal: "#008080",
          white: "#ffffff",
          yellow: "#ffff00"
        }, d = function (a, b,
                          c, d) {
          this.H = a;
          this.S = b;
          this.L = c;
          this.A = d
        };
        d.parse = function (a) {
          var b = 0, d = 0, h = 0, k = 1, m;
          a = ("" + a).toLowerCase();
          a = c[a] || a;
          if (m = a.match(/^#(\w{2})(\w{2})(\w{2})$/)) {
            b = parseInt(m[1], 16), d = parseInt(m[2], 16), h = parseInt(m[3], 16);
          } else if (m = a.match(/rgba?\((\d+)\D+(\d+)\D+(\d+)(\D+([\d.]+))?\)/)) {
            b = parseInt(m[1], 10), d = parseInt(m[2], 10), h = parseInt(m[3], 10), k = m[4] ? parseFloat(m[5]) : 1;
          } else {
            return;
          }
          return this.fromRGBA(b, d, h, k)
        };
        d.fromRGBA = function (a, b, c, h) {
          "object" === typeof a ? (b = a.g / 255, c = a.b / 255, h = a.a, a = a.r / 255) : (a /=
              255, b /= 255, c /= 255);
          var k = Math.max(a, b, c), m = Math.min(a, b, c), l, y = (k + m) / 2, s = k - m;
          if (s) {
            m = 0.5 < y ? s / (2 - k - m) : s / (k + m);
            switch (k) {
              case a:
                l = (b - c) / s + (b < c ? 6 : 0);
                break;
              case b:
                l = (c - a) / s + 2;
                break;
              case c:
                l = (a - b) / s + 4
            }
            l *= 60
          } else {
            l = m = 0;
          }
          return new d(l, m, y, h)
        };
        d.prototype = {
          toRGBA: function () {
            var b = Math.min(360, Math.max(0, this.H)), c = Math.min(1, Math.max(0, this.S)), d = Math.min(1, Math.max(0, this.L)), h = Math.min(1, Math.max(0, this.A)), k;
            if (0 === c) {
              b = k = c = d;
            } else {
              var m = 0.5 > d ? d * (1 + c) : d + c - d * c, d = 2 * d - m, b = b / 360, c = a(d, m, b + 1 / 3);
              k = a(d, m, b);
              b =
                  a(d, m, b - 1 / 3)
            }
            return {r: Math.round(255 * c), g: Math.round(255 * k), b: Math.round(255 * b), a: h}
          }, toString: function () {
            var a = this.toRGBA();
            return 1 === a.a ? "#" + (16777216 + (a.r << 16) + (a.g << 8) + a.b).toString(16).slice(1, 7) : "rgba(" + [a.r, a.g, a.b, a.a.toFixed(2)].join() + ")"
          }, hue: function (a) {
            return new d(this.H * a, this.S, this.L, this.A)
          }, saturation: function (a) {
            return new d(this.H, this.S * a, this.L, this.A)
          }, lightness: function (a) {
            return new d(this.H, this.S, this.L * a, this.A)
          }, alpha: function (a) {
            return new d(this.H, this.S, this.L, this.A *
                a)
          }
        };
        return d
      }(this), Ha                                                                                                                                                                                                                                        = function () {
        var b = Math, a = b.PI, c = b.sin, d = b.cos, f = b.tan, e = b.asin, g = b.atan2, h = a / 180, k = 23.4397 * h;
        return function (b, l, y) {
          y = h * -y;
          l *= h;
          b = b.valueOf() / 864E5 - 0.5 + 2440588 - 2451545;
          var s = h * (357.5291 + 0.98560028 * b), C;
          C = h * (1.9148 * c(s) + 0.02 * c(2 * s) + 3E-4 * c(3 * s));
          C = s + C + 102.9372 * h + a;
          s = e(c(0) * d(k) + d(0) * c(k) * c(C));
          C = g(c(C) * d(k) - f(0) * c(k), d(C));
          b = h * (280.16 + 360.9856235 * b) - y - C;
          y = e(c(l) * c(s) + d(l) * d(s) * d(b));
          l = g(c(b), d(b) * c(l) - f(s) * d(l));
          return {altitude: y, azimuth: l - a / 2}
        }
      }(), Ja                                                                                                                                                                                                                                            = function () {
        function b (a) {
          a =
              a.toLowerCase();
          return "#" === a[0] ? a : d[f[a] || a] || null
        }

        function a (a, b) {
          var c, d, f, s, C = 0, p, n;
          p = 0;
          for (n = a.length - 3; p < n; p += 2)c = a[p], d = a[p + 1], f = a[p + 2], s = a[p + 3], C += c * s - f * d;
          if ((0 < C / 2 ? e : g) === b) {
            return a;
          }
          c = [];
          for (d = a.length - 2; 0 <= d; d -= 2)c.push(a[d], a[d + 1]);
          return c
        }

        function c (b) {
          var d, f, l = [], y;
          switch (b.type) {
            case "GeometryCollection":
              l = [];
              d = 0;
              for (f = b.geometries.length; d < f; d++)(y = c(b.geometries[d])) && l.push.apply(l, y);
              return l;
            case "MultiPolygon":
              l = [];
              d = 0;
              for (f = b.coordinates.length; d < f; d++)(y = c({
                type: "Polygon",
                coordinates: b.coordinates[d]
              })) && l.push.apply(l, y);
              return l;
            case "Polygon":
              b = b.coordinates;
              break;
            default:
              return []
          }
          var s, p = [], n = [];
          s = b[0];
          d = 0;
          for (f = s.length; d < f; d++)p.push(s[d][1], s[d][0]);
          p = a(p, e);
          d = 0;
          for (f = b.length - 1; d < f; d++) {
            s = b[d + 1];
            n[d] = [];
            l = 0;
            for (y = s.length; l < y; l++)n[d].push(s[l][1], s[l][0]);
            n[d] = a(n[d], g)
          }
          return [{outer: p, inner: n.length ? n : null}]
        }

        var d          = {
          brick: "#cc7755",
          bronze: "#ffeecc",
          canvas: "#fff8f0",
          concrete: "#999999",
          copper: "#a0e0d0",
          glass: "#e8f8f8",
          gold: "#ffcc00",
          plants: "#009933",
          metal: "#aaaaaa",
          panel: "#fff8f0",
          plaster: "#999999",
          roof_tiles: "#f08060",
          silver: "#cccccc",
          slate: "#666666",
          stone: "#996666",
          tar_paper: "#333333",
          wood: "#deb887"
        }, f           = {
          asphalt: "tar_paper",
          bitumen: "tar_paper",
          block: "stone",
          bricks: "brick",
          glas: "glass",
          glassfront: "glass",
          grass: "plants",
          masonry: "stone",
          granite: "stone",
          panels: "panel",
          paving_stones: "stone",
          plastered: "plaster",
          rooftiles: "roof_tiles",
          roofingfelt: "tar_paper",
          sandstone: "stone",
          sheet: "canvas",
          sheets: "canvas",
          shingle: "tar_paper",
          shingles: "tar_paper",
          slates: "slate",
          steel: "metal",
          tar: "tar_paper",
          tent: "canvas",
          thatch: "plants",
          tile: "roof_tiles",
          tiles: "roof_tiles"
        }, e = "CW", g = "CCW";
        return {
          read: function (a) {
            if (!a || "FeatureCollection" !== a.type) {
              return [];
            }
            a = a.features;
            var d, f, e, g, p = [], n, q, t, r;
            d = 0;
            for (f = a.length; d < f; d++)if (n = a[d], "Feature" === n.type && !1 !== ta(n)) {
              e = n.properties;
              g = {};
              e = e || {};
              g.height = e.height || (e.levels ? 3 * e.levels : Ia);
              g.minHeight = e.minHeight || (e.minLevel ? 3 * e.minLevel : 0);
              if (q = e.material ? b(e.material) : e.wallColor || e.color) {
                g.wallColor = q;
              }
              if (q = e.roofMaterial ? b(e.roofMaterial) :
                      e.roofColor) {
                g.roofColor = q;
              }
              switch (e.shape) {
                case "cylinder":
                case "cone":
                case "dome":
                case "sphere":
                  g.shape = e.shape;
                  g.isRotational = !0;
                  break;
                case "pyramid":
                  g.shape = e.shape
              }
              switch (e.roofShape) {
                case "cone":
                case "dome":
                  g.roofShape = e.roofShape;
                  g.isRotational = !0;
                  break;
                case "pyramid":
                  g.roofShape = e.roofShape
              }
              g.roofShape && e.roofHeight ? (g.roofHeight = e.roofHeight, g.height = K(0, g.height - g.roofHeight)) : g.roofHeight = 0;
              t = g;
              q = c(n.geometry);
              e = 0;
              for (g = q.length; e < g; e++) {
                r = t;
                var w = {}, u = void 0;
                for (u in r)r.hasOwnProperty(u) &&
                (w[u] = r[u]);
                r = w;
                r.footprint = q[e].outer;
                if (r.isRotational) {
                  for (var w = r, u = r.footprint, x = 180, z = -180, v = 0, A = u.length; v < A; v += 2)x = U(x, u[v + 1]), z = K(z, u[v + 1]);
                  w.radius = (z - x) / 2
                }
                q[e].inner && (r.holes = q[e].inner);
                if (n.id || n.properties.id) {
                  r.id = n.id || n.properties.id;
                }
                n.properties.relationId && (r.relationId = n.properties.relationId);
                p.push(r)
              }
            }
            return p
          }
        }
      }(), D                                                                                                                                                                                                                                             = Math.PI, J                                                                                                                                                                                                                                = D / 2, Ba = D / 4, Da = 256, x, T, G = 15, wa = "latitude", za = "longitude", E = 0, A                                                                                                                                       = 0, W = 0, fa                                                                                                                        = 0, p = 0, n = 0, H = I.parse("rgba(200, 190, 180)"), ba = H.lightness(0.8), O = H.lightness(1.2),
      ha                                                                                                                                                                                                                                                 = "" + H, aa = "" + ba, X = "" + O, na = 0, B = 1, ga, Ia = 5, M, N, q                                                                                                                                                                          = 450, Q, Ka = function () {
        function b (b, g) {
          if (a[b]) {
            g && g(a[b]);
          } else {
            var h = new XMLHttpRequest;
            h.onreadystatechange = function () {
              if (4 === h.readyState && h.status && !(200 > h.status || 299 < h.status) && g && h.responseText) {
                var k = h.responseText;
                a[b] = k;
                c.push({url: b, size: k.length});
                d += k.length;
                for (g(k); d > f;)k = c.shift(), d -= k.size, delete a[k.url]
              }
            };
            h.open("GET", b);
            h.send(null);
            return h
          }
        }

        var a = {}, c = [], d = 0, f = 5242880;
        return {
          loadJSON: function (a, c) {
            return b(a, function (a) {
              var b;
              try {
                b =
                    JSON.parse(a)
              } catch (d) {
              }
              c(b)
            })
          }
        }
      }(), F                                                                                                                                                                                                                                             = {
        loadedItems: {}, items: [], getPixelFootprint: function (b) {
          for (var a = new ra(b.length), c, d = 0, f = b.length - 1; d < f; d += 2)c = da(b[d], b[d + 1]), a[d] = c.x, a[d + 1] = c.y;
          b = a;
          a = b.length / 2;
          c = new sa(a);
          var d = 0, f = a - 1, e, g, h, k, m = [], l = [], n = [];
          for (c[d] = c[f] = 1; f;) {
            g = 0;
            for (e = d + 1; e < f; e++) {
              h = b[2 * e];
              var p = b[2 * e + 1], q = b[2 * d], r = b[2 * d + 1], u = b[2 * f], w = b[2 * f + 1], t = u - q, v = w - r, x = void 0;
              if (0 !== t || 0 !== v) {
                x = ((h - q) * t + (p - r) * v) / (t * t + v * v), 1 < x ? (q = u, r = w) : 0 < x && (q += t * x, r += v * x);
              }
              t = h - q;
              v = p - r;
              h = t * t + v * v;
              h > g && (k = e, g = h)
            }
            2 < g &&
            (c[k] = 1, m.push(d), l.push(k), m.push(k), l.push(f));
            d = m.pop();
            f = l.pop()
          }
          for (e = 0; e < a; e++)c[e] && n.push(b[2 * e], b[2 * e + 1]);
          a = n;
          if (!(8 > a.length)) {
            return a
          }
        }, resetItems: function () {
          this.items = [];
          this.loadedItems = {};
          Y.reset()
        }, addRenderItems: function (b, a) {
          for (var c, d, f, e = Ja.read(b), g = 0, h = e.length; g < h; g++)c = e[g], f = c.id || [c.footprint[0], c.footprint[1], c.height, c.minHeight].join(), !this.loadedItems[f] && (d = this.scale(c)) && (d.scale = a ? 0 : 1, this.items.push(d), this.loadedItems[f] = 1);
          Ca()
        }, scale: function (b) {
          var a = {}, c = 6 /
              oa(2, x - G);
          b.id && (a.id = b.id);
          a.height = U(b.height / c, ga);
          a.minHeight = isNaN(b.minHeight) ? 0 : b.minHeight / c;
          if (!(a.minHeight > ga) && (a.footprint = this.getPixelFootprint(b.footprint), a.footprint)) {
            for (var d = a.footprint, f = Infinity, e = -Infinity, g = Infinity, h = -Infinity, k = 0, m = d.length - 3; k < m; k += 2)f = U(f, d[k]), e = K(e, d[k]), g = U(g, d[k + 1]), h = K(h, d[k + 1]);
            a.center = {x: f + (e - f) / 2 << 0, y: g + (h - g) / 2 << 0};
            b.radius && (a.radius = b.radius * na);
            b.shape && (a.shape = b.shape);
            b.roofShape && (a.roofShape = b.roofShape);
            "cone" !== a.roofShape && "dome" !==
            a.roofShape || a.shape || !va(a.footprint) || (a.shape = "cylinder");
            if (b.holes) {
              a.holes = [];
              for (var l, d = 0, f = b.holes.length; d < f; d++)(l = this.getPixelFootprint(b.holes[d])) && a.holes.push(l)
            }
            var n;
            b.wallColor && (n = I.parse(b.wallColor)) && (n = n.alpha(B), a.altColor = "" + n.lightness(0.8), a.wallColor = "" + n);
            b.roofColor && (n = I.parse(b.roofColor)) && (a.roofColor = "" + n.alpha(B));
            b.relationId && (a.relationId = b.relationId);
            a.hitColor = Y.idToColor(b.relationId || b.id);
            a.roofHeight = isNaN(b.roofHeight) ? 0 : b.roofHeight / c;
            if (!(a.height +
                a.roofHeight <= a.minHeight)) {
              return a
            }
          }
        }, set: function (b) {
          this.isStatic = !0;
          this.resetItems();
          this._staticData = b;
          this.addRenderItems(this._staticData, !0)
        }, load: function (b, a) {
          this.src = b || "http://{s}.data.osmbuildings.org/0.2/{k}/tile/{z}/{x}/{y}.json".replace("{k}", a || "anonymous");
          this.update()
        }, update: function () {
          function b (a) {
            g.addRenderItems(a)
          }

          this.resetItems();
          if (!(x < G)) {
            if (this.isStatic && this._staticData) {
              this.addRenderItems(this._staticData);
            } else if (this.src) {
              var a                                                              = 16 < x ? 256 << x - 16 : 256 >> 16 - x, c = p / a << 0,
                  d = n / a << 0, f = qa((p + E) / a), a = qa((n + A) / a), e, g = this;
              for (e = d; e <= a; e++)for (d = c; d <= f; d++)this.loadTile(d, e, 16, b)
            }
          }
        }, loadTile: function (b, a, c, d) {
          b = this.src.replace("{s}", "abcd"[(b + a) % 4]).replace("{x}", b).replace("{y}", a).replace("{z}", c);
          return Ka.loadJSON(b, d)
        }
      }, Z                                                                                                                                                                                                                                               = {
        draw: function (b, a, c, d, f, e, g, h) {
          var k, m = this._extrude(b, a, d, f, e, g), l = [];
          if (c) {
            for (a = 0, k = c.length; a < k; a++)l[a] = this._extrude(b, c[a], d, f, e, g);
          }
          b.fillStyle = h;
          b.beginPath();
          this._ring(b, m);
          if (c) {
            for (a = 0, k = l.length; a < k; a++)this._ring(b, l[a]);
          }
          b.closePath();
          b.stroke();
          b.fill()
        }, _extrude: function (b, a, c, d, f, e) {
          c = q / (q - c);
          for (var g = q / (q - d), h = {x: 0, y: 0}, k = {
            x: 0,
            y: 0
          }, m, l, y = [], s = 0, t = a.length - 3; s < t; s += 2)h.x = a[s] - p, h.y = a[s + 1] - n, k.x = a[s + 2] - p, k.y = a[s + 3] - n, m = r.project(h, c), l = r.project(k, c), d && (h = r.project(h, g), k = r.project(k, g)), (k.x - h.x) * (m.y - h.y) > (m.x - h.x) * (k.y - h.y) && (b.fillStyle = h.x < k.x && h.y < k.y || h.x > k.x && h.y > k.y ? e : f, b.beginPath(), this._ring(b, [k.x, k.y, h.x, h.y, m.x, m.y, l.x, l.y]), b.closePath(), b.fill()), y[s] = m.x, y[s + 1] = m.y;
          return y
        }, _ring: function (b, a) {
          b.moveTo(a[0],
              a[1]);
          for (var c = 2, d = a.length - 1; c < d; c += 2)b.lineTo(a[c], a[c + 1])
        }, simplified: function (b, a, c) {
          b.beginPath();
          this._ringAbs(b, a);
          if (c) {
            a = 0;
            for (var d = c.length; a < d; a++)this._ringAbs(b, c[a])
          }
          b.closePath();
          b.stroke();
          b.fill()
        }, _ringAbs: function (b, a) {
          b.moveTo(a[0] - p, a[1] - n);
          for (var c = 2, d = a.length - 1; c < d; c += 2)b.lineTo(a[c] - p, a[c + 1] - n)
        }, shadow: function (b, a, c, d, f) {
          for (var e = null, g = {x: 0, y: 0}, h = {
            x: 0,
            y: 0
          }, k, m, l = 0, q = a.length - 3; l < q; l += 2)g.x = a[l] - p, g.y = a[l + 1] - n, h.x = a[l + 2] - p, h.y = a[l + 3] - n, k = z.project(g, d), m = z.project(h,
              d), f && (g = z.project(g, f), h = z.project(h, f)), (h.x - g.x) * (k.y - g.y) > (k.x - g.x) * (h.y - g.y) ? (1 === e && b.lineTo(g.x, g.y), e = 0, l || b.moveTo(g.x, g.y), b.lineTo(h.x, h.y)) : (0 === e && b.lineTo(k.x, k.y), e = 1, l || b.moveTo(k.x, k.y), b.lineTo(m.x, m.y));
          if (c) {
            for (l = 0, q = c.length; l < q; l++)this._ringAbs(b, c[l])
          }
        }, shadowMask: function (b, a, c) {
          this._ringAbs(b, a);
          if (c) {
            a = 0;
            for (var d = c.length; a < d; a++)this._ringAbs(b, c[a])
          }
        }, hitArea: function (b, a, c, d, f, e) {
          c = null;
          var g = {x: 0, y: 0}, h = {x: 0, y: 0};
          d = q / (q - d);
          var k = q / (q - f), m;
          b.fillStyle = e;
          b.beginPath();
          for (var l = 0, t = a.length - 3; l < t; l += 2)g.x = a[l] - p, g.y = a[l + 1] - n, h.x = a[l + 2] - p, h.y = a[l + 3] - n, e = r.project(g, d), m = r.project(h, d), f && (g = r.project(g, k), h = r.project(h, k)), (h.x - g.x) * (e.y - g.y) > (e.x - g.x) * (h.y - g.y) ? (1 === c && b.lineTo(g.x, g.y), c = 0, l || b.moveTo(g.x, g.y), b.lineTo(h.x, h.y)) : (0 === c && b.lineTo(e.x, e.y), c = 1, l || b.moveTo(e.x, e.y), b.lineTo(m.x, m.y));
          b.closePath();
          b.fill()
        }
      }, w                                                                                                                                                                                                                                               = {
        draw: function (b, a, c, d, f, e, g, h, k) {
          a = {x: a.x - p, y: a.y - n};
          var m = q / (q - f), l = q / (q - e);
          f = r.project(a, m);
          d *= m;
          e && (a = r.project(a, l), c *= l);
          (m = this._tangents(a,
              c, f, d)) ? (e = P(m[0].y1 - a.y, m[0].x1 - a.x), m = P(m[1].y1 - a.y, m[1].x1 - a.x)) : (e = 1.5 * D, m = 1.5 * D);
          b.fillStyle = g;
          b.beginPath();
          b.arc(f.x, f.y, d, J, e, !0);
          b.arc(a.x, a.y, c, e, J);
          b.closePath();
          b.fill();
          b.fillStyle = h;
          b.beginPath();
          b.arc(f.x, f.y, d, m, J, !0);
          b.arc(a.x, a.y, c, J, m);
          b.closePath();
          b.fill();
          b.fillStyle = k;
          this._circle(b, f, d)
        }, simplified: function (b, a, c) {
          this._circle(b, {x: a.x - p, y: a.y - n}, c)
        }, shadow: function (b, a, c, d, f, e) {
          a = {x: a.x - p, y: a.y - n};
          f = z.project(a, f);
          var g;
          e && (a = z.project(a, e));
          var h = this._tangents(a, c, f, d);
          h ? (e = P(h[0].y1 - a.y, h[0].x1 - a.x), g = P(h[1].y1 - a.y, h[1].x1 - a.x), b.moveTo(h[1].x2, h[1].y2), b.arc(f.x, f.y, d, g, e), b.arc(a.x, a.y, c, e, g)) : (b.moveTo(a.x + c, a.y), b.arc(a.x, a.y, c, 0, 2 * D))
        }, shadowMask: function (b, a, c) {
          var d = a.x - p;
          a = a.y - n;
          b.moveTo(d + c, a);
          b.arc(d, a, c, 0, 2 * D)
        }, hitArea: function (b, a, c, d, f, e, g) {
          a = {x: a.x - p, y: a.y - n};
          var h = q / (q - f), k = q / (q - e);
          f = r.project(a, h);
          d *= h;
          e && (a = r.project(a, k), c *= k);
          e = this._tangents(a, c, f, d);
          b.fillStyle = g;
          b.beginPath();
          e ? (g = P(e[0].y1 - a.y, e[0].x1 - a.x), h = P(e[1].y1 - a.y, e[1].x1 - a.x), b.moveTo(e[1].x2,
              e[1].y2), b.arc(f.x, f.y, d, h, g), b.arc(a.x, a.y, c, g, h)) : (b.moveTo(a.x + c, a.y), b.arc(a.x, a.y, c, 0, 2 * D));
          b.closePath();
          b.fill()
        }, _circle: function (b, a, c) {
          b.beginPath();
          b.arc(a.x, a.y, c, 0, 2 * D);
          b.stroke();
          b.fill()
        }, _tangents: function (b, a, c, d) {
          var f = b.x - c.x, e = b.y - c.y, g = a - d, h = f * f + e * e;
          if (!(h <= g * g)) {
            var h = pa(h), f = -f / h, e = -e / h, g = g / h, h = [], k, m, l;
            k = pa(K(0, 1 - g * g));
            for (var n = 1; -1 <= n; n -= 2)m = f * g - n * k * e, l = e * g + n * k * f, h.push({
              x1: b.x + a * m << 0,
              y1: b.y + a * l << 0,
              x2: c.x + d * m << 0,
              y2: c.y + d * l << 0
            });
            return h
          }
        }
      }, R                                                                                                                                                                                                                                               = {
        draw: function (b, a, c, d, f, e, g) {
          var h =
                  q / (q - f);
          c = r.project({x: c.x - p, y: c.y - n}, q / (q - d));
          d = {x: 0, y: 0};
          for (var k = {
            x: 0,
            y: 0
          }, m = 0, l = a.length - 3; m < l; m += 2)d.x = a[m] - p, d.y = a[m + 1] - n, k.x = a[m + 2] - p, k.y = a[m + 3] - n, f && (d = r.project(d, h), k = r.project(k, h)), (k.x - d.x) * (c.y - d.y) > (c.x - d.x) * (k.y - d.y) && (b.fillStyle = d.x < k.x && d.y < k.y || d.x > k.x && d.y > k.y ? g : e, b.beginPath(), this._triangle(b, d, k, c), b.closePath(), b.fill())
        }, _triangle: function (b, a, c, d) {
          b.moveTo(a.x, a.y);
          b.lineTo(c.x, c.y);
          b.lineTo(d.x, d.y)
        }, _ring: function (b, a) {
          b.moveTo(a[0] - p, a[1] - n);
          for (var c = 2, d = a.length - 1; c <
          d; c += 2)b.lineTo(a[c] - p, a[c + 1] - n)
        }, shadow: function (b, a, c, d, f) {
          var e = {x: 0, y: 0}, g = {x: 0, y: 0};
          c = z.project({x: c.x - p, y: c.y - n}, d);
          d = 0;
          for (var h = a.length - 3; d < h; d += 2)e.x = a[d] - p, e.y = a[d + 1] - n, g.x = a[d + 2] - p, g.y = a[d + 3] - n, f && (e = z.project(e, f), g = z.project(g, f)), (g.x - e.x) * (c.y - e.y) > (c.x - e.x) * (g.y - e.y) && this._triangle(b, e, g, c)
        }, shadowMask: function (b, a) {
          this._ring(b, a)
        }, hitArea: function (b, a, c, d, f, e) {
          var g = q / (q - f);
          c = r.project({x: c.x - p, y: c.y - n}, q / (q - d));
          d = {x: 0, y: 0};
          var h = {x: 0, y: 0};
          b.fillStyle = e;
          b.beginPath();
          e = 0;
          for (var k =
                       a.length - 3; e < k; e += 2)d.x = a[e] - p, d.y = a[e + 1] - n, h.x = a[e + 2] - p, h.y = a[e + 3] - n, f && (d = r.project(d, g), h = r.project(h, g)), (h.x - d.x) * (c.y - d.y) > (c.x - d.x) * (h.y - d.y) && this._triangle(b, d, h, c);
          b.closePath();
          b.fill()
        }
      }, r                                                                                                                                                                                                                                               = {
        project: function (b, a) {
          return {x: (b.x - M) * a + M << 0, y: (b.y - N) * a + N << 0}
        }, render: function () {
          var b = this.context;
          b.clearRect(0, 0, E, A);
          if (!(x < G || Q)) {
            var a, c, d, f = {x: M + p, y: N + n}, e, g, h, k, m = F.items;
            m.sort(function (a, b) {
              return a.minHeight - b.minHeight || S(b.center, f) - S(a.center, f) || b.height - a.height
            });
            for (var l = 0, q = m.length; l <
            q; l++)if (a = m[l], !ia.isSimple(a) && (e = a.footprint, V(e))) {
              c = 1 > a.scale ? a.height * a.scale : a.height;
              d = 0;
              a.minHeight && (d = 1 > a.scale ? a.minHeight * a.scale : a.minHeight);
              g = a.wallColor || ha;
              h = a.altColor || aa;
              k = a.roofColor || X;
              b.strokeStyle = h;
              switch (a.shape) {
                case "cylinder":
                  w.draw(b, a.center, a.radius, a.radius, c, d, g, h, k);
                  break;
                case "cone":
                  w.draw(b, a.center, a.radius, 0, c, d, g, h);
                  break;
                case "dome":
                  w.draw(b, a.center, a.radius, a.radius / 2, c, d, g, h);
                  break;
                case "sphere":
                  w.draw(b, a.center, a.radius, a.radius, c, d, g, h, k);
                  break;
                case "pyramid":
                  R.draw(b,
                      e, a.center, c, d, g, h);
                  break;
                default:
                  Z.draw(b, e, a.holes, c, d, g, h, k)
              }
              switch (a.roofShape) {
                case "cone":
                  w.draw(b, a.center, a.radius, 0, c + a.roofHeight, c, k, "" + I.parse(k).lightness(0.9));
                  break;
                case "dome":
                  w.draw(b, a.center, a.radius, a.radius / 2, c + a.roofHeight, c, k, "" + I.parse(k).lightness(0.9));
                  break;
                case "pyramid":
                  R.draw(b, e, a.center, c + a.roofHeight, c, k, I.parse(k).lightness(0.9))
              }
            }
          }
        }
      }, ia                                                                                                                                                                                                                                              = {
        maxZoom: G + 2, maxHeight: 5, isSimple: function (b) {
          return x <= this.maxZoom && b.height + b.roofHeight < this.maxHeight
        }, render: function () {
          var b =
                  this.context;
          b.clearRect(0, 0, E, A);
          if (!(x < G || Q || x > this.maxZoom)) {
            for (var a, c, d = F.items, f = 0, e = d.length; f < e; f++)if (a = d[f], !(a.height >= this.maxHeight) && (c = a.footprint, V(c))) {
              switch (b.strokeStyle = a.altColor || aa, b.fillStyle = a.roofColor || X, a.shape) {
                case "cylinder":
                case "cone":
                case "dome":
                case "sphere":
                  w.simplified(b, a.center, a.radius);
                  break;
                default:
                  Z.simplified(b, c, a.holes)
              }
            }
          }
        }
      }, z                                                                                                                                                                                                                                               = {
        enabled: !0,
        color: "#666666",
        blurColor: "#000000",
        blurSize: 15,
        date: new Date,
        direction: {x: 0, y: 0},
        project: function (b, a) {
          return {
            x: b.x +
            this.direction.x * a, y: b.y + this.direction.y * a
          }
        },
        render: function () {
          var b = this.context, a, c, d;
          b.clearRect(0, 0, E, A);
          if (!(!this.enabled || x < G || Q || (a = ja(W + p, fa + n), a = Ha(this.date, a.latitude, a.longitude), 0 >= a.altitude))) {
            c = 1 / ka(a.altitude);
            d = 5 > c ? 0.75 : 1 / c * 5;
            this.direction.x = Fa(a.azimuth) * c;
            this.direction.y = Ea(a.azimuth) * c;
            var f, e, g, h;
            a = F.items;
            b.canvas.style.opacity = d / (2 * B);
            b.shadowColor = this.blurColor;
            b.shadowBlur = B / 2 * this.blurSize;
            b.fillStyle = this.color;
            b.beginPath();
            d = 0;
            for (c = a.length; d < c; d++)if (f = a[d], h =
                    f.footprint, V(h)) {
              e = 1 > f.scale ? f.height * f.scale : f.height;
              g = 0;
              f.minHeight && (g = 1 > f.scale ? f.minHeight * f.scale : f.minHeight);
              switch (f.shape) {
                case "cylinder":
                  w.shadow(b, f.center, f.radius, f.radius, e, g);
                  break;
                case "cone":
                  w.shadow(b, f.center, f.radius, 0, e, g);
                  break;
                case "dome":
                  w.shadow(b, f.center, f.radius, f.radius / 2, e, g);
                  break;
                case "sphere":
                  w.shadow(b, f.center, f.radius, f.radius, e, g);
                  break;
                case "pyramid":
                  R.shadow(b, h, f.center, e, g);
                  break;
                default:
                  Z.shadow(b, h, f.holes, e, g)
              }
              switch (f.roofShape) {
                case "cone":
                  w.shadow(b,
                      f.center, f.radius, 0, e + f.roofHeight, e);
                  break;
                case "dome":
                  w.shadow(b, f.center, f.radius, f.radius / 2, e + f.roofHeight, e);
                  break;
                case "pyramid":
                  R.shadow(b, h, f.center, e + f.roofHeight, e)
              }
            }
            b.closePath();
            b.fill();
            b.shadowBlur = null;
            b.globalCompositeOperation = "destination-out";
            b.beginPath();
            d = 0;
            for (c = a.length; d < c; d++)if (f = a[d], h = f.footprint, V(h) && !f.minHeight) {
              switch (f.shape) {
                case "cylinder":
                case "cone":
                case "dome":
                  w.shadowMask(b, f.center, f.radius);
                  break;
                default:
                  Z.shadowMask(b, h, f.holes)
              }
            }
            b.fillStyle = "#00ff00";
            b.fill();
            b.globalCompositeOperation = "source-over"
          }
        }
      }, Y                                                                                                                                                                                                                                               = {
        _idMapping: [null], reset: function () {
          this._idMapping = [null]
        }, render: function () {
          if (!this._timer) {
            var b = this;
            this._timer = setTimeout(function () {
              b._timer = null;
              b._render()
            }, 500)
          }
        }, _render: function () {
          var b = this.context;
          b.clearRect(0, 0, E, A);
          if (!(x < G || Q)) {
            var a, c, d, f = {x: M + p, y: N + n}, e, g, h = F.items;
            h.sort(function (a, b) {
              return a.minHeight - b.minHeight || S(b.center, f) - S(a.center, f) || b.height - a.height
            });
            for (var k = 0, m = h.length; k < m; k++)if (a = h[k], g = a.hitColor) {
              if (e = a.footprint,
                      V(e)) {
                c = a.height;
                d = 0;
                a.minHeight && (d = a.minHeight);
                switch (a.shape) {
                  case "cylinder":
                    w.hitArea(b, a.center, a.radius, a.radius, c, d, g);
                    break;
                  case "cone":
                    w.hitArea(b, a.center, a.radius, 0, c, d, g);
                    break;
                  case "dome":
                    w.hitArea(b, a.center, a.radius, a.radius / 2, c, d, g);
                    break;
                  case "sphere":
                    w.hitArea(b, a.center, a.radius, a.radius, c, d, g);
                    break;
                  case "pyramid":
                    R.hitArea(b, e, a.center, c, d, g);
                    break;
                  default:
                    Z.hitArea(b, e, a.holes, c, d, g)
                }
                switch (a.roofShape) {
                  case "cone":
                    w.hitArea(b, a.center, a.radius, 0, c + a.roofHeight, c, g);
                    break;
                  case "dome":
                    w.hitArea(b, a.center, a.radius, a.radius / 2, c + a.roofHeight, c, g);
                    break;
                  case "pyramid":
                    R.hitArea(b, e, a.center, c + a.roofHeight, c, g)
                }
              }
            }
            this._imageData = this.context.getImageData(0, 0, E, A).data
          }
        }, getIdFromXY: function (b, a) {
          var c = this._imageData;
          if (c) {
            var d = 4 * ((a | 0) * E + (b | 0));
            return this._idMapping[c[d] | c[d + 1] << 8 | c[d + 2] << 16]
          }
        }, idToColor: function (b) {
          var a = this._idMapping.indexOf(b);
          -1 === a && (this._idMapping.push(b), a = this._idMapping.length - 1);
          return "rgb(" + [a & 255, a >> 8 & 255, a >> 16 & 255].join() + ")"
        }
      }, $, v                                                                                                                                                                                                                                            = {
        container: document.createElement("DIV"),
        items: [], init: function () {
          this.container.style.pointerEvents = "none";
          this.container.style.position = "absolute";
          this.container.style.left = 0;
          this.container.style.top = 0;
          z.context = this.createContext(this.container);
          ia.context = this.createContext(this.container);
          r.context = this.createContext(this.container);
          Y.context = this.createContext()
        }, render: function (b) {
          Ga(function () {
            b || (z.render(), ia.render(), Y.render());
            r.render()
          })
        }, createContext: function (b) {
          var a = document.createElement("CANVAS");
          a.style.transform = "translate3d(0, 0, 0)";
          a.style.imageRendering = "optimizeSpeed";
          a.style.position = "absolute";
          a.style.left = 0;
          a.style.top = 0;
          var c = a.getContext("2d");
          c.lineCap = "round";
          c.lineJoin = "round";
          c.lineWidth = 1;
          c.imageSmoothingEnabled = !1;
          this.items.push(a);
          b && b.appendChild(a);
          return c
        }, appendTo: function (b) {
          b.appendChild(this.container)
        }, remove: function () {
          this.container.parentNode.removeChild(this.container)
        }, setSize: function (b, a) {
          for (var c = 0, d = this.items.length; c < d; c++)this.items[c].width = b, this.items[c].height = a
        }, setPosition: function (b,
                                  a) {
          this.container.style.left = b + "px";
          this.container.style.top = a + "px"
        }
      };
  v.init();
  u = function (b) {
    this.offset = {x: 0, y: 0};
    b && b.addLayer(this)
  };
  t = u.prototype = L.Layer ? new L.Layer : {};
  t.addTo = function (b) {
    b.addLayer(this);
    return this
  };
  t.onAdd = function (b) {
    this.map = b;
    v.appendTo(b._panes.overlayPane);
    var a = this.getOffset(), c = b.getPixelOrigin();
    la({width: b._size.x, height: b._size.y});
    var d = c.y - a.y;
    p = c.x - a.x;
    n = d;
    ma(b._zoom);
    v.setPosition(-a.x, -a.y);
    b.on({
      move: this.onMove, moveend: this.onMoveEnd, zoomstart: this.onZoomStart,
      zoomend: this.onZoomEnd, resize: this.onResize, viewreset: this.onViewReset, click: this.onClick
    }, this);
    if (b.options.zoomAnimation) {
      b.on("zoomanim", this.onZoom, this);
    }
    b.attributionControl && b.attributionControl.addAttribution('&copy; <a href="http://osmbuildings.org">OSM Buildings</a>');
    F.update()
  };
  t.onRemove = function () {
    var b = this.map;
    b.attributionControl && b.attributionControl.removeAttribution('&copy; <a href="http://osmbuildings.org">OSM Buildings</a>');
    b.off({
      move: this.onMove, moveend: this.onMoveEnd, zoomstart: this.onZoomStart,
      zoomend: this.onZoomEnd, resize: this.onResize, viewreset: this.onViewReset, click: this.onClick
    }, this);
    b.options.zoomAnimation && b.off("zoomanim", this.onZoom, this);
    v.remove()
  };
  t.onMove = function (b) {
    b = this.getOffset();
    ea({x: this.offset.x - b.x, y: this.offset.y - b.y})
  };
  t.onMoveEnd = function (b) {
    if (this.noMoveEnd) {
      this.noMoveEnd = !1;
    } else {
      var a = this.map;
      b = this.getOffset();
      var c = a.getPixelOrigin();
      this.offset = b;
      v.setPosition(-b.x, -b.y);
      ea({x: 0, y: 0});
      la({width: a._size.x, height: a._size.y});
      a = c.y - b.y;
      p = c.x - b.x;
      n = a;
      v.render();
      F.update()
    }
  };
  t.onZoomStart = function (b) {
    Q = !0;
    v.render()
  };
  t.onZoom = function (b) {
  };
  t.onZoomEnd = function (b) {
    b = this.map;
    var a = this.getOffset(), c = b.getPixelOrigin(), d = c.y - a.y;
    p = c.x - a.x;
    n = d;
    b = b._zoom;
    Q = !1;
    ma(b);
    F.update();
    v.render();
    this.noMoveEnd = !0
  };
  t.onResize = function () {
  };
  t.onViewReset = function () {
    var b = this.getOffset();
    this.offset = b;
    v.setPosition(-b.x, -b.y);
    ea({x: 0, y: 0})
  };
  t.onClick = function (b) {
    var a = Y.getIdFromXY(b.containerPoint.x, b.containerPoint.y);
    a && ua({feature: a, lat: b.latlng.lat, lon: b.latlng.lng})
  };
  t.getOffset = function () {
    return L.DomUtil.getPosition(this.map._mapPane)
  };
  t.style = function (b) {
    b = b || {};
    var a;
    if (a = b.color || b.wallColor) {
      H = I.parse(a), ha = "" + H.alpha(B), ba = H.lightness(0.8), aa = "" + ba.alpha(B), O = H.lightness(1.2), X = "" + O.alpha(B);
    }
    b.roofColor && (O = I.parse(b.roofColor), X = "" + O.alpha(B));
    void 0 !== b.shadows && (z.enabled = !!b.shadows);
    v.render();
    return this
  };
  t.date = function (b) {
    z.date = b;
    z.render();
    return this
  };
  t.load = function (b) {
    F.load(b);
    return this
  };
  t.set = function (b) {
    F.set(b);
    return this
  };
  var ta = function () {
  };
  t.each = function (b) {
    ta = function (a) {
      return b(a)
    };
    return this
  };
  var ua = function () {
  };
  t.click = function (b) {
    ua = function (a) {
      return b(a)
    };
    return this
  };
  u.VERSION = "0.2.2b";
  u.ATTRIBUTION = '&copy; <a href="http://osmbuildings.org">OSM Buildings</a>';
  ca.OSMBuildings = u
})(this);