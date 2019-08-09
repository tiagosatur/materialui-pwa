import React, { useState } from 'react';

import { SnackbarProvider, useSnackbar } from 'notistack';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MultiSelect from '../components/MultiSelect';
import {
    Divider,
    Grid,
    makeStyles,
    Container,
    Card,
    Modal,
    Button,
    TextField,
    Typography,
    Checkbox,
    FormControlLabel
} from '@material-ui/core';

import {
    plainOptionsJob,
    plainOptionsObsType,
    plainOptionsInsecurity,
    plainOptionsPeopleReaction,
    plainOptionsEPI,
} from '../constants/checkboxes';

const MaterialUi = () => {

    //Modal
    function rand() {
        return Math.round(Math.random() * 20) - 10;
    }
      
    function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();    
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
  
    const useStyles = makeStyles(theme => ({
        modal: {
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 4),
            position: 'absolute',
            width: 520,
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            marginBottom: '32px',
            padding: theme.spacing(2, 4, 4),
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
        },
        w100: {
            width: '100%',
        },
    }));

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    function rand() {
        return Math.round(Math.random() * 20) - 10;
      }
      
    function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();
    
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    //Sack Notification bar

    const action = (key, ...props) => (
        <>
            <Button onClick={() => { props.closeSnackbar(key) }}>
                {'Dismiss'}
            </Button>
        </>
    );

    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {
        enqueueSnackbar('I love snacks.', { action });
    };

    const handleClickVariant = variant => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('This is a warning message!', { variant });
    };

    //Date Picker
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));  

    function handleDateChange(date) {
      setSelectedDate(date);
    }

    //CHECKBOXES
    const [state, setState] = useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
    });
    
    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
      };


    return (
        <Container fixed style={{background: '#f0f2f5'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h2>Material UI</h2>    
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.paper}>
                        <Button variant="contained" color="primary" onClick={handleOpen}>
                            Abrir modal
                        </Button>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={isModalOpen}
                            onClose={handleClose}
                        >
                            <div style={modalStyle} className={classes.modal}>
                                <h2 id="simple-modal-title">Text in a modal</h2>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <TextField
                                        id="standard-name"
                                        label="Name"
                                        className='d-block'
                                        value=''
                                        onChange={() => {}}
                                        margin="normal"
                                    />
                                    <Button variant="contained" color="success" onClick={handleClose}>
                                        Confirmar
                                    </Button>
                                </form>
                            </div>
                        </Modal>
                        <Button variant="outlined"  onClick={handleClickVariant('success')}>Success snackbar</Button>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="mui-pickers-date"
                                label="Selecione a data"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                className='d-block'
                            />
                        </MuiPickersUtilsProvider>
                        <MultiSelect />
                    </Card>
                    <Card className={classes.paper}>
                        <h4>CARTÃO DE OBSERVAÇÃO POP</h4>
                        <Grid container >
                            <Grid item md className={classes.column}>
                                {Object.values(plainOptionsJob).map((key) => (
                                    <FormControlLabel
                                        control={
                                        <Checkbox
                                            //checked={checkedA}
                                            onChange={handleChange(key)}
                                            value={key}
                                            color="primary"
                                        />
                                        }
                                        label={key}
                                    />
                                ))}
                            </Grid>
                            <Grid item md className={classes.column}>
                                {Object.values(plainOptionsObsType).map((key) => (
                                    <FormControlLabel
                                        control={
                                        <Checkbox
                                            //checked={checkedA}
                                            onChange={handleChange(key)}
                                            value={key}
                                            color="primary"
                                        />
                                        }
                                        label={key}
                                    />
                                ))}
                            </Grid>

                            <Divider light />

                            <Grid item>
                                {Object.values(plainOptionsInsecurity).map((key) => (
                                    <FormControlLabel
                                        control={
                                        <Checkbox
                                            //checked={checkedA}
                                            onChange={handleChange(key)}
                                            value={key}
                                            color="primary"
                                        />
                                        }
                                        label={key}
                                    />
                                ))}
                            </Grid>
                        </Grid>
                    </Card>
                    <Grid container spacing={2}>
                        <Grid item md>
                            <Typography variant="h6" gutterBottom>
                                Reações das Pessoas
                            </Typography>
                            <Card className={`${classes.column} ${classes.paper} `}>
                                {Object.values(plainOptionsPeopleReaction).map((key) => (
                                    <FormControlLabel
                                        control={
                                        <Checkbox
                                            //checked={checkedA}
                                            onChange={handleChange(key)}
                                            value={key}
                                            color="primary"
                                        />
                                        }
                                        label={key}
                                    />
                                ))}
                            </Card>
                        </Grid>

                        <Grid item md>
                            <Typography variant="h6" gutterBottom>
                                Equipamentos de Proteção Individual
                            </Typography>
                            <Card className={`${classes.column} ${classes.paper} `}>
                                {Object.values(plainOptionsEPI).map((key) => (
                                    <FormControlLabel
                                        control={
                                        <Checkbox
                                            //checked={checkedA}
                                            onChange={handleChange(key)}
                                            value={key}
                                            color="primary"
                                        />
                                        }
                                        label={key}
                                    />
                                ))}
                            </Card>
            
                        </Grid>
                    </Grid>
                    
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Preencha este Relatório de Observação
                    </Typography>
                    <Card className={classes.paper}>
                        <TextField
                            defaultValue='Caffeine blue mountain single origin et viennese cortado caffeine. Spoon at cultivar so, con panna, and java trifecta aftertaste cinnamon. Blue mountain variety turkish single origin as grinder strong to go.'
                            onChange={() => {}}
                            multiline={true}
                            className={classes.w100}
                        />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
  }
  
  export default MaterialUi;