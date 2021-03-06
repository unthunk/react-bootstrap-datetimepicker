import React, { Component, PropTypes } from "react";
import moment from "moment";
import DateTimePicker from "./DateTimePicker.js";
import DateTimePickerIcons from "./DateTimePickerIcons.js";
import Constants from "./Constants.js";

export default class DateTimeField extends Component {
  static defaultProps = {
    dateTime: moment().format("x"),
    calendarFormat: "MMMM YYYY",
    format: "x",
    locale: "en",
    showToday: true,
    viewMode: "days",
    daysOfWeekDisabled: [],
    size: Constants.SIZE_MEDIUM,
    mode: Constants.MODE_DATETIME,
    onChange: (x) => {
      console.log(x);
    },
    widgetPositioning: {
      vertical: 'auto',
      horizontal: 'auto'
    }
  }

  newLocalizedMoment = (dateTime, format, strictParse) => {
    return moment(dateTime, format, this.props.locale, strictParse);
  }

  resolvePropsInputFormat = (nextProps) => {
    let props = nextProps || this.props;
    if (props.inputFormat) { return this.props.inputFormat; }
    switch (props.mode) {
      case Constants.MODE_TIME:
        return "h:mm A";
      case Constants.MODE_DATE:
        return "MM/DD/YY";
      default:
        return "MM/DD/YY h:mm A";
    }
  }

  static propTypes = {
    dateTime: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    onChange: PropTypes.func,
    format: PropTypes.string,
    calendarFormat: PropTypes.string,
    locale: PropTypes.string,
    inputProps: PropTypes.object,
    inputFormat: PropTypes.string,
    defaultText: PropTypes.string,
    mode: PropTypes.oneOf([Constants.MODE_DATE, Constants.MODE_DATETIME, Constants.MODE_TIME]),
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    showToday: PropTypes.bool,
    viewMode: PropTypes.string,
    size: PropTypes.oneOf([Constants.SIZE_SMALL, Constants.SIZE_MEDIUM, Constants.SIZE_LARGE]),
    daysOfWeekDisabled: PropTypes.arrayOf(PropTypes.integer),
    icons: PropTypes.object,
    widgetPositioning: PropTypes.object
  }
  state = {
      showDatePicker: this.props.mode !== Constants.MODE_TIME,
      showTimePicker: this.props.mode === Constants.MODE_TIME,
      inputFormat: this.resolvePropsInputFormat(),
      buttonIcon: this.props.mode === Constants.MODE_TIME ? "time" : "date",
      widgetStyle: {
        display: "block",
        left: -9999,
        position: 'absolute'
      },
      widgetClasses: {
        "bootstrap-datetimepicker-widget": true,
        "dropdown-menu": true
      },
      viewDate: this.newLocalizedMoment(this.props.dateTime, this.props.format, true).startOf("month"),
      selectedDate: this.newLocalizedMoment(this.props.dateTime, this.props.format, true),
      inputValue: typeof this.props.defaultText !== "undefined" ? this.props.defaultText : this.newLocalizedMoment(this.props.dateTime, this.props.format, true).format(this.resolvePropsInputFormat())
  }

  componentWillReceiveProps = (nextProps) => {
    let state = {};
    if (nextProps.inputFormat !== this.props.inputFormat) {
        state.inputFormat = nextProps.inputFormat;
        state.inputValue = moment(nextProps.dateTime, nextProps.format, nextProps.locale, true).format(nextProps.inputFormat);
    }

    if (nextProps.dateTime !== this.props.dateTime && moment(nextProps.dateTime, nextProps.format, nextProps.locale, true).isValid()) {
      state.viewDate = moment(nextProps.dateTime, nextProps.format, nextProps.locale, true).startOf("month");
      state.selectedDate = moment(nextProps.dateTime, nextProps.format, nextProps.locale, true);
      state.inputValue = moment(nextProps.dateTime, nextProps.format, nextProps.locale, true).format(this.resolvePropsInputFormat(nextProps.inputFormat ? nextProps.inputFormat : this.state.inputFormat));
    }
    return this.setState(state);
  }


  onChange = (event) => {
    const value = event.target == null ? event : event.target.value;
    if (this.newLocalizedMoment(value, this.state.inputFormat, true).isValid()) {
      this.setState({
        selectedDate: this.newLocalizedMoment(value, this.state.inputFormat, true),
        viewDate: this.newLocalizedMoment(value, this.state.inputFormat, true).startOf("month")
      });
    }

    return this.setState({
      inputValue: value
    }, function() {
      return this.props.onChange(this.newLocalizedMoment(this.state.inputValue, this.state.inputFormat, true).format(this.props.format), value);
    });

  }

