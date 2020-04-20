import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CssBaseLine from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Img from "../../assets/img/connor.jpg";

// 下方版权标识，函数形式为ES6箭头函数
const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        evidenceVisualization
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

// Material-Ui的样式解决方案，可以理解为一部分CSS,详见https://material-ui.com/zh/styles/basics
// theme主题由index.js中的ThemeProvider提供
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: "url(" + Img + ")",
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    // 默认一个space是8px，详见https://material-ui.com/zh/customization/spacing/
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.warning.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    marginLeft: 0
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

// 函数式写法，无class
export default function LoginView() {
  const classes = useStyles();

  // React Hooks，详见https://zh-hans.reactjs.org/docs/hooks-effect.html
  React.useEffect(() => {
    document.title = "登录";
  });

  // React Hooks，相当于class式写法的state，详见https://zh-hans.reactjs.org/docs/hooks-intro.html
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    showPassword: false,
    remeber: true
  });

  // event隐式传递
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  }

  const handleClickRemeberMe = () => {
    setValues({ ...values, remeber: !values.remeber });
    console.log("remebered" + values.remeber);
  };

  const handleSubmit = () => {
    console.log(values.username + values.password);
  }

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseLine />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            用户认证
          </Typography>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl} fullWidth variant="outlined" required>
              <InputLabel htmlFor="username">用户名</InputLabel>
              <OutlinedInput
                id="username"
                onChange={handleChange("username")}
                labelWidth={57}
                required
              />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth variant="outlined" required>
              <InputLabel htmlFor="password">密码</InputLabel>
              <OutlinedInput
                id="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={40}
                required
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" onChange={handleClickRemeberMe} />}
              label="记住我"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              登录
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  忘记密码?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}