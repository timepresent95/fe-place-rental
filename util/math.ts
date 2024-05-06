export function getRandom(option: {
  min?: number;
  max: number;
  isFloat?: boolean;
}) {
  const { min = 0, max, isFloat = false } = option;
  const randomNumber = Math.random() * (max + 1) + min;
  return isFloat ? randomNumber : Math.floor(randomNumber);
}
