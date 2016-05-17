import {
  PixelRatio,
  Dimensions
} from 'react-native';

const baseWidth      = 1280;
const basePixelRatio = 1;
const baseRatio      = baseWidth /*/ basePixelRatio*/;

export function calculateFontSize(fontSize) {
  const width      = Dimensions.get('window').width;
  const pixelRatio = PixelRatio.get();
  const ratio      = width /*/ pixelRatio*/;

  return fontSize / baseRatio * ratio;
}
