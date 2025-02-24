// Inspired from umdjs
// See https://github.com/umdjs/umd/blob/master/templates/returnExports.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([
            'i18next',
            'i18next-xhr-backend',
            'i18next-browser-languagedetector',
            'jszip',
            'konva',
            'magic-wand-tool'
        ], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.

        // i18next-xhr-backend: requires XMlHttpRequest
        // Konva: requires 'canvas'
        module.exports = factory(
            require('i18next'),
            require('i18next-xhr-backend'),
            require('i18next-browser-languagedetector'),
            require('jszip'),
            require('konva/cmj'),
            require('magic-wand-tool')
        );
    } else {
        // Browser globals (root is window)
        root.dwv = factory(
            root.i18next,
            root.i18nextXHRBackend,
            root.i18nextBrowserLanguageDetector,
            root.JSZip,
            root.Konva,
            root.MagicWand
        );
    }
}(this, function (
    i18next,
    i18nextXHRBackend,
    i18nextBrowserLanguageDetector,
    JSZip,
    Konva,
    MagicWand) {

    // similar to what browserify does but reversed
    // https://www.contentful.com/blog/2017/01/17/the-global-object-in-javascript/
    var window = typeof window !== 'undefined' ?
        window : typeof self !== 'undefined' ?
        self : typeof global !== 'undefined' ?
        global : {};

    // latest i18next (>v17) does not export default
    // see #862 and https://github.com/i18next/i18next/commit/7c6c235
    if (typeof i18next !== 'undefined' &&
      typeof i18next.t === 'undefined') {
      i18next = i18next.default;
    }

    // Konva (>=v8) comes as a module, see #1044
    if (typeof Konva !== 'undefined' &&
      typeof Konva.Group === 'undefined') {
      Konva = Konva.default;
    }
