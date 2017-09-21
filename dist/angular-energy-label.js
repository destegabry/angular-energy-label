/**
 * angular-energy-label - An EU Energy Label component for AngularJS 1.5+
 * Version v0.0.1
 * Homepage: https://github.com/destegabry/angular-energy-label
 * Author: Gabriele Destefanis <gabriele.destefanis@gmail.com> (http://destefanis.eu/)
 */
;(function() {
'use strict';

angular.module('EnergyLabel', []).constant('DEFAULT_ENERGY_CLASS_LIST', 'ABCDEFG'.split(''));

angular.module('EnergyLabel').provider('energyLabelConfig', energyLabelConfigProvider);

energyLabelConfigProvider.$inject = ['DEFAULT_ENERGY_CLASS_LIST'];
function energyLabelConfigProvider(DEFAULT_ENERGY_CLASS_LIST) {
  var _this = this;

  this.energyClassList = DEFAULT_ENERGY_CLASS_LIST;

  this.setEnergyClassList = function (energyClassList) {
    _this.energyClassList = energyClassList;
  };

  this.$get = function () {
    return _this;
  };
}

angular.module('EnergyLabel').component('energyLabel', {
  bindings: {
    value: '<',
    classList: '<?'
  },
  template: '<div class="energy-label"><div class="energy-class energy-class-label-{{::class}} energy-class-index-{{::$index}}" ng-repeat="class in $ctrl.classList" ng-class="{\'energy-class-selected\': class === $ctrl.value, \'energy-class-disabled\': $ctrl.disabled}"><div class="energy-class-label">{{::class}}</div><div class="energy-class-value" ng-if="class === $ctrl.value">{{::class}}</div></div></div>',
  controller: energyClassController
});

energyClassController.$inject = ['energyLabelConfig'];
function energyClassController(energyLabelConfig) {
  var _this2 = this;

  this.checkValue = function () {
    _this2.disabled = _this2.classList.indexOf(_this2.value) < 0;
  };

  this.$onChanges = function (changes) {
    if (changes.value && !changes.value.isFirstChange()) {
      _this2.checkValue();
    }
  };

  this.$onInit = function () {
    _this2.classList = _this2.classList || energyLabelConfig.energyClassList;
    _this2.checkValue();
  };
}
}());
