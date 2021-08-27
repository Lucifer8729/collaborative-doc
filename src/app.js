import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { uuid } from "uuidv4";

import TextEditor from "./texteditor";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to={`/documents/${uuid()}`} />
        </Route>
        <Route path="/documents/:id">
          <TextEditor />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
