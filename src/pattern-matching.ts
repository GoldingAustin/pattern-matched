// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const patternMatching = (base: any, test: any): boolean => {
  if (typeof test === 'object') {
    if (Array.isArray(test)) return test.every((value, index) => patternMatching(base[index], value));
    else {
      for (const key in test) {
        if (key in test) {
          if (typeof test[key] === 'object') {
            if (Array.isArray(test[key])) return test[key].every((value: unknown) => patternMatching(base[key], value));
            else return patternMatching(base[key], test[key]);
          } else if (typeof test[key] === 'function') {
            if (test[key](base[key])) return true;
          } else return test[key] === base[key];
        }
      }
    }
  } else return test === base;
  return false;
};
