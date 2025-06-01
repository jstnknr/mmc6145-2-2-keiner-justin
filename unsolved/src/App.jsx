
import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [previousTime, setPreviousTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [gameActive, setGameActive] = useState(false);
  
  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();

  const onGameStart = () => {
    timerReset();         
    timerStart();         
    setGameActive(true);  
  };

  const onGameEnd = () => {
    timerStop();                    
    setGameActive(false);           
    setPreviousTime(time);          
    setBestTime((oldBest) => {
      if (oldBest === null || time < oldBest) {
        return time;
      }
      return oldBest;
    });
  };

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

  return (
    <>
      <Header
        time={gameActive ? time : null}
        previousTime={previousTime}
        bestTime={bestTime}
        openModal={() => setShowModal(true)}
      />

      <CardGame
        cardTexts={cardTexts}
        onGameStart={onGameStart}
        onGameEnd={onGameEnd}
      />

      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}
