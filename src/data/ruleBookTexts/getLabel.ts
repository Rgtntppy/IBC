import { txts } from './index'

export const getLabelById = (id: number) =>
    txts.find(t => t.id === id)?.label ?? '';

export const getTextLabelById = (textId: number) => {
    for (const group of txts) {
        const found = group.texts.find(txt => txt.id === textId);
        if (found) return found.label;
    }
    return '';
};