// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"aYSqb":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "69f74e7f31319ffd";
module.bundle.HMR_BUNDLE_ID = "e0a790000286e88d";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F1() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                } // Render the fancy html overlay
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
            document.body.appendChild(overlay);
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>\n          ").concat(stack, "\n        </pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>' + hint + '</div>';
            }).join(''), "\n        </div>\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') {
        reloadCSS();
        return;
    }
    var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
    if (deps) {
        var fn = new Function('require', 'module', 'exports', asset.output);
        modules[asset.id] = [
            fn,
            deps
        ];
    } else if (bundle.parent) hmrApply(bundle.parent, asset);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    return getParents(module.bundle.root, id).some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"atUkZ":[function(require,module,exports) {
const { next  } = require('.');
const graphics = (()=>{
    let previousGrid;
    function render(canvas, grid, cellWidth) {
        const ctx = canvas.getContext('2d');
        for(let i = 0; i < grid.length; i++)for(let j = 0; j < grid[i].length; j++){
            const cell = grid[i][j];
            // Only re-draw if cell has changed
            if (!previousGrid || cell !== previousGrid[i][j]) {
                ctx.beginPath();
                ctx.strokeStyle = '#555555';
                ctx.fillStyle = cell ? '#ffffff' : '#000000';
                ctx.lineWidth = 1;
                ctx.rect(j * cellWidth, i * cellWidth, cellWidth, cellWidth);
                ctx.fill();
                ctx.stroke();
            }
        }
        previousGrid = grid;
    }
    function resizeCanvasToDisplaySize(canvas) {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            return true;
        }
        return false;
    }
    function requestAnimationFrame(cb, getInterval) {
        let last;
        function run(timestamp) {
            if (last === undefined) last = timestamp;
            const elapsed = timestamp - last;
            if (elapsed > getInterval()) {
                last = timestamp;
                cb();
            }
            window.requestAnimationFrame(run);
        }
        window.requestAnimationFrame(run);
    }
    return {
        render,
        resizeCanvasToDisplaySize,
        requestAnimationFrame
    };
})();
const grids = (()=>{
    function create(w, h, valFunc = (i, j)=>false
    ) {
        const grid = [];
        for(let i = 0; i < h; i++){
            const r = [];
            for(let j = 0; j < w; j++)r.push(valFunc(i, j));
            grid.push(r);
        }
        return grid;
    }
    function random(w, h, fractionLive = 0.25) {
        const b = 0.8;
        return create(w, h, (i, j)=>{
            return(// Cover only the middle b% of the grid
            i / h > 1 - b && i / h < b && j / w > 1 - b && j / w < b && Math.random() < fractionLive);
        });
    }
    function getPopulation(grid) {
        let c = 0;
        for(let i = 0; i < grid.length; i++){
            for(let j = 0; j < grid[i].length; j++)if (grid[i][j]) c++;
        }
        return c;
    }
    return {
        random,
        create,
        getPopulation
    };
})();
const game = (()=>{
    const generationsCountElement = document.getElementById('generations-count');
    const populationCountElement = document.getElementById('population-count');
    const startButtonElement = document.getElementById('start');
    const clearButtonElement = document.getElementById('clear');
    const randomButtonElement = document.getElementById('random');
    const speedControlElement = document.getElementById('speed');
    const speedValueElement = document.getElementById('speed-value');
    const canvasElement = document.querySelector('canvas');
    let cellWidthInPixels;
    let _grid, _isPlaying = false, _numGens = 0, w, h, speed;
    function updateGrid(gridFunc) {
        _grid = gridFunc(_grid);
        graphics.render(canvasElement, _grid, cellWidthInPixels);
        populationCountElement.textContent = String(grids.getPopulation(_grid));
    }
    function init() {
        cellWidthInPixels = getCellWidth();
        initSpeed();
        w = Math.ceil(window.innerWidth / cellWidthInPixels);
        h = Math.ceil(window.innerHeight / cellWidthInPixels);
        startButtonElement.addEventListener('click', onClickPlay);
        clearButtonElement.addEventListener('click', onClickClear);
        randomButtonElement.addEventListener('click', onClickRandom);
        speedControlElement.addEventListener('change', onChangeSpeed);
        document.addEventListener('keydown', onKeyDown);
        // Event listeners for dragging
        {
            let isMouseBeingDragged = false;
            let dragValue; // value the cells dragged over should be
            let isPlayingBeforeDrag;
            canvasElement.addEventListener('mousedown', (evt)=>{
                isMouseBeingDragged = true;
                isPlayingBeforeDrag = _isPlaying;
                setIsPlaying(false);
                const { col , row  } = getRowAndCol(evt);
                dragValue = !_grid[row][col];
                updateGrid((grid)=>setCellValue(grid, row, col)
                );
            });
            canvasElement.addEventListener('mousemove', (evt)=>{
                if (isMouseBeingDragged) {
                    const { col , row  } = getRowAndCol(evt);
                    updateGrid((grid)=>setCellValue(grid, row, col)
                    );
                }
            });
            canvasElement.addEventListener('mouseup', (evt)=>{
                if (isMouseBeingDragged) {
                    const { col , row  } = getRowAndCol(evt);
                    updateGrid((grid)=>setCellValue(grid, row, col)
                    );
                    isMouseBeingDragged = false;
                    isPlayingBeforeDrag && setIsPlaying(true);
                }
            });
            function getRowAndCol(evt) {
                return {
                    col: Math.floor(evt.clientX / cellWidthInPixels),
                    row: Math.floor(evt.clientY / cellWidthInPixels)
                };
            }
            function setCellValue(grid, row, col) {
                if (grid[row][col] === dragValue) return grid;
                const newGrid = grid.map((row1)=>[
                        ...row1
                    ]
                );
                newGrid[row][col] = dragValue;
                return newGrid;
            }
        }
        graphics.resizeCanvasToDisplaySize(canvasElement);
        // Start game
        updateGrid(()=>grids.create(w, h)
        );
        graphics.requestAnimationFrame(()=>{
            if (_isPlaying) {
                incrNumGens();
                updateGrid((grid)=>next(grid)
                );
            }
        }, ()=>speed * 1000
        );
    }
    function getCellWidth() {
        const url = new URL(window.location.href);
        const size = url.searchParams.get('size');
        switch(size){
            case 'lg':
                return Math.max(50, Math.max(window.innerHeight / 50, window.innerWidth / 50));
            default:
                return 20;
        }
    }
    function initSpeed() {
        const url = new URL(window.location.href);
        const speed1 = +url.searchParams.get('speed') || 1;
        updateSpeed(speed1);
    }
    function onChangeSpeed(evt) {
        const gensPerSec = Math.pow(evt.target.value, 2); // from 0.1->7.07 to 0.01->50
        updateSpeed(gensPerSec);
    }
    function updateSpeed(gensPerSec) {
        speed = 1 / gensPerSec;
        speedValueElement.textContent = gensPerSec.toFixed(2);
        speedControlElement.value = Math.pow(gensPerSec, 0.5);
    }
    function onKeyDown(evt) {
        if (!evt.ctrlKey && !evt.metaKey) switch(evt.key){
            case 'p':
            case 'P':
                onClickPlay();
                break;
            case 'c':
            case 'C':
                onClickClear();
                break;
            case 'r':
            case 'R':
                onClickRandom();
                break;
        }
    }
    function onClickPlay() {
        toggleIsPlaying();
    }
    function onClickClear() {
        setIsPlaying(false);
        resetNumGens();
        updateGrid(()=>grids.create(w, h)
        );
    }
    function onClickRandom() {
        resetNumGens();
        updateGrid(()=>grids.random(w, h)
        );
    }
    function incrNumGens() {
        generationsCountElement.textContent = String(_numGens++);
    }
    function resetNumGens() {
        _numGens = 0;
        generationsCountElement.textContent = '0';
    }
    function toggleIsPlaying() {
        setIsPlaying(!_isPlaying);
    }
    function setIsPlaying(isPlaying) {
        _isPlaying = isPlaying;
        startButtonElement.textContent = _isPlaying ? 'Pause (P)' : 'Play (P)';
    }
    return {
        init
    };
})();
game.init();

},{".":"29JuH"}],"29JuH":[function(require,module,exports) {
function next(grid) {
    const nextGrid = new Array(grid.length);
    for(let i = 0; i < grid.length; i++)nextGrid[i] = new Array(grid[i].length);
    for(let x = 0; x < grid.length; x++)for(let y = 0; y < grid[x].length; y++){
        let c = 0;
        for(let dx = -1; dx <= 1; dx++){
            for(let dy = -1; dy <= 1; dy++)if (!(dx === 0 && dy === 0) && typeof grid[x + dx] !== 'undefined' && typeof grid[x + dx][y + dy] !== 'undefined' && grid[x + dx][y + dy]) c++;
        }
        nextGrid[x][y] = grid[x][y] ? c === 2 || c === 3 : c === 3;
    }
    return nextGrid;
}
module.exports = {
    next
};

},{}]},["aYSqb","atUkZ"], "atUkZ", "parcelRequire4bfa")

//# sourceMappingURL=index.0286e88d.js.map
