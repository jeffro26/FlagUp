import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import { List, ListItem, ListItemText, Box } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles(theme => ({
  name: {
    fontWeight: "bold",
    width: "60%",
    height: "20px"
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 100
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper_modal: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    padding: theme.spacing(2, 3)
  },
  image: {
    width: 350,
    height: 300,
    boxSizing: "border-box",
    borderBottom: "5px solid",
    padding: "10px"
  },
  backButton: {
    marginRight: theme.spacing(2),
    backgroundColor: '#1F98D1',
    color: 'black',
    left: '3%'
  },
}));

export default function FlagModal(props) {
  const { flag, handleCloseModal } = props;
  const classes = useStyles();
  const [currencyState, setCurrencyState] = useState(0);
  const [languageState, setLanguageState] = useState(0);

  const handleCurrencyChange = event => {
    setCurrencyState(event.target.value);
  };

  const handleLanguageChange = event => {
    setLanguageState(event.target.value);
  };

  const onClose = event => {
    setCurrencyState(0);
    setLanguageState(0);
    handleCloseModal();
  };

  const CurrencyDropdown = () => (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-currency-input-label">Currencies</InputLabel>
        <Select
          labelId="demo-currency-dropdown-label"
          id="demo-currency-dropdown-select"
          value={currencyState}
          onChange={handleCurrencyChange}
        >
          {flag.currencies.map((currency, index) => (
            <MenuItem key={index} value={index}>
              {currency.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );

  const LanguageDropdown = () => (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-language-input-label">Languagies</InputLabel>
        <Select
          labelId="demo-language-dropdown-label"
          id="demo-language-dropdown-select"
          value={languageState}
          onChange={handleLanguageChange}
        >
          {flag.languages.map((language, index) => (
            <MenuItem key={index} value={index}>
              {language.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );

  const flagInfoRender = () => (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.modalOpen}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={props.modalOpen}>
          <div className={classes.paper_modal}>
            <Box classes={{ root: classes.expansionSummary }}>
              <Grid container direction="row">
              <Grid item xs={11}>
                  <h1>Country Information</h1>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    color="primary"
                    aria-label="directions"
                    onClick={onClose}
                    className={classes.backButton}
                  >
                    <ExitToAppIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Grid item>
                  <img src={flag.flag} alt={""} className={classes.image} />
                </Grid>
                <List dense>
                  <Grid item xs={12}>
                    <ListItem>
                      <ListItemText
                        classes={{ root: classes.name }}
                        primary={` Name of Country: ${flag.name}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Capital of Country: ${flag.capital}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Population of Country: ${flag.population}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`ISO Code of Country: ${flag.alpha3Code}`}
                      />
                    </ListItem>
                    <CurrencyDropdown />
                    <LanguageDropdown />
                  </Grid>
                </List>
              </Grid>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );

  let content = null;
  if (flag) {
    content = flagInfoRender();
  } else {
  }

  return content;
}
