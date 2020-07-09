import React, { useState } from 'react';
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
import { LogLevel, logsAtom } from '../atoms';
import { useRecoilValue } from 'recoil';
import { Pie } from 'react-chartjs-2';

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
  const logs = useRecoilValue(logsAtom);

  const [levelFilter, setLevelFilter] = useState<LogLevel | 'ALL'>('ALL');
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">Logs</Typography>
      <div>
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
        <div style={{ display: 'flex' }}>
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
                        <TableCell
                          style={{ background: getLevelColor(row.level) }}
                        >
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
          <div style={{ width: '600px' }}>
            <Pie
              data={{
                labels: ['Trace', 'Info', 'Debug', 'Warn', 'Error', 'Fatal'],
                datasets: [
                  {
                    label: 'Logs',
                    data: [
                      logs.filter((log) => log.level === 'TRACE').length,
                      logs.filter((log) => log.level === 'INFO').length,
                      logs.filter((log) => log.level === 'DEBUG').length,
                      logs.filter((log) => log.level === 'WARN').length,
                      logs.filter((log) => log.level === 'ERROR').length,
                      logs.filter((log) => log.level === 'FATAL').length,
                    ],
                    backgroundColor: [
                      getLevelColor('TRACE'),
                      getLevelColor('INFO'),
                      getLevelColor('DEBUG'),
                      getLevelColor('WARN'),
                      getLevelColor('ERROR'),
                      getLevelColor('FATAL'),
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogList;
