import React, { useState } from "react";
import { useSpring } from "react-spring";
import { iceBreaker, emotions, silly, bigPicture, storyTelling } from "./decks";
import "./App.css";

import SettingsCard from "./SettingsCard";
import GameCard from "./GameCard";
import Grid from "@material-ui/core/Grid";

const decks = {
  "Ice Breakers": iceBreaker,
  Emotions: emotions,
  Silly: silly,
  Storytelling: storyTelling,
  "Big Picture": bigPicture,
};

const deckNames = [
  "Ice Breakers",
  "Big Picture",
  "Emotions",
  "Silly",
  "Storytelling",
];

const colorPairs = [
  ["#8360c3", "#2ebf91"],
  ["#ffd452", "#544a7d"],
  ["#403A3E", "#BE5869"],
  ["#c2e59c", "#64b3f4"],
  ["#fc00ff", "#00dbde"],
  ["#304352", "#d7d2cc"],
  ["#BA8B02", "#181818"],
  ["#525252", "#3d72b4"],
  ["#F1F2B5", "#135058"],
  ["#7b4397", "#dc2430"],
  ["#FEAC5E", "#C779D0"],
  ["#360033", "#0b8793"],
];
function shuffle(array) {
  return array.sort(function () {
    return 0.5 - Math.random();
  });
}

const shuffledColors = shuffle(colorPairs);

const Game = () => {
  const [isEricAndreModeActivated, setIsEricAndreModeActivated] = useState(
    false
  );
  const [colorIndex, setColorIndex] = useState(0);
  const colorLength = shuffledColors.length;
  const [isViewingSettings, setIsViewingSettings] = useState(false);
  const [isViewingIntroduction, setIsViewingIntroduction] = useState(true);
  const [truthCount, setTruthCount] = useState(0);
  const [orCount, setOrCount] = useState(0);
  const [deckName, setDeckName] = useState(deckNames[0]);
  const toggleSettings = () => {
    nextQuestion();
    setIsViewingSettings(!isViewingSettings);
  };
  const { transform, opacity } = useSpring({
    opacity: isViewingSettings ? 1 : 0,
    transform: `perspective(600px) rotateX(${isViewingSettings ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const [index, setIndex] = useState(0);
  const [deck, setDeck] = useState(decks[deckName]);
  const nextQuestion = () => {
    const lastIndex = deck.length;
    index >= lastIndex - 1 ? setIndex(0) : setIndex(index + 1);
  };

  const nextColor = () => {
    colorIndex === colorLength - 1
      ? setColorIndex(0)
      : setColorIndex(colorIndex + 1);
  };

  const onTruth = () => {
    setTruthCount(truthCount + 1);
    nextQuestion();
    nextColor();
  };

  const onOr = () => {
    setOrCount(orCount + 1);
    nextQuestion();
    nextColor();
  };

  const changeDeck = (deckName) => {
    setDeckName(deckName);
    setDeck(shuffle(decks[deckName]));
  };

  const colorPair = shuffledColors[colorIndex];
  const background = `linear-gradient(135deg, ${colorPair[1]} 0%, ${colorPair[0]} 100%)`;
  const style =
    window.innerWidth < 400
      ? {}
      : { background, height: "100%", width: "100%" };
  const gameCard = (
    <GameCard
      deckName={deckName}
      isEricAndreModeActivated={isEricAndreModeActivated}
      colorPair={shuffledColors[colorIndex]}
      isViewingSettings={isViewingSettings}
      toggleSettings={toggleSettings}
      question={deck[index]}
      onTruth={onTruth}
      onOr={onOr}
      transform={transform}
      opacity={opacity}
    />
  );
  const settingsCard = (
    <SettingsCard
      isEricAndreModeActivated={isEricAndreModeActivated}
      setIsEricAndreModeActivated={setIsEricAndreModeActivated}
      isViewingIntroduction={isViewingIntroduction}
      setIsViewingIntroduction={setIsViewingIntroduction}
      changeDeck={changeDeck}
      currentDeck={deckName}
      deckNames={deckNames}
      orCount={orCount}
      truthCount={truthCount}
      isViewingSettings={isViewingSettings}
      toggleSettings={toggleSettings}
      transform={transform}
      opacity={opacity}
    />
  );
  return window.innerWidth > 400 ? (
    <Grid
      style={style}
      container
      spacing={0}
      align="center"
      justify="center"
      direction="column"
    >
      <Grid item>{gameCard}</Grid>
      <Grid item>{settingsCard}</Grid>
    </Grid>
  ) : (
    <>
      {gameCard}
      {settingsCard}
    </>
  );
};
export default Game;
