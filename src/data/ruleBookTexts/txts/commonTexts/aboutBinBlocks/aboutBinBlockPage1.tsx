import { RuleBookPage } from '../../RuleBookPage';

export const AboutBinBlocksPage1: React.FC = () => {
    return (
        <div>
            <RuleBookPage
                departmentId={1}
                textId={111}
            >
            <p className='ruleBookText'>
                カウントには「在庫品」のみの表示と「在庫品＋手配品」の２通りの表示形式が存在しています。
                
            </p>
            </RuleBookPage>
        </div>
    )
}