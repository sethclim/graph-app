import { useLayoutEffect, useRef, useState, useContext } from "react";
import Canvas from "./Canvas";

//import { Point } from "../models/point";
import { GraphHelper } from "../models/GraphHelper";
import DrawCanvas from "./DrawCanvas";

import "../css/graph.css";
import { InputContext } from "../providers/InputProvider";
import { GraphContext } from "../providers/GraphProvider";

const Graph = () => {
  //const [setPen] = useState();
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

    let xNumber = GraphHelper.getNumLines(xRange)
    let yNumber = GraphHelper.getNumLines(yRange)

    let spacingX = ctx.canvas.width / xNumber;
    let spacingY = ctx.canvas.height / yNumber;

    //let origin = GraphHelper.getOrigin(xRange, yRange)

    let originLoc = GraphHelper.getOriginLocation(xRange, yRange)


    //X Axis
    ctx.moveTo(0, spacingY * originLoc.x);
    ctx.lineTo(ctx.canvas.width, spacingY * originLoc.x);

    //Y Axis
    ctx.moveTo(spacingX * originLoc.x, 0);
    ctx.lineTo(spacingX * originLoc.x, ctx.canvas.height);


    ctx.font = "20px Arial";

    for(let i = 0; i < xNumber; i++){
      const xNum = parseInt(xRange.min) + (xRange.step * i)
      ctx.fillText(xNum, (spacingX * i) + 5, spacingY * originLoc.y + 20);
    }

    for(let i = 0; i < yNumber; i++){
      const yNum = parseInt(yRange.min) + (yRange.step * i)
      ctx.fillText(yNum, spacingX * originLoc.x + 5, (spacingY * i) + 20);
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
    dots,
    setDots,
    redraw,
    setRedraw,
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
          redraw={redraw}
          setRedraw={setRedraw}
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
