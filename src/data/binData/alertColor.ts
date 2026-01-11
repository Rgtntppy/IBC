export type AlertColor = 'white' | 'yellow' | 'red';

export const alertColorLabelMap: Record<AlertColor, string> = {
    white: 'ホワイト',
    yellow: 'イエロー',
    red: 'レッド',
};

export const getNextAlert = (
    current: AlertColor,
    hasHighlight: boolean
): AlertColor => {
    const cycle: AlertColor[] = ['white', 'yellow', 'red'];
    const idx = cycle.indexOf(current);
    return idx === -1 ? 'white' : cycle[(idx + 1) % cycle.length];
};