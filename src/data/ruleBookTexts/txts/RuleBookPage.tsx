import { getLabelById, getTextLabelById } from '../getLabel';
import { RuleBookPageProps } from './ruleBookPageInterface';

export const RuleBookPage: React.FC<RuleBookPageProps> = ({
    departmentId,
    textId,
    children,
}) => {
    return (
        <div>
            <h2 className='ruleBookTextTitle'>
                {getLabelById(departmentId)}
            </h2>
            <h3 className='ruleBookTextSubTitle'>
                {getTextLabelById(textId)}
            </h3>
            <p className='ruleBookText'>
                {children}
            </p>
        </div>
    );
}