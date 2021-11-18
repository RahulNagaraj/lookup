import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { signInRequest, signUpRequest } from "../../redux/actions/userActions";

class Head extends Component {
    componentDidMount() {
        // this.props.signUp({
        //     firstName: "RN",
        //     lastName: "M",
        //     email: "rvimud@g.com",
        //     password: "1234567890abcd",
        // });

        this.props.signIn({
            email: "rvimud@g.com",
            password: "1234567890abcd",
        });
    }

    render() {
        return <>Head</>;
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            signUp: signUpRequest,
            signIn: signInRequest,
        },
        dispatch
    );

export default connect(null, mapDispatchToProps)(Head);
