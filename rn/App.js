import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Cell, AdjustableCell} from './Cell.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.appContainer}>
          <TableHeading />
          <StringRow />
          <StringRow />
          <StringRow />
          <StringRow />
          <StringRow />
          <StringRow />
        </View>
      </View>
    );
  }
}

const TableHeading = () => {
  return (
    <View style={[styles.row, styles.tableHeading]}>
      <AdjustableCell>
        <Text style={styles.dimmedText}>Scale</Text>
      </AdjustableCell>
      <AdjustableCell>
        <Text style={styles.dimmedText}>Note</Text>
      </AdjustableCell>
      <AdjustableCell>
        <Text style={styles.dimmedText}>Gauge</Text>
      </AdjustableCell>
      <Cell>
        <Text style={styles.dimmedText}>Tension</Text>
      </Cell>
      <Cell last={true}>
        <Text style={styles.dimmedText}>Freq</Text>
      </Cell>
    </View>
  );
};

class StringRow extends React.Component {
  render() {
    return (
      <View style={styles.row}>
        <AdjustableCell>
          <Text style={styles.cellNumber}>25.5"</Text>
        </AdjustableCell>
        <AdjustableCell>
          <Text style={styles.cellNumber}>E4</Text>
        </AdjustableCell>
        <AdjustableCell>
          <Text style={styles.cellNumber}>0.009</Text>
        </AdjustableCell>
        <Cell>
          <Text style={styles.dimmedText}>13.181</Text>
        </Cell>
        <Cell last={true}>
          <Text style={styles.dimmedText}>329.628</Text>
        </Cell>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tableHeading: {
    marginBottom: 30,
  },
  dimmedText: {
    color: '#6a6a7c',
  },
  cellNumber: {
    color: '#fff',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  appContainer: {},
  container: {
    flex: 1,
    backgroundColor: '#1e1e24',
    color: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 100,
  },

  text: {
    color: '#fff',
  },
});
