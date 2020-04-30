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
import PersonIcon from "@material-ui/icons/Person";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
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
}));

function SelectEvidenceType(props) {
  const [type, setType] = React.useState(props.evidenceType);

  const handleSelectType = (event) => {
    setType(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>类型</InputLabel>
      <Select value={type} onChange={handleSelectType}>
        <MenuItem value={0}>书证</MenuItem>
        <MenuItem value={1}>物证</MenuItem>
        <MenuItem value={2}>证言</MenuItem>
      </Select>
    </FormControl>
  );
}

export default function DevelopView() {
  const classes = useStyles();

  // 原告证据
  const [prosecutorDoc, setProsecutorDoc] = React.useState([]);
  // 被告证据
  const [defendantDoc, setDefendantDoc] = React.useState([]);

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
                    {prosecutorDoc.map((item) => (
                      <ListItem key={item.documentId}>
                        <Grid container spacing={2}>
                          <Grid item xs={7}>
                            <TextField
                              label="单条证据"
                              value={item.body}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <SelectEvidenceType evidenceType={item.type} />
                          </Grid>
                          <Grid item xs={2} className={classes.buttonAlign}>
                            <CustomButton color="danger">
                              <Close />
                              不认定
                            </CustomButton>
                          </Grid>
                          <Grid item xs={12}></Grid>
                        </Grid>
                      </ListItem>
                    ))}
                  </List>
                ),
              },
              {
                tabName: "被告",
                tabIcon: PersonOutlineIcon,
                tabContent: (
                  <List>
                    {defendantDoc.map((item) => (
                      <ListItem key={item.documentId}>
                        <Grid container spacing={2}>
                          <Grid item xs={7}>
                            <TextField
                              label="单条证据"
                              value={item.body}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <SelectEvidenceType evidenceType={item.type} />
                          </Grid>
                          <Grid item xs={2} className={classes.buttonAlign}>
                            <CustomButton color="danger">
                              <Close />
                              不认定
                            </CustomButton>
                          </Grid>
                          <Grid item xs={12}></Grid>
                        </Grid>
                      </ListItem>
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
  evidenceType: PropTypes.number,
};
