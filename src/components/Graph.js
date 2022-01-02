import { useLayoutEffect, useRef, useState, useContext } from "react";
import Canvas from "./Canvas";

//import { Point } from "../models/point";
import { GraphHelper } from "../models/GraphHelper";
import DrawCanvas from "./DrawCanvas";

import "../css/graph.css";
import { InputContext } from "../providers/InputProvider";
import { GraphContext } from "../providers/GraphProvider";

const Graph = () => {
  const graphRef = useRef();

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { xRange,yRange} = useContext(GraphContext);

  const drawGridLines = (ctx) =>{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "blue";

    let xGridLines = GraphHelper.getNumLines(xRange);
    let yGridLines = GraphHelper.getNumLines(yRange);

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
  }

  const drawAxis = (ctx) =>{
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "blue";

    let xR = {...xRange}
    xR.step = 1

    let yR = {...yRange}
    yR.step = 1

    let xNum = GraphHelper.getNumLines(xR)
    let yNum = GraphHelper.getNumLines(yR)

    let spacX = ctx.canvas.width / xNum;
    let spacY = ctx.canvas.height / yNum;

    let originLoc = GraphHelper.getOriginLocation(xR, yR)

    //X Axis
    ctx.moveTo(0, spacY * originLoc.y);
    ctx.lineTo(ctx.canvas.width, spacY * originLoc.y);

    //Y Axis
    ctx.moveTo(spacX * originLoc.x, 0);
    ctx.lineTo(spacX * originLoc.x, ctx.canvas.height);

    ctx.font = "20px Arial";

    let xNumber = GraphHelper.getNumLines(xRange)
    let yNumber = GraphHelper.getNumLines(yRange)

    let spacingX = ctx.canvas.width / xNumber;
    let spacingY = ctx.canvas.height / yNumber;

    for(let i = 0; i < xNumber; i++){
      const xNum = parseInt(xRange.min) + (xRange.step * i)
      ctx.fillText(xNum, (spacingX * i) + 5, spacY * originLoc.y + 20);
    }

    for(let i = 0; i < yNumber; i++){
      const yNum = parseInt(yRange.max) - (yRange.step * i)
      ctx.fillText(yNum, spacX * originLoc.x + 5, (spacingY * i) + 20);
    }

    ctx.stroke();
  }


  const draw_LayerTwo = (ctx) => {
    drawGridLines(ctx);
    drawAxis(ctx);
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

  const {
    penSelection,
    points,
    setPoints,
    linePoints,
    setLinePoints,
    dots,
    setDots,
    redraw,
    setRedraw,
    color
  } = useContext(InputContext);

  return (
    <div className="graph-wrapper">
      <div id="graph" ref={graphRef}>
        <DrawCanvas
          pen={penSelection}
          id="draw-layer"
          width={dimensions.width}
          height={dimensions.height}
          dots={dots}
          setDots={setDots}
          points={points}
          setPoints={setPoints}
          linePoints={linePoints}
          setLinePoints={setLinePoints}
          redraw={redraw}
          setRedraw={setRedraw}
          color={color}
        />
        <Canvas
          id="background-layer"
          draw={draw_LayerTwo}
          width={dimensions.width}
          height={dimensions.height}
        />
      </div>
    </div>
  );
};

export default Graph;
