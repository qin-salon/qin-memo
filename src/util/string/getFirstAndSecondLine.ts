/**
 * @package Get first and second line of string
 */
export const getFirstAndSecondLine = (str: string) => {
  const [first, second] = str.split("\n").filter(Boolean);
  return [first, second || "\u00A0"];
};
