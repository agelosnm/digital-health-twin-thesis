import './patient.css';
import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import { Line, Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Typography } from '@material-ui/core';
import Grid, { GridSpacing } from '@material-ui/core/Grid';


function Patient({ match }) {
    useEffect(() => {
        fetchPatient();
        fetchFitbitFlexChart();
        fetchHeartrateDataChart();
        fetchScaleDataChart();
    }, []);


    const [patientToots, setPatientToots] = useState([]);
    const [fitbitFlexDatachartData, setFitbitFlexDatachartData] = useState([]);
    const [heartrateDatachartData, setHeartrateDatachartData] = useState([]);
    const [scaleDataChart, setScaleDataChart] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPatient = async () => {
        const data = await fetch(`/auth/doctor/mypatients/${match.params.patient}`);

        const patientToots = await data.json();
        setLoading(true)

        setPatientToots(patientToots);
        console.log(patientToots)

    };

    const fetchFitbitFlexChart = async () => {
        const data = await fetch(`/auth/doctor/mypatients/${match.params.patient}`);

        const patientToots = await data.json();

        let fitbitFlexData = patientToots.filter(content => content.tootData.device === "Fitbit Flex")

        let indexStart = fitbitFlexData.length - 20
        indexStart = indexStart < 0 ? 0 : indexStart;
        let fitbitFlexDatachartData = fitbitFlexData.slice(indexStart, fitbitFlexData.length)

        setFitbitFlexDatachartData(fitbitFlexDatachartData);
    };

    const fetchHeartrateDataChart = async () => {
        const data = await fetch(`/auth/doctor/mypatients/${match.params.patient}`);

        const patientToots = await data.json();

        let heartrateData = patientToots.filter(content => content.tootData.device === "Blood Pressure Monitor")

        let indexStart = heartrateData.length - 20
        indexStart = indexStart < 0 ? 0 : indexStart;
        let heartrateDatachartData = heartrateData.slice(indexStart, heartrateData.length)

        setHeartrateDatachartData(heartrateDatachartData);
    };

    const fetchScaleDataChart = async () => {
        const data = await fetch(`/auth/doctor/mypatients/${match.params.patient}`);

        const patientToots = await data.json();

        let scaleData = patientToots.filter(content => content.tootData.device === "Scale")

        let indexStart = scaleData.length - 20
        indexStart = indexStart < 0 ? 0 : indexStart;
        let scaleDataChart = scaleData.slice(indexStart, scaleData.length)

        setScaleDataChart(scaleDataChart);
    };

    const lineChartfitbitFlex = (

        patientToots.length
            ? (
                <Bar data={{
                    labels: fitbitFlexDatachartData.map(content => content.tootData.time).filter((items, index) => index % 2 === 0),
                    datasets: [{
                        data: fitbitFlexDatachartData.filter(content => content.tootData.measured_data === "Calories burned").map(content => content.tootData.value),
                        backgroundColor: 'rgb(83, 144, 186)',
                        borderColor: 'rgb(83, 144, 186)',
                        fill: false,
                        label: "Measuered Calories",
                        pointRadius: 7
                    }, {
                        data: fitbitFlexDatachartData.filter(content => content.tootData.measured_data === "Steps").map(content => content.tootData.value),
                        backgroundColor: 'rgb(181, 31, 71)',
                        borderColor: 'rgb(181, 31, 71)',
                        fill: false,
                        label: "Measuered Steps",
                        pointRadius: 7
                    }]
                }}
                />) : null
    )

    const lineChartBloodPressureData = (

        patientToots.length
            ? (
                <Bar data={{
                    labels: heartrateDatachartData.map(content => content.tootData.time).filter((items, index) => index % 2 === 0),
                    datasets: [{
                        data: heartrateDatachartData.filter(content => content.tootData.measured_data === "Systolic Blood Pressure").map(content => content.tootData.value),
                        backgroundColor: 'rgb(94, 110, 189)',
                        borderColor: 'rgb(94, 110, 189)',
                        fill: false,
                        label: "Systolic Blood Pressure",
                        pointRadius: 7
                    },
                    {
                        data: heartrateDatachartData.filter(content => content.tootData.measured_data === "Diastolic Blood Pressure").map(content => content.tootData.value),
                        backgroundColor: 'rgb(250, 132, 5)',
                        borderColor: 'rgb(250, 132, 5)',
                        fill: false,
                        label: "Diastolic Blood Pressure",
                        pointRadius: 7
                    }]
                }} />

            ) : null
    )

    const lineChartHeartrateData = (

        patientToots.length
            ? (
                <Line data={{
                    labels: heartrateDatachartData.map(content => content.tootData.time).filter((items, index) => index % 2 === 0),
                    datasets: [{
                        data: heartrateDatachartData.filter(content => content.tootData.measured_data === "Heart rate").map(content => content.tootData.value),
                        backgroundColor: 'rgb(191, 29, 31)',
                        borderColor: 'rgb(191, 29, 31)',
                        fill: false,
                        label: "Beats per minute",
                        pointRadius: 7
                    }]
                }} />

            ) : null
    )

    const lineChartWeightData = (

        patientToots.length
            ? (
                <Line data={{
                    labels: scaleDataChart.map(content => content.tootData.time).filter((items, index) => index % 2 === 0),
                    datasets: [{
                        data: scaleDataChart.filter(content => content.tootData.measured_data === "Weight").map(content => content.tootData.value),
                        backgroundColor: 'rgb(101, 189, 94)',
                        borderColor: 'rgb(101, 189, 94)',
                        fill: false,
                        label: "Weight",
                        pointRadius: 7
                    }]
                }} />

            ) : null
    )

    const lineChartFatMassData = (

        patientToots.length
            ? (
                <Line data={{
                    labels: scaleDataChart.map(content => content.tootData.time).filter((items, index) => index % 2 === 0),
                    datasets: [{
                        data: scaleDataChart.filter(content => content.tootData.measured_data === "Fat Mass").map(content => content.tootData.value),
                        backgroundColor: 'rgb(240, 233, 43)',
                        borderColor: 'rgb(240, 233, 43)',
                        fill: false,
                        label: "Fat Mass",
                        pointRadius: 7
                    }]
                }} />

            ) : null
    )

    const lineChartFatPertData = (

        patientToots.length
            ? (
                <Line data={{
                    labels: scaleDataChart.map(content => content.tootData.time).filter((items, index) => index % 2 === 0),
                    datasets: [{
                        data: scaleDataChart.filter(content => content.tootData.measured_data === "Fat Percentage").map(content => content.tootData.value),
                        backgroundColor: 'rgb(104, 133, 148)',
                        borderColor: 'rgb(104, 133, 148)',
                        fill: false,
                        label: "Fat Percentage",
                        pointRadius: 7
                    }]
                }} />

            ) : null
    )

    const columns = [
        {
            id: 'measured_data',
            label: 'Measured data',
        },
        {
            id: 'value',
            label: 'Value',
        },
        {
            id: 'date',
            label: 'Date',
        },
        {
            id: 'time',
            label: 'Time',
        },
        {
            id: 'device',
            label: 'Device',
        },
        {
            id: 'loinc',
            label: 'LOINC',
        }
    ];


    let rows = [];
    let tableData = {}

    for (let [key, value] of Object.entries(patientToots)) {
        tableData = {
            measured_data: value.tootData.measured_data,
            value: value.tootData.value,
            date: value.tootData.date,
            time: value.tootData.time,
            device: value.tootData.device,
            loinc: value.tootData.loinc_code
        }
        rows.push(tableData)
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    function EnhancedTableHead(props) {
        const { classes, order, orderBy, onRequestSort } = props;
        const createSortHandler = property => event => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    <TableCell />
                    {columns.map(column => (
                        <TableCell
                            key={column.id}
                            align={column.numeric ? "right" : "left"}
                            padding={column.disablePadding ? "none" : "default"}
                            sortDirection={orderBy === column.id ? order : false}
                            style={{ fontWeight: "bold" }}
                        >
                            <TableSortLabel
                                active={orderBy === column.id}
                                direction={orderBy === column.id ? order : "asc"}
                                onClick={createSortHandler(column.id)}
                            >
                                {column.label}
                                {orderBy === column.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === "desc" ? "sorted descending" : "sorted ascending"}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        classes: PropTypes.object.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        order: PropTypes.oneOf(["asc", "desc"]).isRequired,
        orderBy: PropTypes.string.isRequired
    };

    const useStyles = makeStyles(theme => ({
        root: {
            width: "100%",
            borderBottom: "purple"
        },
        paper: {
            width: "100%",
            marginBottom: theme.spacing(2)
        },
        table: {
            minWidth: 750
        },
        visuallyHidden: {
            border: 0,
            clip: "rect(0 0 0 0)",
            height: 1,
            margin: -1,
            overflow: "hidden",
            padding: 0,
            position: "absolute",
            top: 20,
            width: 1
        }
    }));

    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className="patient">
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover tabIndex={-1} >
                                                <TableCell />
                                                <TableCell component="th" scope="row" padding="none">
                                                    {row.measured_data}
                                                </TableCell>
                                                <TableCell>{row.value}</TableCell>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell>{row.time}</TableCell>
                                                <TableCell>{row.device}</TableCell>
                                                <TableCell>{row.loinc}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
                <div class="flex-container">
                    <h3>
                        {"Data last updated at " + patientToots.map(content => content.tootData.date)[patientToots.length - 1]}
                    </h3>
                    <Grid container spacing={10}>
                        <Grid item xs={12} sm={12}>
                            {lineChartfitbitFlex}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {lineChartBloodPressureData}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {lineChartHeartrateData}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {lineChartWeightData}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {lineChartFatMassData}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {lineChartFatPertData}
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}



export default Patient;