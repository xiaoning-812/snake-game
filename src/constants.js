export const CELL_COUNT = 20;
export const CANVAS_SIZE = 400;

export const INITIAL_SPEED_MS = 140;
export const MIN_SPEED_MS = 70;
export const SPEED_STEP_MS = 4;

export const SCORE_PER_FOOD = 10;
export const BEST_SCORE_KEY = "snake_best_score";

export const SWIPE_THRESHOLD = 24;

export const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export const KEY_TO_DIRECTION = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
  W: "up",
  S: "down",
  A: "left",
  D: "right",
};

export const GAME_STATUS = {
  READY: "ready",
  RUNNING: "running",
  OVER: "over",
};
