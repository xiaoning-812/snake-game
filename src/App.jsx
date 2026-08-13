import { useEffect, useRef } from "react";
import Board from "./components/Board.jsx";
import Scoreboard from "./components/Scoreboard.jsx";
import Overlay from "./components/Overlay.jsx";
import TouchControls from "./components/TouchControls.jsx";
import { useSnakeGame } from "./hooks/useSnakeGame.js";
import { KEY_TO_DIRECTION, SWIPE_THRESHOLD } from "./constants";

export default function App() {
  const { snake, food, score, best, status, start, changeDirection } =
    useSnakeGame();

  const boardWrapRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (event) => {
      const direction = KEY_TO_DIRECTION[event.key];
      if (!direction) return;
      event.preventDefault();
      changeDirection(direction);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection]);

  useEffect(() => {
    const element = boardWrapRef.current;
    if (!element) return undefined;

    const handleTouchStart = (event) => {
      const touch = event.changedTouches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (event) => {
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      if (
        Math.abs(deltaX) < SWIPE_THRESHOLD &&
        Math.abs(deltaY) < SWIPE_THRESHOLD
      ) {
        return;
      }
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        changeDirection(deltaX > 0 ? "right" : "left");
      } else {
        changeDirection(deltaY > 0 ? "down" : "up");
      }
    };

    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [changeDirection]);

  return (
    <div className="app">
      <h1>贪吃蛇 SNAKE</h1>
      <Scoreboard score={score} best={best} />
      <div className="board-wrap" ref={boardWrapRef}>
        <Board snake={snake} food={food} />
        <Overlay status={status} score={score} onStart={start} />
      </div>
      <TouchControls onDirection={changeDirection} />
      <p className="hint">桌面：方向键 / WASD ｜ 手机：滑动屏幕或点击方向键</p>
    </div>
  );
}
