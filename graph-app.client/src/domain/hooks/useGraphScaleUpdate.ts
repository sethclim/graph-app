import { useState } from "react"
import { Range } from "../models/Range"

export const useGraphScaleUpdate = (setRange : (range : Range) => any) =>{
    
    const [xMin, setXMin] = useState<number>(-5)
    const [xMax, setXMax] = useState<number>(5)
    const [xStep, setXStep] = useState<number>(1)
  

    const handleMin = (num : any) =>{
        let number = parseInt(num)
        if(!isNaN(number) && checkMinMax(num, xMax))
        {
          setXMin(number)
          if(checkValid(number, xMax, xStep)){
            setRange(new Range(number, xMax, xStep))
          }
        }
        // else{
        //   setXMin("")
        // }
      }
      const handleMax = (num : any) =>{
        console.log("recived " + num)
        let number = parseInt(num)
        if(!isNaN(number)&& checkMinMax(xMin, num))
        {
          console.log("I passed")
          setXMax(number)
          if(checkValid(xMin, number, xStep)){
            setRange(new Range(xMin, number, xStep))
          }
        }
        // else{
        //   setXMax("")
        // }
      
      }
      const handleStep = (num : any) =>{
        let number = parseInt(num)
        if(!isNaN(number)&& number >=0)
        {
          setXStep(number)
          if(checkValid(xMin, xMax, number)){
            setRange(new Range(xMin, xMax, number))
          }
        }
        // else{
        //   setXStep("")
        // }
      
      }

      const checkValid = (num1 : any, num2 : any, num3 : any) =>{
        return(typeof num1 == 'number' && typeof num2 == 'number' && typeof num3 == 'number')
      }
    
      const checkMinMax = (min : number, max : number) =>{
        if(min >= max || max <= min){
          return false
        }
        return true
      }

    return {handleMin,handleMax,handleStep}
}