import * as React from "react";
import { Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import PieChartIcon from "@mui/icons-material/PieChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import MultilineChartIcon from "@mui/icons-material/MultilineChart";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import DomainIcon from "@mui/icons-material/Domain";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";

import {
    cityVsTypeOfRequestsRequest,
    noOfRequestsPerYearRequest,
    typeOfRequestsRequest,
    zipcodeVsNoOfRequestsRequest,
    mostInfluentialBusinessesRequest,
    mostInfluentialCommunityRequest,
    mostInfluentialPeopleRequest,
} from "../../redux/actions/analyticsActions";
import Drawer, { DRAWER_ITEMS } from "./Drawer";
import InfluentialTable from "./InfluentialTable";

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
    if (name === DRAWER_ITEMS[0]) {
        return <BarChartIcon />;
    } else if (name === DRAWER_ITEMS[1]) {
        return <PieChartIcon />;
    } else if (name === DRAWER_ITEMS[2]) {
        return <InsertChartIcon />;
    } else if (name === DRAWER_ITEMS[3]) {
        return <MultilineChartIcon />;
    } else if (name === DRAWER_ITEMS[4]) {
        return <StoreIcon />;
    } else if (name === DRAWER_ITEMS[5]) {
        return <PeopleIcon />;
    } else if (name === DRAWER_ITEMS[6]) {
        return <DomainIcon />;
    }
};

const Analytics = (props) => {
    const dispatch = useDispatch();
    const analyticsState = useSelector((state) => state.analytics);

    const [chartSelected, setChartSelected] = React.useState(DRAWER_ITEMS[0]);

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
        if (name === DRAWER_ITEMS[0]) {
            dispatch(noOfRequestsPerYearRequest(2021));
        } else if (name === DRAWER_ITEMS[1]) {
            dispatch(typeOfRequestsRequest());
        } else if (name === DRAWER_ITEMS[2]) {
            dispatch(zipcodeVsNoOfRequestsRequest());
        } else if (name === DRAWER_ITEMS[3]) {
            dispatch(cityVsTypeOfRequestsRequest());
        } else if (name === DRAWER_ITEMS[4]) {
            dispatch(mostInfluentialBusinessesRequest());
        } else if (name === DRAWER_ITEMS[5]) {
            dispatch(mostInfluentialPeopleRequest());
        } else if (name === DRAWER_ITEMS[6]) {
            dispatch(mostInfluentialCommunityRequest());
        }
    };

    const renderHighCharts = () => {
        if (
            chartSelected === DRAWER_ITEMS[0] &&
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
            chartSelected === DRAWER_ITEMS[1] &&
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
            chartSelected === DRAWER_ITEMS[2] &&
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
            chartSelected === DRAWER_ITEMS[3] &&
            Object.keys(analyticsState.data).length > 0
        ) {
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
        } else if (
            chartSelected === DRAWER_ITEMS[4] &&
            Object.keys(analyticsState.data).length > 0
        ) {
            const cols = Object.keys(analyticsState.data[0].business)
                .filter((col) => col !== "id")
                .concat("count");
            const rows = analyticsState.data.map((data) => ({
                ...data.business,
                count: data.count,
            }));
            return <InfluentialTable columns={cols} rows={rows} />;
        } else if (
            chartSelected === DRAWER_ITEMS[5] &&
            Object.keys(analyticsState.data).length > 0
        ) {
            const cols = Object.keys(analyticsState.data[0].user)
                .filter((col) => col !== "id")
                .concat("count");
            const rows = analyticsState.data.map((data) => ({
                ...data.user,
                count: data.count,
            }));
            return <InfluentialTable columns={cols} rows={rows} />;
        } else if (
            chartSelected === DRAWER_ITEMS[6] &&
            Object.keys(analyticsState.data).length > 0
        ) {
            const cols = Object.keys(analyticsState.data[0]);
            const rows = analyticsState.data;
            return <InfluentialTable columns={cols} rows={rows} />;
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
