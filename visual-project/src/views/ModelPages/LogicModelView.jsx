import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import JTopo from "jtopo-in-node";
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
// import Notification from "../../components/Notification/Notification";
import DocumentData from "../../util/data/DocumentData";

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
  const [rules, setRules] = React.useState([]);

  // 结论
  const [result, setResult] = React.useState(null);

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

  React.useEffect(() => {
    document.title = "说理逻辑";
    initCanvas();
    initData();
  }, []);

  const initCanvas = () => {
    let canvas = canvasRef.current;
    console.log(window.innerWidth);
    canvas.width = 1363 * 0.55;
    canvas.height = window.innerHeight;
  };

  const initData = () => {
    setRealEvidences(DocumentData.getEvidences[0].body);
    setRealFacts(DocumentData.getFacts[0].body);
    setRules(DocumentData.rulesNodeArray);
    setResult(DocumentData.getResult);
    setSolidLines(DocumentData.getSolidLines);
  };

  const drawCanvas = () => {
    let canvas = canvasRef.current;
    let stage = new JTopo.Stage(canvas);
    stage.eagleEye.visible = null;

    let scene = new JTopo.Scene(stage);
    scene.mode = "select";
    //scene.background= '1.png';

    let xPosition = 100;
    let yPosition = 20;
    let ySpacing = 100;

    let num = realEvidences.length;
    if (num > 1) {
      yPosition = (window.innerHeight - (num - 1) * ySpacing) / 2;
    } else {
      yPosition = window.innerHeight / 2;
    }
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
    num = realFacts.length;
    if (num > 1) {
      yPosition = (window.innerHeight - (num - 1) * ySpacing) / 2;
    } else {
      yPosition = window.innerHeight / 2;
    }
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
    num = rules.length;
    if (num > 1) {
      yPosition = (window.innerHeight - (num - 1) * ySpacing) / 2;
    } else {
      yPosition = window.innerHeight / 2;
    }
    rules.forEach((item) => {
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
    yPosition = window.innerHeight / 2;
    let node = createResultNode(
      result.logicNodeId,
      result.text,
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
      let link = createLink(node1, node2, false);
      scene.add(link);
    });
  };

  const createNode = (logicNodeId, text, x, y, fillColor, fontColor, shape) => {
    let node;
    if (shape === "circle") {
      node = new JTopo.CircleNode();
    } else {
      node = new JTopo.Node();
    }
    //添加自定义属性
    node.logicNodeId = logicNodeId;
    node.serializedProperties.push("logicNodeId");

    node.text = text.substring(0, 7);
    node.setLocation(x, y);
    node.dragable = true;
    if (!fontColor) fontColor = "0,0,0";
    if (!fillColor) fillColor = "0,255,0";
    node.fontColor = fontColor;
    node.fillColor = fillColor;
    return node;
  };

  const createEvidenceNode = (logicNodeId, text, x, y, fake) => {
    let color = fake ? "149,117,205" : "106,27,154";
    return createNode(logicNodeId, text, x, y, color);
  };

  const createFactNode = (logicNodeId, text, x, y, fake) => {
    let color = fake ? "236,64,122" : "173,20,87";
    return createNode(logicNodeId, text, x, y, color);
  };

  const createRuleNode = (logicNodeId, name, text, x, y) => {
    let node = createNode(logicNodeId, text, x, y, "255,152,0");
    node.title = name;
    return node;
  };

  const createResultNode = (logicNodeId, text, x, y) => {
    return createNode(logicNodeId, text, x, y, "76,175,80");
  };

  const createLink = (nodeA, nodeZ, dotted, text) => {
    let link = new JTopo.Link(nodeA, nodeZ, text);
    if (dotted) link.dashedPattern = 5;
    return link;
  };

  const _fixType = (type) => {
    type = type.toLowerCase().replace(/jpg/i, "jpeg");
    const r = type.match(/png|jpeg|bmp|gif/)[0];
    return "image/" + r;
  };

  const saveFile = (data, filename) => {
    let save_link = document.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "a"
    );
    save_link.href = data;
    save_link.download = filename;
    let event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    save_link.dispatchEvent(event);
  };

  const exportToPng = () => {
    // var canvas = document.getElementById("canvas");
    let canvas = canvasRef.current;
    const type = "png";
    let imgData = canvas.toDataURL(type);
    imgData = imgData.replace(_fixType(type), "image/octet-stream");
    let filename = "picture." + type;
    saveFile(imgData, filename);
  };

  const handleIndeedDelete = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      {/*<AlertDialog*/}
      {/*  open={dialogOpen}*/}
      {/*  title="是否删除该节点?"*/}
      {/*  content={values.nodeText}*/}
      {/*  colorLeft="secondary"*/}
      {/*  textLeft="确认删除"*/}
      {/*  colorRight="primary"*/}
      {/*  textRight="取消"*/}
      {/*  closeDialog1={handleIndeedDelete}*/}
      {/*  closeDialog2={() => setDialogOpen(false)}*/}
      {/*/>*/}
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
                tabButton: "智能算法推荐",
                tabContent: <RulesRecommend />,
              },
              {
                tabButton: "法合推荐",
                tabContent: <RulesRecommend />,
              },
              {
                tabButton: "频次推荐",
                tabContent: <RulesRecommend />,
              },
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
              onClick={exportToPng}
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
