
var primaryColor = themeStyle && themeStyle.colors && themeStyle.colors.primary;
var isSquared = themeStyle && themeStyle.square;

if (primaryColor) {
  var siteTheme = gbifReactComponents.themeBuilder.extend({baseTheme: 'light', extendWith: {
    primary: primaryColor,
    borderRadius: isSquared? 0 : 3
  }});
}

var leaf1 = "POLYGON((-126.90857 -32.29178,-97.60803 -33.32135,-54.40979 -47.11126,7.73987 -52.25471,101.15112 -47.50236,163.48755 -27.0102,114.71924 12.20044,28.30627 25.9778,-50.44922 -0.48339,-35.39795 50.04656,-65.8905 82.3806,-84.57825 78.93455,-98.44299 50.88224,-73.65784 0.56579,-126.90857 -32.29178))";
var leaf2 = "POLYGON((-20.4895 34.12999,41.56128 45.72536,80.97473 80.29422,-8.46497 65.28199,-20.4895 34.12999))";
var siteConfig = {
  rootPredicate: {
    type: 'and', predicates: [
      { key: 'mediaTypes', type: 'equals', value: 'StillImage'},
      { key :'hasCoordinate', type: 'equals', value: true},
      { key :'basisOfRecord', type: 'in', values: ['PRESERVED_SPECIMEN', 'MATERIAL_SAMPLE']},
    ]
  }
};
