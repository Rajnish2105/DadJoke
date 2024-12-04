import { useState, useEffect, useRef } from "react";
import Joke from "./Joke";
import "./JokeList.css";

const API_URL = "https://v2.jokeapi.dev/joke/Any?type=single&lang=en";

export default function JokeList() {
  const [jokeList, setJokeList] = useState(
    JSON.parse(localStorage.getItem("jokes")) || []
  );
  const [loading, setLoading] = useState(false);
  const jokesContainerRef = useRef(null);

  function cleanJoke(joke) {
    return joke.replace(/[^a-zA-Z0-9\s.,!?]/g, "");
  }

  async function fetchJokeData() {
    const response = await fetch(API_URL);
    const data = await response.json();
    const cleanedJoke = cleanJoke(data.joke);
    return {
      id: crypto.randomUUID(),
      joke: cleanedJoke,
      vote: 0,
    };
  }

  useEffect(() => {
    if (jokeList.length === 0) {
      fetchJokes();
    }
  }, []);

  async function fetchJokes() {
    setLoading(true);
    const jokes = await Promise.all(
      Array.from({ length: 10 }).map(() => fetchJokeData())
    );
    setJokeList((prevJokes) => [...prevJokes, ...jokes]);
    setLoading(false);
  }

  function handleVote(id, change) {
    setJokeList((prev) =>
      prev.map((joke) => {
        if (joke.id === id) {
          return { ...joke, vote: joke.vote + change };
        } else {
          return joke;
        }
      })
    );
  }

  useEffect(() => {
    localStorage.setItem("jokes", JSON.stringify(jokeList));
  }, [jokeList]);

  useEffect(() => {
    if (jokesContainerRef.current) {
      jokesContainerRef.current.scrollTop =
        jokesContainerRef.current.scrollHeight;
    }
  }, [jokeList]);

  return (
    <div className="JokeList">
      <div className="JokeList-sidebar">
        <h1 className="JokeList-title">
          Dad <span>Jokes</span>
        </h1>
        <div className="JokeList-emoji">🤣</div>
        <button
          onClick={fetchJokes}
          className="JokeList-button"
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch Jokes"}
        </button>
      </div>
      <div className="JokeList-jokes" ref={jokesContainerRef}>
        {jokeList.map((joke) => (
          <Joke key={joke.id} joke={joke} handleVote={handleVote} />
        ))}
      </div>
    </div>
  );
}
