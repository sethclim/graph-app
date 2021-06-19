export class Point {
  private _x: Number;
  private _y: Number;

  constructor(x: Number, y: Number) {
    this._x = x;
    this._y = y;
  }

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }
}
