export interface ShipmentData {
    id: number;
    bin: string;
    today: number;
    isLargeDrumToday:boolean;
    tomorrow: number;
    isLargeDrumTomorrow:boolean;
    limit: number;
    highlight?: "red" | "blue" | "green" | "white";
}