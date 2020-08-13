import React, { useState } from "react";
import { makeStyles , withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FlagModal from "./countryModal";
import Button from "@material-ui/core/Button";
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "white"
  },
  grid: {
    width: 300,
    height: 300,
    border: 1,
    padding: "10px",
    boxSizing: "border-box"
  },
  image: {
    width: 350,
    height: 300,
    boxSizing: "border-box",
    borderBottom: "5px solid",
    padding: "10px"
  },
});

const CountryTooltip = withStyles({
  tooltip: {
    color: "black",
    backgroundColor: "white",
    fontSize: 21
  }
})(Tooltip);

export default function FlagTable(props) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [flag, setFlag] = useState();
  

  const { flags } = props;

  const onFlagClick = flag => {
    setModalOpen(true);
    setFlag(flag);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setFlag();
  };

  return (
    <div className={classes.root}>
      <Grid container direction="row" alignItems="center">
        {flags.map(flag => (
          <CountryTooltip title={flag.name} key={flag.name} arrow>
          <Button  key={flag.name} align="center" xs={3} spacing={3}>
            <img
              src={flag.flag}
              alt={""}
              className={classes.image}
              onClick={() => onFlagClick(flag)}
            />
          </Button>
          </CountryTooltip>
        ))}
      </Grid>
      <FlagModal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        flag={flag}
      />
    </div>
  );
}
