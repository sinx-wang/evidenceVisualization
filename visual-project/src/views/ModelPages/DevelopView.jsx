import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import CustomButton from "components/CustomButtons/Button.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import PersonIcon from "@material-ui/icons/Person";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Edit from "@material-ui/icons/Edit";
import Save from "@material-ui/icons/Save";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import DocumentData from "../../util/data/DocumentData";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

function EvidenceHeads(props) {
  const classes = useStyles();

  const array = props.heads;

  return (
    <Paper component="ul" variant="outlined" className={classes.headPaper}>
      {array.map((data) => (
        <li key={data.key}>
          <Chip
            label={data.label}
            variant="outlined"
            color="primary"
            className={classes.chip}
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
        <Grid item xs={6}>
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
            color="info"
            simple
            onClick={() => props.handleClickEdit(item.documentId)}
          >
            {notEditing ? <Edit /> : <Save />}
          </CustomButton>
        </Grid>
        <Grid item xs={2} className={classes.buttonAlign}>
          <CustomButton
            color={props.agree ? "success" : "danger"}
            onClick={() =>
              props.handleClickAgree(props.position, props.prosecutor)
            }
          >
            {props.agree ? <Check /> : <Close />}
            {props.agree ? "认定" : "不认定"}
          </CustomButton>
        </Grid>
        <Grid item xs={12}>
          <EvidenceHeads heads={heads} />
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default function DevelopView() {
  const classes = useStyles();

  // 原告证据
  const [prosecutorDoc, setProsecutorDoc] = React.useState([]);
  // 被告证据
  const [defendantDoc, setDefendantDoc] = React.useState([]);

  const [editing, setEditing] = React.useState(-1);

  const handleClickEdit = (id) => {
    if (id === editing) {
      setEditing(-1);
    } else {
      setEditing(id);
    }
  };

  const handleClickAgree = (index, isProsecutor) => {
    console.log(index);
    let array = [];
    if (isProsecutor) {
      array = [...prosecutorDoc];
      array[index].agree = !prosecutorDoc[index].agree;
      console.log(array);
      setProsecutorDoc(array);
    } else {
      array = [...defendantDoc];
      array[index].agree = !defendantDoc[index].agree;
      setDefendantDoc(array);
    }
  };
  // const handleProDocChange =

  React.useEffect(() => {
    setProsecutorDoc(JSON.parse(DocumentData.documents));
    setDefendantDoc(JSON.parse(DocumentData.documents));
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
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
                    {prosecutorDoc.map((item, index) => (
                      <EvidenceTabContent
                        key={index}
                        position={index}
                        item={item}
                        editing={editing}
                        prosecutor
                        handleClickEdit={handleClickEdit}
                        handleClickAgree={handleClickAgree}
                      />
                    ))}
                  </List>
                ),
              },
              {
                tabName: "被告",
                tabIcon: PersonOutlineIcon,
                tabContent: (
                  <List>
                    {defendantDoc.map((item, index) => (
                      <EvidenceTabContent
                        key={index}
                        position={index}
                        item={item}
                        editing={editing}
                        prosecutor={false}
                        handleClickEdit={handleClickEdit}
                        handleClickAgree={handleClickAgree}
                      />
                    ))}
                  </List>
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
  handleClickAgree: PropTypes.func,
};
