export interface ShipmentData {
    id: number;
    bin: string;
    binAlert: string;
    today: number;
    arrangedTodaysItem: number,
    isLargeDrumToday:boolean;
    tomorrow: number;
    arrangedTomorrowsItem: number,
    isLargeDrumTomorrow:boolean;
    alertborder: number;
    highlight?: 'red' | 'blue' | 'green' | 'white';
}