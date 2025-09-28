import { UsersProps } from '../../data/users/usersInterface';
import { ShipmentData } from '../../data/binData/shipmentTableInterface'

type userId = UsersProps['id'];
type userName = UsersProps['userName'];
type binName = ShipmentData['bin'];

export interface LogEntry {
    userId: userId;
    userName: userName;
    binName: binName;
    action: '増加' | '減少' | '更新';
    key: string;
    diff: number | boolean;
    timestamp?: any;
}