function gcd(a: number, b: number) {
  if (a == 0) return b;
  else if (b == 0) return a;
  if (a < b) return gcd(a, b % a);
  else return gcd(b, a % b);
}

// Function to convert decimal to fraction
export function decimalToFraction(number: number) {
  // Fetch letegral value of the decimal
  const letVal = Math.floor(number);

  // Fetch fractional part of the decimal
  const fVal = number - letVal;

  // Consider precision value to
  // convert fractional part to
  // letegral equivalent
  const pVal = 1000000000;

  // Calculate GCD of letegral
  // equivalent of fractional
  // part and precision value
  const gcdVal = gcd(Math.round(fVal * pVal), pVal);

  // Calculate num and deno
  const num = Math.round(fVal * pVal) / gcdVal;
  const deno = pVal / gcdVal;

  // Print the fraction
  return letVal * deno + num + '/' + deno;
}
