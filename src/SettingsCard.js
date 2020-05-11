import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Link from "@material-ui/core/Link";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";
import Switch from '@material-ui/core/Switch';
import SettingsButton from "./SettingsButton";
import AnimatedCard from "./AnimatedCard";
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const settingsCardStyle = makeStyles({
  introHeader: {
  },
  cardMobile: {
    textAlign: 'left',
    color: props => (props.isViewingIntroduction ? "white" : "black"),
    background: props =>
      props.isViewingIntroduction
        ? "linear-gradient(135deg, #CCABD8 0%, #E5C1CD 100%)"
        : "white",
    position: "absolute",
    height: `100%`,
    width: `100%`,
    willChange: " transform, opacity"
  },
  cardDesktop: {
    textAlign: 'left',
    color: props => (props.isViewingIntroduction ? "white" : "black"),
    background: props =>
      props.isViewingIntroduction
        ? "linear-gradient(135deg, #CCABD8 0%, #E5C1CD 100%)"
        : "white",
    position: "absolute",
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
  topSpacing: {
    marginTop: "32px !important"
  },
  formControl: {
    minWidth: "120px",
    marginBottom: '16px'
  },
  beginButton: {
    background: "linear-gradient(135deg, #FE676E 0%, #FD8F52 100%)",
    color: "white",
    display: "flex",
    marginTop: "18px",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

const SettingsBody = ({
  isEricAndreModeActivated,
  setIsEricAndreModeActivated,
  currentDeck,
  changeDeck,
  styles,
  options,
  truthCount,
  orCount,
  toggleSettings
}) => {
  return (
    <>
      <CardHeader
        title={<span style={{position: 'absolute', top: '18px', left: '16px'}}>Settings</span>}
        action={
          <SettingsButton
            isViewingSettings={true}
            toggleSettings={toggleSettings}
          />
        }
      ></CardHeader>
      <CardContent>
        <div>
        <FormControl className={styles.formControl}>
          <FormLabel component="legend">Question Deck</FormLabel>
          <Select native value={currentDeck} onChange={e => changeDeck(e.target.value)}>
            {options}
          </Select>
        </FormControl>
        </div>
        <div>
        <FormControl>
          <FormLabel component="legend">Eric Andre Mode ({isEricAndreModeActivated ? 'Activated' : 'Deactivated'})</FormLabel>
          <Switch
            checked={isEricAndreModeActivated}
            onChange={e => {setIsEricAndreModeActivated(!isEricAndreModeActivated)}}
            name="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </FormControl>
        </div>
        <Typography className={styles.topSpacing}>
          Y'all've selected Truth {truthCount} time{truthCount !== 1 ? "s" : ""}
        </Typography>
        <Typography>
          Y'all've selected Or {orCount} time{orCount !== 1 ? "s" : ""}
        </Typography>
        <Typography className={styles.topSpacing}>
          Suggest a question:{" "}
          <Link href="mailto:truthorgame@gmail.com?subject=Question Suggestion&body=Hello -%0D%0A%0D%0AHere is my question suggestion: ">
            {" "}
            Email
          </Link>
        </Typography>
      </CardContent>
    </>
  );
};

const IntroBody = ({ styles, setIsViewingIntroduction, toggleSettings }) => {
  return (
    <>
      <CardHeader className={styles.introHeader} title="Truthor"></CardHeader>
      <CardContent>
        <Typography>
          1. Each round, you'll be presented with a question.
        </Typography>
        <Typography>
          2. As a group, decide on an action to perform to "pass" on answering
          the question.
        </Typography>
        <Typography>
          3. For each question, either answer it or perform the agreed upon
          "pass" action - then press the corresponding button.{" "}
        </Typography>
        <Typography>
          4. To view your game's selection stats, change the deck of cards, and
          more - click the <SettingsIcon /> icon.
        </Typography>
        <Typography>5. Have fun!</Typography>
        <Button
          onClick={() => {
            setIsViewingIntroduction(false);
            toggleSettings(false);
          }}
          className={styles.beginButton}
          variant="contained"
        >
          Shuffle & Begin
        </Button>
      </CardContent>
    </>
  );
};

const SettingsCard = ({
  isEricAndreModeActivated,
  setIsEricAndreModeActivated,
  changeDeck,
  isViewingIntroduction,
  setIsViewingIntroduction,
  currentDeck,
  decks,
  deckNames,
  orCount,
  truthCount,
  isViewingSettings,
  toggleSettings,
  transform,
  opacity,
  z
}) => {
  const options = deckNames.map((name, index) => {return (<option key={index} value={name}>{name}</option>)})
  const styles = settingsCardStyle({ isViewingIntroduction });
  const settingsDisplay = !isViewingSettings ? "block" : "none";

  const body = isViewingIntroduction ? (
    <IntroBody
      styles={styles}
      isViewingIntroduction={isViewingIntroduction}
      setIsViewingIntroduction={setIsViewingIntroduction}
      toggleSettings={toggleSettings}
    />
  ) : (
    <SettingsBody
      isEricAndreModeActivated={isEricAndreModeActivated}
      setIsEricAndreModeActivated={setIsEricAndreModeActivated}
      currentDeck={currentDeck}
      changeDeck={changeDeck}
      styles={styles}
      options={options}
      truthCount={truthCount}
      orCount={orCount}
      toggleSettings={toggleSettings}
    />
  );
  const cardStyle = window.innerWidth < 400 ? styles.cardMobile : styles.cardDesktop
  return (
    <AnimatedCard
      raised={true}
      height="100%"
      className={cardStyle}
      style={{
        display: settingsDisplay,
        opacity: opacity.interpolate(o => 1 - o),
        transform
      }}
    >
      {body}
    </AnimatedCard>
  );
};

const mapStateToProps = state => ({
  z: state.isisShowingIntroduction
})

export default connect(mapStateToProps, null)(SettingsCard);
