angular.module('EnergyLabel')
  .provider('energyLabelConfig', energyLabelConfigProvider);

energyLabelConfigProvider.$inject = ['DEFAULT_ENERGY_CLASS_LIST'];
function energyLabelConfigProvider(DEFAULT_ENERGY_CLASS_LIST) {
  this.energyClassList = DEFAULT_ENERGY_CLASS_LIST;

  this.setEnergyClassList = energyClassList => {
    this.energyClassList = energyClassList;
  };

  this.$get = () => this;
}
