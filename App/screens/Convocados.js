import React, { Component } from 'react';
import { Text } from 'react-native';

export default class BoldAndBeautiful extends Component {
  render() {
    return (
      <Text style={{fontWeight: 'bold'}}>
        Estamos en 
        <Text style={{color: 'red'}}>
        CONVOCADOS
        </Text>
      </Text>
    );
  }
}
