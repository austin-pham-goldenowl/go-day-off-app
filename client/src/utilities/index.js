export const compareJsonObjectValue = (obj1, obj2) => {
  return (
    typeof obj1 === 'object' &&
    typeof obj2 === 'object' &&
    JSON.stringify(obj1) === JSON.stringify(obj2)
  );
};
