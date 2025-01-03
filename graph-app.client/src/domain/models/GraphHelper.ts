import { Point } from "./Point";
import { Range } from "./Range";

export class GraphHelper{

    static getOrigin = (xRange : Range, yRange : Range) =>{
        let origin = new Point(0,0)

        if(xRange.min > 0 )
        {
            origin.x = xRange.min;
        }
        else if(xRange.max < 0)
        {
            origin.x = xRange.max
        }

        if(yRange.min > 0 )
        {
            origin.y = yRange.min;
        }
        else if(yRange.max  < 0)
        {
            origin.y = yRange.min
        }

        return origin;
    }

    static getOriginLocation = (xRange : Range, yRange : Range) =>{

        let origin = GraphHelper.getOrigin(xRange, yRange);

        console.log(`origin ${JSON.stringify(origin)}`)

        let xOriginLoc = origin.x - (xRange.min / xRange.step);
        let yOriginLoc = Math.abs(yRange.max  / yRange.step) + Math.abs(origin.y);
    
        return(new Point(xOriginLoc, yOriginLoc))
    }

    static getNumLines = (range : Range) =>{
        return((GraphHelper.diff(range)) / range.step)
    }

    static diff = (range : Range) =>{
        return (range.max - range.min);
    }
    
}

