import { useEffect, useRef } from "react";

const Canvas = (props) => {
  const { draw, onMyMouseMove, onMyMouseUp, ...rest } = props;
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.addEventListener("mousemove", (event) => {
      if (onMyMouseMove) onMyMouseMove(event);
    });

    window.addEventListener("mouseup", (event) => {
      if (onMyMouseUp) onMyMouseUp(event);
    });

    const render = () => {
      resizeCanvasToDisplaySize(canvas);
      if (draw !== null) draw(context);
    };
    render();
  }, [draw, onMyMouseMove, onMyMouseUp]);

  return <canvas id="canvas" ref={canvasRef} {...rest} />;
};

export default Canvas;
