export function getRandom(option: { min?: number; max: number }) {
  const { min = 0, max } = option;
  return Math.random() * max + min;
}
