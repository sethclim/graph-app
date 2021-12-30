import { useEffect, useRef, useCallback, useState } from "react";

const DrawCanvas = ({pen, width, height, points, setPoints, dots, setDots, redraw, setRedraw,...rest}) => {

  const canvasRef = useRef(null);
  const dotsRef = useRef(dots)
  const pointsRef = useRef(points)

  const [isDrawing, setIsDrawing] = useState(false)
  
  useEffect(()=>{
    dotsRef.current = dots
  },[dots])

  useEffect(()=>{
    pointsRef.current = points
  },[points])

  const resizeCanvasToDisplaySize = useCallback((newWidth, newHeight, canvas) =>{
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

  const scaleDrawingOnResize = (data, oldDimensions, newDimensions) => {
    const scalerX = newDimensions.width / oldDimensions.width;
    const scalerY = newDimensions.height / oldDimensions.height;

    const newData = [];

    for (let i = 0; i < data.length; i++) {
      newData.push({ x: data[i].x * scalerX, y: data[i].y * scalerY });
    }

    return newData;
  }

  function reDrawLine(context, points) {
    context.strokeStyle = "#ff0000";
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
  }

  function reDrawDot(context, dots) {
    context.strokeStyle = "#ff0000";
    context.lineCap = "round";
    context.lineWidth = 5.0;

    if (dots.length !== 0) {
      for (let i = 0; i < dots.length; i++) {
        context.fillStyle = "#ff0000";
        context.beginPath();
        context.arc(dots[i].x, dots[i].y, 5, 0, 2 * Math.PI);
        context.fill();
      }
    }
  }

  const reDrawAll = useCallback(()=>{
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      context.clearRect(0, 0, context.canvas.width, context.canvas.height)

      if (dotsRef.current !== undefined && dotsRef.current.length > 0){
         reDrawDot(context, dotsRef.current);
      }
  
      if (pointsRef.current !== undefined && pointsRef.current.length > 0) {
        reDrawLine(context, pointsRef.current);
      }
    },[]
  )
  
  useEffect(() =>{
    const canvas = canvasRef.current;
    resizeCanvasToDisplaySize(width, height, canvas);
    
    reDrawAll()

  },[width, height, setRedraw, resizeCanvasToDisplaySize, reDrawAll])

  useEffect(()=>{
    if (redraw) {
      reDrawAll()
    }
  },[redraw, reDrawAll])

  //===================================================================
  const drawDot = (ctx,x,y) =>{
    ctx.strokeStyle = "#ff0000";
    ctx.lineCap = "round";
    ctx.lineWidth = 5.0;
    ctx.fillStyle = "#ff0000";

    ctx.beginPath();
    ctx.arc(x,y, 5, 0, 2 * Math.PI);
    ctx.fill();
  }

  const startLine = (ctx, x ,y) =>{
    ctx.strokeStyle = "#ff0000";
    ctx.lineCap = "round";
    ctx.lineWidth = 5.0;
    ctx.moveTo(x,y);
    ctx.beginPath();
  }

  const drawLine = (ctx, x ,y) =>{
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  //===================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { left, top } = canvas.getBoundingClientRect();

    function mouseDown(e) {
      const currentX = e.clientX - left;
      const currentY = e.clientY - top;

      if (pen === true) {

        let p = [...points]
        p.push([{ x: currentX, y: currentY }])

        setPoints(p)

        startLine(context,currentX,currentY)
        setIsDrawing(true)
      }

      if (pen === false) {

        let d = [...dots]
        d.push({ x: currentX, y: currentY });

        setDots(d)

        drawDot(context, currentX,currentY)
      }
    }

    canvas.addEventListener("mousedown", mouseDown);

    return () => {
      canvas.removeEventListener("mousedown", mouseDown);
    };
  }, [pen, dots, points, setPoints, setDots]);

  useEffect(()=>{
    const canvas = canvasRef.current;

    function mouseUp() {
      setIsDrawing(false)
    }

    window.addEventListener("mouseup", mouseUp);

    return () => {
      canvas.removeEventListener("mousemove", mouseUp);
    };
  },[])


  useEffect(()=>{
    if (!isDrawing){ return }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { left, top } = canvas.getBoundingClientRect();

    function mouseMove(e) {

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

  return <canvas id="drawCanvas" ref={canvasRef} {...rest} />;
};

export default DrawCanvas;
