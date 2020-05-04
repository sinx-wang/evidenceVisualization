import React from "react";
import PropTypes from "prop-types";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Grid from "@material-ui/core/Grid";
import CustomButton from "components/CustomButtons/Button.js";
import TextField from "@material-ui/core/TextField";
import CropIcon from "@material-ui/icons/Crop";
import EditIcon from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import ListItem from "@material-ui/core/ListItem";
import Edit from "@material-ui/icons/Edit";
import Save from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import DocumentData from "../../util/data/DocumentData";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  textFieldBlock: {
    marginBottom: 10,
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
}));

function FactHeads(props) {
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

function FactsCardContent(props) {
  const classes = useStyles();
  const item = props.item;
  const notEditing = item.factId !== props.editing;
  const [heads, setHeads] = React.useState([]);

  React.useEffect(() => {
    setHeads(JSON.parse(DocumentData.heads));
  }, []);

  return (
    <ListItem>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
            label="单条事实"
            value={item.body}
            fullWidth
            disabled={notEditing}
          />
        </Grid>
        <Grid item xs={1} className={classes.buttonAlign}>
          <CustomButton
            color={notEditing ? "info" : "success"}
            simple
            onClick={() => props.handleClickEdit(item.factId)}
          >
            {notEditing ? <Edit /> : <Save />}
          </CustomButton>
        </Grid>
        <Grid item xs={1} className={classes.buttonAlign}>
          <CustomButton
            color="danger"
            simple
            onClick={() => props.handleClickDelete(item.factId)}
          >
            <DeleteIcon />
          </CustomButton>
        </Grid>
        <Grid item xs={12}>
          <FactHeads heads={heads} />
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default function FactView() {
  const classes = useStyles();

  const [facts, setFacts] = React.useState([]);
  const [editing, setEditing] = React.useState(-1);

  const handleClickSingleEdit = (id) => {
    console.log(id);
    if (id === editing) {
      setEditing(-1);
    } else {
      setEditing(id);
    }
  };

  const handleClickDelete = (id) => {
    setFacts((list) => list.filter((item) => item.factId !== id));
  };

  React.useEffect(() => {
    document.title = "开发测试界面";
    setFacts(JSON.parse(DocumentData.facts));
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader color="warning">事实文本</CardHeader>
            <CardBody>
              <TextField
                fullWidth
                label="请在此输入"
                multiline
                rows={7}
                variant="outlined"
                className={classes.textFieldBlock}
              />
              <CustomButton color="success" style={{ marginRight: 10 }} round>
                <CropIcon />
                分解事实
              </CustomButton>
              <CustomButton color="info" round>
                <EditIcon />
                编辑事实
              </CustomButton>
            </CardBody>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader color="info">事实分解结果</CardHeader>
            <CardBody>
              <List>
                {facts.map((item, index) => (
                  <FactsCardContent
                    key={index}
                    item={item}
                    editing={editing}
                    handleClickEdit={handleClickSingleEdit}
                    handleClickDelete={handleClickDelete}
                  />
                ))}
              </List>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

FactHeads.propTypes = {
  heads: PropTypes.array,
};

FactsCardContent.propTypes = {
  heads: PropTypes.array,
  item: PropTypes.object,
  editing: PropTypes.number,
  handleClickEdit: PropTypes.func,
  handleClickDelete: PropTypes.func,
};
