/**
 * T.C. kimlik no checksum (11 digits, first digit not 0).
 * https://tckimlik.nvi.gov.tr
 */
export function isValidTckn(value: string) {
  if (!/^[1-9][0-9]{10}$/.test(value)) {
    return false;
  }
  const digits = value.split('').map(Number);
  const odd = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const even = digits[1] + digits[3] + digits[5] + digits[7];
  const digit10 = (((odd * 7) - even) % 10 + 10) % 10;
  const digit11 =
    digits.slice(0, 10).reduce((sum, digit) => sum + digit, 0) % 10;
  return digits[9] === digit10 && digits[10] === digit11;
}
