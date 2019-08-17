// @flow

import type {Instrument} from '../types.js';
import type {ScalePresets} from '../data/scale_presets.js';
import type {StringsState} from '../data/StringsState.js';

import {dispatch} from '../data/store';
import {getScalePresets, serializeScales} from '../data/scale_presets';
import invariant from '../invariant.js';
import React, {Component} from 'react';

type Props = {|instrument: Instrument, strings: StringsState|};
type State = {|presets: ScalePresets, existingSerialization: string|};

export class ScalePresetsSelector extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const existingScales = this.props.strings.getStrings().map(s => s.scale);
    const existingSerialization = serializeScales(existingScales);
    this.state = {presets: getScalePresets(this.props.instrument, existingScales), existingSerialization};
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const existingScales = props.strings.getStrings().map(s => s.scale);
    const existingSerialization = serializeScales(existingScales);

    if (state.existingSerialization !== existingSerialization) {
      return {
        presets: getScalePresets(props.instrument, existingScales),
        existingSerialization,
      };
    }

    return null;
  }

  render() {
    const existingScales = this.props.strings.getStrings().map(s => s.scale);
    const isSelected = this.state.presets.some(p => p.key === this.state.existingSerialization);

    return (
      <select
        className="scale-selector"
        style={{width: '100%'}}
        onChange={e => this.onChange(e)}
        value={isSelected ? this.state.existingSerialization : ''}
      >
        <option value="" disabled>
          Select your scale
        </option>
        {this.getOptions({existingScales})}
      </select>
    );
  }

  getOptions({existingScales}: {existingScales: Array<number>}): Array<React$Element<any>> {
    const groupedPresets = {};
    const ungrouped = [];
    getScalePresets(this.props.instrument, existingScales).forEach(p => {
      if (p.category) {
        groupedPresets[p.category] || (groupedPresets[p.category] = []);
        groupedPresets[p.category].push(p);
      } else {
        ungrouped.push(p);
      }
    });

    const categorised = Object.entries(groupedPresets).map(([category, presets]) => {
      return (
        <optgroup label={category} key={category}>
          {(presets: any).map(preset => {
            return (
              <option key={preset.key} value={preset.key}>
                {preset.name}
              </option>
            );
          })}
        </optgroup>
      );
    });

    return categorised;
  }

  onChange(event: Event) {
    const key = (event: any).target.value;
    const preset = this.state.presets.find(p => p.key === key);
    invariant(
      preset,
      `Can't find preset with the key ${key}. Existing presets: ${JSON.stringify(this.state.presets, null, 2)}`,
    );
    dispatch({type: 'set_scales', scales: preset.scales});
  }
}
