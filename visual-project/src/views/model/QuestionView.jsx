import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height:'100%'
    },
    paper2: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height:150
    },

    label:{
        fontSize:15,
        float:'left',
    },
    textField:{
        width:'90%',
        float:'left',
        marginTop:5,
        //border:'solid red 2px',
        maxHeight:'40%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
    button:{
        height:50,
        marginTop:theme.spacing(1),
        marginLeft:60,
        minWidth:120
    },
    leftDiv:{
        width:'50%',
        //border:'solid red 2px',
        height:70,
        float:'left'
    },
    conflictDiv:{
        height:60
    },

    bottomTextField:{
        width:'50%',
        float:'left',
        marginTop:5,
        //border:'solid red 2px',
        maxHeight:50
    },
    border:{
        height:'100%',
    },

}));

// 函数式写法，无class
export default function QuestionView() {

  // React Hooks，详见https://zh-hans.reactjs.org/docs/hooks-effect.html
  React.useEffect(() => {
    document.title = "质证采信";
  });

  // React Hooks，相当于class式写法的state，详见https://zh-hans.reactjs.org/docs/hooks-intro.html
  const [values, setValues] = React.useState({
      evidenceList:[{id:1,content:'xxxx',type:1},
                    {id:2,content:'xxxxxxx',type:1}], //非矛盾证据
      evidenceFlags:[false,false], //采信与否集合 需要在加载数据的时候进行初始化
      conflictEvidenceList:[
          {
              complainant:{id:1,content:'xxxx',type:1},
              defendant:{id:2,content:'xxxxxxx',type:1}
          }
      ]

  });
  const classes = useStyles();

  //矛盾证据选择radio
    const handleRadioChange = (event) => {
        alert(event.target.value);
    };


  //更改证据的类型
    const handleTypeChange = index  => event =>{
        let newEvidenceList = values.evidenceList
        newEvidenceList[index].type=event.target.value
        setValues({ ...values, evidenceList: newEvidenceList });
    };

    const handleButtonClick = index => event =>{
        let flags = values.evidenceFlags
        flags[index] = !flags[index]
        setValues({ ...values, evidenceFlags: flags })
    };

    return (
      <div className={classes.root}>
          <Grid container spacing={3}>
              <Grid item xs={12}>
                  <Paper className={classes.paper}>
                      <label className={classes.label}>非矛盾证据:</label><br/><br/>
                      {
                          values.evidenceList.map((evidenceItem,index)=>(
                              <div  key={evidenceItem.id}>
                                  <div className={classes.leftDiv}>
                                      <TextField id="outlined-basic"
                                                 variant="outlined"
                                                 className={classes.textField}
                                                 value={evidenceItem.content}/>


                                  </div>

                                  <FormControl variant="outlined" className={classes.formControl}>
                                      <InputLabel htmlFor="outlined-age-native-simple">证据类型</InputLabel>
                                      <Select
                                          native
                                          onChange={handleTypeChange(index)}
                                          label="类型"
                                          inputProps={{
                                              name: '证据类型',
                                              id: 'outlined-age-native-simple',
                                          }}
                                      >
                                          <option value={1}>书证</option>
                                          <option value={2}>类型2</option>
                                      </Select>
                                  </FormControl>

                                  <Button variant="contained"
                                          className={classes.button}
                                          onClick={handleButtonClick(index)}
                                          color={values.evidenceFlags[index]===true ? 'secondary':'primary'}
                                  >
                                      {values.evidenceFlags[index]===true ? '不采信':'采信'}
                                  </Button>

                              </div>
                          ))
                      }
                  </Paper>
              </Grid>



              <Grid item xs={12}>
                  <Paper className={classes.paper}>
                      <label className={classes.label}>矛盾证据:</label><br/>
                      {
                          values.conflictEvidenceList.map((item)=>(
                              <Grid style={{margin:'0 auto' }} item xs={10}>
                                  <Paper className={classes.paper2}>
                                      <div  style={{width:'50%',float:'left'}}>
                                          <div className={classes.conflictDiv}>
                                              <label style={{float:'left'}}>原告方：</label>
                                              <TextField id="outlined-basic"
                                                         variant="outlined"
                                                         className={classes.bottomTextField}
                                                         value={item.complainant.content}/>
                                          </div>
                                          <div className={classes.conflictDiv}>
                                              <label style={{float:'left'}}>被告方：</label>
                                              <TextField id="outlined-basic"
                                                         variant="outlined"
                                                         className={classes.bottomTextField}
                                                         value={item.defendant.content}/>
                                          </div>

                                      </div>

                                      <div  style={{width:'20%',float:'left'}}>
                                          <FormControl variant="outlined" className={classes.formControl}>
                                              <InputLabel htmlFor="outlined-age-native-simple">证据类型</InputLabel>
                                              <Select
                                                  native

                                                  label="类型"
                                                  inputProps={{
                                                      name: '证据类型',
                                                      id: 'outlined-age-native-simple',
                                                  }}
                                              >
                                                  <option value={1}>书证</option>
                                                  <option value={2}>类型2</option>
                                              </Select>
                                              <Select
                                                  native

                                                  label="类型"
                                                  inputProps={{
                                                      name: '证据类型',
                                                      id: 'outlined-age-native-simple',
                                                  }}
                                              >
                                                  <option value={1}>书证</option>
                                                  <option value={2}>类型2</option>
                                              </Select>
                                          </FormControl>

                                      </div>

                                      <div className={classes.border} style={{float:'left',width:'20%',marginTop:10}}>
                                          <FormControl component="fieldset">
                                              <FormLabel component="legend"></FormLabel>
                                              <RadioGroup aria-label="gender"  onChange={handleRadioChange}>
                                                  <FormControlLabel value="原告" control={<Radio />} label="采信" />
                                                  <FormControlLabel value="被告" control={<Radio />} label="采信" />
                                              </RadioGroup>
                                          </FormControl>

                                      </div>

                                          {/*<div className={classes.conflictDiv}>*/}
                                              {/*<label style={{float:'left'}}>原告方：</label>*/}
                                              {/*<TextField id="outlined-basic"*/}
                                                         {/*variant="outlined"*/}
                                                         {/*className={classes.bottomTextField}*/}
                                                         {/*value={item.complainant.content}/>*/}
                                          {/*</div>*/}

                                          {/*<div className={classes.conflictDiv}>*/}
                                              {/*<label style={{float:'left'}}>被告方：</label>*/}
                                              {/*<TextField id="outlined-basic"*/}
                                                         {/*variant="outlined"*/}
                                                         {/*className={classes.bottomTextField}*/}
                                                         {/*value={item.defendant.content}/>*/}
                                          {/*</div>*/}

                                  </Paper>
                              </Grid>
                          ))
                      }

                  </Paper>
              </Grid>
          </Grid>

      </div>
         );
}
