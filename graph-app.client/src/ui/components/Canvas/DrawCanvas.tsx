import { useEffect, useRef, useCallback, useState, MouseEvent } from "react";
import { PenOptions } from "../../../domain/models/PenOptions";
import { Dimension } from "../../../domain/models/Dimension";
import { Point } from "../../../domain/models/Point";

type DrawCanvasProps = {
  pen : PenOptions, 
  width : number,
  height : number, 
  points : Array<Array<Point>>,
  setPoints : Function,
  linePoints : Array<Array<Point>>,
  setLinePoints : Function,
  dots : Array<Point>,
  setDots : Function,
  redraw : boolean,
  setRedraw : Function,
  color : string,
  id: CSSModuleClasses[string]
}

const DrawCanvas = ({pen, width, height, points, setPoints, linePoints, setLinePoints, dots, setDots, redraw, setRedraw, color, id} : DrawCanvasProps) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef(dots)
  const pointsRef = useRef(points)
  const linePointsRef = useRef(linePoints)

  const [isDrawing, setIsDrawing] = useState(false)
  const [lineStarted, setLineStarted] = useState(false)
  const [tempStart, setTempStart] = useState<Point | null>(null)
  
  useEffect(()=>{
    dotsRef.current = dots
  },[dots])

  useEffect(()=>{
    pointsRef.current = points
  },[points])

  useEffect(()=>{
    linePointsRef.current = linePoints
  },[linePoints])

  const resizeCanvasToDisplaySize = useCallback((newWidth : number, newHeight : number, canvas : HTMLCanvasElement) =>{
      const oldWidth = canvas.getBoundingClientRect().width;
      const oldHeight = canvas.getBoundingClientRect().height;

      if (newWidth !== oldWidth || newHeight !== oldHeight) {
        canvas.width = width;
        canvas.height = height;

        let oldDim = {width: oldWidth, height: oldHeight }
        let newDim = {width: newWidth, height: newHeight }

        const newPoints = [] 

        for(let i = 0; i < pointsRef.current.length; i++)
        {
          let subArr = pointsRef.current[i]
          let newSubArr = scaleDrawingOnResize(subArr, oldDim, newDim)

          newPoints.push(newSubArr)
        }
      
        const newDots = scaleDrawingOnResize(dotsRef.current, oldDim, newDim);

        setPoints(newPoints)
        setDots(newDots)

        return true
      }
      return false
    }, [setDots,setPoints, width, height]
  )

  const scaleDrawingOnResize = (data : Array<any>, oldDimensions : Dimension, newDimensions : Dimension) => {
    const scalerX = newDimensions.width / oldDimensions.width;
    const scalerY = newDimensions.height / oldDimensions.height;

    const newData = [];

    for (let i = 0; i < data.length; i++) {
      newData.push({ x: data[i].x * scalerX, y: data[i].y * scalerY });
    }

    return newData;
  }

  const reDrawLine = useCallback((context : any, points : Array<any>) => {
      context.strokeStyle = color;
      context.lineCap = "round";
      context.lineWidth = 5.0;
      context.beginPath();

      for (var i = 0; i < points.length; i++) {
        context.moveTo(points[i][0].x, points[i][0].y);
        for (var j = 1; j < points[i].length; j++) {
          context.lineTo(points[i][j].x, points[i][j].y);
        }
      }
      context.stroke();
    },[color]
  )

  const reDrawDot = useCallback((context : any, dots : Array<any>) => {
      context.strokeStyle = color;
      context.lineCap = "round";
      context.lineWidth = 5.0;

      if (dots.length !== 0) {
        for (let i = 0; i < dots.length; i++) {
          context.fillStyle = color;
          context.beginPath();
          context.arc(dots[i].x, dots[i].y, 5, 0, 2 * Math.PI);
          context.fill();
        }
      }
    },[color]
  )

  const reDrawAll = useCallback(()=>{
      const canvas = canvasRef.current;

      if(canvas === null)
        return

      const context = canvas.getContext("2d");

      if(context === null)
        return

      context.clearRect(0, 0, context.canvas.width, context.canvas.height)

      if (dotsRef.current !== undefined && dotsRef.current.length > 0){
         reDrawDot(context, dotsRef.current);
      }
  
      if (pointsRef.current !== undefined && pointsRef.current.length > 0) {
        reDrawLine(context, pointsRef.current);
      }

      if (linePointsRef.current !== undefined && linePointsRef.current.length > 0) {
        reDrawLine(context, linePointsRef.current);
      }
    },[reDrawDot, reDrawLine]
  )
  
  useEffect(() =>{
    const canvas = canvasRef.current;


    if(canvas !== null)
      resizeCanvasToDisplaySize(width, height, canvas);
    
    // reDrawAll()

  },[width, height, setRedraw, resizeCanvasToDisplaySize])

  useEffect(()=>{
    if (redraw) {
       reDrawAll()
    }
    setRedraw(false)
  },[redraw, reDrawAll,setRedraw])

  // //===================================================================
  const drawDot = useCallback( (ctx : any, x : number, y : number) =>{
      ctx.strokeStyle = color;
      ctx.lineCap = "round";
      ctx.lineWidth = 5.0;
      ctx.fillStyle = color;

      ctx.beginPath();
      ctx.arc(x,y, 5, 0, 2 * Math.PI);
      ctx.fill();
    },[color]
  )

  const startLine = useCallback( (ctx : any, x : number, y : number) =>{
    console.log("Color " + color)
      ctx.strokeStyle = color;
      ctx.lineCap = "round";
      ctx.lineWidth = 5.0;
      ctx.beginPath();
      ctx.moveTo(x,y);
    },[color]
  )

  const drawLine = (ctx : any, x : number, y : number) =>{
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  const drawTempLine = (ctx : any, x1 : number,y1 : number, x2 : number, y2 : number) =>{
    ctx.strokeStyle = "#808080";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  //===================================================================
  // useEffect(() => {
  //   console.log("Main use effect");
  //   // if(canvas === null)
  //   //   return
    
  //   const context = canvas?.getContext("2d");
    
  //   // if(context === null)
  //   //   return
    
    
  //   function mouseDown(e : MouseEvent) {
  //     const canvas = canvasRef.current;
  //     const { left, top } = canvas.getBoundingClientRect();
  //     console.log("MOUSE MOUSE MOUSE " + JSON.stringify(e))
  //     const currentX = e.clientX - left;
  //     const currentY = e.clientY - top;

  //     switch(pen) {
  //       case PenOptions.pen:
  //         reDrawAll()
  //         d_pen()
  //         break;
  //       case PenOptions.line:
  //         d_line(context, currentX, currentY)
  //         break;
  //       case PenOptions.dot:
  //         reDrawAll()
  //         d_dot()
  //         break;
  //       default:
  //         d_pen()
  //     }

  //     function d_pen(){
  //       let p = [...points]
  //       p.push([{ x: currentX, y: currentY }])
  //       setPoints(p)
  //       startLine(context,currentX,currentY)
  //       setIsDrawing(true)
  //     }

  //     function d_dot(){
  //       let d = [...dots]
  //       d.push({ x: currentX, y: currentY });
  //       setDots(d)
  //       drawDot(context, currentX,currentY)
  //     }

  //     function d_line(ctx : any, x : number, y : number){
  //       let lp = [...linePoints]
        

  //       if(!lineStarted)
  //       {
  //         lp.push([{ x: x, y: y }]);
  //         setLinePoints(lp)
  //         setLineStarted(true);
  //         startLine(ctx, x,y)
  //         setTempStart({x: x, y: y})
  //       }
  //       else
  //       {
  //         lp[lp.length - 1].push({ x: x, y: y });
  //         setLinePoints(lp)
  //         drawLine(ctx, x,y)
  //         setLineStarted(false)
  //         setTempStart(null)
  //         reDrawAll();
  //       }      
  //     }
  //   }

  //   console.log(canvas !== null)

  //   canvas.addEventListener("mousedown", mouseDown);

  //   return () => {
  //     canvas?.removeEventListener("mousedown", mouseDown);
  //   };
  // }, [pen, dots, points,linePoints, setPoints, setDots, setLinePoints, lineStarted, reDrawAll, drawDot, startLine]);

  function mouseDown(e: MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;

    if(canvas === null)
      return

    const context = canvas?.getContext("2d");

    if(context === null)
      return

    const { left, top } = canvas.getBoundingClientRect();

    const currentX = e.clientX - left;
    const currentY = e.clientY - top;

    switch(pen) {
      case PenOptions.pen:
        reDrawAll()
        d_pen()
        break;
      case PenOptions.line:
        d_line(context, currentX, currentY)
        break;
      case PenOptions.dot:
        reDrawAll()
        d_dot()
        break;
      default:
        d_pen()
    }

    function d_pen(){
      let p = [...points]
      p.push([{ x: currentX, y: currentY }])
      setPoints(p)
      startLine(context,currentX,currentY)
      setIsDrawing(true)
    }

    function d_dot(){
      let d = [...dots]
      d.push({ x: currentX, y: currentY });
      setDots(d)
      drawDot(context, currentX,currentY)
    }

    function d_line(ctx : any, x : number, y : number){
      let lp = [...linePoints]
      

      if(!lineStarted)
      {
        lp.push([{ x: x, y: y }]);
        setLinePoints(lp)
        setLineStarted(true);
        startLine(ctx, x,y)
        setTempStart({x: x, y: y})
      }
      else
      {
        lp[lp.length - 1].push({ x: x, y: y });
        setLinePoints(lp)
        drawLine(ctx, x,y)
        setLineStarted(false)
        setTempStart(null)
        reDrawAll();
      }      
    }
  }


  useEffect(()=>{
    const canvas = canvasRef.current;

    function mouseUp() {
      setIsDrawing(false)
    }

    window.addEventListener("mouseup", mouseUp);

    return () => {
      if(canvas)
        canvas.removeEventListener("mousemove", mouseUp);
    };
  },[])


  useEffect(()=>{

    if(pen !== PenOptions.line){return}

    const canvas = canvasRef.current;

    if(canvas === null)
      return

    const context = canvas.getContext("2d");

    
    if(context === null)
      return

    const { left, top } = canvas.getBoundingClientRect();

    function mouseMove(e : any) {
      const currentX = e.clientX - left;
      const currentY = e.clientY - top;
      //setTempEndPoint({ x: currentX, y: currentY })
      if(tempStart !== null){
        console.log("Temp start " + JSON.stringify(tempStart))
        reDrawAll()
        drawTempLine(context, tempStart.x, tempStart.y, currentX, currentY)
      }
     
    }

    canvas.addEventListener("mousemove", mouseMove);

    return () => {
      canvas.removeEventListener("mousemove", mouseMove);
    };

  },[pen, tempStart, reDrawAll])



  useEffect(()=>{
    if (!isDrawing){ return }

    const canvas = canvasRef.current;

    if(canvas === null)
      return

    const context = canvas.getContext("2d");

    if(context === null)
      return
    
    const { left, top } = canvas.getBoundingClientRect();

    function mouseMove(e: any) {

      const currentX = e.clientX - left;
      const currentY = e.clientY - top;

      let p = [...points]
      p[p.length - 1].push({ x: currentX, y: currentY })

      setPoints(p)
      drawLine(context, currentX, currentY)
    }

    canvas.addEventListener("mousemove", mouseMove);

    return () => {
      canvas.removeEventListener("mousemove", mouseMove);
    };
  },[isDrawing, points, setPoints])

  //Add actual ID here?
  return <canvas id={id} ref={canvasRef} onMouseDown={mouseDown} />;
};

export default DrawCanvas;
