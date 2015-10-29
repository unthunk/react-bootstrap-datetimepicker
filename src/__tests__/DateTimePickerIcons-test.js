import React from "react/addons";
import Constants from "../Constants.js";
jest.dontMock("../DateTimePickerIcons.js");
const { TestUtils } = React.addons;

describe("DateTimePickerIcons",function() {
  const DateTimePickerIcons = require("../DateTimePickerIcons.js");
  let icon, customIcons;

  describe("UI", function() {
    it("renders an icon with a default class", function() {
      icon = TestUtils.renderIntoDocument(
        <DateTimePickerIcons
          glyph="time"
         />
      );
      const iconElement = TestUtils.scryRenderedDOMComponentsWithClass(icon, "glyphicon-time");
      expect(iconElement.length).toBe(1);
      expect(iconElement[0].props.className).toBe("glyphicon glyphicon-time");
    });

    it("renders an icon with a custom class", function() {
      icon = TestUtils.renderIntoDocument(
        <DateTimePickerIcons
          glyph="time"
          icons={{time: 'fa fa-clock-o'}}
         />
      );
      const iconElement = TestUtils.scryRenderedDOMComponentsWithClass(icon, "fa-clock-o");
      expect(iconElement.length).toBe(1);
      expect(iconElement[0].props.className).toBe("fa fa-clock-o");
    });

    it("renders an icon with a default class when custom icons are passes in without an override for that icon", function() {
      icon = TestUtils.renderIntoDocument(
        <DateTimePickerIcons
          glyph="time"
          icons={{date: 'fa fa-calendar'}}
         />
      );
      const iconElement = TestUtils.scryRenderedDOMComponentsWithClass(icon, "glyphicon-time");
      expect(iconElement.length).toBe(1);
      expect(iconElement[0].props.className).toBe("glyphicon glyphicon-time");
    });
  });

});
