import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Animated,
} from 'react-native';

export const icons = {
  new: convertFontCode('e05e'),
  addPlayer: convertFontCode('e7f0'),
  reset: convertFontCode('e042'),
  menu: convertFontCode('e3c7'),
};

function convertFontCode(code){
  return String.fromCharCode(parseInt(code, 16))
}

export function Icon({icon, style}) {
  return (
    <Text style={[styles.icon, style]}>{icon}</Text>
  )
}

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'icomoon',
  }
});
