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

You can customize colors and bars width using CSS or (better) with SASS:
```sass
@import '../../node_modules/bourbon/app/assets/stylesheets/bourbon';

$energy-label-class-label-count: 11;
$energy-label-class-label-colors: #c5cae9 #9fa8da #7986cb
                                  #5c6bc0 #3f51b5 #3949ab
                                  #303f9f #283593 #1a237e
                                  #121e61 #020933;
$energy-label-class-label-disabled: #f3c1c1;
$energy-label-class-label-width: 15%;
$energy-label-class-label-add-width: 3%;

@import '../../dist/angular-energy-label.scss';
```
Please note that [Bourbon](http://bourbon.io) is a required peer dependency when using SASS, you have to
install it in your project (just `npm install bourbon`).

## Examples

To run the provided examples clone the repository and install:
```
git clone git@github.com:destegabry/angular-energy-label.git
cd angular-energy-label
npm install -g gulp-cli && npm install
```

Then run
```
gulp serve:examples
```

Open your browser to the URL output in the terminal (defaults to [http://localhost:3000](http://localhost:3000)).

Just play with the code, the page will be reload automagically.

## Todo

- add sourcemaps in builds
- add support to Bower
- implement unit test
- SASS mixin
