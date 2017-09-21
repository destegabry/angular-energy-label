angular.module('demo', ['EnergyLabel'])
  .controller('DemoController', demoController);

demoController.$inject = ['DEFAULT_ENERGY_CLASS_LIST'];
function demoController(DEFAULT_ENERGY_CLASS_LIST) {
  this.availableEnergyClassList = DEFAULT_ENERGY_CLASS_LIST;
}
