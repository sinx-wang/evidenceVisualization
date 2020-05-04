import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form: {
    height: 20,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
  },
  paper2: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 150,
  },
  div2: {
    width: "60%",
    height: 145,
    border: "solid red 1px",
    float: "left",
  },
  div3: {
    width: "30%",
    height: "100%",
    border: "solid red 1px",
    float: "left",
  },
  textField: {
    width: "80%",
  },
  textField2: {
    width: "15%",
    marginLeft: 20,
  },
  label: {
    fontSize: 15,
    float: "left",
  },
  button: {
    height: 50,
    marginTop: theme.spacing(3),
    marginLeft: 60,
    minWidth: 120,
  },
}));
// 函数式写法，无class
export default function FactView() {
  // React Hooks，详见https://zh-hans.reactjs.org/docs/hooks-effect.html
  React.useEffect(() => {
    document.title = "事实认定";
  });

  // React Hooks，相当于class式写法的state，详见https://zh-hans.reactjs.org/docs/hooks-intro.html
  const [values, setValues] = React.useState({});

  const handleFieldChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleComplainantResolve = () => {
    alert(values.complainantEvidence);
  };

  const handleDefendantResolve = () => {
    alert(values.defendantEvidence);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <label className={classes.label}>事实:</label>
            <br />
            <br />
            <Grid style={{ margin: "0 auto" }} item xs={8}>
              <Paper className={classes.paper2}>
                <div>
                  <div className={classes.div2}>
                    <form
                      className={classes.form}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={classes.textField}
                        value="xxx"
                      />
                      <br />
                      <br />
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={classes.textField2}
                        value="xxx"
                      />
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={classes.textField2}
                        value="xxx"
                      />
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={classes.textField2}
                        value="xxx"
                      />
                    </form>
                  </div>
                  <div className={classes.div3}>
                    <Button
                      variant="contained"
                      className={classes.button}
                      //onClick={handleButtonClick(index)}
                      color="secondary"
                    >
                      采信
                    </Button>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
