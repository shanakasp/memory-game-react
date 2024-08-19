import React, { useEffect, useState } from "react";
import "./MemoryGame.css";

const icons = ["circle", "ellipse", "triangle", "square", "star"];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffledIcons = shuffleArray([...icons, ...icons]);
    const initialCards = shuffledIcons.map((icon, index) => ({
      icon,
      isFlipped: false,
      id: index,
    }));
    setCards(initialCards);
    setFlippedIndices([]);
    setMatched([]);
  };

  const handleCardClick = (index) => {
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matched.includes(index)
    ) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (cards[firstIndex].icon === cards[secondIndex].icon) {
        setMatched([...matched, firstIndex, secondIndex]);
      }
      setTimeout(() => setFlippedIndices([]), 1000);
    }
  };

  useEffect(() => {
    if (matched.length === cards.length) {
      setTimeout(() => resetGame(), 2000);
    }
  }, [matched]);

  return (
    <div className="board">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`card ${
            flippedIndices.includes(index) || matched.includes(index)
              ? "flipped"
              : ""
          }`}
          onClick={() => handleCardClick(index)}
        >
          <div className="card-inner">
            <div className="card-front">{card.icon}</div>
            <div className="card-back"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemoryGame;
