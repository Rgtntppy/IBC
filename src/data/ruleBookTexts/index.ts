import { txtsProps } from './txtsInterface';
import { AboutMemosPage1 } from './txts/commonTexts/aboutMemosPage1';
import { AboutBinBlocksPage1 } from './txts/commonTexts/aboutBinBlocks/aboutBinBlockPage1';
import { AboutBinColorsPage1 } from './txts/commonTexts/aboutBincolorsPage1';
import { AboutBinAlertsPage1 } from './txts/commonTexts/aboutBinAlertsPage1';
import { AdditionsAndChangesPage1 } from './txts/cutAreaTexts/cutAreaText1/additionsAndChangesPage1';
import { CutAreaText2Page1 } from './txts/cutAreaTexts/cutAreaText2/cutAreaText2Page1';
import { AboutBigLuggagePage1 } from './txts/pickAreaTexts/pickAreaText1/txt3/aboutBigLuggagePage1';
import { OfficeAreaText1Page1 } from './txts/officeAreaTexts/officeAreaText1/officeAreaText1Page1'
import { CutAreaText2Page2 } from './txts/cutAreaTexts/cutAreaText2/cutAreaText2Page2';
import { AboutIdsPage1 } from './txts/commonTexts/aboutIdsPage1';
import { arrangementDrumsPage1 } from './txts/others/arrangementDrums';
import { AboutAreaAlertsPage1 } from './txts/commonTexts/aboutAreaAlerts/aboutAreaAlertsPage1';
import { AboutAreaAlertsPage2 } from './txts/commonTexts/aboutAreaAlerts/aboutAreaAlertsPage2';

export const txts: txtsProps[] = [
    {
        id: 1,
        label: '共通',
        texts: [
            {
                id: 100,
                label: 'Idについて',
                pages: [AboutIdsPage1],
            },{
                id: 101,
                label: 'メモについて',
                pages: [AboutMemosPage1],
            },{
                id: 111,
                label: '数量の見方について',
                pages: [AboutBinBlocksPage1],
            },{
                id: 102,
                label: '便の背景色について',
                pages: [AboutBinColorsPage1],
            },{
                id: 120,
                label: '便アラートについて',
                pages: [AboutBinAlertsPage1],
            },{
                id: 121,
                label: 'エリアアラートについて',
                pages: [AboutAreaAlertsPage1, AboutAreaAlertsPage2],
            }

        ]
    },{
        id: 2,
        label: '切断場',
        texts: [
            {
                id: 201,
                label: 'ドラム数量の「追加・変更」について',
                pages: [AdditionsAndChangesPage1],
            },
            // {
            //     id: 202,
            //     label: '準備中...',
            //     pages: [CutAreaText2Page1, CutAreaText2Page2],
            // },
        ]
    },{
        id: 3,
        label: 'ピックエリア',
        texts: [
            {
                id: 301,
                label: '大物について',
                pages: [AboutBigLuggagePage1],
            },
        ]
    },{
        id: 4,
        label: '事務所',
        texts: [
            {
                id: 401,
                label: '準備中...',
                pages: [OfficeAreaText1Page1],
            },
        ]
    },{
        id: 9,
        label: 'その他',
        texts: [
            {
                id: 901,
                label: '手配品ドラムについて',
                pages: [arrangementDrumsPage1],
            },
        ]
    },
]