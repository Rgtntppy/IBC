export type ShipmentData = {
  id: number;
  bin: string;
  today: number;
  tomorrow: number;
  limit: number;
  highlight?: "red" | "blue";
}

export const initialData = [
    { id:  1, bin: "特1", today: 0, tomorrow: 0, limit: 15, highlight: "red" },
    { id:  2, bin: "特2", today: 0, tomorrow: 0, limit: 15, highlight: "red" },
    { id:  3, bin: "S1", today: 0, tomorrow: 0, limit: 3 },
    { id:  4, bin: "S2", today: 0, tomorrow: 0, limit: 3 },
    { id:  5, bin: "61", today: 0, tomorrow: 0, limit: 3 },
    { id:  6, bin: "62", today: 0, tomorrow: 0, limit: 3 },
    { id:  7, bin: "63", today: 0, tomorrow: 0, limit: 3 },
    { id:  8, bin: "64", today: 0, tomorrow: 0, limit: 3, highlight: "blue" },
    { id:  9, bin: "65", today: 0, tomorrow: 0, limit: 3, highlight: "blue" },
    { id: 10, bin: "66", today: 0, tomorrow: 0, limit: 3, highlight: "blue" },
    { id: 11, bin: "67", today: 0, tomorrow: 0, limit: 3, highlight: "blue" },
    { id: 12, bin: "68", today: 0, tomorrow: 0, limit: 3 },
    { id: 13, bin: "69", today: 0, tomorrow: 0, limit: 3 },
    { id: 14, bin: "70", today: 0, tomorrow: 0, limit: 3 },
    { id: 15, bin: "71", today: 0, tomorrow: 0, limit: 3 },
    { id: 16, bin: "72", today: 0, tomorrow: 0, limit: 3 },
    { id: 17, bin: "73", today: 0, tomorrow: 0, limit: 3 },
    { id: 18, bin: "74", today: 0, tomorrow: 0, limit: 3 },
    { id: 19, bin: "75", today: 0, tomorrow: 0, limit: 3 },
    { id: 20, bin: "76", today: 0, tomorrow: 0, limit: 3 },
    { id: 21, bin: "77", today: 0, tomorrow: 0, limit: 3 },
    { id: 22, bin: "78", today: 0, tomorrow: 0, limit: 3 },
    { id: 23, bin: "79", today: 0, tomorrow: 0, limit: 3 },
    { id: 24, bin: "80", today: 0, tomorrow: 0, limit: 10 },
    { id: 25, bin: "81", today: 0, tomorrow: 0, limit: 3 },
    { id: 26, bin: "95", today: 0, tomorrow: 0, limit: 3 },
    { id: 27, bin: "96", today: 0, tomorrow: 0, limit: 3 }
  ];