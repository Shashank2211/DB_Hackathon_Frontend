export const setStorage = (key, value) => {
  // save to local storage
  return localStorage.setItem(key, value);
};

export const getStorage = (key) => {
  // get from local storage
  return localStorage.getItem(key);
};
