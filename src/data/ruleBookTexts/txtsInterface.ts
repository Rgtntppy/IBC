import { ComponentType } from "react";

export interface txtPageProps {
    id: number;
    label: string;
    pages: React.FC[];
}

export interface txtsProps {
    id: number;
    label: string;
    texts: txtPageProps[];
}