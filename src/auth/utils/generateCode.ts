export const generateCode = () => {
  const randomNum: number[] = [];
  for (let i = 0; i < 6; i++) {
    const number = Math.round(Math.random() * 10);
    randomNum.push(number === 10 ? 0 : number);
  }
  return randomNum.join('');
};
