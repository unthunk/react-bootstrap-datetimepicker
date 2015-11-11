import React, { Component } from "react";
import DateTimeField from "react-bootstrap-datetimepicker";
import moment from "moment";
// import locales needed for i18n
import de from "moment/locale/de";
import fr from "moment/locale/fr";
import ja from "moment/locale/ja";

class ParentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "1990-06-05",
      format: "YYYY-MM-DD",
      inputFormat: "DD/MM/YYYY",
      mode: "date"
    };
  }

  handleChange = (newDate) => {
    console.log("newDate", newDate);
    return this.setState({date: newDate});
  }

  render() {
    const {date, format, mode, inputFormat} = this.state;
    return <DateTimeField
      dateTime={date}
      format={format}
      viewMode={mode}
      inputFormat={inputFormat}
      onChange={this.handleChange}
    />;
  }
}

class Basic extends Component {
  state = {
    locale: "en"
  }
	render() {
    return (
          <div className="container">
						<div className="row">
							<div className="col-xs-12">
								<h1>React Bootstrap DateTimePicker</h1>
								This project is a port of <a href="https://github.com/Eonasdan/bootstrap-datetimepicker">https://github.com/Eonasdan/bootstrap-datetimepicker</a> for React.js
							</div>
						</div>
            <div className="row">
              <div className="col-xs-12">
                Controlled Component example
                <ParentComponent />
                <pre>
                  {`class ParentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "1990-06-05",
      format: "YYYY-MM-DD",
      inputFormat: "DD/MM/YYYY",
      mode: "date"
    };
  }

  handleChange = (newDate) => {
    console.log("newDate", newDate);
    return this.setState({date: newDate});
  }

  render() {
    const {date, format, mode, inputFormat} = this.state;
    return <DateTimeField
      dateTime={date}
      format={format}
      viewMode={mode}
      inputFormat={inputFormat}
      onChange={this.handleChange}
    />;
  }
}`}
                </pre>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                Example with default Text
                <DateTimeField
                  defaultText="Please select a date"
                />
                <pre> {'<DateTimeField defaultText="Please select a date" />'} </pre>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                Example with Icons
                <DateTimeField
                  defaultText="Please select a date"
                  icons={{time: 'fa fa-clock-o', date: 'fa fa-calendar', up: 'fa fa-chevron-up', down: 'fa fa-chevron-down', previous: 'fa fa-chevron-left', next: 'fa fa-chevron-right', today: 'fa fa-crosshairs', clear: 'fa fa-trash', close: 'fa fa-times'}}
                />
              <pre> {'<DateTimeField defaultText="Please select a date" icons={{time: "fa fa-clock-o", date: "fa fa-calendar", up: "fa fa-chevron-up", down: "fa fa-chevron-down", previous: "fa fa-chevron-left", next: "fa fa-chevron-right", today: "fa fa-crosshairs", clear: "fa fa-trash", close: "fa fa-times"}}/>'} </pre>
              </div>
            </div>
            <div className="row">
							<div className="col-xs-12">
								Default Basic Example
								<DateTimeField />
								<pre> {'<DateTimeField />'} </pre>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12">
								Example with default Text
								<DateTimeField
									defaultText="Please select a date"
								/>
								<pre> {'<DateTimeField defaultText="Please select a date" />'} </pre>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12">
                ViewMode set to years view with custom inputFormat
                <DateTimeField
                  inputFormat='DD-MM-YYYY'
                  viewMode='years'
                />
                <pre> {'<DateTimeField viewMode="years" inputFormat="DD-MM-YYYY" />'} </pre>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12">
                daysOfWeekDisabled
                <DateTimeField
                  daysOfWeekDisabled={[0, 1, 2]}
                />
                <pre> {'<DateTimeField daysOfWeekDisabled={[0,1,2]} />'} </pre>

              </div>
						</div>
						<div className="row">
							<div className="col-xs-12">
                minDate and maxDate
                <DateTimeField
                  maxDate={moment().add(1, "days")}
                  minDate={moment().subtract(1, "days")}
                />
                <pre> {'<DateTimeField daysOfWeekDisabled={[0,1,2]} />'} </pre>

              </div>
						</div>
            <div className="row">
              <div className="col-xs-12">
                  just time picker
                  <DateTimeField
                      mode="time"
                      />
                  <pre> {'<DateTimeField mode="time" />'} </pre>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                  just date picker
                  <DateTimeField
                      mode="date"
                      />
                  <pre> {'<DateTimeField mode="date" />'} </pre>
              </div>
            </div>
            <div className="row">
							<div className="col-xs-12">
								Specifiy widget placement
								<DateTimeField
									widgetPositioning={{vertical:'top',horizontal:'right'}}
								/>
              <pre> {'<DateTimeField widgetPositioning={{vertical:\'top\',horizontal:\'right\'}} />'} </pre>
							</div>
						</div>
            <div className="row">
              <div className="col-xs-12">
                  i18n
                  <DateTimeField
                      mode="date"
                      dateTime={this.state.value}
                      locale={this.state.locale}
                      onChange={this._handleDateTimeChange}
                      />
                  <pre> {'<DateTimeField mode="date" locale="' + this.state.locale + '"/>'} </pre>
              </div>
              <div>
                 <div className="col-xs-2">Language:</div>
                 <div className="col-xs-10">
                     <select id="locale" value={this.state.locale} onChange={this._handleLocaleChange} className="form-control">
                         <option value="en">English(en)</option>
                         <option value="de">German(de)</option>
                         <option value="fr">French(fr)</option>
                         <option value="ja">Japan(ja)</option>
                     </select>
                 </div>
              </div>
            </div>
          </div>
      );
   }

   _handleLocaleChange = (event) => {
     this.setState({locale: event.target.value});
   }

   _handleDateTimeChange = (dateTime) => {
     this.setState({value: dateTime});
   }
}



React.render(React.createFactory(Basic)(), document.getElementById("example"));