  getValue = () => {
    return this.newLocalizedMoment(this.state.inputValue, this.props.inputFormat, true).format(this.props.format);
  }

  setSelectedDate = (e) => {
    const { target } = e;
    if (target.className && !target.className.match(/disabled/g)) {
      let month;
      if (target.className.indexOf("new") >= 0) month = this.state.viewDate.month() + 1;
      else if (target.className.indexOf("old") >= 0) month = this.state.viewDate.month() - 1;
      else month = this.state.viewDate.month();
      return this.setState({
        selectedDate: this.state.viewDate.clone().month(month).date(parseInt(e.target.innerHTML)).hour(this.state.selectedDate.hours()).minute(this.state.selectedDate.minutes())
      }, function() {
        this.closePicker();
        this.props.onChange(this.state.selectedDate.format(this.props.format));
        return this.setState({
          inputValue: this.state.selectedDate.format(this.state.inputFormat)
        });
      });
    }
  }

  setSelectedHour = (e) => {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().hour(parseInt(e.target.innerHTML)).minute(this.state.selectedDate.minutes())
    }, function() {
      this.closePicker();
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.state.inputFormat)
      });
    });
  }

  setSelectedMinute = (e) => {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().hour(this.state.selectedDate.hours()).minute(parseInt(e.target.innerHTML))
    }, function() {
      this.closePicker();
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.state.inputFormat)
      });
    });
  }

  setViewMonth = (month) => {
    return this.setState({
      viewDate: this.state.viewDate.clone().month(month)
    });
  }

  setViewYear = (year) => {
    return this.setState({
      viewDate: this.state.viewDate.clone().year(year)
    });
  }

  addMinute = () => {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().add(1, "minutes")
    }, function() {
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.resolvePropsInputFormat())
      });
    });
  }

  addHour = () => {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().add(1, "hours")
    }, function() {
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.resolvePropsInputFormat())
      });
    });
  }

  addMonth = () => {
    return this.setState({
      viewDate: this.state.viewDate.add(1, "months")
    });
  }

  addYear = () => {
    return this.setState({
      viewDate: this.state.viewDate.add(1, "years")
    });
  }

  addDecade = () => {
    return this.setState({
      viewDate: this.state.viewDate.add(10, "years")
    });
  }

  subtractMinute = () => {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().subtract(1, "minutes")
    }, () => {
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.resolvePropsInputFormat())
      });
    });
  }

  subtractHour = () => {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().subtract(1, "hours")
    }, () => {
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.resolvePropsInputFormat())
      });
    });
  }

  subtractMonth = () => {
    return this.setState({
      viewDate: this.state.viewDate.subtract(1, "months")
    });
  }

  subtractYear = () => {
    return this.setState({
      viewDate: this.state.viewDate.subtract(1, "years")
    });
  }

  subtractDecade = () => {
    return this.setState({
      viewDate: this.state.viewDate.subtract(10, "years")
    });
  }

  togglePeriod = () => {
    if (this.state.selectedDate.hour() > 12) {
      return this.onChange(this.state.selectedDate.clone().subtract(12, "hours").format(this.state.inputFormat));
    } else {
      return this.onChange(this.state.selectedDate.clone().add(12, "hours").format(this.state.inputFormat));
    }
  }

  togglePicker = () => {
    return this.setState({
      showDatePicker: !this.state.showDatePicker,
      showTimePicker: !this.state.showTimePicker
    });
  }

  onClick = () => {
    let classes, gBCR, dtpWrapper, offset, parentWidth, widget, widgetWidth, scrollTop, patternVertical, patternHorizontal, vertical, horizontal, styles;
    if (this.state.showPicker) {
      return this.closePicker();
    } else {
      this.setState({
        showPicker: true
      });
      gBCR = React.findDOMNode(this.refs.dtpbutton).getBoundingClientRect();
      dtpWrapper = React.findDOMNode(this.refs.dtpWrapper);
      parentWidth = dtpWrapper.getBoundingClientRect().width;
      classes = {
        "bootstrap-datetimepicker-widget": true,
        "dropdown-menu": true
      };
      offset = {
        top: gBCR.top + window.pageYOffset - document.documentElement.clientTop,
        left: gBCR.left + window.pageXOffset - document.documentElement.clientLeft
      };
      widget = React.findDOMNode(this.refs.widget);
      widgetWidth = widget.offsetWidth;
      offset.top = offset.top + dtpWrapper.offsetHeight;
      scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      // get position settings
      patternVertical = /^(top|bottom)$/i;
      patternHorizontal = /^(left|right)$/i;
      vertical = this.props.widgetPositioning && this.props.widgetPositioning.vertical && patternVertical.test(this.props.widgetPositioning.vertical) ? this.props.widgetPositioning.vertical : 'auto';
      horizontal = this.props.widgetPositioning && this.props.widgetPositioning.horizontal && patternHorizontal.test(this.props.widgetPositioning.horizontal) ? this.props.widgetPositioning.horizontal : 'auto';

      // vertical placement
      if (vertical === 'auto') {
        if(offset.top + widget.offsetHeight > window.offsetHeight + scrollTop && widget.offsetHeight + widget.offsetHeight > offset.top){
          vertical = "top";
        }
        else {
          vertical = "bottom";
        }
      }
      else {
        vertical = this.props.widgetPositioning.vertical;
      }

      // horizontal placement
      if (horizontal === 'auto') {
          if(parentWidth < offset.left + widgetWidth / 2 && offset.left + widgetWidth > window.document.documentElement.clientWidth){
            horizontal = 'right';
          }
          else {
            horizontal = 'left';
          }
      }
      else {
        horizontal = this.props.widgetPositioning.horizontal;
      }

      // determine widget placement styles & classes
      if (vertical === 'top') {
        offset.top = -widget.offsetHeight - (widget.offsetHeight - widget.clientHeight);
        classes.top = true;
        classes.bottom = false;
      } else {
        offset.top = gBCR.height - (widget.offsetHeight - widget.clientHeight);
        classes.top = false;
        classes.bottom = true;
      }
      if (horizontal === 'right') {
          classes["pull-right"] = true;
      } else {
          classes["pull-right"] = false;
      }
      styles = {
        display: "block",
        top: offset.top,
        left: horizontal === 'left' ? 0 : 'auto',
        right: horizontal === 'left' ? 'auto' : 0
      };
      return this.setState({
        widgetStyle: styles,
        widgetClasses: classes
      });
    }
  }

  closePicker = () => {
    let style = this.state.widgetStyle;
    style.left = -9999;
    style.display = "block";
    return this.setState({
      showPicker: false,
      widgetStyle: style
    });
  }

  size = () => {
    switch (this.props.size) {
      case Constants.SIZE_SMALL:
        return "form-group-sm";
      case Constants.SIZE_LARGE:
        return "form-group-lg";
    }

    return "";
  }

  renderOverlay = () => {
    const styles = {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: "999"
    };
    if (this.state.showPicker) {
      return (<div onClick={this.closePicker} style={styles} />);
    } else {
      return <span />;
    }
  }

  render() {
    return (
      <div className={"input-group date " + this.size()} style={{position:'relative'}} ref="dtpWrapper">
        <input className="form-control" onChange={this.onChange} type="text" value={this.state.inputValue} {...this.props.inputProps}/>
        {this.renderOverlay()}
        <DateTimePicker
              addDecade={this.addDecade}
              addHour={this.addHour}
              addMinute={this.addMinute}
              addMonth={this.addMonth}
              addYear={this.addYear}
              calendarFormat={this.props.calendarFormat}
              daysOfWeekDisabled={this.props.daysOfWeekDisabled}
              icons={this.props.icons}
              maxDate={this.props.maxDate}
              minDate={this.props.minDate}
              mode={this.props.mode}
              ref="widget"
              selectedDate={this.state.selectedDate}
              setSelectedDate={this.setSelectedDate}
              setSelectedHour={this.setSelectedHour}
              setSelectedMinute={this.setSelectedMinute}
              setViewMonth={this.setViewMonth}
              setViewYear={this.setViewYear}
              showDatePicker={this.state.showDatePicker}
              showTimePicker={this.state.showTimePicker}
              showToday={this.props.showToday}
              subtractDecade={this.subtractDecade}
              subtractHour={this.subtractHour}
              subtractMinute={this.subtractMinute}
              subtractMonth={this.subtractMonth}
              subtractYear={this.subtractYear}
              togglePeriod={this.togglePeriod}
              togglePicker={this.togglePicker}
              viewDate={this.state.viewDate}
              viewMode={this.props.viewMode}
              widgetClasses={this.state.widgetClasses}
              widgetStyle={this.state.widgetStyle}
              widgetPositioning={this.props.widgetPositioning}
        />
        <span className="input-group-addon" onBlur={this.onBlur} onClick={this.onClick} ref="dtpbutton">
          <DateTimePickerIcons icons={this.props.icons} glyph={this.state.buttonIcon} />
        </span>
      </div>
    );
  }
}
