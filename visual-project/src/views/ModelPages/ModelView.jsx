import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import JTopo from "jtopo-in-node";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddToQueue from "@material-ui/icons/AddToQueue";
import Adjust from "@material-ui/icons/Adjust";
import ImageIcon from "@material-ui/icons/Image";
import DeleteForever from "@material-ui/icons/DeleteForever";
import CustomButton from "components/CustomButtons/Button";
import * as Util from "../../util/Util";
import AlertDialog from "../../components/Dialog/AlertDialog";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Notification from "../../components/Notification/Notification";

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
    color: theme.palette.text.secondary,
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

// 函数式写法，无class
export default function ModelView() {
  const classes = useStyles();

  const canvasRef = React.useRef(null);

  const [values, setValues] = React.useState({
    logicNodeId: 0,
    nodeText: "", //点击节点信息
    type: "",
    role: "",
    confirm: null,
  });

  const [realFacts, setRealFacts] = React.useState([]);

  const [fakeFacts, setFakeFacts] = React.useState([]);

  const [realEvidences, setRealEvidences] = React.useState([]);

  const [fakeEvidences, setFakeEvidences] = React.useState([]);

  const [heads, setHeads] = React.useState([]);

  const [joints, setJoints] = React.useState([]);

  const [solidLines, setSolidLines] = React.useState([]);

  const [dottedLines, setDottedLines] = React.useState([]);

  const [dialogOpen, setDialogOpen] = React.useState(false);

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
    document.title = "建模";
    initCanvas();
    initData();
  }, []);

  //初始化数据 此处硬编码caseId为2 后期需要修改
  const initData = () => {
    const url = "/model/getInfo";

    let param = JSON.stringify({
      //caseId: sessionStorage.getItem("caseId"),
      caseId: 3,
    });

    const succ = (response) => {
      let realFacts = [];
      let fakeFacts = [];
      let realEvidences = [];
      let fakeEvidences = [];
      let facts = response.facts;
      for (let i = 0; i < facts.length; i++) {
        if (facts[i].confirm === 0) {
          fakeFacts = facts[i].body;
        } else {
          realFacts = facts[i].body;
        }
      }

      let evidences = response.evidences;
      for (let i = 0; i < evidences.length; i++) {
        if (evidences[i].confirm === 0) {
          fakeEvidences = evidences[i].body;
        } else {
          realEvidences = evidences[i].body;
        }
      }
      let heads = response.heads;
      let joints = response.joints;
      let solidLines = response.solideLines;
      let dottedLines = response.dottedLines;

      setRealFacts(realFacts);
      setFakeFacts(fakeFacts);
      setRealEvidences(realEvidences);
      setFakeEvidences(fakeEvidences);
      setHeads(heads);
      setJoints(joints);
      setSolidLines(solidLines);
      setDottedLines(dottedLines);
    };

    const err = () => {
      console.log("获取数据出错");
    };

    Util.asyncHttpPost(url, param, succ, err);
  };

  const initCanvas = () => {
    let canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.55;
    canvas.height = window.innerHeight;
    setNote({
      show: true,
      color: "success",
      content: "Canvas已初始化成功！可以显示节点",
    });
  };

  const drawCanvas = () => {
    let canvas = canvasRef.current;
    let stage = new JTopo.Stage(canvas);
    stage.eagleEye.visible = null;

    let scene = new JTopo.Scene(stage);
    scene.mode = "select";
    //scene.background= '1.png';

    let xPosition = 20;
    let yPosition = 20;
    let ySpacing = 100;
    let ySpacing2 = 70;
    // 创建被否定事实
    let num = fakeFacts.length;
    if (num > 1) {
      yPosition = (window.innerHeight - (num - 1) * ySpacing) / 2 - 70;
    } else {
      yPosition = window.innerHeight / 2 - 70;
    }
    fakeFacts.forEach((item) => {
      let node = createFactNode(
        item.logicNodeId,
        item.text,
        xPosition,
        yPosition,
        true
      );
      let text = item.text;
      node.confirm = false;
      node.serializedProperties.push("confirm");
      node.mousedown(() => {
        setValues({
          logicNodeId: node.logicNodeId,
          nodeText: text,
          confirm: false,
        });
      });
      scene.add(node);
      yPosition += ySpacing;
    });

    xPosition += 75;
    yPosition = 50;
    // 创建被认定事实
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
      node.confirm = true;
      node.serializedProperties.push("confirm");
      node.mousedown(() => {
        setValues({
          logicNodeId: node.logicNodeId,
          nodeText: text,
          confirm: true,
        });
      });
      scene.add(node);
      yPosition += ySpacing;
    });

    xPosition = 250;
    yPosition = 20;
    // 创建联结点
    num = joints.length;
    let tooLong = false;
    if (num * ySpacing2 >= window.innerHeight - 20) {
      ySpacing2 = (window.innerHeight - 20) / num;
      tooLong = true;
    }
    if (!tooLong) {
      num = joints.length;
      if (num > 1) {
        yPosition = (window.innerHeight - (num - 1) * ySpacing) / 2;
      } else {
        yPosition = window.innerHeight / 2;
      }
    }
    joints.forEach((item, index) => {
      let node = createFactLinkNode(
        item.logicNodeId,
        item.text,
        xPosition,
        yPosition
      );
      node.mousedown(() => {
        setValues({
          logicNodeId: node.logicNodeId,
          nodeText: item.text,
        });
      });
      scene.add(node);
      yPosition += ySpacing2;
      if (tooLong) {
        if (index % 2 === 0) {
          xPosition += 35;
        } else {
          xPosition -= 35;
        }
      }
    });

    xPosition = 400;
    yPosition = 20;
    // 创建链头
    num = heads.length;
    tooLong = false;
    if (num * ySpacing2 >= window.innerHeight - 20) {
      ySpacing2 = (window.innerHeight - 20) / num;
      tooLong = true;
    }
    if (!tooLong) {
      num = heads.length;
      if (num > 1) {
        yPosition = (window.innerHeight - (num - 1) * ySpacing) / 2;
      } else {
        yPosition = window.innerHeight / 2;
      }
    }
    heads.forEach((item, index) => {
      let node = createEvidenceLinkNode(
        item.logicNodeId,
        item.text,
        xPosition,
        yPosition
      );
      node.mousedown(() => {
        setValues({
          logicNodeId: node.logicNodeId,
          nodeText: item.text,
        });
      });
      scene.add(node);
      yPosition += ySpacing2;
      if (tooLong) {
        if (index % 2 === 0) {
          xPosition += 35;
        } else {
          xPosition -= 35;
        }
      }
    });

    xPosition = 600;
    yPosition = 20;
    // 创建认定证据
    num = realEvidences.length;
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
      node.confirm = true;
      node.serializedProperties.push("confirm");
      node.mousedown(() => {
        setValues({
          logicNodeId: node.logicNodeId,
          nodeText: text,
          type: node.type,
          role: node.role,
          confirm: true,
        });
      });
      scene.add(node);
      yPosition += ySpacing;
    });

    xPosition += 75;
    yPosition = 50;
    // 创建被否定证据
    num = fakeEvidences.length;
    if (num > 1) {
      yPosition = (window.innerHeight - (num - 1) * ySpacing) / 2 + 70;
    } else {
      yPosition = window.innerHeight / 2 + 70;
    }
    fakeEvidences.forEach((item) => {
      let node = createEvidenceNode(
        item.logicNodeId,
        item.text,
        xPosition,
        yPosition,
        true
      );

      let text = item.text;
      node.type = item.type;
      node.serializedProperties.push("type");
      node.role = item.role;
      node.serializedProperties.push("role");
      node.confirm = false;
      node.serializedProperties.push("confirm");
      node.mousedown(() => {
        setValues({
          logicNodeId: node.logicNodeId,
          nodeText: text,
          type: node.type,
          role: node.role,
          confirm: false,
        });
      });
      scene.add(node);
      yPosition += ySpacing;
    });

    let allNode = stage.find("node");
    // 创建实线
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

    // 创建虚线
    dottedLines.forEach((line) => {
      let node1;
      allNode.forEach((singleNode) => {
        if (line.logicNodeId1 === singleNode.logicNodeId) node1 = singleNode;
      });
      let node2;
      allNode.forEach((singleNode) => {
        if (line.logicNodeId2 === singleNode.logicNodeId) node2 = singleNode;
      });
      let link = createLink(node1, node2, true);
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

  const createEvidenceLinkNode = (logicNodeId, text, x, y) => {
    return createNode(logicNodeId, text, x, y, "0,151,167", false, "circle");
  };

  const createFactNode = (logicNodeId, text, x, y, fake) => {
    let color = fake ? "236,64,122" : "173,20,87";
    return createNode(logicNodeId, text, x, y, color);
  };

  const createFactLinkNode = (logicNodeId, text, x, y) => {
    return createNode(logicNodeId, text, x, y, "21,101,192", false, "circle");
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
      <AlertDialog
        open={dialogOpen}
        title="是否删除该节点?"
        content={values.nodeText}
        colorLeft="secondary"
        textLeft="确认删除"
        colorRight="primary"
        textRight="取消"
        closeDialog1={handleIndeedDelete}
        closeDialog2={() => setDialogOpen(false)}
      />
      <Notification
        color={note.color}
        content={note.content}
        open={note.show}
        autoHide={3000}
        onClose={handleCloseNote}
      />
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
              label="节点信息:"
              value={values.nodeText}
              className={classes.text}
              multiline={values.nodeText.length > 14}
              rows={values.nodeText.length / 14 + 1}
            />
            {values.confirm != null ? (
              <TextField
                fullWidth
                label="认定:"
                error={!values.confirm}
                value={values.confirm ? "被认定" : "被否定"}
                className={classes.text}
              />
            ) : null}
            {values.role ? (
              <TextField
                fullWidth
                label="来源:"
                value={values.role ? "被告" : "原告"}
                className={classes.text}
              />
            ) : null}
            {values.type ? (
              // <TextField
              //   fullWidth
              //   label="类型:"
              //   value={values.type}
              //   className={classes.text}
              // />
              <FormControl fullWidth style={{ marginBottom: 10 }}>
                <InputLabel>类型</InputLabel>
                <Select value={values.type}>
                  <MenuItem value={0}>证人证言</MenuItem>
                  <MenuItem value={1}>被告人供述和辩解</MenuItem>
                  <MenuItem value={2}>书证</MenuItem>
                  <MenuItem value={3}>勘验</MenuItem>
                  <MenuItem value={4}>检查笔录</MenuItem>
                  <MenuItem value={5}>其他</MenuItem>
                </Select>
              </FormControl>
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
