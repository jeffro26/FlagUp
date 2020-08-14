import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlagAppBar from "../components/MainHeader";
import SearchBar from "../components/SearchBar";
import FlagTable from "../components/CountryTable";
import Container from "@material-ui/core/Container";
import client from "../api/Client";
import CircleLoadAnimation from "../components/LoadingCircle";


const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "white"
  },
  container: {
    width: 1400
  }
});


export default function MainPage() {
  const [stage, setStage] = useState("loading");
  const [flags, setFlags] = useState([]);
  const [searchTag, setSearchTag] = useState(false);
  const [searchedFlags, setSearchedFlags] = useState([]);
  const [themeState, setThemeState] = useState("LT");
  const classes = useStyles(themeState);

  const toggleTheme = () => {
    if (themeState === "LT") {
      setThemeState("DK");
    } else {
      setThemeState("LT");
    }
  };

  useEffect(() => {
    setTimeout(async () => {
      await getFlags();
    }, 100);
  }, []);

  const getFlags = async () => {
    try {
      const url = "/v2/all";
      const flagsArray = await client._get(url);
      setFlags(flagsArray);
      setStage("ready");
    } catch (err) {
      window.alert("Unable to retrieve all flags");
    }
  };

  const flagsChooser = () => {
    if (!searchTag) {
      return flags;
    }
    return searchedFlags;
  };

  const renderReady = () => (
    <div className={classes.root}>
      <Container component="main" className={classes.container}>
        <FlagAppBar appTheme={themeState} setTheme={toggleTheme}/>
        <SearchBar
          flags={flags}
          setSearchedFlags={setSearchedFlags}
          setSearchTag={setSearchTag}
          appTheme={themeState}
        />
        <FlagTable flags={flagsChooser()} appTheme={themeState}/>
      </Container>
    </div>
  );

  const renderLoading = () => (
    <div className={classes.root}>
      <Container component="main">
        <FlagAppBar appTheme={themeState} setTheme={toggleTheme}/>
        <SearchBar
          flags={flags}
          setSearchedFlags={setSearchedFlags}
          setSearchTag={setSearchTag}
          appTheme={themeState}
          
        />
        <CircleLoadAnimation appTheme={themeState} />
      </Container>
    </div>
  );

  let content = null;
  if (stage === "loading") {
    content = renderLoading();
  } else {
    content = renderReady();
  }

  return content;
}
