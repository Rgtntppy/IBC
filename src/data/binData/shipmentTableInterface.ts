export interface ShipmentData {
    id: number;
    bin: string;
    binAlert: string;
    today: number;
    isLargeDrumToday:boolean;
    tomorrow: number;
    isLargeDrumTomorrow:boolean;
    alertborder: number;
    highlight?: 'red' | 'blue' | 'green' | 'white';
}