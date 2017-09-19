import './index.scss';
import '../src/energy-label.component';

angular.module('demo', ['EnergyLabel'])
  .config(demoConfiguration)
  .controller('DemoController', demoController);

let availableClassList;

function demoConfiguration(energyLabelConfigProvider, DEFAULT_ENERGY_CLASS_LIST) {
  availableClassList = ['A+++', 'A++', 'A+'].concat(DEFAULT_ENERGY_CLASS_LIST);
  availableClassList.push('H');
  let modifiedList = DEFAULT_ENERGY_CLASS_LIST.slice(0, DEFAULT_ENERGY_CLASS_LIST.length - 2);
  modifiedList = ['A++', 'A+'].concat(modifiedList);
  energyLabelConfigProvider.setEnergyClassList(modifiedList);
}

demoController.$inject = ['DEFAULT_ENERGY_CLASS_LIST'];
function demoController(DEFAULT_ENERGY_CLASS_LIST) {
  const vm = this;
  vm.availableClassList = availableClassList;
  vm.selectedClass = DEFAULT_ENERGY_CLASS_LIST[0];

  vm.originalClassList = DEFAULT_ENERGY_CLASS_LIST;
  vm.customClassList = vm.availableClassList.slice(1, vm.availableClassList.length - 2);
}
