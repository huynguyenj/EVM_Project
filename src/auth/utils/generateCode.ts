export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const codeExpiredTime = () => {
  const next1Minutes = new Date().getTime() + 60000;
  return next1Minutes;
};
