import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import moment from "moment";
import DateTimePickerIcons from "./DateTimePickerIcons.js";

export default class DateTimePickerMonths extends Component {
  static propTypes = {
    subtractYear: PropTypes.func.isRequired,
    addYear: PropTypes.func.isRequired,
    viewDate: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    showYears: PropTypes.func.isRequired,
    setViewMonth: PropTypes.func.isRequired
  }

  renderMonths = () => {
    let currentLocaleData = moment.localeData(this.props.viewDate.locale());
    var classes, i, month, months, monthsShort;
    month = this.props.selectedDate.month();
    i = 0;
    months = [];
    while (i < 12) {
      classes = {
        month: true,
        "active": i === month && this.props.viewDate.year() === this.props.selectedDate.year()
      };
      months.push(<span key={i} className={classnames(classes)} onClick={this.props.setViewMonth}>{currentLocaleData.monthsShort(this.props.viewDate.month(i))}</span>);
      i++;
    }
    return months;
  }

  render() {
    return (
    <div className="datepicker-months" style={{display: "block"}}>
          <table className="table-condensed">
            <thead>
              <tr>
                <th className="prev" data-action="previous" onClick={this.props.subtractYear} >
                  <DateTimePickerIcons icons={this.props.icons} glyph="previous" />
                </th>

                <th className="picker-switch" data-action="pickerSwitch" colSpan="5" onClick={this.props.showYears}>{this.props.viewDate.year()}</th>

                <th className="next" data-action="next" onClick={this.props.addYear} >
                  <DateTimePickerIcons icons={this.props.icons} glyph="next" />
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="7">{this.renderMonths()}</td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
}
