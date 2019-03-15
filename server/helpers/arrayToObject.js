export default array => {
  if (!Array.isArray(array)) return {};

  const obj = {};
  array.forEach(el => {
    const key = Object.keys(el)[0];
    const value = el[key];
    obj[key] = value;
  });

  return obj;
};
