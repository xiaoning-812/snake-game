import { useEffect, useRef } from "react";
import { CANVAS_SIZE, CELL_COUNT } from "../constants";

const CELL_SIZE = CANVAS_SIZE / CELL_COUNT;
const CELL_PADDING = 1;
const HEAD_RADIUS = 6;
const BODY_RADIUS = 4;

function readColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function drawCell(ctx, x, y, color, radius) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(
    x * CELL_SIZE + CELL_PADDING,
    y * CELL_SIZE + CELL_PADDING,
    CELL_SIZE - CELL_PADDING * 2,
    CELL_SIZE - CELL_PADDING * 2,
    radius
  );
  ctx.fill();
}

export default function Board({ snake, food }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    drawCell(ctx, food.x, food.y, readColor("--food"), CELL_SIZE / 2);

    snake.forEach((segment, index) => {
      const isHead = index === 0;
      drawCell(
        ctx,
        segment.x,
        segment.y,
        readColor(isHead ? "--snake-head" : "--snake-body"),
        isHead ? HEAD_RADIUS : BODY_RADIUS
      );
    });
  }, [snake, food]);

  return (
    <canvas
      ref={canvasRef}
      className="board"
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
    />
  );
}
