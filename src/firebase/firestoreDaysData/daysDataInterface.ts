import { ShipmentData } from "../../data/binData/shipmentTableInterface";

type today = ShipmentData['today'];
type isLargeDrumToday = ShipmentData['isLargeDrumToday'];
type tomorrow = ShipmentData['tomorrow'];
type isLargeDrumTomorrow = ShipmentData['isLargeDrumTomorrow'];

export interface DaysCellsData {
    today: today;
    isLargeDrumToday: isLargeDrumToday;
    tomorrow: tomorrow;
    isLargeDrumTomorrow: isLargeDrumTomorrow;
}