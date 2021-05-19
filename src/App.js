import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Following } from "pages/Following";
import { Profile } from "pages/Profile";

function App() {
    const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

    return (
        <div className="max-w-screen-sm  my-0 mx-auto relative box-border">
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route
                        exact
                        path="/following"
                        component={Following}
                    ></Route>
                    <Route exact path="/profile" component={Profile}></Route>
                    <Route exact path="/login" component={Login}></Route>
                    <Route path="*" component={NotFound}></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
