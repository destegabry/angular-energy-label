angular.module('demo', ['EnergyLabel'])
  .config(demoConfiguration)
  .controller('DemoController', demoController);

var availableEnergyClassList;

function demoConfiguration(energyLabelConfigProvider, DEFAULT_ENERGY_CLASS_LIST) {
  availableEnergyClassList = ['A++', 'A+'].concat(DEFAULT_ENERGY_CLASS_LIST).slice(0, 7);
  energyLabelConfigProvider.setEnergyClassList(availableEnergyClassList);
}

demoController.$inject = ['DEFAULT_ENERGY_CLASS_LIST'];
function demoController(DEFAULT_ENERGY_CLASS_LIST) {
  this.availableEnergyClassList = availableEnergyClassList;
  this.customEnergyClassList = DEFAULT_ENERGY_CLASS_LIST.slice(2, 7).concat(['H', 'I']);
}
