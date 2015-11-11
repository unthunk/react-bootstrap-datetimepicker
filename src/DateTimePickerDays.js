import React, { Component, PropTypes } from "react";
import moment from "moment";
import classnames from "classnames";
import DateTimePickerIcons from "./DateTimePickerIcons.js";

export default class DateTimePickerDays extends Component {
  static propTypes = {
    subtractMonth: PropTypes.func.isRequired,
    addMonth: PropTypes.func.isRequired,
    viewDate: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    showToday: PropTypes.bool,
    daysOfWeekDisabled: PropTypes.array,
    setSelectedDate: PropTypes.func.isRequired,
    showMonths: PropTypes.func.isRequired,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    calendarFormat: PropTypes.string
  }

  static defaultProps = {
    showToday: true
  }

  renderDays = () => {
    var cells, classes, days, html, month, nextMonth, prevMonth, minDate, maxDate, row, year;
    year = this.props.viewDate.year();
    month = this.props.viewDate.month();
    prevMonth = this.props.viewDate.clone().subtract(1, "months");
    days = prevMonth.daysInMonth();
    prevMonth.date(days).startOf("week");
    nextMonth = moment(prevMonth).clone().add(42, "d");
    minDate = this.props.minDate ? this.props.minDate.clone().subtract(1, "days") : this.props.minDate;
    maxDate = this.props.maxDate ? this.props.maxDate.clone() : this.props.maxDate;
    html = [];
    cells = [];
    while (prevMonth.isBefore(nextMonth)) {
      classes = {
        day: true
      };
      if (prevMonth.year() < year || (prevMonth.year() === year && prevMonth.month() < month)) {
        classes.old = true;
      } else if (prevMonth.year() > year || (prevMonth.year() === year && prevMonth.month() > month)) {
        classes.new = true;
      }
      if (prevMonth.isSame(moment({
        y: this.props.selectedDate.year(),
        M: this.props.selectedDate.month(),
        d: this.props.selectedDate.date()
      }))) {
        classes.active = true;
      }
      if (this.props.showToday) {
        if (prevMonth.isSame(moment(), "day")) {
          classes.today = true;
        }
      }
      if ((minDate && prevMonth.isBefore(minDate)) || (maxDate && prevMonth.isAfter(maxDate))) {
        classes.disabled = true;
      }
      if (this.props.daysOfWeekDisabled.length > 0) classes.disabled = this.props.daysOfWeekDisabled.indexOf(prevMonth.day()) !== -1;
      cells.push(<td key={prevMonth.month() + "-" + prevMonth.date()} className={classnames(classes)} onClick={this.props.setSelectedDate}>{prevMonth.date()}</td>);
      if (prevMonth.weekday() === moment().endOf("week").weekday()) {
        row = <tr key={prevMonth.month() + "-" + prevMonth.date()}>{cells}</tr>;
        html.push(row);
        cells = [];
      }
      prevMonth.add(1, "d");
    }
    return html;
  }

  renderWeekdays() {
    let currentLocaleData = moment.localeData(this.props.viewDate.locale());
    console.log('this.props.viewDate.locale(): '+ this.props.viewDate.locale());
    let weekdays = [0,1,2,3,4,5,6].map(i =>
      currentLocaleData.weekdaysMin(this.props.viewDate.weekday(i))
    );
    return weekdays.map(weekday => (
        <th className="dow">{weekday}</th>
    ));
  }

  render() {
    return (
    <div className="datepicker-days" style={{display: "block"}}>
        <table className="table-condensed">
          <thead>
            <tr>
              <th className="prev" data-action="previous" >
                <DateTimePickerIcons onClick={this.props.subtractMonth} icons={this.props.icons} glyph="previous" />
              </th>

              <th className="picker-switch" data-action="pickerSwitch" colSpan="5" onClick={this.props.showMonths}>{this.props.viewDate.format(this.props.calendarFormat)}</th>

              <th className="next" data-action="next" >
                <DateTimePickerIcons onClick={this.props.addMonth} icons={this.props.icons} glyph="next" />
              </th>
            </tr>

            <tr>
              {this.renderWeekdays()}
            </tr>
          </thead>

          <tbody>
            {this.renderDays()}
          </tbody>
        </table>
      </div>
    );
  }
}
