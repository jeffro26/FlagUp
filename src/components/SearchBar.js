import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import BackspaceIcon from "@material-ui/icons/Backspace";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Tooltip from '@material-ui/core/Tooltip';

const ButtonTooltip = withStyles({
  tooltip: {
    color: "black",
    backgroundColor: "white",
    fontSize: 21
  }
})(Tooltip);

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fullWidth: true
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
  const [searchValue, setSearchValue] = useState("");
  const classes = useStyles();

  const onChangeText = evt => {
    setSearchValue(evt.target.value);
  };

  const onSubmitText = evt => {
    searchForFlag(searchValue);
  };

  const onCancelSearch = evt => {
    setSearchValue("");
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
    console.log(key);
    if (flagSearchArray.length === 0) {
      window.alert("Unable to find any Country with those parameters");
    } else {
      setSearchedFlags(flagSearchArray);
      setSearchTag(true);
    }
  };
  return (
    <Paper component="form" className={classes.root}>
      <FormControl fullWidth className={classes.margin}>
        <InputLabel htmlFor="standard-country-search">Search</InputLabel>
        <Input
          className={classes.input}
          placeholder={"Please type in a country and press the search button"}
          value={searchValue}
          inputProps={{ "aria-label": "Search for a country" }}
          onChange={onChangeText}
        />
      </FormControl>
      <ButtonTooltip title={"Search"} arrow>
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={onSubmitText}
      >
        <SearchIcon />
      </IconButton>
      </ButtonTooltip>
      <Divider className={classes.divider} orientation="vertical" />
      <ButtonTooltip title={"Clear Search"} arrow>
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
        onClick={onCancelSearch}
      >
        <BackspaceIcon />
      </IconButton>
      </ButtonTooltip>
    </Paper>
  );
}
