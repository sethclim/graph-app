import { useEffect, useRef, useMemo, useState } from "react";

const DrawCanvas = (props) => {
  const { pen, ...rest } = props;
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [dots, setDots] = useState([]);

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

    var isDrawing;

    resizeCanvasToDisplaySize(canvas);

    function mouseDown(e) {
      isDrawing = true;
      if (pen === true) {
        points.push({ x: e.clientX, y: e.clientY });
      }
      if (pen === false) {
        dots.push({ x: e.clientX, y: e.clientY });
      }

      executeDraw();
    }

    function mouseMove(e) {
      if (!isDrawing) return;

      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      if (pen) {
        points.push({ x: e.clientX, y: e.clientY });
      }

      executeDraw();
    }

    function mouseUp(e) {
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
  }, [pen, points, dots]);

  return <canvas id="drawCanvas" ref={canvasRef} {...rest} />;
};

export default DrawCanvas;
