import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Grid from "@material-ui/core/Grid";
import CustomButton from "components/CustomButtons/Button.js";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CropIcon from "@material-ui/icons/Crop";
import EditIcon from "@material-ui/icons/Edit";
// import { CardTitle } from "assets/jss/material-kit-react.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
    // height: 120
  },
  paper2: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 200,
  },
  paper3: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 500,
  },
  text: {
    float: "left",
    display: "block",
  },
  textarea: {
    height: "80%",
  },
  textFieldBlock: {
    marginBottom: 10,
  },
  evidenceItem: {
    marginTop: "10px",
    height: "40",
    width: "80%",
  },
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
      { id: 2, content: "evidence2" },
    ], //原告分解完的证据集合
    defendantEvidenceList: [], //被告分解完的证据集合
  });




  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader color="primary">案件信息</CardHeader>
            <CardBody>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>案件号</TableCell>
                    <TableCell>（2015）浦刑初字第2978号</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>案件名称</TableCell>
                    <TableCell>
                      上海市浦东新区人民检察院以沪浦检刑诉（2015）2315号起诉书指控被告人王某某犯危险驾驶罪案
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>承办人</TableCell>
                    <TableCell>孙志刚</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader color="warning">原告证据</CardHeader>
            <CardBody>
              <TextField
                fullWidth
                label="请在此输入"
                multiline
                rows={7}
                variant="outlined"
                className={classes.textFieldBlock}
              />
              <CustomButton
                type="button"
                color="success"
                style={{ marginRight: 10 }}
                round
              >
                <CropIcon />
                分解证据
              </CustomButton>
              <CustomButton type="button" color="info" round>
                <EditIcon />
                编辑证据
              </CustomButton>
            </CardBody>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader color="warning">被告证据</CardHeader>
            <CardBody>
              <TextField
                fullWidth
                label="请在此输入"
                multiline
                rows={7}
                variant="outlined"
                className={classes.textFieldBlock}
              />
              <CustomButton
                type="button"
                color="success"
                style={{ marginRight: 10 }}
                round
              >
                <CropIcon />
                分解证据
              </CustomButton>
              <CustomButton type="button" color="info" round>
                <EditIcon />
                编辑证据
              </CustomButton>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
