class AmountFormatter {

  constructor() {
    this.inputDigits = '';
  }

  formatted() {
    const cents = this.formattedCents();

    var centsPart = cents.substring(cents.length - 2, cents.length);
    var unitsPart = cents.substring(0, cents.length - 2);

    return `${unitsPart},${centsPart}`;
  }

  formattedCents() {
    const missingDigits = 4 - this.inputDigits.length;
    if (missingDigits > 0) {
      const leftDigits = [...Array(missingDigits).keys()].reduce((v) => '0' + v, '');
      return leftDigits + this.inputDigits;
    } else {
      return this.inputDigits;
    }
  }

  valueCents() {
    return parseInt(this.formattedCents(), 10);
  }

  keyDown(digit) {
    this.inputDigits = this.inputDigits + digit;
  }

  backspace() {
    this.inputDigits = this.inputDigits.substring(0, this.inputDigits.length - 1);
  }

  clear() {
    this.inputDigits = '';
  }

  static fromCents(amountCents) {
    const formatter = new AmountFormatter();
    const value = amountCents.toString();
    for (let i = 0; i < value.length; i++) {
      formatter.keyDown(value.charAt(i));
    }
    return formatter;
  }
}

export default AmountFormatter;
