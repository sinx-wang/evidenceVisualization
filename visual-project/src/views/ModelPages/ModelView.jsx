import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Jtopo from 'jtopo-in-node';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
    canvas:{
        //width:"500px",
        height:'100%',
        border:'solid red 1px'
    },
    paper: {
        padding: theme.spacing(2),
        //textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    rightDiv:{
        border:'solid red 1px',
        float:'right'
    }
}));


// 函数式写法，无class
export default function ModelView() {
  // React Hooks，详见https://zh-hans.reactjs.org/docs/hooks-effect.html
  React.useEffect(() => {
    document.title = "建模";
  });


  // React Hooks，相当于class式写法的state，详见https://zh-hans.reactjs.org/docs/hooks-intro.html
  const [values, setValues] = React.useState({
      nodeText:''//点击节点信息
  });


    const [text, setText] = React.useState('空');



  const initCanvas = ()=>{
      var canvas = document.getElementById("canvas")
      canvas.width=window.innerWidth*0.6
      canvas.height=window.innerHeight*0.5
  };

  const drawCanvas = ()=>{
      var canvas = document.getElementById("canvas")
      var stage =  new Jtopo.Stage(canvas)
      stage.eagleEye.visible = null;

      var scene = new Jtopo.Scene(stage);
      scene.mode='select'
      //scene.background= '1.png';
      //
      var node = createEvidenceNode('证据1', 20 ,20)
      scene.add(node);

      var node1 = createEvidenceLinkNode('链头', 200 , 100)
      scene.add(node1);

      var node2 = createFactLinkNode('链接点', 400 , 100)
      scene.add(node2);

      var node3 = createFactNode('事实', 600 , 100)
      scene.add(node3);


      var link = new Jtopo.Link(node, node1);
      scene.add(link)

      var link2 = new Jtopo.Link(node2, node3);
      scene.add(link2)
  }

    const createEvidenceNode = (text , x , y)=>{
        var node = new Jtopo.Node()
        node.text=text
        node.setLocation(x, y);
        node.dragable = false;
        node.fontColor = '0,0,0';
        //点击事件 显示具体的信息
        node.mousedown(function(){
            setText(text)
        })
        return node
    }

    const createEvidenceLinkNode = (text , x , y)=>{
        var node = new Jtopo.CircleNode()
        node.text=text
        node.setLocation(x, y);
        node.dragable = false;
        node.fontColor = '0,0,0';
        node.fillColor = '0,255,0'
        //点击事件 显示具体的信息
        node.mousedown(function(){
            setText(text)
        })
        return node
    }

    const createFactNode = (text , x , y)=>{
        var node = new Jtopo.Node()
        node.text=text
        node.setLocation(x, y);
        node.dragable = false;
        node.fontColor = '0,0,0';
        //点击事件 显示具体的信息
        node.mousedown(function(){
            setText(text)
        })
        return node
    }

    const createFactLinkNode = (text , x , y)=>{
        var node = new Jtopo.CircleNode()
        node.text=text
        node.setLocation(x, y);
        node.dragable = false;
        node.fontColor = '0,0,0';
        node.fillColor = '0,255,0'
        //点击事件 显示具体的信息
        node.mousedown(function(){
            setText(text)
        })
        return node
    }


  const classes = useStyles();

  return (
    <div >
        <Grid container spacing={3} >
            <Button color="primary" onClick={initCanvas}>初始化Canvas</Button>
            <Button color="primary"  onClick={drawCanvas}>显示节点</Button>
            <Grid item xs={12} >
                <Paper className={classes.paper}>
                    <canvas id='canvas'  className={classes.canvas}  />
                    <div className={classes.rightDiv}>
                        <TextField id="standard-basic" label="节点信息:" value={text} />
                    </div>
                </Paper>
            </Grid>
        </Grid>
    </div>
  );
}
