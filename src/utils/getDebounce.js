/**
 * Creates a function that executes a callback in a given delay (ms)
 *
 * @param {number} delay - debounce time in milliseconds
 * @returns {function}
 */
const getDebounce = (delay) => {
  let reference;

  return (callback) => {
    clearTimeout(reference);
    reference = setTimeout(() => {
      callback();
    }, delay);
  };
};

export default getDebounce;
