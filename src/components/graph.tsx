import Canvas from "./canvas";
import { useState } from "react";
import { Point } from "../models/point";
import DrawCanvas from "./drawCanvas";

import "../css/graph.css";

const Graph = () => {
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

  return (
    <div id="graph">
      <DrawCanvas pen={true} id="draw-layer" width="480" height="320" />
      <Canvas
        id="background-layer"
        draw={draw_LayerTwo}
        width="480"
        height="320"
      />
    </div>
  );
};

export default Graph;
