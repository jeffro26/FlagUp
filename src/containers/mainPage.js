import React, { useState, useEffect } from "react";
import FlagAppBar from "../components/mainHeader";
import SearchBar from "../components/searchBar";
import FlagTable from "../components/flagTable";
import Container from "@material-ui/core/Container";
import client from "../api/client";
import CircleLoadAnimation from "../components/loadingCircle";

export default function MainPage() {
  const [stage, setStage] = useState("loading");
  const [flags, setFlags] = useState([]);
  const [searchTag, setSearchTag] = useState(false);
  const [searchedFlags, setSearchedFlags] = useState([]);

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
    if(!searchTag){
      return flags
    }
    return searchedFlags
  }

  const renderReady = () => (
    <div>
      <Container component="main">
        <FlagAppBar />
        <SearchBar
          flags={flags}
          setSearchedFlags={setSearchedFlags}
          setSearchTag={setSearchTag}
        />
        <FlagTable flags={flagsChooser()} />
      </Container>
      );
    </div>
  );

  const renderLoading = () => (
    <div>
      <Container component="main">
        <FlagAppBar />
        <SearchBar
          flags={flags}
          setSearchedFlags={setSearchedFlags}
          setSearchTag={setSearchTag}
        />
        <CircleLoadAnimation />
      </Container>
      );
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
