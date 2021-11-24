import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

import Header from "../Header/Header";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";
import ServiceDetails from "../Details/ServiceDetails";
import BusinessDetails from "../Details/BusinessDetails";
import ViewOrder from "../ViewOrder/ViewOrder";
import SignIn from "../Login/SignIn";
import SignUp from "../Login/SignUp";
import Events from "../Events/Events";
import EventDetails from "../Events/EventDetails";
import PrivateRoute from "./PrivateRoute";

const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: blueGrey[400],
            light: blueGrey[200],
            dark: blueGrey[900],
            contrastText: "#FFF",
        },
        secondary: {
            // This is green.A700 as hex.
            main: blueGrey["A200"],
            light: blueGrey["A100"],
            dark: blueGrey["A700"],
            contrastText: "#FFF",
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div>
                    <Header />

                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/signin">
                            <SignIn />
                        </Route>
                        <Route path="/signup">
                            <SignUp />
                        </Route>
                        <Route path="/service-detail">
                            <ServiceDetails />
                        </Route>
                        <Route path="/business-detail">
                            <BusinessDetails />
                        </Route>
                        <Route path="/view-order">
                            <ViewOrder />
                        </Route>
                        <PrivateRoute path="/events">
                            <Events />
                        </PrivateRoute>
                        <PrivateRoute path="/event-detail">
                            <EventDetails />
                        </PrivateRoute>
                        <PrivateRoute path="/analytics" adminOnly>
                            <ViewOrder />
                        </PrivateRoute>
                    </Switch>

                    <Footer />
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
