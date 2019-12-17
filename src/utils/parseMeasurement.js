/**
 * Parses the collected measurement and maps it to CSV data format
 * @param previousData - previously mapped and accumulated data
 * @param newMeasurement - new measurement that needs to be parsed and mapped
 * @return {object} - parsed and mapped data
 */
const parseMeasurement = (previousData, newMeasurement) => {
  let { rawData } = previousData;

  newMeasurement.forEach((samples) => {
    rawData = rawData.concat(`${samples.x},${samples.y},${samples.z}\n`);
  });
  rawData = rawData.concat('\n');

  return {
    count: previousData.count + 1,
    rawData,
  };
};

export default parseMeasurement;
