# AngularJS EU Energy Label component

A simple AngularJS (1.5+) component to display an [EU Energy Label](http://europa.eu/youreurope/business/environment/energy-labels/).

## Install

**NPM**
```
npm install angular-energy-label --save
```

**Yarn**
```
yarn add angular-energy-label
```

## Quick Start

Include `EnergyLabel` between your application dependencies:

```javascript
angular.module('yourAngularJSApp', ['EnergyLabel'])
```

Then use it in a template

```html
<energy-label value="'A'"></energy-label>
```

Maybe you would like to bind the value on an expression result:
```html
<energy-label value="yourController.selectedEnergyClass"></energy-label>
```

## Customization

You can customize the energy class labels locally passing an array of strings to the component:
```html
<energy-label value="yourController.selectedEnergyClass"
              class-list="yourController.customEnergyClassList">
</energy-label>
```

You can also customize the labels globally using the `energyLabelConfigProvider` during the config phase:
```javascript
angular.module('demo', ['EnergyLabel'])
  .config(['energyLabelConfigProvider', function (energyLabelConfigProvider) {
    energyLabelConfigProvider.setEnergyClassList(['A+++', 'A++', 'A+', 'A', 'B', 'C', 'D']);
  }]);
```

## Todo

- add support to Bower
- implement unit test
