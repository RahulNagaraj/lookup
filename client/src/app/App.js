import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

import Header from "./Header";
import Home from "./Home";
import Details from "./Details";
import Footer from "./Footer";

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
                        <Route path="/detail">
                            <Details />
                        </Route>
                    </Switch>

                    <Footer />
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
