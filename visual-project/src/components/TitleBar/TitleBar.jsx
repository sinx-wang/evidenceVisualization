import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import NotificationIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import Person from "@material-ui/icons/Person";
import ExitToApp from "@material-ui/icons/ExitToApp";
import AlertDialog from "../Dialog/AlertDialog";
import { pink } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolBar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  appBarSpacer: theme.mixins.toolbar,
  pink: {
    marginRight: 10,
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
}));

function TitleBar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickDrawer = () => {
    props.handleClickMenuButton();
  };

  const handleClickExit = () => {
    setOpen(true);
  };

  const handleIndeedExit = () => {
    sessionStorage.clear();
    props.history.push("/login");
  };

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, props.open && classes.appBarShift)}
    >
      <AlertDialog
        open={open}
        title="是否退出登录?"
        content="这意味着未保存的数据将丢失"
        colorLeft="secondary"
        textLeft="退出登录"
        colorRight="primary"
        textRight="取消"
        closeDialog1={handleIndeedExit}
        closeDialog2={() => setOpen(false)}
      />
      <Toolbar className={classes.toolBar}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClickDrawer}
          className={clsx(
            classes.menuButton,
            props.open && classes.menuButtonHidden
          )}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {props.content}
        </Typography>
        <Avatar className={classes.pink}>
          <Person />
        </Avatar>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={handleClickExit}>
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

TitleBar.propTypes = {
  open: PropTypes.bool,
  content: PropTypes.string,
  handleClickMenuButton: PropTypes.func,
};

export default TitleBar;
