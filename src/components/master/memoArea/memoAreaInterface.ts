export interface MemoAreaProps {
    memo: string;
    setMemo: React.Dispatch<React.SetStateAction<string>>;
    handleBlur: () => Promise<void>;
}