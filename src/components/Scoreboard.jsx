export default function Scoreboard({ score, best }) {
  return (
    <div className="scoreboard">
      <div className="score-card">
        <div className="label">当前分数</div>
        <div className="value">{score}</div>
      </div>
      <div className="score-card">
        <div className="label">最高分</div>
        <div className="value">{best}</div>
      </div>
    </div>
  );
}
