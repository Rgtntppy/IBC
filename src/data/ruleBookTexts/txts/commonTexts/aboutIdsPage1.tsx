import { RuleBookPage } from '../RuleBookPage';

export const AboutIdsPage1: React.FC = () => {
    return (
        <div>
            <RuleBookPage
                departmentId={1}
                textId={100}
            >
            <p className='ruleBookText'>
                各ログインIDによって操作できる範囲が異なります。
            <br/>
                不要な部分については操作できないよう制限されています。
            <br/>
            <span className='redmarker'>
                必ず割り振られたIDでのみログインし、他のIDを使用してのログインは絶対に行わないでください。
            </span>
            </p>
            </RuleBookPage>
        </div>
    )
}