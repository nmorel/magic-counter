import {PixelRatio, Dimensions} from 'react-native';

const baseWidth = 1280;
const basePixelRatio = 1;
const baseRatio = baseWidth /*/ basePixelRatio*/;

export function calculateFontSize(fontSize) {
  const width = Dimensions.get('window').width;
  const pixelRatio = PixelRatio.get();
  const ratio = width /*/ pixelRatio*/;

  return fontSize / baseRatio * ratio;
}

// http://flatuicolors.com/
const colors = [
  '#2980b9', // Belize hole
  '#27ae60', // Nephritis
  '#e67e22', // Carrot
  '#9b59b6', // Amethyst
  '#c0392b', // Pomegranate
  '#1abc9c', // Turquoise
  '#3498db', // Peter river
  '#f1c40f', // Sun flower
  '#2c3e50', // Midnight blue
  '#8e44ad', // Wisteria
  '#e74c3c', // Alizarin
  '#2ecc71', // Emerald
  '#f39c12', // Orange
];

export function getColor(id) {
  return colors[(id - 1) % colors.length];
}
