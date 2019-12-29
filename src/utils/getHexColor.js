/**
 * Converts RGB values to hex
 * @param rgbValue - array containing [r,g,b] color values
 * @return {string} containing converted hex value
 */
const getHexColor = (rgbValue) => {
  const result = rgbValue.map((colorVal) => {
    let hex = Number(colorVal).toString(16);
    if (hex.length < 2) {
      hex = `0${hex}`;
    }
    return hex;
  });

  return result.join('');
};

export default getHexColor;
