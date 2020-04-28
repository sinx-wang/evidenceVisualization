import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CustomButton from "components/CustomButtons/Button.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import CropIcon from "@material-ui/icons/Crop";
import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/Person";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
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

// 证据类型选择
// function SelectEvidenceType(props) {
//   const [type, setType] = React.useState(props.evidenceType)

//   return (
//     <FormControl fullWidth>
//       <InputLabel>类型</InputLabel>
//       <Select value={type} onChange={handleSelectChange}>
//         <MenuItem value={0}>书证</MenuItem>
//         <MenuItem value={1}>物证</MenuItem>
//         <MenuItem value={2}>证言</MenuItem>
//       </Select>
//     </FormControl>
//   );
// }

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

  const handleFieldChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleComplainantResolve = () => {
    alert(values.complainantEvidence);
  };

  const handleDefendantResolve = () => {
    alert(values.defendantEvidence);
  };

  const [type, setType] = React.useState(0);

  const handleSelectChange = (event) => {
    setType(event.target.value);
  };

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
        <Grid item xs={12}>
          <CustomTabs
            title="非矛盾证据"
            headerColor="success"
            tabs={[
              {
                tabName: "原告",
                tabIcon: PersonIcon,
                tabContent: (
                  <List>
                    <ListItem>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            label="单条证据"
                            value="酒后驾驶其本人的荣威沪ARXXXX轿车驶离车库，并沿路途经本市南北高架西侧徐汇路上匝道、南北高架西侧鲁班路出口匝道、外滩人民路隧道等地并进入本区区域"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <FormControl fullWidth>
                            <InputLabel>类型</InputLabel>
                            <Select value={type} onChange={handleSelectChange}>
                              <MenuItem value={0}>书证</MenuItem>
                              <MenuItem value={1}>物证</MenuItem>
                              <MenuItem value={2}>证言</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={3} justify="center">
                          <CustomButton color="danger">
                            <Close />
                            不认定
                          </CustomButton>
                        </Grid>
                        <Grid item xs={12}></Grid>
                      </Grid>
                    </ListItem>
                  </List>
                ),
              },
              {
                tabName: "被告",
                tabIcon: PersonOutlineIcon,
                tabContent: (
                  <List>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={12}></Grid>
                      </Grid>
                    </ListItem>
                  </List>
                ),
              },
            ]}
          />
        </Grid>
        {/* <Grid item xs={6}>
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
        </Grid> */}
      </Grid>
    </div>
  );
}
