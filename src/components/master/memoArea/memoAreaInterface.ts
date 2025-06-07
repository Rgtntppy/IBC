import { MemoAreaData } from "../../../firebase/memoAreaData/memoAreaInterface";

type memo = MemoAreaData['content'];

export interface MemoAreaProps {
    content: memo;
}