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
import Notification from "../../components/Notification/Notification";
import * as Util from "../../util/Util";
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
    color: theme.palette.text.secondary,
  },
  rightDiv: {
    border: "solid red 1px",
    float: "right",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

// 函数式写法，无class
export default function ModelView() {
  const classes = useStyles();

  React.useEffect(() => {
    document.title = "建模";
  });

  const canvasRef = React.useRef(null);

  const [values, setValues] = React.useState({
    nodeText: "", //点击节点信息
  });

  const [text, setText] = React.useState("空");

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
    //
    let node = createEvidenceNode("证据1", 20, 20);
    scene.add(node);

    let node1 = createEvidenceLinkNode("链头", 200, 100);
    scene.add(node1);

    let node2 = createFactLinkNode("链接点", 400, 100);
    scene.add(node2);

    let node3 = createFactNode("事实", 600, 100);
    scene.add(node3);

    let link = new JTopo.Link(node, node1);
    scene.add(link);

    let link2 = new JTopo.Link(node2, node3);
    scene.add(link2);
  };

  const createEvidenceNode = (text, x, y) => {
    let node = new JTopo.Node();
    node.text = text;
    node.setLocation(x, y);
    node.dragable = false;
    node.fontColor = "0,0,0";
    //点击事件 显示具体的信息
    node.mousedown(function () {
      setText(text);
    });
    return node;
  };

  const createEvidenceLinkNode = (text, x, y) => {
    let node = new JTopo.CircleNode();
    node.text = text;
    node.setLocation(x, y);
    node.dragable = false;
    node.fontColor = "0,0,0";
    node.fillColor = "0,255,0";
    //点击事件 显示具体的信息
    node.mousedown(function () {
      setText(text);
    });
    return node;
  };

  const createFactNode = (text, x, y) => {
    let node = new JTopo.Node();
    node.text = text;
    node.setLocation(x, y);
    node.dragable = false;
    node.fontColor = "0,0,0";
    //点击事件 显示具体的信息
    node.mousedown(function () {
      setText(text);
    });
    return node;
  };

  const createFactLinkNode = (text, x, y) => {
    let node = new JTopo.CircleNode();
    node.text = text;
    node.setLocation(x, y);
    node.dragable = false;
    node.fontColor = "0,0,0";
    node.fillColor = "0,255,0";
    //点击事件 显示具体的信息
    node.mousedown(function () {
      setText(text);
    });
    return node;
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
            <TextField id="standard-basic" label="节点信息:" value={text} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
