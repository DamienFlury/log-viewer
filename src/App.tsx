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
import { useRecoilValue } from 'recoil';
import ChooseFile from './components/ChooseFile';
import { BrowserRouter, Link } from 'react-router-dom';
import { areThereLogs } from './atoms';


function App() {
  const anyLogs = useRecoilValue(areThereLogs);
  return (
    <div>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="sticky" style={{ top: 0 }}>
          <Toolbar>
            <Typography variant="h6">Log Viewer</Typography>
          </Toolbar>
        </AppBar>
        {/* <Switch>
          <Route path="/list">
            <LogList />
          </Route>
          <Route path="/">
            <ChooseFile />
          </Route>
        </Switch> */}
        {anyLogs ? <LogList /> : <ChooseFile />}
      </BrowserRouter>
    </div>
  );
}

export default App;
