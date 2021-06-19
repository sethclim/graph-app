import React from "react";
import Canvas from "./canvas";
import { useState } from "react";
import { Point } from "../models/point";

import "../css/graph.css";

function Graph() {
  const [segments, setSegments] = useState(Array<Point>());

  const debug = true;

  const draw_LayerOne = (ctx: any) => {
    if (segments.length !== 0) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      //ctx.fillStyle = "blue";
      //ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = "#ff0000";
      ctx.lineCap = "round";
      ctx.lineWidth = 5.0;

      ctx.beginPath();
      ctx.moveTo(segments[0].x, segments[0].y);

      for (var i = 1; i < segments.length; i++) {
        if (debug) console.log(segments[i].x, segments[i].y);
        ctx.lineTo(segments[i].x, segments[i].y);
      }

      ctx.stroke();
    }
  };

  const draw_LayerTwo = (ctx: any) => {
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.lineWidth = "10";
    ctx.strokeStyle = "blue";
    ctx.rect(50, 50, 150, 80);
    ctx.stroke();
  };

  const handleMouseDown = (event: any) => {
    var point: Point = new Point(
      event.clientX - event.target.offsetLeft,
      event.clientY - event.target.offsetTop
    );

    setSegments(segments.concat(point));
  };

  return (
    <div id="graph">
      <Canvas
        id="foreground-layer"
        onMouseDown={(e: any) => handleMouseDown(e)}
        width="480"
        height="320"
        draw={draw_LayerOne}
      />
      <Canvas
        id="background-layer"
        draw={draw_LayerTwo}
        width="480"
        height="320"
      />
    </div>
  );
}

export default Graph;
