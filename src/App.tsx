import React from 'react';
import './App.css';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import LogList from './components/LogList';
import { RecoilRoot } from 'recoil';
import ChooseFile from './components/ChooseFile';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <RecoilRoot>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="sticky" style={{ top: 0 }}>
          <Toolbar>
            <Typography variant="h6">Log Viewer</Typography>
            <Link to="/list">
              <Button color="inherit" style={{ color: 'white'}}>List View</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/list">
            <LogList />
          </Route>
          <Route path="/">
            <ChooseFile />
          </Route>
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
