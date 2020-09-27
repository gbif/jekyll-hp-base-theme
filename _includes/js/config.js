
var primaryColor = themeStyle && themeStyle.colors && themeStyle.colors.primary;

if (primaryColor) {
  var siteTheme = gbifReactComponents.themeBuilder.extend({baseTheme: 'light', extendWith: {
    primary: primaryColor
  }});
}