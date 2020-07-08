import { atom } from 'recoil';
export type LogLevel = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';

export type Log = {
  date: string;
  level: LogLevel;
  number: string;
  location: string;
  message: string;
};

const logsAtom = atom<Log[]>({
  key: 'logs',
  default: [],
});

export default logsAtom;
