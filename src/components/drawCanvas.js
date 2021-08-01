import { useEffect, useRef, useCallback } from "react";

const DrawCanvas = (props) => {
  const {
    pen,
    width,
    height,
    points,
    setPoints,
    dots,
    setDots,
    redraw,
    setRedraw,
    ...rest
  } = props;
  const canvasRef = useRef(null);

  const resizeCanvasToDisplaySize = useCallback(
    (h, w, canvas) => {
      const { width, height } = canvas.getBoundingClientRect();

      if (w !== width || h !== height) {
        canvas.width = w;
        canvas.height = h;

        const newPoints = scaleDrawingOnResize(
          points,
          { width: width, height: height },
          { width: w, height: h }
        );
        const newDots = scaleDrawingOnResize(
          dots,
          { width: width, height: height },
          { width: w, height: h }
        );

        setPoints(newPoints);
        setDots(newDots);

        return true;
      }

      return false;
    },
    [dots, points, setDots, setPoints]
  );

  function scaleDrawingOnResize(data, oldDimensions, newDimensions) {
    const scalerX = newDimensions.width / oldDimensions.width;
    const scalerY = newDimensions.height / oldDimensions.height;

    const newData = [];

    for (let i = 0; i < data.length; i++) {
      newData.push({ x: data[i].x * scalerX, y: data[i].y * scalerY });
    }

    return newData;
  }

  function drawLine(context, points) {
    context.strokeStyle = "#ff0000";
    context.lineCap = "round";
    context.lineWidth = 5.0;
    context.beginPath();

    context.moveTo(points[0].x, points[0].y);

    for (var i = 1; i < points.length; i++) {
      context.lineTo(points[i].x, points[i].y);
    }
    context.stroke();
  }

  function drawDot(context, dots) {
    context.strokeStyle = "#ff0000";
    context.lineCap = "round";
    context.lineWidth = 5.0;

    if (dots.length !== 0) {
      for (let i = 1; i < dots.length; i++) {
        context.fillStyle = "#ff0000";
        context.beginPath();
        context.arc(dots[i].x, dots[i].y, 5, 0, 2 * Math.PI);
        context.fill();
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { left, top } = canvas.getBoundingClientRect();
    var isDrawing;

    const resizeExe = resizeCanvasToDisplaySize(height, width, canvas);

    setRedraw(resizeExe);

    if (redraw) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      executeDraw();
    }

    function mouseDown(e) {
      isDrawing = true;

      const currentX = e.clientX - left;

      const currentY = e.clientY - top;

      if (pen === true) {
        points.push({ x: currentX, y: currentY });
      }
      if (pen === false) {
        dots.push({ x: currentX, y: currentY });
      }

      executeDraw();
    }

    function mouseMove(e) {
      if (!isDrawing) return;

      const currentX = e.clientX - left;

      const currentY = e.clientY - top;

      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      if (pen) {
        points.push({ x: currentX, y: currentY });
      }

      executeDraw();
    }

    function mouseUp() {
      isDrawing = false;
    }

    function executeDraw() {
      if (points !== undefined && points.length > 0) drawLine(context, points);

      if (dots !== undefined && dots.length > 0) drawDot(context, dots);
    }

    canvas.addEventListener("mousedown", mouseDown);

    canvas.addEventListener("mousemove", mouseMove);

    window.addEventListener("mouseup", mouseUp);

    return () => {
      canvas.removeEventListener("mousedown", mouseDown);
      canvas.removeEventListener("mousemove", mouseMove);
      canvas.removeEventListener("mousemove", mouseUp);
    };
  }, [
    pen,
    points,
    dots,
    height,
    width,
    resizeCanvasToDisplaySize,
    redraw,
    setRedraw,
  ]);

  return <canvas id="drawCanvas" ref={canvasRef} {...rest} />;
};

export default DrawCanvas;
