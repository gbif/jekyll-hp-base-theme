
var primaryColor = themeStyle && themeStyle.colors && themeStyle.colors.primary;
var isSquared = themeStyle && themeStyle.square;

if (primaryColor) {
  var siteTheme = gbifReactComponents.themeBuilder.extend({baseTheme: 'light', extendWith: {
    primary: primaryColor,
    borderRadius: isSquared? 0 : 3
  }});
}

// var siteConfig = {};
var siteConfig = {
  rootPredicate: {
    "type": "and",
    "predicates": [
   		{
        "type":"equals",
        "key": "countryCode",
        "value": "DK"
      },
      {
        "type": "equals",
        "key": "notIssues",
        "value": "COUNTRY_COORDINATE_MISMATCH"
      }
    ]
  }
};
