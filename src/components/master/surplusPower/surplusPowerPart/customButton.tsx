import { CustomButtonProps } from './partInterface';

export const SurplusCustombtn: React.FC<CustomButtonProps> = ({
    title,
    areaAlertColor,
    onClick,
    onRightClick,
    disabled = false,
}) => {
    return (
        <button
            className={`
                surplusBtn
                ${areaAlertColor}
                ${disabled ? 'disabled' : ''}
            `}
            onClick={onClick}
            onContextMenu={(e) => {
                e.preventDefault();
                if (onRightClick) onRightClick();
            }}
            disabled={disabled}
        >
            {title}
        </button>
    )
}