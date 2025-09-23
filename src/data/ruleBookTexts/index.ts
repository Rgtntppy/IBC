import { txtsProps } from './txtsInterface';
import { CommonText1Page1 } from './txts/commonTexts/commonText1Page1';
import { CutAreaText1Page1 } from './txts/cutAreaTexts/cutAreaText1/cutAreaText1Page1';
import { CutAreaText2Page1 } from './txts/cutAreaTexts/cutAreaText2/cutAreaText2Page1';
import { PickAreaText1Page1 } from './txts/pickAreaTexts/pickAreaText1/txt3/pickAreaText1Page1';
import { OfficeAreaText1Page1 } from './txts/officeAreaTexts/officeAreaText1/officeAreaText1Page1'
import { CutAreaText2Page2 } from './txts/cutAreaTexts/cutAreaText2/cutAreaText2Page2';

export const txts: txtsProps[] = [
    {
        id: 1,
        label: '共通',
        texts: [
            {
                id: 101,
                label: 'メモについて',
                pages: [CommonText1Page1],
            }
        ]
    },{
        id: 2,
        label: '切断場',
        texts: [
            {
                id: 201,
                label: 'ドラム数量「追加・変更」について',
                pages: [CutAreaText1Page1],
            },{
                id: 202,
                label: '準備中...',
                pages: [CutAreaText2Page1, CutAreaText2Page2],
            },
        ]
    },{
        id: 3,
        label: 'ピックエリア',
        texts: [
            {
                id: 301,
                label: '大物について',
                pages: [PickAreaText1Page1],
            },
        ]
    },{
        id: 4,
        label: '事務所',
        texts: [
            {
                id: 401,
                label: 'アラートについて',
                pages: [OfficeAreaText1Page1],
            },
        ]
    },
]