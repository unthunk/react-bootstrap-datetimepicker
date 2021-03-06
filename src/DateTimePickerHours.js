import React, { Component, PropTypes } from "react";
import DateTimePickerIcons from "./DateTimePickerIcons.js";
import Constants from "./Constants.js";

export default class DateTimePickerHours extends Component {
  static propTypes = {
    setSelectedHour: PropTypes.func.isRequired,
    onSwitch: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired
  }

  renderSwitchButton = () => {
    return this.props.mode === Constants.MODE_TIME ?
        (
            <ul className="list-unstyled">

              <li className="picker-switch accordion-toggle">
                <table className="table-condensed">
                  <tbody>
                    <tr>
                      <td>
                        <a className="togglePicker" onClick={this.props.onSwitch} data-action="togglePicker" title="Select Time">
                          <DateTimePickerIcons icons={this.props.icons} glyph="time" />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
        ) :
        null;
  }

  render() {
    return (
      <div className="timepicker-hours" data-action="selectHour" style={{display: "block"}}>
        {this.renderSwitchButton()}
        <table className="table-condensed">
          <tbody>
            <tr>
              <td className="hour" onClick={this.props.setSelectedHour}>01</td>

              <td className="hour" onClick={this.props.setSelectedHour}>02</td>

              <td className="hour" onClick={this.props.setSelectedHour}>03</td>

              <td className="hour" onClick={this.props.setSelectedHour}>04</td>
            </tr>

            <tr>
              <td className="hour" onClick={this.props.setSelectedHour}>05</td>

              <td className="hour" onClick={this.props.setSelectedHour}>06</td>

              <td className="hour" onClick={this.props.setSelectedHour}>07</td>

              <td className="hour" onClick={this.props.setSelectedHour}>08</td>
            </tr>

            <tr>
              <td className="hour" onClick={this.props.setSelectedHour}>09</td>

              <td className="hour" onClick={this.props.setSelectedHour}>10</td>

              <td className="hour" onClick={this.props.setSelectedHour}>11</td>

              <td className="hour" onClick={this.props.setSelectedHour}>12</td>
            </tr>

            <tr>
              <td className="hour" onClick={this.props.setSelectedHour}>13</td>

              <td className="hour" onClick={this.props.setSelectedHour}>14</td>

              <td className="hour" onClick={this.props.setSelectedHour}>15</td>

              <td className="hour" onClick={this.props.setSelectedHour}>16</td>
            </tr>

            <tr>
              <td className="hour" onClick={this.props.setSelectedHour}>17</td>

              <td className="hour" onClick={this.props.setSelectedHour}>18</td>

              <td className="hour" onClick={this.props.setSelectedHour}>19</td>

              <td className="hour" onClick={this.props.setSelectedHour}>20</td>
            </tr>

            <tr>
              <td className="hour" onClick={this.props.setSelectedHour}>21</td>

              <td className="hour" onClick={this.props.setSelectedHour}>22</td>

              <td className="hour" onClick={this.props.setSelectedHour}>23</td>

              <td className="hour" onClick={this.props.setSelectedHour}>24</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
