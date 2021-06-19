import React from "react";
import Canvas from "./canvas";
import { useState } from "react";
import { Point } from "../models/point";

function Graph() {
  const [segments, setSegments] = useState(Array<Point>());

  const draw = (ctx: any) => {
    if (segments.length !== 0) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = "#ff0000";
      ctx.lineCap = "round";
      ctx.lineWidth = 5.0;

      ctx.beginPath();
      ctx.moveTo(segments[0].x, segments[0].y);

      for (var i = 1; i < segments.length; i++) {
        console.log(segments[i].x, segments[i].y);
        ctx.lineTo(segments[i].x, segments[i].y);
      }

      ctx.stroke();
    }
  };

  const handleMouseDown = (event: any) => {
    var point: Point = new Point(
      event.clientX - event.target.offsetLeft,
      event.clientY - event.target.offsetTop
    );

    setSegments(segments.concat(point));
  };

  return <Canvas onMouseDown={(e: any) => handleMouseDown(e)} draw={draw} />;
}

export default Graph;
