module.exports = {
  standardizeKey: key => {
    if (key.length < 1) return "";
    return "f" + key.charAt(0).toLocaleUpperCase() + key.slice(1);
  },
  standardizeObj: obj => {
    const newObj = {};
    Object.keys(obj).forEach(key => {
      newObj[this.standardizeKey(key)] = obj[key];
    });
    return newObj;
  }
};
