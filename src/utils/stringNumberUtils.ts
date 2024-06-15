/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BigNumber } from 'bignumber.js';
/* eslint-disable no-underscore-dangle */

const MAX_SHOWN_DECIMALS = 8;

export default class FormatStringNumbers {
  private _numberStr: string;

  private _useTraillingZeros: boolean;

  private _withoutDecimals: boolean;

  private _decimalPlaces: number;

  private _useParentheses: boolean;

  private _parseWithCommas: boolean;

  private _useApproxSymbol: boolean;

  private _instance: BigNumber | undefined;

  private _integer: number | string | undefined;

  private _decimals: string | undefined;

  private _suffix: string | undefined;

  constructor(number: { toString: () => string }) {
    this._numberStr = number?.toString();
    this._decimalPlaces = MAX_SHOWN_DECIMALS;
    this._parseWithCommas = true;
    this._useApproxSymbol = true;
    this._useParentheses = false;
    this._withoutDecimals = false;
    this._useTraillingZeros = false;
    this._instance = undefined;
    this._integer = undefined;
    this._decimals = undefined;
    this._suffix = '';
  }

  withoutCommas = (): this => {
    this._parseWithCommas = false;
    return this;
  };

  addTraillingZeros = (): this => {
    this._useTraillingZeros = true;
    return this;
  };

  withoutDecimals = (): this => {
    this._withoutDecimals = true;
    return this;
  };

  dp = (n: number | string): this => {
    if (typeof n === 'string') {
      this._decimalPlaces = parseInt(n, 10) || MAX_SHOWN_DECIMALS;
    } else {
      this._decimalPlaces = n || MAX_SHOWN_DECIMALS;
    }
    //limit decimals to MAX_SHOWN_DECIMALS
    this._decimalPlaces = Math.min(this._decimalPlaces, MAX_SHOWN_DECIMALS);
    return this;
  };

  abs = (): this => {
    const instance = new BigNumber(this._numberStr).dp(
      16, // use all decimals before formatting
      BigNumber.ROUND_DOWN
    );
    this._numberStr = instance.abs().toString();
    return this;
  };

  useParentheses = (): this => {
    this._useParentheses = true;
    return this;
  };

  shouldNotApproximate = (): this => {
    this._useApproxSymbol = false;
    return this;
  };

  private _calculateIntegerAndDecimals = (): void => {
    const numberString =
      this._instance?.isNaN() ?? true ? '0' : this._instance?.toFixed();
    // @ts-ignore
    const num = numberString.split('.');
    // ignore commas when selected (usually for csv values)
    this._integer = this._parseWithCommas
      ? parseInt(num[0], 10).toLocaleString('en-US')
      : parseInt(num[0], 10);
    this._decimals = (num[1] || '').substring(0, this._decimalPlaces);

    // add trailling zeros to deciamls when selected
    if (this._useTraillingZeros) {
      this._decimals = this._decimals.padEnd(this._decimalPlaces, '0');
    }
  };

  private _createInstance = (mode: BigNumber.RoundingMode): void => {
    this._instance = new BigNumber(this._numberStr).dp(
      this._decimalPlaces,
      mode
    );
  };

  private _createExactConfig = (): void => {
    this._createInstance(BigNumber.ROUND_HALF_CEIL);
  };

  private _checkIsSmallEnoughForApproximation = (
    numberStr: string
  ): boolean => {
    //creating an instance with ROUND_DOWN will round the number down
    this._createExactConfig();
    // check if the rounded number is zero
    const roundedNumberIsZero = this._instance?.isEqualTo(0) ?? false;

    /// is the real number not zero
    const realNumberNotZero = !new BigNumber(numberStr).isEqualTo(0);
    return realNumberNotZero && roundedNumberIsZero;
  };

  private _createApproxConfig = (): void => {
    this._suffix = '~';
    this._createInstance(BigNumber.ROUND_UP);
    // when the suffix is added, trailing zeros are mandatory
    this._useTraillingZeros = true;
  };

  private _createInstanceByConfig = (): void => {
    const isApprox = this._useApproxSymbol;
    // make the value absolute when using parentheses
    if (isApprox && this._checkIsSmallEnoughForApproximation(this._numberStr)) {
      this._createApproxConfig();
    } else {
      this._createExactConfig();
    }
  };

  get instance(): BigNumber {
    this._createInstanceByConfig();
    if (!this._instance) {
      throw new Error('Instance is undefined');
    }
    return this._instance;
  }

  toString = (): string => {
    this._createInstanceByConfig();
    if (this._useParentheses) {
      if (this._instance) {
        this._instance = this._instance.abs();
      }
    }
    this._calculateIntegerAndDecimals();

    const str = this._withoutDecimals
      ? `${this._integer}`
      : `${this._suffix}${this._integer}${
          this._decimalPlaces > 0 && !!this._decimals ? '.' : ''
        }${this._decimals}`;

    return this._useParentheses ? `(${str})` : str;
  };
}
