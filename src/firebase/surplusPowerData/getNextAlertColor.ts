export const getNextAlertColor = (current: string): string => {
    const colors = ['green', 'yellow', 'red'];
    const idx = colors.indexOf(current);
    return idx === -1 ? 'green' : colors[(idx + 1) % colors.length];
};