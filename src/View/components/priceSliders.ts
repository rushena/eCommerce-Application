export class PriceSlider {
  private min: number;
  private max: number;
  private _left: number;
  private _right: number;

  constructor(min: number, max: number, left?: number, right?: number) {
    this.min = min;
    this.max = max;
    this._left = left ?? min;
    this._right = right ?? max;
  }

  get left(): number {
    return this._left;
  }
  set left(left: number) {
    if (left > this.right) {
      this._left = this.right;
      this._right = left;
    } else {
      this._left = left;
    }
  }
  get right(): number {
    return this._left;
  }
  set right(right: number) {
    if (right < this.right) {
      this._right = this.left;
      this._left = right;
    } else {
      this._right = right;
    }
  }
}
