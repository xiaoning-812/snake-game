import { GAME_STATUS } from "../constants";

export default function Overlay({ status, score, onStart }) {
  if (status === GAME_STATUS.RUNNING) return null;

  const isOver = status === GAME_STATUS.OVER;

  return (
    <div className="overlay">
      <h2>{isOver ? "游戏结束" : "准备好了吗？"}</h2>
      {isOver ? (
        <p>
          本局得分：<b>{score}</b>
          <br />
          再来一局挑战最高分吧！
        </p>
      ) : (
        <p>
          方向键 / WASD 控制方向
          <br />
          吃到食物得分，撞墙或撞到自己就结束
        </p>
      )}
      <button onClick={onStart}>{isOver ? "重新开始" : "开始游戏"}</button>
    </div>
  );
}
