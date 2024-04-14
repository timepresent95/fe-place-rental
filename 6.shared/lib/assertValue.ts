export const assertValue = <T>(value: T, message: string) => {
  if (value === undefined || value === null) {
    throw new Error(message);
  }
  return value;
};
