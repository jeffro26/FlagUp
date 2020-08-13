import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import BackspaceIcon from "@material-ui/icons/Backspace";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

export default function SearchBar(props) {
  const { flags, setSearchedFlags, setSearchTag } = props;
  const [searchText, setSearchText] = useState("Please input a country name");
  const classes = useStyles();

  const onChangeText = evt => {
    setSearchText(evt.target.value);
  };

  const onSubmitText = evt => {
    searchForFlag(searchText);
  };

  const onCancelSearch = evt => {
    setSearchText("Please input a country name");
    setSearchTag(false);
  };

  const searchForFlag = key => {
    const searchKey = key.toLowerCase();

    let flagSearchArray = [];
    flags.forEach(flag => {
      const result = flag.name.toLowerCase().includes(searchKey);
      if (result) {
        flagSearchArray.push(flag);
      }
    });
    if (flagSearchArray) {
      setSearchedFlags(flagSearchArray);
      setSearchTag(true);
    } else {
      window.alert("Unable to find Country");
    }
  };
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={searchText}
        inputProps={{ "aria-label": "Search for a country" }}
        onChange={onChangeText}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={onSubmitText}
      >
        <SearchIcon />
      </IconButton>
      <Divider
        className={classes.divider}
        orientation="vertical"
        
      />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
        onClick={onCancelSearch}
      >
        <BackspaceIcon />
      </IconButton>
    </Paper>
  );
}
