import { useCallback, useEffect, useRef, useState } from "react";
import {
  BEST_SCORE_KEY,
  CELL_COUNT,
  DIRECTIONS,
  GAME_STATUS,
  INITIAL_SPEED_MS,
  MIN_SPEED_MS,
  SCORE_PER_FOOD,
  SPEED_STEP_MS,
} from "../constants";

function createInitialSnake() {
  const startX = Math.floor(CELL_COUNT / 2);
  const startY = Math.floor(CELL_COUNT / 2);
  return [
    { x: startX, y: startY },
    { x: startX - 1, y: startY },
    { x: startX - 2, y: startY },
  ];
}

function spawnFood(snake) {
  const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`));
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * CELL_COUNT),
      y: Math.floor(Math.random() * CELL_COUNT),
    };
  } while (occupied.has(`${position.x},${position.y}`));
  return position;
}

function isReverse(next, current) {
  return next.x === -current.x && next.y === -current.y;
}

function hitsWall(head) {
  return head.x < 0 || head.y < 0 || head.x >= CELL_COUNT || head.y >= CELL_COUNT;
}

function hitsSnake(head, snake) {
  return snake.some((segment) => segment.x === head.x && segment.y === head.y);
}

// 游戏状态机与循环集中在此 Hook，UI 组件仅消费其返回值
export function useSnakeGame() {
  const initialSnake = createInitialSnake();
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(() => spawnFood(initialSnake));
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [status, setStatus] = useState(GAME_STATUS.READY);

  // 循环内需要读取的最新值放在 ref 中，避免闭包读到过期状态
  const snakeRef = useRef(snake);
  const foodRef = useRef(food);
  const scoreRef = useRef(0);
  const speedRef = useRef(INITIAL_SPEED_MS);
  const directionRef = useRef(DIRECTIONS.right);
  const pendingDirectionRef = useRef(DIRECTIONS.right);
  const timerRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const persistBestScore = useCallback(() => {
    setBest((previousBest) => {
      const nextBest = Math.max(previousBest, scoreRef.current);
      localStorage.setItem(BEST_SCORE_KEY, String(nextBest));
      return nextBest;
    });
  }, []);

  const tick = useCallback(() => {
    directionRef.current = pendingDirectionRef.current;
    const head = snakeRef.current[0];
    const newHead = {
      x: head.x + directionRef.current.x,
      y: head.y + directionRef.current.y,
    };

    if (hitsWall(newHead) || hitsSnake(newHead, snakeRef.current)) {
      clearTimer();
      persistBestScore();
      setStatus(GAME_STATUS.OVER);
      return;
    }

    let nextSnake = [newHead, ...snakeRef.current];
    const ateFood =
      newHead.x === foodRef.current.x && newHead.y === foodRef.current.y;

    if (ateFood) {
      scoreRef.current += SCORE_PER_FOOD;
      setScore(scoreRef.current);
      speedRef.current = Math.max(MIN_SPEED_MS, speedRef.current - SPEED_STEP_MS);
      const nextFood = spawnFood(nextSnake);
      foodRef.current = nextFood;
      setFood(nextFood);
    } else {
      nextSnake = nextSnake.slice(0, -1);
    }

    snakeRef.current = nextSnake;
    setSnake(nextSnake);
    timerRef.current = setTimeout(tick, speedRef.current);
  }, [clearTimer, persistBestScore]);

  const start = useCallback(() => {
    clearTimer();

    const freshSnake = createInitialSnake();
    const freshFood = spawnFood(freshSnake);

    snakeRef.current = freshSnake;
    foodRef.current = freshFood;
    scoreRef.current = 0;
    speedRef.current = INITIAL_SPEED_MS;
    directionRef.current = DIRECTIONS.right;
    pendingDirectionRef.current = DIRECTIONS.right;

    setSnake(freshSnake);
    setFood(freshFood);
    setScore(0);
    setStatus(GAME_STATUS.RUNNING);

    timerRef.current = setTimeout(tick, speedRef.current);
  }, [clearTimer, tick]);

  const changeDirection = useCallback((name) => {
    const next = DIRECTIONS[name];
    if (!next) return;
    // 蛇身长度大于 1 时禁止直接反向
    if (snakeRef.current.length > 1 && isReverse(next, directionRef.current)) {
      return;
    }
    pendingDirectionRef.current = next;
  }, []);

  useEffect(() => {
    const savedBest = Number(localStorage.getItem(BEST_SCORE_KEY));
    if (Number.isFinite(savedBest) && savedBest > 0) {
      setBest(savedBest);
    }
    return clearTimer;
  }, [clearTimer]);

  return { snake, food, score, best, status, start, changeDirection };
}
