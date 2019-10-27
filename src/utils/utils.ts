const generateSalt = (): number => {
  return new Date().getTime();
};

const isEnglish = (word: string): boolean => {
  const regExp = /[a-zA-Z]/;
  return regExp.test(word[0]);
};

export { generateSalt, isEnglish };
