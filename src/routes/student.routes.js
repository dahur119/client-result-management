import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const StudentRoute = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={RegisterStudent} />
        <Route path="/view-result" component={ViewResult} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </Router>
  );
};

export default StudentRoute;
