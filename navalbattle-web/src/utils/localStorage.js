export function getItemLocalStorage(key, defaultValue) {
  const localStorageFilter = window.localStorage.getItem(key);
  const _default =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  let json;

  try {
    json = JSON.parse(localStorageFilter);
  } catch (e) {
    window.localStorage.removeItem(key);
    return _default;
  }

  return json ? json : _default;
}

export function stringifyJson(item) {
  if (item) {
    try {
      return JSON.stringify(item);
    } catch (e) {
      return null;
    }
  }
  return null;
}
