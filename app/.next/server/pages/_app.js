"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/auth */ \"./utils/auth.ts\");\n\n\n\nfunction App({ Component, pageProps }) {\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const role = (0,_utils_auth__WEBPACK_IMPORTED_MODULE_2__.getUserRole)();\n        if (window.location.pathname.includes(\"/dashboard\") && role !== \"instructor\" && role !== \"admin\") {\n            window.location.href = \"/student-home\";\n        }\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps\n    }, void 0, false, {\n        fileName: \"/Users/yanyu/Mcp- Edge/app/pages/_app.tsx\",\n        lineNumber: 11,\n        columnNumber: 10\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWtDO0FBQ1U7QUFFN0IsU0FBU0UsSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNsREosZ0RBQVNBLENBQUM7UUFDUixNQUFNSyxPQUFPSix3REFBV0E7UUFDeEIsSUFBSUssT0FBT0MsUUFBUSxDQUFDQyxRQUFRLENBQUNDLFFBQVEsQ0FBQyxpQkFBaUJKLFNBQVMsZ0JBQWdCQSxTQUFTLFNBQVM7WUFDaEdDLE9BQU9DLFFBQVEsQ0FBQ0csSUFBSSxHQUFHO1FBQ3pCO0lBQ0YsR0FBRyxFQUFFO0lBQ0wscUJBQU8sOERBQUNQO1FBQVcsR0FBR0MsU0FBUzs7Ozs7O0FBQ2pDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWNwLWVkZ2UtYXBwLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnZXRVc2VyUm9sZSB9IGZyb20gJy4uL3V0aWxzL2F1dGgnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgcm9sZSA9IGdldFVzZXJSb2xlKCk7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5pbmNsdWRlcygnL2Rhc2hib2FyZCcpICYmIHJvbGUgIT09ICdpbnN0cnVjdG9yJyAmJiByb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvc3R1ZGVudC1ob21lJztcbiAgICB9XG4gIH0sIFtdKTtcbiAgcmV0dXJuIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz47XG59Il0sIm5hbWVzIjpbInVzZUVmZmVjdCIsImdldFVzZXJSb2xlIiwiQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwicm9sZSIsIndpbmRvdyIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJpbmNsdWRlcyIsImhyZWYiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./utils/auth.ts":
/*!***********************!*\
  !*** ./utils/auth.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getUserRole: () => (/* binding */ getUserRole)\n/* harmony export */ });\nfunction getUserRole() {\n    const token = localStorage.getItem(\"jwt-token\");\n    if (!token) return \"guest\";\n    const payload = JSON.parse(atob(token.split(\".\")[1]));\n    return payload.role;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9hdXRoLnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTyxTQUFTQTtJQUNkLE1BQU1DLFFBQVFDLGFBQWFDLE9BQU8sQ0FBQztJQUNuQyxJQUFJLENBQUNGLE9BQU8sT0FBTztJQUNuQixNQUFNRyxVQUFVQyxLQUFLQyxLQUFLLENBQUNDLEtBQUtOLE1BQU1PLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUNuRCxPQUFPSixRQUFRSyxJQUFJO0FBQ3JCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWNwLWVkZ2UtYXBwLy4vdXRpbHMvYXV0aC50cz9iMzhhIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyUm9sZSgpIHtcbiAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnand0LXRva2VuJyk7XG4gIGlmICghdG9rZW4pIHJldHVybiAnZ3Vlc3QnO1xuICBjb25zdCBwYXlsb2FkID0gSlNPTi5wYXJzZShhdG9iKHRva2VuLnNwbGl0KCcuJylbMV0pKTtcbiAgcmV0dXJuIHBheWxvYWQucm9sZTtcbn0iXSwibmFtZXMiOlsiZ2V0VXNlclJvbGUiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiYXRvYiIsInNwbGl0Iiwicm9sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./utils/auth.ts\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();