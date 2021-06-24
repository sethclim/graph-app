import Canvas from "./canvas";
import { useState } from "react";
import { Point } from "../models/point";
import DrawCanvas from "./drawCanvas";

import "../css/graph.css";

const Graph = () => {
  const [pen, setPen] = useState(Boolean);

  const draw_LayerTwo = (ctx: any) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "black";

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

  const handleDrawTool = (tool: Boolean) => {
    if (tool) {
      setPen(true);
    } else {
      setPen(false);
    }
  };

  return (
    <div>
      <div id="graph">
        <DrawCanvas pen={pen} id="draw-layer" width="480" height="320" />
        <Canvas
          id="background-layer"
          draw={draw_LayerTwo}
          width="480"
          height="320"
        />
      </div>
      <div>
        <button onClick={() => handleDrawTool(true)}>Pen</button>
        <button onClick={() => handleDrawTool(false)}>Dot</button>
      </div>
    </div>
  );
};

export default Graph;
