import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import App from './App';
import Admin from "./admin";

import Home from './components/Content/index';
import NotFind from "./components/notFind";

const Router1 = () => {
    return (
        <div>
            <Router>
                <App>
                    <Switch>
                        <Route path="/" render={() =>
                            <Admin>
                                <Switch>
                                    <Route exact={true} path="/" component={Home} />
                                    <Route exact={true} path="/Home" component={Home} />
                                    <Route component={NotFind}/>
                                </Switch>
                            </Admin>
                        } />
                    </Switch>
                </App>
            </Router>
        </div>
    );
}

export default Router1;