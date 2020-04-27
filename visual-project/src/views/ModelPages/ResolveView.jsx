import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 120
  },
  paper2: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 200
  },
  paper3: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 500
  },
  text: {
    float: "left",
    display: "block"
  },
  textarea: {
    width: "100%",
    height: "80%"
  },
  evidenceItem: {
    marginTop: "10px",
    height: "40",
    width: "80%"
  }
}));
// 函数式写法，无class
export default function ResolveView() {
  // React Hooks，详见https://zh-hans.reactjs.org/docs/hooks-effect.html
  React.useEffect(() => {
    document.title = "证据分解";
  });

  // React Hooks，相当于class式写法的state，详见https://zh-hans.reactjs.org/docs/hooks-intro.html
  const [values, setValues] = React.useState({
    complainantEvidence: "", //原告证据文本
    defendantEvidence: "", //被告证据文本
    complainantEvidenceList: [
      { id: 1, content: "evidence1" },
      { id: 2, content: "evidence2" }
    ], //原告分解完的证据集合
    defendantEvidenceList: [] //被告分解完的证据集合
  });

  const handleFieldChange = prop => event => {
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
            <p className={classes.text}>
              案号：xxx <br />
              &nbsp;&nbsp;&nbsp;&nbsp;案件名称：xxx <br />
              承办人：xxx{" "}
            </p>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <label>原告证据:</label>
          <Paper className={classes.paper2}>
            <textarea
              className={classes.textarea}
              placeholder="请在此处输入原告证据"
              onChange={handleFieldChange("complainantEvidence")}
            ></textarea>
            <Button
              variant="contained"
              color="primary"
              onClick={handleComplainantResolve}
            >
              分解证据
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <label>被告证据:</label>
          <Paper className={classes.paper2}>
            <textarea
              className={classes.textarea}
              placeholder="请在此处输入被告证据"
              onChange={handleFieldChange("defendantEvidence")}
            ></textarea>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDefendantResolve}
            >
              分解证据
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper3}>
            <form noValidate autoComplete="off">
              {values.complainantEvidenceList.map((evidenceItem, index) => (
                <div key={index}>
                  <TextField
                    className={classes.evidenceItem}
                    id="outlined-basic"
                    variant="outlined"
                    value={evidenceItem.content}
                  ></TextField>
                  <br />
                </div>
              ))}
            </form>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper3}>
            <form noValidate autoComplete="off">
              {values.defendantEvidenceList.map((evidenceItem, index) => (
                <div key={index}>
                  <TextField
                    className={classes.evidenceItem}
                    id="outlined-basic"
                    variant="outlined"
                    value={evidenceItem.content}
                  ></TextField>
                  <br />
                </div>
              ))}
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
