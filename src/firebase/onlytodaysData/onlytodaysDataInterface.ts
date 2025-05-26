import { OnlytodayProps } from "../../components/master/binBlocks/onlytoday/onlytodayInterface";

type id = OnlytodayProps['id']
type bin = OnlytodayProps['bin']
type today = OnlytodayProps['today']
type isLargeDrumToday = OnlytodayProps['isLargeDrumToday']

export interface OnlytodaysData {
    id: id;
    bin: bin;
    today: today;
    isLargeDrumToday: isLargeDrumToday;
} 