import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SettingsButton from "./SettingsButton";
import AnimatedCard from "./AnimatedCard";
import CHEERS from './cheers.mp4'

const cardStyles = makeStyles({
  cardMobile: {
    position: "absolute",
    background: props => `linear-gradient(135deg, ${props.firstColor} 0%, ${props.secondColor} 100%)`,
    color: "white",
    height: `100%`,
    width: `100%`,
    willChange: " transform, opacity",
  },
  cardDesktop: {
    position: "absolute",
    color: 'white',
    background: props => `linear-gradient(135deg, ${props.firstColor} 0%, ${props.secondColor} 100%)`,
    willChange: " transform, opacity",
    height: '50%',
    width: '60%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    overflow: 'auto',
    minHeight: '310px',
    maxHeight: '400px'
  },
  cardContent: {
    height: "60%",
    overflowY: "visible",
    overflowX: "hidden"
  },
  truthButton: {
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "white",
    position: 'absolute',
    left: '16px'
  },
  orButton: {
    background: "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
    marginLeft: "auto !important",
    color: "white",
    position: 'absolute',
    right: '16px'
  },
  cardActions: {
    width: '100%',
    position: 'absolute',
    bottom: '36px'
  }
});

const EricAndre = ({advance}) => {
  const isMobile = window.innerWidth < 400
  const desktopStyle = {height: '250px'}
  const mobileStyle = {width: '100%'}
  return (
    <video style={isMobile ? mobileStyle : desktopStyle} autoPlay onEnded={advance} playsinline>
        <source src={CHEERS} type='video/mp4' />
    </video>
  )

}


const GameCard = ({
  isEricAndreModeActivated,
  colorPair,
  isViewingSettings,
  question,
  onTruth,
  onOr,
  toggleSettings,
  transform,
  opacity
}) => {
  const [shouldShowVideo, setShouldShowVideo ] = useState(false)
  const styles = cardStyles({firstColor: colorPair[0], secondColor: colorPair[1]});

  const gameDisplay = !isViewingSettings ? "none" : "block";
  const cardStyle = window.innerWidth < 400 ? styles.cardMobile : styles.cardDesktop
  const orClick = () => {
    if (!isEricAndreModeActivated) {
      onOr()
    } else {
      setShouldShowVideo(true)
      setTimeout(() => {
        setShouldShowVideo(false)
        onOr()
      }, 1500)
    }
  }

  const nowAdvanceQuestion = () => {
    setShouldShowVideo(false)
    onOr()
  }
  return (
    <AnimatedCard
      raised={true}
      className={cardStyle}
      style={{
        display: gameDisplay,
        opacity,
        transform: transform.interpolate(t => `${t} rotateX(180deg)`)
      }}
    >
      <CardHeader
        title={<span style={{position: 'absolute', top: '18px', left: '16px'}}>Truthor</span>}
        action={
          <SettingsButton
            isViewingSettings={false}
            toggleSettings={toggleSettings}
          />
        }
      ></CardHeader>
      <CardContent className={styles.cardContent}>
        {shouldShowVideo ? <EricAndre advance={nowAdvanceQuestion}/> : <Typography variant="h4">{question}</Typography>}
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Button
          className={styles.truthButton}
          onClick={onTruth}
          variant="contained"
        >
          <Typography variant="h6">Truth</Typography>
        </Button>
        <Button className={styles.orButton} onClick={orClick} variant="contained">
          <Typography variant="h6">Or</Typography>
        </Button>
      </CardActions>
    </AnimatedCard>
  );
};

export default GameCard;
