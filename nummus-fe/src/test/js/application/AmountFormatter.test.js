import AmountFormatter from '../../../main/js/application/AmountFormatter';


it('stores initial value', () => {
  const amountFormatter = new AmountFormatter();
  expect(amountFormatter.formatted()).toEqual('00,00');
  expect(amountFormatter.valueCents()).toEqual(0);
});

it('captures keyDown', () => {
  const amountFormatter = new AmountFormatter();
  amountFormatter.keyDown('9');
  amountFormatter.keyDown('0');
  expect(amountFormatter.formatted()).toEqual('00,90');
  expect(amountFormatter.valueCents()).toEqual(90);
});

it('formats long number', () => {
  const amountFormatter = new AmountFormatter();
  amountFormatter.keyDown('9');
  amountFormatter.keyDown('0');
  amountFormatter.keyDown('0');
  amountFormatter.keyDown('0');
  amountFormatter.keyDown('1');
  expect(amountFormatter.formatted()).toEqual('900,01');
  expect(amountFormatter.valueCents()).toEqual(90001);
});

it('captures backspaces', () => {
  const amountFormatter = new AmountFormatter();
  amountFormatter.keyDown('9');
  amountFormatter.keyDown('0');
  amountFormatter.keyDown('0');
  amountFormatter.keyDown('0');
  amountFormatter.keyDown('1');
  amountFormatter.backspace();
  amountFormatter.backspace();
  expect(amountFormatter.formatted()).toEqual('09,00');
  expect(amountFormatter.valueCents()).toEqual(900);
});

it('accepts more backspaces than keys pressed', () => {
  const amountFormatter = new AmountFormatter();
  amountFormatter.keyDown('9');
  amountFormatter.backspace();
  amountFormatter.backspace();
  expect(amountFormatter.formatted()).toEqual('00,00');
  expect(amountFormatter.valueCents()).toEqual(0);
});

it('clears input', () => {
  const amountFormatter = new AmountFormatter();
  amountFormatter.keyDown('9');
  amountFormatter.keyDown('9');
  amountFormatter.keyDown('9');
  amountFormatter.clear();
  expect(amountFormatter.formatted()).toEqual('00,00');
  expect(amountFormatter.valueCents()).toEqual(0);
});

