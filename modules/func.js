var Lerp = (a, b, t) => {
  if (a instanceof Array) {
    return a.map((c, i) => c*(1-t)+b[i]*t);
  }
  return a*(1-t)+b*t;
}

export { Lerp };