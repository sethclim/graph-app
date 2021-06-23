import { useEffect, useRef } from "react";

const DrawCanvas = (props) => {
  const { pen, ...rest } = props;
  const canvasRef = useRef(null);

  function resizeCanvasToDisplaySize(canvas) {
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }
    return false;
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

  function drawDot(context, points) {
    context.strokeStyle = "#ff0000";
    context.lineCap = "round";
    context.lineWidth = 5.0;

    if (points.length !== 0) {
      for (let i = 1; i < points.length; i++) {
        context.fillStyle = "#ff0000";
        context.beginPath();
        context.arc(points[i].x, points[i].y, 5, 0, 2 * Math.PI);
        context.fill();
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    var isDrawing;
    var points = [];
    var dots = [];

    resizeCanvasToDisplaySize(canvas);

    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true;
      if (pen) {
        points.push({ x: e.clientX, y: e.clientY });
      } else {
        dots.push({ x: e.clientX, y: e.clientY });
      }
    });

    canvas.addEventListener("mousemove", (e) => {
      if (!isDrawing) return;

      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      if (pen) {
        points.push({ x: e.clientX, y: e.clientY });
      } else {
        //dots.push({ x: e.clientX, y: e.clientY });
      }

      if (pen) {
        drawLine(context, points);
      } else {
        drawDot(context, dots);
      }
    });

    window.addEventListener("mouseup", (e) => {
      isDrawing = false;
    });
  }, [pen]);

  return <canvas id="drawCanvas" ref={canvasRef} {...rest} />;
};

export default DrawCanvas;
