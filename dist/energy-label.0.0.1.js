webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(6);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);__webpack_require__(3);__webpack_require__(4);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

angular.module('EnergyLabel',[]).constant('DEFAULT_ENERGY_CLASS_LIST','ABCDEFG'.split(''));

/***/ }),
/* 3 */
/***/ (function(module, exports) {

angular.module('EnergyLabel').provider('energyLabelConfig',energyLabelConfigProvider);energyLabelConfigProvider.$inject=['DEFAULT_ENERGY_CLASS_LIST'];function energyLabelConfigProvider(DEFAULT_ENERGY_CLASS_LIST){this.energyClassList=DEFAULT_ENERGY_CLASS_LIST;this.setEnergyClassList=energyClassList=>{this.energyClassList=energyClassList;};this.$get=()=>this;}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('EnergyLabel').component('energyLabel',{bindings:{value:'<',classList:'<?'},template:__webpack_require__(5),controller:energyClassController});energyClassController.$inject=['energyLabelConfig'];function energyClassController(energyLabelConfig){this.checkValue=()=>{this.disabled=this.classList.indexOf(this.value)<0;};this.$onChanges=changes=>{if(changes.value&&!changes.value.isFirstChange()){this.checkValue();}};this.$onInit=()=>{this.classList=this.classList||energyLabelConfig.energyClassList;this.checkValue();};}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<div class=energy-label>\n  <div class=\"energy-class energy-class-label-{{::class}} energy-class-index-{{::$index}}\" ng-repeat=\"class in $ctrl.classList\" ng-class=\"{'energy-class-selected': class === $ctrl.value, 'energy-class-disabled': $ctrl.disabled}\">\n    <div class=energy-class-label>\n      {{::class}}\n    </div>\n    <div class=energy-class-value ng-if=\"class === $ctrl.value\">\n      {{::class}}\n    </div>\n  </div>\n</div>\n";

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[0]);
//# sourceMappingURL=energy-label.0.0.1.js.map