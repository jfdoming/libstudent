const booleanConvert = (b) => !!b;
const numberConvert = (n) => +n;
const stringConvert = (s) => "" + s;
const passthrough = (convert) => (fn) => (...args) => fn(convert(...args));
const eventPassthrough = (convert) =>
  passthrough((e) => ({
    ...e,
    target: { ...e.target, value: convert(e.target.value) },
  }));

export const boolean = eventPassthrough(booleanConvert);
export const number = eventPassthrough(numberConvert);
export const string = eventPassthrough(stringConvert);
