import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export class Cell extends React.Component {
  render() {
    const style = this.props.last ? styles.lastCell : styles.cell;
    return (
      <View style={style}>
        <View style={styles.cellContent}>{this.props.children}</View>
      </View>
    );
  }
}

export class AdjustableCell extends React.Component {
  render() {
    return (
      <View style={styles.adjustableCell}>
        <View style={styles.cellButtonUp}>
          <View style={styles.upArrow} />
        </View>
        <View style={styles.cellContent}>{this.props.children}</View>
        <View style={styles.cellButtonUp}>
          <View style={styles.downArrow} />
        </View>
      </View>
    );
  }
}

const cell = {
  backgroundColor: '#2a2a33',
  height: 70,
  width: 70,
  marginRight: 1,
  flexDirection: 'column',
  justifyContent: 'center',
};

const cellButton = {
  backgroundColor: '#383845',
  height: 18,
  justifyContent: 'space-around',
  flexDirection: 'row',
};

const arrow = {
  width: 0,
  height: 0,
  top: 6,
  margin: 'auto',
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderLeftWidth: 5,
  borderRightWidth: 5,
  borderBottomWidth: 5,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderBottomColor: '#fff',
};

const styles = StyleSheet.create({
  cell: {
    ...cell,
  },
  adjustableCell: {
    ...cell,
  },
  lastCell: {
    ...cell,
    marginRight: 0,
  },
  cellContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  upArrow: {
    ...arrow,
  },
  downArrow: {
    ...arrow,
    transform: [{rotate: '180deg'}],
  },
  cellButtonUp: {...cellButton},
});
