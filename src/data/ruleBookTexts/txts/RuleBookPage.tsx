import { getLabelById, getTextLabelById } from '../getLabel';
import { RuleBookPageProps } from './ruleBookPageInterface';
import './ruleBookPage.scss';

export const RuleBookPage: React.FC<RuleBookPageProps> = ({
    departmentId,
    textId,
    children,
}) => {
    return (
        <div>
            <div className='ruleBookHeader'>
                <h2 className='ruleBookTextTitle'>
                    {getLabelById(departmentId)}
                </h2>
                <h3 className='ruleBookTextSubTitle'>
                    {getTextLabelById(textId)}
                </h3>
            </div>
            <p className='ruleBookText'>
                {children}
            </p>
        </div>
    );
}