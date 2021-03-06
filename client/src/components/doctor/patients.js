import React from 'react'
import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { Grid, Card, CardHeader, CardContent, CardMedia, Typography, TextField } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import * as ReactBootStrap from 'react-bootstrap';
import './patients.css';

function Patients() {

    useEffect(() => {
        fetchPatients();
    }, []);


    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchFilter, setSearchFilter] = useState([]);

    const fetchPatients = async () => {
        const data = await fetch('/api/auth/doctor/mypatients');

        const patients = await data.json();
        setLoading(true)

        setPatients(patients);
    };

    const useStyles = makeStyles({
        container: {
            paddingTop: "20px",
            paddingLeft: "50px",
            paddingRight: "50px"
        },
        card: {
            backgroundColor: "#c0caca"
        },
        cardHeader: {
            marginRight: "12%",
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "1px"
        },
        cardContent: {
            textAlign: "center"
        },
        avatar: {
            backgroundColor: "#3f51b58f",
        },
        searchContainer: {
            display: "flex",
            justifyContent: "center",
            marginBottom: "5%"
        },
        searchIcon: {
            alignSelf: "flex-end",
            margin: "5px",

        },
        searchTextfield: {
            '& label.Mui-focused': {
                color: '#34cfa3',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: '#34cfa3',
            },
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                    borderColor: '#34cfa3',
                },
            },
        }
    })

    function formatDate(lastTootDate) {

        if (lastTootDate == null) {
            return ""
        }
        else {
            let date = lastTootDate.split('T')[0]
            let time = lastTootDate.split('T')[1].split('.')[0] + " (UTC)"

            return date + " " + time
        }
    }

    const getPatientCard = (patient) => {
        return (
            < Grid item xs={12} sm={4} key={patient.id} >
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {patient.username[0].toUpperCase()}
                            </Avatar>
                        }
                        titleTypographyProps={{ variant: 'title' }}
                        title={patient.username.toUpperCase()}
                        className={classes.cardHeader}
                    />
                    <CardMedia
                        className={classes.cardMedia}
                        title={patient.username}
                    />
                    <Link underline="none" component={RouterLink} to={`/dht/mypatients/${patient.username}`}>
                        <img src={patient.avatar} style={{ width: "100%" }} />
                    </Link>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="p">
                            Total toots: {patient.statuses_count}
                        </Typography>
                    </CardContent>
                    <hr></hr>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="p">
                            Last active: {formatDate(patient.last_status_at)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid >
        );
    };

    const handleSearchChange = (e) => {
        setSearchFilter(e.target.value);
    }

    const classes = useStyles();

    return (
        <div className="patients">
            <h2> My Patients </h2>
            {loading ? (
                <div>
                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon} />
                        <TextField className={classes.searchTextfield} label="Search user" onChange={handleSearchChange} variant="standard" />
                    </div>

                    <Grid container spacing={6} className={classes.container}>
                        {patients.map(patient =>
                            patient.username.includes(searchFilter) &&
                            getPatientCard(patient))}
                    </Grid>
                </div>) : (
                    <ReactBootStrap.Spinner animation="border" />
                )}

        </div >


    );


}

export default Patients;