import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { noOfRequestsPerYearRequest } from "../../redux/actions/analyticsActions";

const options = {
    title: {
        text: "My chart",
    },
    series: [
        {
            data: [1, 2, 3],
        },
    ],
};

const Analytics = (props) => {
    const dispatch = useDispatch();
    const analyticsState = useSelector((state) => state.analytics);

    React.useEffect(() => {
        if (
            !analyticsState.isFetching &&
            analyticsState.data.length === 0 &&
            analyticsState.error === ""
        ) {
            dispatch(noOfRequestsPerYearRequest(2021));
        }
    }, [analyticsState]);

    return (
        <>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </>
    );
};

export default Analytics;
