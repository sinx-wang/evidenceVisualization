import React from "react";
import creatEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  canvas: {
    height: 500,
  },
}));

export default function DevelopView() {
  const classes = useStyles();
  const engine = creatEngine();

  const node1 = new DefaultNodeModel({
    name: "Node 1",
    color: "rgb(192, 192, 255)",
  });
  node1.setPosition(100, 100);
  let port1 = node1.addOutPort("out");

  const node2 = new DefaultNodeModel({
    name: "Node 2",
    color: "rgb(0, 192, 0)",
  });
  node2.setPosition(400, 100);
  let port2 = node2.addInPort("in");

  const link = port1.link(port2);
  link.addLabel("Hello world");

  const model = new DiagramModel();
  model.addAll(node1, node2, link);
  engine.setModel(model);

  return (
    <div className={classes.root}>
      111
      <CanvasWidget className={classes.canvas} engine={engine} />
    </div>
  );
}
