import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSetRecoilState } from 'recoil';
import { logsAtom, Log, LogLevel } from '../atoms';
import { Typography } from '@material-ui/core';

const parseLogs = (logs: string): Log[] => {
  const lines = logs.split('\n').slice(0, -1);
  return lines.map((line) => {
    const [
      date,
      ,
      time,
      ,
      logLevel,
      ,
      number,
      ,
      ,
      ,
      location,
      ...locationRest
    ] = line.split(/(\s+)/);
    const [, message] = locationRest.join(' ').split(':');
    console.log({
      date,
      time,
      logLevel,
      number,
      location,
      message,
    });

    return {
      date,
      time,
      level: logLevel.trim() as LogLevel,
      number,
      location,
      message,
    };
  });
};

const ChooseFile: React.FC = () => {
  const setLogs = useSetRecoilState(logsAtom);

  const onDrop = useCallback(
    (files) => {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = function (evt) {
        const parsed = parseLogs(evt.target?.result as any);
        setLogs(parsed);
      };
    },
    [setLogs]
  );
  const { getInputProps, getRootProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">Choose a file</Typography>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <>
          <div>{isDragActive ? 'Release to drop' : 'Drag file here'}</div>
        </>
      </div>
      <footer>&copy; 2020, Damien Flury</footer>
    </div>
  );
};

export default ChooseFile;
