angular.module('EnergyLabel')
  .component('energyLabel', {
    bindings: {
      value: '<',
      classList: '<?'
    },
    template: require('./energy-label.template.html'),
    controller: energyClassController
  });

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
