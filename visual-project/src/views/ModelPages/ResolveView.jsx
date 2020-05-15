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
import DocumentData from "../../util/data/DocumentData";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import ListItem from "@material-ui/core/ListItem";
import Edit from "@material-ui/icons/Edit";
import Save from "@material-ui/icons/Save";
// import Check from "@material-ui/icons/Check";
// import Close from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/HighlightOff";
import PersonIcon from "@material-ui/icons/Person";
import List from "@material-ui/core/List";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Add from "@material-ui/icons/Add";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
// import { CardTitle } from "assets/jss/material-kit-react.js";

import * as Util from "../../util/Util";

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
  buttonAlign: {
    textAlign: "center",
  },
  headPaper: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  addButton: {
    padding: theme.spacing(2),
    textAlign: "right",
  },
}));

function SelectEvidenceType(props) {
  const [type, setType] = React.useState(props.evidenceType);

  const handleSelectType = (event) => {
    setType(event.target.value);
  };

  return (
    <FormControl fullWidth disabled={props.disabled}>
      <InputLabel>类型</InputLabel>
      <Select value={type} onChange={handleSelectType}>
        <MenuItem value={0}>书证</MenuItem>
        <MenuItem value={1}>物证</MenuItem>
        <MenuItem value={2}>证言</MenuItem>
      </Select>
    </FormControl>
  );
}

// 链头，使用paper与chips实现
function EvidenceHeads(props) {
  const classes = useStyles();

  const array = props.heads;

  const handleDeleteChip = (chip) => {
    console.log(chip.label);
  };

  return (
    <Paper component="ul" variant="outlined" className={classes.headPaper}>
      {array.map((data) => (
        <li key={data.key}>
          <Chip
            label={data.label}
            variant="outlined"
            color="primary"
            className={classes.chip}
            onDelete={() => handleDeleteChip(data)}
          />
        </li>
      ))}
    </Paper>
  );
}

function EvidenceTabContent(props) {
  const classes = useStyles();

  const item = props.item;

  const notEditing = item.documentId !== props.editing;

  const [heads, setHeads] = React.useState([]);

  React.useEffect(() => {
    setHeads(JSON.parse(DocumentData.heads));
  }, []);

  return (
    <ListItem>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <TextField
            label="单条证据"
            value={item.body}
            fullWidth
            disabled={notEditing}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectEvidenceType evidenceType={item.type} disabled={notEditing} />
        </Grid>
        <Grid item xs={1} className={classes.buttonAlign}>
          <CustomButton
            color={notEditing ? "info" : "success"}
            simple
            onClick={() => props.handleClickEdit(item.documentId)}
          >
            {notEditing ? <Edit /> : <Save />}
          </CustomButton>
        </Grid>
        <Grid item xs={1} className={classes.buttonAlign}>
          <CustomButton
            color="danger"
            simple
            onClick={() =>
              props.handleClickDelete(item.documentId, props.prosecutor)
            }
          >
            <DeleteIcon />
          </CustomButton>
        </Grid>
        <Grid item xs={12}>
          <EvidenceHeads heads={heads} />
        </Grid>
      </Grid>
    </ListItem>
  );
}



