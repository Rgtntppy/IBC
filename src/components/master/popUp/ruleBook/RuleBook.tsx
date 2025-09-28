import React, { useState } from 'react';
import './ruleBook.scss';
import { RuleBookProps } from './ruleBookInterface';
import { txts } from '../../../../data/ruleBookTexts';
import { txtsProps, txtPageProps } from '../../../../data/ruleBookTexts/txtsInterface';

export const RuleBook: React.FC<RuleBookProps> = ({
    handleclose,
}) => {
    const [activeDepartmentId, setActiveDepartmentId] = useState<txtsProps['id'] | null>(null);
    const [activeTextId, setActiveTextId] = useState<txtPageProps['id'] | null>(null);
    const [pageIndex, setPageIndex] = useState(0);

    const activeDepartment = txts.find(d => d.id === activeDepartmentId) || null; 
    const activeText = activeDepartment?.texts.find(t => t.id === activeTextId);

    const handleNext = () => {
        if (activeText && pageIndex < activeText.pages.length - 1) {
            setPageIndex(pageIndex + 1);
        }
    };

    const handleBack = () => {
        if (activeText && pageIndex > 0) {
            setPageIndex(pageIndex - 1);
        }
    };

    return (
        <div className='ruleBookContent'>
            <h2 className='modalTitle'>
                運用ルール
            </h2>
            <div className='userControle'>
                <button
                    className='btn closebtn'
                    onClick={handleclose}    
                >
                    閉じる
                </button>
            </div>

            {/* 部門選択　→ 部門一覧 */}
            {!activeDepartment && (
                <div className='indexlist'>
                    {txts.map((dept) => (
                        <button
                        key={dept.id}
                        className='indexbtn'
                        onClick={() => setActiveDepartmentId(dept.id)}
                        >
                            <div className='arrow'/>
                            {dept.label}
                        </button>
                    ))}
                </div>
            )}

            {/* 部門選択済み・テキスト未選択 → テキスト一覧 */}
            {activeDepartment && !activeText && (
                <div className='indexlist'>
                    <div className='userControle'>
                        <button
                            className='btn listbtn'
                            onClick={() => setActiveDepartmentId(null)}
                        >
                            部門一覧へ
                        </button>
                    </div>
                    {activeDepartment.texts.map((t) => (
                        <button
                            key={t.id}
                            className='indexbtn'
                            onClick={() => {
                                setActiveTextId(t.id);
                                setPageIndex(0);
                            }}
                        >
                            <div className='arrow'/>
                            {t.label}
                        </button>
                    ))}
                </div>
            )}

            {/* テキスト選択済 → 内容表示 */}
            {activeText && (
                <div className='userControle'>
                    <button
                        className='btn listbtn'
                        onClick={() => {
                            setActiveTextId(null);
                        }}
                        >
                        テキスト一覧へ
                    </button>
                </div>
            )}

            {activeText && (
                <div className='ruleContent'>
                    {React.createElement(activeText.pages[pageIndex])}
                </div>
            )}
                
            {activeText && (
                <div className='userControle'>
                    <div className='pageControlebtn'>
                        <button
                            className='btn backbtn'
                            onClick={handleBack}
                            disabled={pageIndex === 0}
                            >
                            前のページへ
                        </button>
                        <button
                            className='btn nextbtn'
                            onClick={handleNext}
                            disabled={pageIndex === activeText.pages.length - 1}
                            >
                            次のページへ
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};