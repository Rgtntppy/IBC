import { Onlytoday } from '../../components/master/binBlocks/onlytoday/Onlytoday';
import { OnlytodaysData } from '../../data/binData/onlytodayBinData/onlytodaysBinDataInterface';

type    id = OnlytodaysData['id']
type   bin = OnlytodaysData['bin']
type today = OnlytodaysData['today'];  
type arrangedTodaysItem = OnlytodaysData['arrangedTodaysItem']
type isLargeDrumToday = OnlytodaysData['isLargeDrumToday']

export interface OnlytodaysCellsData {
    id: id;
    bin: bin;
    today: today;
    arrangedTodaysItem: arrangedTodaysItem;
    isLargeDrumToday: isLargeDrumToday;
} 