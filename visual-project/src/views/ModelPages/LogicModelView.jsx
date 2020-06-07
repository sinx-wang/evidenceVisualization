import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import AddToQueue from "@material-ui/icons/AddToQueue";
import Adjust from "@material-ui/icons/Adjust";
import ImageIcon from "@material-ui/icons/Image";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForever from "@material-ui/icons/DeleteForever";
import CustomButton from "components/CustomButtons/Button";
import Typography from "@material-ui/core/Typography";
import * as Util from "../../util/Util";
import * as ModelUtil from "../../util/ModelUtil";
import NavPills from "components/NavPills/NavPills.js";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
import Notification from "../../components/Notification/Notification";
// import DocumentData from "../../util/data/DocumentData";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  canvas: {
    //width:"500px",
    height: "100%",
    border: "solid red 1px",
  },
  paper: {
    padding: theme.spacing(2),
    //textAlign: 'center',
  },
  rightDiv: {
    border: "solid red 1px",
    float: "right",
  },
  button: {
    margin: theme.spacing(1),
  },
  text: {
    marginBottom: 10,
  },
}));

function RulesRecommend(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    checkedA: true,
    checkedB: false,
    checkedC: false,
    checkedD: false,
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={values.checkedA}
              onChange={handleChange}
              name="checkedA"
              color="primary"
            />
          }
          label="中华人民共和国刑法第113条"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.checkedB}
              onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          }
          label="中华人民共和国刑法第67条"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.checkedC}
              onChange={handleChange}
              name="checkedC"
              color="primary"
            />
          }
          label="中华人民共和国刑法第72条"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.checkedD}
              onChange={handleChange}
              name="checkedD"
              color="primary"
            />
          }
          label="中华人民共和国刑法第73条"
        />
      </FormGroup>
      {/*<Paper square elevation={5}>*/}
      {/*  <Typography>*/}
      {/*    违反交通运输管理法规，因而发生重大事故，致人重伤、死亡或者使公私财产遭受重大损失的，处三年以下有期徒刑或者拘役；交通运输肇事后逃逸或者有其他特别恶劣情节的，处三年以上七年以下有期徒刑；因逃逸致人死亡的，处七年以上有期徒刑。*/}
      {/*  </Typography>*/}
      {/*</Paper>*/}
      <TextField
        disabled
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        label="详细内容"
        value="违反交通运输管理法规，因而发生重大事故，致人重伤、死亡或者使公私财产遭受重大损失的，处三年以下有期徒刑或者拘役；交通运输肇事后逃逸或者有其他特别恶劣情节的，处三年以上七年以下有期徒刑；因逃逸致人死亡的，处七年以上有期徒刑。"
      />
    </div>
  );
}

