export const assertValue = <T>(
  value: T | undefined | null,
  message: string
) => {
  if (value === undefined || value === null) {
    throw new Error(message);
  }
  return value;
};
