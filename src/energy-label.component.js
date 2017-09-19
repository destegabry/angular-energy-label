angular
  .module('EnergyLabel', [])
  .constant('DEFAULT_ENERGY_CLASS_LIST', 'ABCDEFG'.split(''))
  .provider('energyLabelConfig', energyLabelConfigProvider)
  .component('energyLabel', {
    bindings: {
      value: '<',
      classList: '<?'
    },
    templateUrl: 'energy-label.template.html',
    controller: energyClassController
  });

energyLabelConfigProvider.$inject = ['DEFAULT_ENERGY_CLASS_LIST'];
function energyLabelConfigProvider(DEFAULT_ENERGY_CLASS_LIST) {
  this.energyClassList = DEFAULT_ENERGY_CLASS_LIST;

  this.setEnergyClassList = energyClassList => {
    this.energyClassList = energyClassList;
  };

  this.$get = () => this;
}

energyClassController.$inject = ['energyLabelConfig'];
function energyClassController(energyLabelConfig) {
  this.checkValue = () => {
    this.disabled = this.classList.indexOf(this.value) < 0;
  };

  this.$onChanges = changes => {
    if (changes.value && !changes.value.isFirstChange()) {
      this.checkValue();
    }
  };

  this.$onInit = () => {
    this.classList = this.classList || energyLabelConfig.energyClassList;
    this.checkValue();
  };
}
