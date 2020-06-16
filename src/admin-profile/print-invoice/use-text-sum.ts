const conventer: any = {
  1: 'одна',
  2: 'дві',
  3: 'три',
  4: 'чотири',
  5: "п'ять",
  6: 'шість',
  7: 'сім',
  8: 'вісім',
  9: "дев'ять",
  10: 'десять',
  11: 'одинадцять',
  12: 'дванадцять',
  13: 'тринадцять',
  14: 'чотирнадцять',
  15: "п'ятнадцять",
  16: 'шістнадцять',
  17: 'сімнадцять',
  18: 'вісімнадцять',
  19: "дев'ятнадцять",
  20: 'двадцять',
  30: 'тридцять',
  40: 'сорок',
  50: "п'ятдесят",
  60: 'шістдесяк',
  70: 'сімдесят',
  80: 'вісімдесят',
  90: "дев'яносто",
  100: 'сто',
  200: 'двісті',
  300: 'триста',
  400: 'чотириста',
  500: "п'ятсот",
  600: 'шістсот',
  700: 'сімсот',
  800: 'вісімсот',
  900: "дев'ятсот",
};

export const useTextSum = (sum: number) => {
  const thousands = Math.floor(sum / 1000);
  const hundrets = Math.floor((sum / 100) % 10);
  const rest = sum - thousands * 1000 - hundrets * 100;
  const tens = rest > 19 ? Math.floor((rest / 10) % 10) : rest;
  const digit = tens > 2 ? rest - tens : 0;

  const THundrets = Math.floor((thousands / 100) % 10);
  const TRest = thousands - THundrets * 100;
  const TTens = TRest > 19 ? Math.floor((TRest / 10) % 10) : TRest;
  const TDigit = TTens > 2 ? TRest - TTens : 0;

  const TString = `${THundrets && conventer[THundrets]} ${
    TTens && conventer[TTens]
  } ${TDigit && conventer[TDigit]} ${
    TDigit === 1 || (TDigit === 0 && TTens === 1) ? 'тисяча' : 'тисячі'
  }`;

  return `${TString} `
};
