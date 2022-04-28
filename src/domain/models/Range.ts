export class Range {
    public min: number;
    public max: number;
    public step: number;
  
    constructor(min: number, max: number, step : number) {
      this.min = min;
      this.max = max;
      this.step = step;
    }
  }