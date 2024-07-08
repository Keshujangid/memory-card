import { useEffect, useState, useRef } from "react";
import FetchData from "./FetchData";

export default function Card({ score, highScore, setScore, setHighScore }) {
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFetched = useRef(false);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const finishGame = () => {
    if (highScore < score) {
      setHighScore(score);
    }
    setScore(0);
    setClicked([]);
  };

  const handleClick = (name) => {
    if (!clicked.includes(name)) {
      setClicked([...clicked, name]);
      setScore(++score);
      if (score === 12) {
        finishGame();
      }
    } else {
      console.log("2-clicked");
      
      finishGame();
    }
    setData(shuffleArray(data));
  };

  useEffect(() => {
    if (!isFetched.current) {
      const fetchData = async () => {
        const result = await FetchData();
        setData(shuffleArray(result));
        setLoading(false);
      };

      fetchData();
      isFetched.current = true;
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      ) : (
        data.map((e) => (
          <div className="card" key={e.id} onClick={() => handleClick(e.name)}>
            <img src={e.url} alt={e.name} />
            <p className="name">{e.name}</p>
          </div>
        ))
      )}
    </>
  );
}
