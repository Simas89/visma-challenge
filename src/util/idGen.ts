export const idGen = () => {
  return Date.now().toString(36) + Math.random().toString(16).slice(6);
};
