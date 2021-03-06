import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import DateTimePickerDate from "./DateTimePickerDate.js";
import DateTimePickerTime from "./DateTimePickerTime.js";
import DateTimePickerIcons from "./DateTimePickerIcons.js";
import Constants from "./Constants.js";

export default class DateTimePicker extends Component {
  static propTypes = {
    showDatePicker: PropTypes.bool,
    showTimePicker: PropTypes.bool,
    subtractMonth: PropTypes.func.isRequired,
    addMonth: PropTypes.func.isRequired,
    viewDate: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    showToday: PropTypes.bool,
    viewMode: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    mode: PropTypes.oneOf([Constants.MODE_DATE, Constants.MODE_DATETIME, Constants.MODE_TIME]),
    daysOfWeekDisabled: PropTypes.array,
    setSelectedDate: PropTypes.func.isRequired,
    subtractYear: PropTypes.func.isRequired,
    addYear: PropTypes.func.isRequired,
    setViewMonth: PropTypes.func.isRequired,
    setViewYear: PropTypes.func.isRequired,
    subtractHour: PropTypes.func.isRequired,
    addHour: PropTypes.func.isRequired,
    subtractMinute: PropTypes.func.isRequired,
    addMinute: PropTypes.func.isRequired,
    addDecade: PropTypes.func.isRequired,
    subtractDecade: PropTypes.func.isRequired,
    togglePeriod: PropTypes.func.isRequired,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    widgetClasses: PropTypes.object,
    widgetStyle: PropTypes.object,
    togglePicker: PropTypes.func,
    setSelectedHour: PropTypes.func,
    setSelectedMinute: PropTypes.func,
    calendarFormat: PropTypes.string
  }

  renderDatePicker = () => {
    if (this.props.showDatePicker) {
      return (
      <li>
        <DateTimePickerDate
              addDecade={this.props.addDecade}
              addMonth={this.props.addMonth}
              addYear={this.props.addYear}
              calendarFormat={this.props.calendarFormat}
              daysOfWeekDisabled={this.props.daysOfWeekDisabled}
              icons={this.props.icons}
              maxDate={this.props.maxDate}
              minDate={this.props.minDate}
              selectedDate={this.props.selectedDate}
              setSelectedDate={this.props.setSelectedDate}
              setViewMonth={this.props.setViewMonth}
              setViewYear={this.props.setViewYear}
              showToday={this.props.showToday}
              subtractDecade={this.props.subtractDecade}
              subtractMonth={this.props.subtractMonth}
              subtractYear={this.props.subtractYear}
              viewDate={this.props.viewDate}
              viewMode={this.props.viewMode}
        />
      </li>
      );
    }
  }

  renderTimePicker = () => {
    if (this.props.showTimePicker) {
      return (
      <li>
        <DateTimePickerTime
              addHour={this.props.addHour}
              addMinute={this.props.addMinute}
              icons={this.props.icons}
              mode={this.props.mode}
              selectedDate={this.props.selectedDate}
              setSelectedHour={this.props.setSelectedHour}
              setSelectedMinute={this.props.setSelectedMinute}
              subtractHour={this.props.subtractHour}
              subtractMinute={this.props.subtractMinute}
              togglePeriod={this.props.togglePeriod}
              viewDate={this.props.viewDate}
        />
      </li>
      );
    }
  }

  renderSwitchButton = () => {
      return this.props.mode === Constants.MODE_DATETIME ?
          (
              <li className="picker-switch accordion-toggle">
                <table className="table-condensed">
                  <tbody>
                    <tr>
                      <td>
                        <a onClick={this.props.togglePicker} data-action="togglePicker" title="Select Time">
                          <DateTimePickerIcons glyph={this.props.showTimePicker ? "date" : "time"} icons={this.props.icons} />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
          ) :
          null;
  }

  render() {
    return (
      <div className={classnames(this.props.widgetClasses)} style={this.props.widgetStyle}>

        <ul className="list-unstyled">

          {this.renderDatePicker()}

          {this.renderSwitchButton()}

          {this.renderTimePicker()}

        </ul>

      </div>

    );
  }
}
