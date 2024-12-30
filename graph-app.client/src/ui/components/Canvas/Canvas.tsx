import { useEffect, useRef } from "react";

const Canvas = (props : any) => {
  const { draw, onMyMouseMove, onMyMouseUp, width, height, ...rest } = props;
  const canvasRef = useRef(null);

  function resizeCanvasToDisplaySize(h, w, canvas) {
    const { width, height } = canvas.getBoundingClientRect();

    if (w !== width || h !== height) {
      canvas.width = w;
      canvas.height = h;
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
      resizeCanvasToDisplaySize(height, width, canvas);
      if (draw !== null) draw(context);
    };
    render();
  }, [draw, onMyMouseMove, onMyMouseUp, height, width]);

  return <canvas id="canvas" ref={canvasRef} {...rest} />;
};

export default Canvas;
