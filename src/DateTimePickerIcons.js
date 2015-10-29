import React, { Component, PropTypes } from "react";

export default class DateTimePickerIcons extends Component {
  static defaultProps = {
    defaultIcons: {
        time: 'glyphicon glyphicon-time',
        date: 'glyphicon glyphicon-calendar',
        up: 'glyphicon glyphicon-chevron-up',
        down: 'glyphicon glyphicon-chevron-down',
        previous: 'glyphicon glyphicon-chevron-left',
        next: 'glyphicon glyphicon-chevron-right',
        today: 'glyphicon glyphicon-screenshot',
        clear: 'glyphicon glyphicon-trash',
        close: 'glyphicon glyphicon-remove'
    }
  }

  getIcon = () => {
    var ret = this.props.icons && this.props.icons[this.props.glyph] ? this.props.icons[this.props.glyph] : this.props.defaultIcons[this.props.glyph];
    return ret;
  }

  getClasses = () => {
    var ret = this.props.className ? "" + this.props.className + " " + this.getIcon() : this.getIcon();
    return ret;
  }

  render() {
    return (
      <span {...this.props} className={this.getClasses()}>
        {this.props.children}
      </span>
    );
  }
}
