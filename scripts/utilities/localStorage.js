function getLocalStorageData(dataName) {
  return JSON.parse(localStorage.getItem(dataName));
}

export { getLocalStorageData };
