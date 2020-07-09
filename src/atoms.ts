import { atom, selector } from 'recoil';
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

const areThereLogs = selector<boolean>({
  key: 'are-there-logs',
  get: ({ get }) => {
    const logs = get(logsAtom);
    return logs.length > 0;
  }
})

export {areThereLogs, logsAtom}

