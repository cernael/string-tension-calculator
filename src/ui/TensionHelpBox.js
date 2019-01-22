// @flow

import React, {Component} from 'react';
import {dispatch} from '../data/store';

export class TensionHelpBox extends Component<any> {
  render() {
    return (
      <tr className="help-box">
        <td colSpan="5">
          <span className="close-help-box" onClick={dispatch.bind(null, {type: 'toggle_tension_help_box'})}>
            ×
          </span>
          <h4>String Tension</h4>
          <p>
            The color of the tension value in the table shows how light (or heavy) the string is, with "yellow" being
            lighter and "red" being heavier.
          </p>
          <p>Typically for guitars:</p>
          <ul>
            <li>13 lbs. - light tension </li>
            <li>18 lbs. - regular tension </li>
            <li>22 lbs. - heavy tension </li>
          </ul>
          <p>And for basses:</p>
          <ul>
            <li>31 lbs. - light tension </li>
            <li>40 lbs. - regular tension </li>
            <li>49 lbs. - heavy tension </li>
          </ul>
          <p>Although these values may vary depending on the instrument technical characteristics.</p>

          <div className="gradient-image" />
          <div className="gradient-image-legend">
            <span>LIGHTER</span>
            <span>HEAVIER</span>
          </div>
        </td>
      </tr>
    );
  }
}