export default function LogicModelView() {
  const classes = useStyles();

  const canvasRef = React.useRef(null);

  const [realEvidences, setRealEvidences] = React.useState([]);

  const [realFacts, setRealFacts] = React.useState([]);

  // 法条
  const [laws, setLaws] = React.useState([]);

  // 结论
  const [results, setResults] = React.useState([]);

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [ruleDialogOpen, setRuleDialogOpen] = React.useState(false);

  const [solidLines, setSolidLines] = React.useState([]);

  const [values, setValues] = React.useState({
    logicNodeId: 0,
    name: "",
    nodeText: "", //点击节点信息
    type: "", // 原告被告
    role: "",
  });

  const [note, setNote] = React.useState({
    show: false,
    color: "",
    content: "",
  });

  const handleCloseNote = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNote({ ...note, show: false });
  };

  React.useEffect(() => {
    document.title = "说理逻辑";
    initCanvas();
    initData();
  }, []);

  const initCanvas = () => {
    ModelUtil.initCanvas(canvasRef);
  };

  const initData = () => {
    const url = "/model/getLogicInfo";
    let param = JSON.stringify({
      caseId: 3,
    });
    const succ = (response) => {
      let facts = response.facts;
      for (let part of facts) {
        if (part.confirm === 1) {
          setRealFacts(part.body);
        }
      }
      let evidences = response.evidences;
      for (let part of evidences) {
        if (part.confirm === 1) {
          setRealEvidences(part.body);
        }
      }
      setLaws(response.laws);
      setResults(response.results);
      setSolidLines(response.lines);
    };
    const err = () => {
      setNote({
        show: true,
        color: "error",
        content: "获取数据失败，请稍后重试！",
      });
    };
    Util.asyncHttpPost(url, param, succ, err);
  };

  const drawCanvas = () => {
    let stageState = ModelUtil.initScene(canvasRef);
    let scene = stageState[1];
    let stage = stageState[0];
    //scene.background= '1.png';

    let xPosition = 100;
    let yPosition = 20;
    let ySpacing = 100;

    [yPosition, ySpacing] = ModelUtil.calculateY(
      realEvidences.length,
      ySpacing
    );
    realEvidences.forEach((item) => {
      let node = createEvidenceNode(
        item.logicNodeId,
        item.text,
        xPosition,
        yPosition
      );
      let text = item.text;
      // 添加自定义属性
      node.type = item.type;
      node.serializedProperties.push("type");
      node.role = item.role;
      node.serializedProperties.push("role");
      node.mousedown(() => {
        setValues({
          logicNodeId: node.logicNodeId,
          nodeText: text,
          type: node.type,
          role: node.role,
        });
      });
      scene.add(node);
      yPosition += ySpacing;
    });

    xPosition += 150;
    yPosition = 50;
    [yPosition, ySpacing] = ModelUtil.calculateY(realFacts.length, ySpacing);
    realFacts.forEach((item) => {
      let node = createFactNode(
        item.logicNodeId,
        item.text,
        xPosition,
        yPosition
      );
      let text = item.text;
      node.mousedown(() => {
        setValues({
          logicNodeId: node.logicNodeId,
          nodeText: text,
        });
      });
      scene.add(node);
      yPosition += ySpacing;
    });

    xPosition += 150;
    yPosition = 50;
    [yPosition, ySpacing] = ModelUtil.calculateY(laws.length, ySpacing);
    laws.forEach((item) => {
      let node = createRuleNode(
        item.logicNodeId,
        item.name,
        item.text,
        xPosition,
        yPosition
      );
      node.name = item.name;
      node.serializedProperties.push("name");
      node.mousedown(() => {
        setValues({
          logicNodeId: node.logicNodeId,
          name: node.name,
          nodeText: item.text,
        });
      });
      scene.add(node);
      yPosition += ySpacing;
    });

    xPosition += 150;
    [yPosition, ySpacing] = ModelUtil.calculateY(results.length, ySpacing);
    results.forEach((item) => {
      let node = createResultNode(
        item.logicNodeId,
        item.text,
        xPosition,
        yPosition
      );
      node.mousedown(() => {
        setValues({
          logicNodeId: node.logicNodeId,
          nodeText: node.text,
        });
      });
      scene.add(node);
    });

    let allNode = stage.find("node");
    solidLines.forEach((line) => {
      let node1;
      allNode.forEach((singleNode) => {
        if (line.logicNodeId1 === singleNode.logicNodeId) {
          node1 = singleNode;
        }
      });
      let node2;
      allNode.forEach((singleNode) => {
        if (line.logicNodeId2 === singleNode.logicNodeId) {
          node2 = singleNode;
        }
      });
      if (node1 && node2) {
        let link = ModelUtil.createLink(node1, node2, false);
        scene.add(link);
      }
    });
  };

  const createEvidenceNode = (logicNodeId, text, x, y, fake) => {
    let color = fake ? "149,117,205" : "106,27,154";
    return ModelUtil.createNode(logicNodeId, text, x, y, color);
  };

  const createFactNode = (logicNodeId, text, x, y, fake) => {
    let color = fake ? "236,64,122" : "173,20,87";
    return ModelUtil.createNode(logicNodeId, text, x, y, color);
  };

  const createRuleNode = (logicNodeId, name, text, x, y) => {
    let node = ModelUtil.createNode(logicNodeId, text, x, y, "255,152,0");
    node.title = name;
    return node;
  };

  const createResultNode = (logicNodeId, text, x, y) => {
    return ModelUtil.createNode(logicNodeId, text, x, y, "76,175,80");
  };

  const handleIndeedDelete = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Notification
        color={note.color}
        content={note.content}
        open={note.show}
        autoHide={3000}
        onClose={handleCloseNote}
      />
      <Dialog
        maxWidth="sm"
        fullWidth
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle id="alert-dialog-title">{"是否删除该节点?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography color="primary">LogicNodeId:</Typography>
            {values.logicNodeId}
            <Typography color="primary">类型:</Typography>
            证据
            <Typography color="primary">详细信息:</Typography>
            {values.nodeText}
            <Typography color="primary">指向:</Typography>
            22
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleIndeedDelete} color="secondary">
            删除节点，子节点连接到上级
          </Button>
          <Button onClick={handleIndeedDelete} color="secondary">
            删除节点及子节点
          </Button>
          <Button
            onClick={() => setDialogOpen(false)}
            color="primary"
            autoFocus
          >
            取消
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={ruleDialogOpen}
        maxWidth="sm"
        fullWidth
        onClose={() => setRuleDialogOpen(false)}
      >
        <DialogTitle>推荐法条</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="ID"
            value="1023"
            disabled
            fullWidth
            margin="normal"
          />
          <TextField label="摘要" value="事实三" fullWidth margin="normal" />
          <TextField
            label="详细信息"
            value="张某塘沽罚款卫生监督所刘谨钊等人，给其送达了行政处罚决定书，内容是两项，第一是没收先行保存的药品、器械，并处以五千元的罚款，第二是改正违法行为。"
            fullWidth
            margin="normal"
          />
          <NavPills
            color="rose"
            tabs={[
              {
                tabButton: "法条推荐",
                tabContent: <RulesRecommend />,
              },
              {
                tabButton: "类案推荐",
                tabContent: <RulesRecommend />,
              },
              // {
              //   tabButton: "频次推荐",
              //   tabContent: <RulesRecommend />,
              // },
            ]}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRuleDialogOpen(false)} color="primary">
            引用
          </Button>
          <Button onClick={handleIndeedDelete} color="default">
            取消
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={0}>
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<AddToQueue />}
              style={{
                backgroundColor: "#4caf50",
                color: "#fff",
              }}
              onClick={initCanvas}
            >
              初始化Canvas
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<Adjust />}
              color="primary"
              onClick={drawCanvas}
            >
              显示节点
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<ImageIcon />}
              color="default"
              onClick={() => ModelUtil.exportToPng(canvasRef)}
            >
              导出图片
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <canvas id="canvas" ref={canvasRef} className={classes.canvas} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <TextField
              fullWidth
              label="节点图形ID"
              disabled
              value={values.logicNodeId}
              className={classes.text}
            />
            <TextField
              fullWidth
              label="摘要"
              value={values.name}
              onChange={(event) =>
                setValues({ ...values, name: event.target.value })
              }
              className={classes.text}
            />
            <TextField
              fullWidth
              label="节点信息:"
              value={values.nodeText}
              className={classes.text}
              multiline={values.nodeText.length > 14}
              rows={values.nodeText.length / 14 + 1}
            />
            {values.logicNodeId ? (
              <CustomButton
                color="info"
                fullWidth
                // onClick={() => setDialogOpen(true)}
              >
                <EditIcon />
                编辑节点
              </CustomButton>
            ) : null}
            {values.logicNodeId ? (
              <CustomButton
                color="success"
                fullWidth
                onClick={() => setRuleDialogOpen(true)}
              >
                <AddCircleOutline />
                添加节点
              </CustomButton>
            ) : null}
            {values.logicNodeId ? (
              <CustomButton
                color="danger"
                fullWidth
                onClick={() => setDialogOpen(true)}
              >
                <DeleteForever />
                删除节点
              </CustomButton>
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
