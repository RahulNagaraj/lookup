import * as React from "react";
import { Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import PieChartIcon from "@mui/icons-material/PieChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import MultilineChartIcon from "@mui/icons-material/MultilineChart";
import InsertChartIcon from "@mui/icons-material/InsertChart";

import {
    cityVsTypeOfRequestsRequest,
    noOfRequestsPerYearRequest,
    typeOfRequestsRequest,
    zipcodeVsNoOfRequestsRequest,
} from "../../redux/actions/analyticsActions";
import Drawer from "./Drawer";

let option1 = {
    chart: {
        type: "column",
    },
    title: {
        text: "Number of Service Requests Per Year",
    },
    accessibility: {
        announceNewData: {
            enabled: true,
        },
    },
    xAxis: {
        type: "category",
    },
    yAxis: {
        title: {
            text: "Number of Service Requests",
        },
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
            },
        },
    },
    legend: {
        enabled: false,
    },
    series: [
        {
            name: "Requests",
            colorByPoint: true,
            data: [],
        },
    ],
};

let option2 = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
    },
    title: {
        text: "Type of Service Requests",
    },
    tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
                enabled: true,
            },
        },
    },
    series: [
        {
            name: "Share",
            colorByPoint: true,
            data: [],
        },
    ],
};

let option3 = {
    chart: {
        type: "column",
    },
    title: {
        text: "Zipcode vs Number of Service Requests",
    },
    accessibility: {
        announceNewData: {
            enabled: true,
        },
    },
    xAxis: {
        type: "category",
    },
    yAxis: {
        title: {
            text: "Number of Service Requests",
        },
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
            },
        },
    },
    legend: {
        enabled: false,
    },
    series: [
        {
            name: "Requests",
            colorByPoint: true,
            data: [],
        },
    ],
};

let option4 = {
    chart: {
        type: "column",
    },
    title: {
        text: "City vs Type of Service Requests",
    },
    xAxis: {
        categories: [],
        crosshair: true,
    },
    yAxis: {
        min: 0,
        title: {
            text: "Number of Service Requests",
        },
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0,
        },
    },
    series: [],
};

const getIcon = (name) => {
    if (name === "Number of Requests Per Year") {
        return <BarChartIcon />;
    } else if (name === "Type of Requests") {
        return <PieChartIcon />;
    } else if (name === "Zipcode - Number of Requests") {
        return <InsertChartIcon />;
    } else if (name === "City - Service Type") {
        return <MultilineChartIcon />;
    }
};

const Analytics = (props) => {
    const dispatch = useDispatch();
    const analyticsState = useSelector((state) => state.analytics);

    const [chartSelected, setChartSelected] = React.useState(
        "Number of Requests Per Year"
    );

    React.useEffect(() => {
        if (
            !analyticsState.isFetching &&
            analyticsState.data.length === 0 &&
            analyticsState.error === ""
        ) {
            dispatch(noOfRequestsPerYearRequest(2021));
        }
    }, [analyticsState, chartSelected, setChartSelected]);

    const handleDrawerButtonClick = (name) => {
        setChartSelected(name);
        if (name === "Number of Requests Per Year") {
            dispatch(noOfRequestsPerYearRequest(2021));
        } else if (name === "Type of Requests") {
            dispatch(typeOfRequestsRequest());
        } else if (name === "Zipcode - Number of Requests") {
            dispatch(zipcodeVsNoOfRequestsRequest());
        } else if (name === "City - Service Type") {
            dispatch(cityVsTypeOfRequestsRequest());
        }
    };

    const renderHighCharts = () => {
        console.log(chartSelected);
        if (
            chartSelected === "Number of Requests Per Year" &&
            analyticsState.data.length > 0
        ) {
            option1.series[0].data = analyticsState.data;
            return (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={option1}
                    allowChartUpdate={true}
                    immutable={true}
                    updateArgs={[true, true, true]}
                />
            );
        } else if (
            chartSelected === "Type of Requests" &&
            analyticsState.data.length > 0
        ) {
            option2.series[0].data = analyticsState.data;
            return (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={option2}
                    allowChartUpdate={true}
                    immutable={true}
                    updateArgs={[true, true, true]}
                />
            );
        } else if (
            chartSelected === "Zipcode - Number of Requests" &&
            analyticsState.data.length > 0
        ) {
            option3.series[0].data = analyticsState.data;
            return (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={option3}
                    allowChartUpdate={true}
                    immutable={true}
                    updateArgs={[true, true, true]}
                />
            );
        } else if (
            chartSelected === "City - Service Type" &&
            Object.keys(analyticsState.data).length > 0
        ) {
            console.log(option4);
            option4.xAxis.categories = analyticsState.data.serviceTypes;
            option4.series = analyticsState.data.series;
            return (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={option4}
                    allowChartUpdate={true}
                    immutable={true}
                    updateArgs={[true, true, true]}
                />
            );
        }
    };

    return (
        <Box>
            <Grid container spacing={1}>
                <Grid item sm={2}>
                    <Drawer
                        handleDrawerButtonClick={handleDrawerButtonClick}
                        getIcon={getIcon}
                        chartSelected={chartSelected}
                    />
                </Grid>
                <Grid item sm={10}>
                    <Box sx={{ m: 2, p: 2 }}>{renderHighCharts()}</Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Analytics;
