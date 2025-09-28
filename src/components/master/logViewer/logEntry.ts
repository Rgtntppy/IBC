import { LogEntry } from "../../../firebase/saveLogData/logEntry";

type userId   = LogEntry['userId'];
type userName = LogEntry['userName'];
type binName  = LogEntry['binName'];
type key      = LogEntry['key'];
type diff     = LogEntry['diff'];

export interface LogViewerProps {
    id: string;
    userId: userId;
    userName: userName;
    binName: binName;
    key: key;
    diff: diff;
    action: string;
    timestamp?: { seconds: number; nanoseconda: number };
}

export interface LogViewerbtnProps {
    handleclose: () => void;
}