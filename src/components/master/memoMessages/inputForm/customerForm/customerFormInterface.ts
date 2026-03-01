export type CustomerFormProps = {
    title: string;
    required?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
    date: string;
    bin: string;
    destination: string;
    item: string;
    size: string;
    slipNo: string;
    onDate: (v:string)=>void;
    onBin: (v:string)=>void;
    onDestination: (v:string)=>void;
    onItem: (v:string)=>void;
    onSize: (v:string)=>void;
    onSlip: (v:string)=>void;
}