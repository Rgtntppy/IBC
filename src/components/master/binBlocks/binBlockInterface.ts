import { ShipmentData } from '../../../data/binData/shipmentTableInterface';
import { UsersProps } from '../../../data/users/usersInterface';

type role = UsersProps['role'];
type userAuthority = UsersProps['userAuthority'];

export interface BinBlockProps {
    row: ShipmentData;
    onChange: (id: number, field: 'today' | 'tomorrow', delta: number) => void;
    onCheckboxToggle: (id: number, key: 'isLargeDrumToday' | 'isLargeDrumTomorrow') => void;
    role: role;
    authority: userAuthority;
}