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
import DocumentData from "../../util/data/DocumentData";
import * as Util from "../../util/Util";

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
    confirm: 0,
  });

  const [realFacts, setRealFacts] = React.useState([]);

  const [fakeFacts, setFakeFacts] = React.useState([]);

  const [realEvidences, setRealEvidences] = React.useState([]);

  const [fakeEvidences, setFakeEvidences] = React.useState([]);

  const [heads, setHeads] = React.useState([]);

  const [joints, setJoints] = React.useState([]);

  const [solidLines, setSolidLines] = React.useState([]);

  const [dottedLines, setDottedLines] = React.useState([]);

  React.useEffect(() => {
    document.title = "建模";
    initData()
    // setRealFacts(DocumentData.getFacts[0].body);
    // setFakeFacts(DocumentData.getFacts[1].body);
    // setRealEvidences(DocumentData.getEvidences[0].body);
    // setFakeEvidences(DocumentData.getEvidences[1].body);
    // setHeads(DocumentData.getHeads);
    // setJoints(DocumentData.getJoint);
    // setSolidLines(DocumentData.getSolidLines);
    // setDottedLines(DocumentData.getDottedLines);
  }, []);

  //初始化数据 此处硬编码caseId为2 后期需要修改
  const initData = () => {

    const url = "/model/getInfo";

    let param = JSON.stringify({
        //caseId: sessionStorage.getItem("caseId"),
        caseId: 3,
    });

    const succ = (response) =>{
      let realFacts = [];
      let fakeFacts = [];
      let realEvidences = [];
      let fakeEvidences = [];
      let facts = response.facts;
      for(let i=0; i<facts.length; i++){
        if(facts[i].confirm === 0){
          fakeFacts = facts[i].body
        }
        else{
          realFacts = facts[i].body
        }
      }

        let evidences = response.evidences;
        for(let i=0; i<evidences.length; i++){
            if(evidences[i].confirm === 0){
                fakeEvidences = evidences[i].body
            }
            else{
                realEvidences = evidences[i].body
            }
        }
      let heads = response.heads;
      let joints = response.joints;
      let solidLines = response.solideLines;
      let dottedLines = response.dottedLines;
      console.log('heads:'+JSON.stringify(heads));
      console.log('joints:'+JSON.stringify(joints));
      console.log('realFacts :'+JSON.stringify(realFacts));
      console.log('fakeFacts :'+JSON.stringify(fakeFacts));
      console.log('realEvidence :'+JSON.stringify(realEvidences));
      console.log('fakeEvidence :'+JSON.stringify(fakeEvidences));
      console.log('solidLines :'+JSON.stringify(solidLines));
      console.log('dottedLines :'+JSON.stringify(dottedLines));

      setRealEvidences(realEvidences);
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
    canvas.height = window.innerHeight * 0.5;
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
    // 创建被否定事实
    fakeFacts.forEach((item) => {
      let node = createFactNode(
        item.logicNodeId,
        item.text,
        xPosition,
        yPosition,
        true
      );
      let text = item.text
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
    realFacts.forEach((item) => {
      let node = createFactNode(
        item.logicNodeId,
        item.text,
        xPosition,
        yPosition
      );
      let text = item.text
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
    joints.forEach((item) => {
      let node = createFactLinkNode(
        item.logicNodeId,
        item.text,
        xPosition,
        yPosition
      );
      scene.add(node);
      yPosition += ySpacing;
    });

    xPosition = 400;
    yPosition = 20;
    // 创建链头
    heads.forEach((item) => {
      let node = createEvidenceLinkNode(
        item.logicNodeId,
        item.text,
        xPosition,
        yPosition
      );
      scene.add(node);
      yPosition += ySpacing;
    });

    xPosition = 600;
    yPosition = 20;
    // 创建认定证据
    realEvidences.forEach((item) => {
      let node = createEvidenceNode(
        item.logicNodeId,
        item.text,
        xPosition,
        yPosition
      );
      let text = item.text
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
    fakeEvidences.forEach((item) => {
      let node = createEvidenceNode(
        item.logicNodeId,
        item.text,
        xPosition,
        yPosition,
        true
      );

      let text = item.text
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
        if (line.nodeId1 === singleNode.logicNodeId) {
          node1 = singleNode;
        }
      });
      let node2;
      allNode.forEach((singleNode) => {
        if (line.nodeId2 === singleNode.logicNodeId) {
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
        if (line.nodeId1 === singleNode.logicNodeId) node1 = singleNode;
      });
      let node2;
      allNode.forEach((singleNode) => {
        if (line.nodeId2 === singleNode.logicNodeId) node2 = singleNode;
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

    node.text = text.substring(0,7);
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

  return (
    <div>
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
              label="节点图形ID"
              disabled
              value={values.logicNodeId}
              className={classes.text}
            />
            <TextField
              label="节点信息:"
              value={values.nodeText}
              className={classes.text}
            />
            {values.confirm != null ? (
              <TextField
                label="认定:"
                error={!values.confirm}
                value={values.confirm ? "被认定" : "被否定"}
                className={classes.text}
              />
            ) : null}
            {values.role ? (
              <TextField
                label="来源:"
                value={values.role ? "被告" : "原告"}
                className={classes.text}
              />
            ) : null}
            {values.type ? (
              <TextField
                label="类型:"
                value={values.type}
                className={classes.text}
              />
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
