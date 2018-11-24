// @flow

import React, {Component} from 'react';

export class DataBadge extends Component<{value: string | number}, void> {
  render() {
    return <span style={{width: '50px'}}>{this.props.value}</span>;
  }
}
