import { ShipmentData } from "../../data/binData/shipmentTableInterface";

type today = ShipmentData['today'];
type arrangedTodaysItem = ShipmentData['arrangedTodaysItem'];
type isLargeDrumToday = ShipmentData['isLargeDrumToday'];
type tomorrow = ShipmentData['tomorrow'];
type arrangedTomorrowsItem = ShipmentData['arrangedTomorrowsItem'];
type isLargeDrumTomorrow = ShipmentData['isLargeDrumTomorrow'];

export interface DaysCellsData {
    today: today;
    arrangedTodaysItem: arrangedTodaysItem;
    isLargeDrumToday: isLargeDrumToday;
    tomorrow: tomorrow;
    arrangedTomorrowsItem: arrangedTomorrowsItem;
    isLargeDrumTomorrow: isLargeDrumTomorrow;
}