// 函数式写法，无class
export default function ResolveView() {
  // 原告证据
  const [prosecutorDoc, setProsecutorDoc] = React.useState([]);
  // 被告证据
  const [defendantDoc, setDefendantDoc] = React.useState([]);

  const [caseDetail, setCaseDetail] = React.useState({
      caseNum : '（2015）浦刑初字第2978号',
      caseName : '上海市浦东新区人民检察院以沪浦检刑诉（2015）2315号起诉书指控被告人王某某犯危险驾驶罪案',
      userName : '孙志刚'
  })

  React.useEffect(() => {
    document.title = "证据分解";
    setProsecutorDoc(JSON.parse(DocumentData.documents));
    setDefendantDoc(JSON.parse(DocumentData.documents));

    //初始化得到案件的基本信息（案号，案件名称，承办人）
    const url = '/evidence/getCaseDeatal'
    let param = JSON.stringify({
        username : sessionStorage.getItem("username"),
        caseID   : 1
    });

    const succ = (response) => {
        console.log(response)
    };

    const err = () => {
        console.log('证据分解界面数据初始化异常')
    };

    Util.asyncHttpGet(url, param ,succ , err );

  }, []);



  const [editing, setEditing] = React.useState(-1);


  //原告证据
  const [prosecutorEvidence,setProsecutorEvidence] = React.useState('');

  //被告证据
  const [defendantEvidence,setDefendantEvidence] = React.useState('');

  //分解原告证据
  const handleProsecutorResolve = ()=> {
      alert(prosecutorEvidence)
      const url = '/evidence/document'
      let param = JSON.stringify({
          caseId : sessionStorage.getItem('caseId'),
          type : 0,
          text : prosecutorEvidence
      });

      const succ = (response) => {
        //保存documentId
        var documentId = response[0].documentId;
        sessionStorage.setItem('documentId', documentId);
        //设置原告分解完证据列表
        setProsecutorDoc(response);
      };

      const err = () => {
          console.log('证据分解界面原告分解证据异常')
      };

      Util.asyncHttpGet(url, param ,succ , err );
  }

    //分解被告证据
    const handleDefendantResolve = ()=> {
        alert(defendantEvidence)
        const url = '/evidence/document'
        let param = JSON.stringify({
            caseId : sessionStorage.getItem('caseId'),
            type : 1,
            text : defendantEvidence
        });

        const succ = (response) => {
            //保存documentId
            var documentId = response[0].documentId;
            sessionStorage.setItem('documentId', documentId);
            //设置被告分解完证据列表
            setDefendantDoc(response)
        };

        const err = () => {
            console.log('证据分解界面被告分解证据异常')
        };

        Util.asyncHttpGet(url, param ,succ , err );
    }



  const handleEvidenceChange = field => event =>{
    if(field === 'prosecutor'){
      setProsecutorEvidence(event.target.value)
    }
    else {
      setDefendantEvidence(event.target.value)
    }
  }


  const handleClickEdit = (id) => {
    console.log(id);
    if (id === editing) {
      setEditing(-1);
    } else {
      setEditing(id);
    }
  };

  const handleClickDelete = (id, prosecutor) => {
    console.log(id);
    console.log(prosecutor);
    if (prosecutor) {
      setProsecutorDoc((list) => list.filter((item) => item.documentId !== id));
      console.log(prosecutorDoc);
    } else {
      setDefendantDoc((list) => list.filter((item) => item.documentId !== id));
    }
  };




  //新增原告证据
  const addNewProsecutorEvidence = () =>{
    // let oldProsecutorDoc = prosecutorDoc;
    // oldProsecutorDoc.push({
    //     documentId : sessionStorage.getItem('documentId'),
    //     type : '0',
    //     body : '新证据内容',
    //     agree : false
    // });
    // setProsecutorDoc(oldProsecutorDoc);
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
                    <TableCell>{caseDetail.caseNum}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>案件名称</TableCell>
                    <TableCell>
                        {caseDetail.caseName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>承办人</TableCell>
                    <TableCell>{caseDetail.userName}</TableCell>
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
                onChange={handleEvidenceChange('prosecutor')}
              />
              <CustomButton
                type="button"
                color="success"
                style={{ marginRight: 10 }}
                round
                onClick={handleProsecutorResolve}
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
                onChange={handleEvidenceChange('defendant')}
              />
              <CustomButton
                type="button"
                color="success"
                style={{ marginRight: 10 }}
                round
                onClick={handleDefendantResolve}
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
            title="证据分解结果"
            headerColor="info"
            tabs={[
              {
                tabName: "原告",
                tabIcon: PersonIcon,
                tabContent: (
                  <div className={classes.root}>
                    <List>
                      {prosecutorDoc.map((item, index) => (
                        <EvidenceTabContent
                          key={index}
                          position={index}
                          item={item}
                          editing={editing}
                          prosecutor={true}
                          handleClickEdit={handleClickEdit}
                          handleClickDelete={handleClickDelete}
                        />
                      ))}
                    </List>
                    <Paper elevation={0} className={classes.addButton}>
                      <CustomButton
                          color="success"
                          onClick={addNewProsecutorEvidence}
                      >
                        <Add />
                        添加原告证据
                      </CustomButton>
                    </Paper>
                  </div>
                ),
              },
              {
                tabName: "被告",
                tabIcon: PersonOutlineIcon,
                tabContent: (
                  <div className={classes.root}>
                    <List>
                      {defendantDoc.map((item, index) => (
                        <EvidenceTabContent
                          key={index}
                          position={index}
                          item={item}
                          editing={editing}
                          prosecutor={false}
                          handleClickEdit={handleClickEdit}
                          handleClickDelete={handleClickDelete}
                        />
                      ))}
                    </List>
                    <Paper elevation={0} className={classes.addButton}>
                      <CustomButton
                          color="success"

                      >
                        <Add />
                        添加被告证据
                      </CustomButton>
                    </Paper>
                  </div>
                ),
              },
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
}

SelectEvidenceType.propTypes = {
  disabled: PropTypes.bool,
  evidenceType: PropTypes.number,
};

EvidenceHeads.propTypes = {
  heads: PropTypes.array,
};

EvidenceTabContent.propTypes = {
  position: PropTypes.number,
  item: PropTypes.object,
  agree: PropTypes.bool,
  editing: PropTypes.number,
  prosecutor: PropTypes.bool,
  handleClickEdit: PropTypes.func,
  handleClickDelete: PropTypes.func,
};
