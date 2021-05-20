export const getRandomColor = () => {
  const colorLetters = '0123456789ABCDEF';
  let randomColor = '#';

  for (let i = 0; i < 6; i++) {
    randomColor += colorLetters[Math.floor(Math.random() * 16)];
  }

  return randomColor;
};
