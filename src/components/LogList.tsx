import React, { useState, useEffect } from 'react';
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import { useRecoilState } from 'recoil';
import logsAtom, { LogLevel, Log } from '../atoms';


const getLevelColor = (level: LogLevel) => {
  switch (level) {
    case 'TRACE':
      return '#34eb8f';
    case 'INFO':
      return '#36eef5';
    case 'DEBUG':
      return '#ffd875';
    case 'WARN':
      return '#fffd87';
    case 'ERROR':
      return '#ff7075';
    case 'FATAL':
      return '#fc5897';
    default:
      return '';
  }
};





const LogList = () => {
  const [logs, setLogs] = useRecoilState(logsAtom);

  const [levelFilter, setLevelFilter] = useState<LogLevel | 'ALL'>('ALL');
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">Logs</Typography>
      <div style={{ margin: '20px 0' }}>
        <InputLabel id="filter">Filter</InputLabel>
        <Select
          value={levelFilter}
          labelId="filter"
          onChange={(e) => setLevelFilter(e.target.value as any)}
        >
          <MenuItem value="ALL">ALL</MenuItem>
          <MenuItem value="INFO">INFO</MenuItem>
          <MenuItem value="TRACE">TRACE</MenuItem>
          <MenuItem value="DEBUG">DEBUG</MenuItem>
          <MenuItem value="WARN">WARN</MenuItem>
          <MenuItem value="ERROR">ERROR</MenuItem>
          <MenuItem value="FATAL">FATAL</MenuItem>
        </Select>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {logs
                .filter((row) => {
                  if (levelFilter === 'ALL') {
                    return true;
                  }
                  return row.level === levelFilter;
                })
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ background: getLevelColor(row.level) }}>
                      {row.level}
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.message}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default LogList;
