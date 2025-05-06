export type ShipmentData = {
  id: number;
  bin: string;
  today: number;
  isLargeDrumToday:boolean;
  tomorrow: number;
  isLargeDrumTomorrow:boolean;
  limit: number;
  highlight?: "red" | "blue" | "white";
}

export const initialData = [
    { id:  1, bin: "特1", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 15, highlight: "red" },
    { id:  2, bin: "特2", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 15, highlight: "red" },
    { id:  3, bin: "S1",  today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id:  4, bin: "S2",  today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id:  5, bin: "路線", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit:10 },
    { id: 61, bin: "61", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 62, bin: "62", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 63, bin: "63", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 64, bin: "64", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3, highlight: "blue" },
    { id: 65, bin: "65", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3, highlight: "blue" },
    { id: 66, bin: "66", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3, highlight: "blue" },
    { id: 67, bin: "67", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3, highlight: "blue" },
    { id: 68, bin: "68", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 69, bin: "69", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 70, bin: "70", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 71, bin: "71", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 72, bin: "72", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 73, bin: "73", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 74, bin: "74", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 75, bin: "75", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 76, bin: "76", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 77, bin: "77", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 78, bin: "78", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 79, bin: "79", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 80, bin: "80", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 10 },
    { id: 810, bin: "AM81", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 81,  bin: "PM81", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 95, bin: "95", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 },
    { id: 96, bin: "96", today: 0, isLargeDrumToday: false, tomorrow: 0, isLargeDrumTomorrow: false, limit: 3 }
  ];