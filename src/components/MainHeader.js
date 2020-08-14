import React from "react";
import { makeStyles , withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PublicIcon from "@material-ui/icons/Public";
import Switch from "@material-ui/core/Switch";
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    background: props => (props.appTheme === "LT" ? "#1a237e" : "#212121")
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const ThemeTooltip = withStyles({
  tooltip: {
    color: "black",
    backgroundColor: "white",
    fontSize: 21
  }
})(Tooltip);

export default function FlagAppBar(props) {
  const classes = useStyles(props);
  const [state, setState] = React.useState({
    themeSwitch: true
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
    props.setTheme();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <PublicIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Welcome to the world
          </Typography>
          <ThemeTooltip title={"Theme Toggle"} arrow>
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            color="primary"
            name="themeSwitch"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          </ThemeTooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}
