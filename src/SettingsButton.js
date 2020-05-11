import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const settingsButtonStyle = makeStyles({
  icon: {
    color: props => (props.isViewingSettings ? "black" : "white")
  }
});

const SettingsButton = ({ isViewingSettings, toggleSettings }) => {
  const styles = settingsButtonStyle({ isViewingSettings });
  return (
    <IconButton className={styles.icon} onClick={toggleSettings}>
      {!isViewingSettings ? <SettingsIcon /> : <KeyboardBackspaceIcon />}
    </IconButton>
  );
};

export default SettingsButton;
