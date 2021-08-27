import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { v4 } from "uuid";

import TextEditor from "./texteditor";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {/* <Redirect to={`/documents/${v4()}`} /> */}
          <h1>hello</h1>
        </Route>
        <Route path="/documents/:id">
          <TextEditor />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
