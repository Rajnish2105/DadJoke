import { useState } from "react";
import "./Joke.css";

export default function Joke({ joke, handleVote }) {
  const [voted, setVoted] = useState(false);

  function getColor() {
    if (joke.vote >= 15) return "#4CAF50";
    if (joke.vote >= 12) return "#8BC34A";
    if (joke.vote >= 9) return "#CDDC39";
    if (joke.vote >= 6) return "#FFEB3B";
    if (joke.vote >= 3) return "#FFC107";
    if (joke.vote >= 0) return "#FF9800";
    return "#F44336";
  }

  function getEmoji() {
    if (joke.vote >= 15) return "🤣";
    if (joke.vote >= 12) return "😂";
    if (joke.vote >= 9) return "😆";
    if (joke.vote >= 6) return "😄";
    if (joke.vote >= 3) return "🙂";
    if (joke.vote >= 0) return "😐";
    return "😕";
  }

  function handleVoteClick(value) {
    if (!voted) {
      handleVote(joke.id, value);
      setVoted(true);
      setTimeout(() => setVoted(false), 500);
    }
  }

  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <button
          onClick={() => handleVoteClick(1)}
          className={`Joke-arrow ${voted ? "voted" : ""}`}
          disabled={voted}
          aria-label="Upvote"
        >
          ▲
        </button>
        <span className="Joke-vote" style={{ borderColor: getColor() }}>
          {joke.vote}
        </span>
        <button
          onClick={() => handleVoteClick(-1)}
          className={`Joke-arrow ${voted ? "voted" : ""}`}
          disabled={voted}
          aria-label="Downvote"
        >
          ▼
        </button>
      </div>
      <p className="Joke-text">{joke.joke}</p>
      <div className="Joke-smile">
        <span role="img" aria-label="Emoji representing joke rating">
          {getEmoji()}
        </span>
      </div>
    </div>
  );
}
