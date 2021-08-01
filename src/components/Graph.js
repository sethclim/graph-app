import Canvas from "./canvas";
import { useLayoutEffect, useRef, useState } from "react";
//import { Point } from "../models/point";
import DrawCanvas from "./DrawCanvas";

import "../css/graph.css";

const Graph = () => {
  const [pen, setPen] = useState();
  const graphRef = useRef();

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const draw_LayerTwo = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "blue";

    let xGridLines = 10;
    let yGridLines = 10;

    let spacingX = ctx.canvas.width / xGridLines;
    let spacingY = ctx.canvas.height / yGridLines;

    for (let i = 0; i < xGridLines; i++) {
      ctx.moveTo(spacingX * i, 0);
      ctx.lineTo(spacingX * i, ctx.canvas.height);
    }

    for (let i = 0; i < yGridLines; i++) {
      ctx.moveTo(0, spacingY * i);
      ctx.lineTo(ctx.canvas.width, spacingY * i);
    }
    ctx.stroke();
  };

  const handleDrawTool = (tool) => {
    if (tool) {
      setPen(true);
    } else {
      setPen(false);
    }
  };

  useLayoutEffect(() => {
    function handleResize() {
      if (graphRef.current) {
        setDimensions({
          width: graphRef.current.offsetWidth,
          height: graphRef.current.offsetHeight,
        });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div id="graph" ref={graphRef}>
      <DrawCanvas
        pen={true}
        id="draw-layer"
        width={dimensions.width}
        height={dimensions.height}
      />
      <Canvas
        id="background-layer"
        draw={draw_LayerTwo}
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
  );
};

export default Graph;
