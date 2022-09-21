import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    AE,
    AF,
    AL,
    AM,
    AZ,
    BA,
    BG,
    CA,
    CN,
    CZ,
    DE,
    DK,
    EE,
    ES,
    FI,
    FR,
    GE,
    GR,
    HR,
    HU,
    ID,
    IE,
    IL,
    ILY,
    IS,
    IT,
    JP,
    KG,
    KR,
    KZ,
    LT,
    LV,
    MG,
    MK,
    MN,
    MT,
    MY,
    NL,
    NO,
    NP,
    PL,
    PT,
    RO,
    SD,
    SE,
    SK,
    SL,
    SO,
    TH,
    TJ,
    TR,
    UA,
    US,
    UZ,
    VN,
} from '../../assets/images/country/country';

// export const getCountry = createAsyncThunk('language/country', async (_, { rejectWithValue }) => {
//     try {
//         const responce = await fetch('http://localhost:4000/api/language', { method: 'GET' });

//         return await responce.json();
//     } catch (err) {
//         console.log('Error language =>>>', err);
//         return rejectWithValue(err);
//     }
// });

const initialState = {
    isActive: false,
    lang: [
        {
            code: 'AF',
            title: 'Afrikaans',
            icon: <AF />,
            enabled: false,
        },
        {
            code: 'AL',
            title: 'Albanian',
            icon: <AL />,
            enabled: false,
        },
        {
            code: 'AE',
            title: 'Arab',
            icon: <AE />,
            enabled: false,
        },
        {
            code: 'AM',
            title: 'Armenian',
            icon: <AM />,
            enabled: false,
        },
        {
            code: 'AZ',
            title: 'Azerbaijani',
            icon: <AZ />,
            enabled: false,
        },
        {
            code: 'BA',
            title: 'Bosnian',
            icon: <BA />,
            enabled: false,
        },
        {
            code: 'BG',
            title: 'Bulgarian',
            icon: <BG />,
            enabled: false,
        },
        {
            code: 'CN',
            title: 'Chinese',
            icon: <CN />,
            enabled: false,
        },
        {
            code: 'NR',
            title: 'Croatian',
            icon: <HR />,
            enabled: false,
        },
        {
            code: 'CZ',
            title: 'Czech',
            icon: <CZ />,
            enabled: false,
        },
        {
            code: 'DK',
            title: 'Danish',
            icon: <DK />,
            enabled: false,
        },
        {
            code: 'NL',
            title: 'Dutch',
            icon: <NL />,
            enabled: false,
        },
        {
            code: 'US',
            title: 'English',
            icon: <US />,
            enabled: false,
        },
        {
            code: 'EE',
            title: 'Estonian',
            icon: <EE />,
            enabled: false,
        },
        {
            code: 'FI',
            title: 'Finnish',
            icon: <FI />,
            enabled: false,
        },
        {
            code: 'FR',
            title: 'French',
            icon: <FR />,
            enabled: false,
        },
        {
            code: 'GE',
            title: 'Georgian',
            icon: <GE />,
            enabled: false,
        },
        {
            code: 'DE',
            title: 'German',
            icon: <DE />,
            enabled: false,
        },
        {
            code: 'GR',
            title: 'Greek',
            icon: <GR />,
            enabled: false,
        },
        {
            code: 'IL',
            title: 'Hebrew',
            icon: <IL />,
            enabled: false,
        },
        {
            code: 'HU',
            title: 'Hungarian',
            icon: <HU />,
            enabled: false,
        },
        {
            code: 'IS',
            title: 'Icelandic',
            icon: <IS />,
            enabled: false,
        },
        {
            code: 'ID',
            title: 'Indonesian',
            icon: <ID />,
            enabled: false,
        },
        {
            code: 'IE',
            title: 'Irish',
            icon: <IE />,
            enabled: false,
        },
        {
            code: 'IT',
            title: 'Italian',
            icon: <IT />,
            enabled: false,
        },
        {
            code: 'JP',
            title: 'Japanese',
            icon: <JP />,
            enabled: false,
        },
        {
            code: 'CA',
            title: 'Kannada',
            icon: <CA />,
            enabled: false,
        },
        {
            code: 'KZ',
            title: 'Kazakh',
            icon: <KZ />,
            enabled: false,
        },
        {
            code: 'KR',
            title: 'Korean',
            icon: <KR />,
            enabled: false,
        },
        {
            code: 'KG',
            title: 'Kyrgyz',
            icon: <KG />,
            enabled: false,
        },
        {
            code: 'LV',
            title: 'Latvian',
            icon: <LV />,
            enabled: false,
        },
        {
            code: 'LT',
            title: 'Lithuanian',
            icon: <LT />,
            enabled: false,
        },
        {
            code: 'MK',
            title: 'Macedonian',
            icon: <MK />,
            enabled: false,
        },
        {
            code: 'MG',
            title: 'Malagasy',
            icon: <MG />,
            enabled: false,
        },
        {
            code: 'MY',
            title: 'Malaysian',
            icon: <MY />,
            enabled: false,
        },
        {
            code: 'MT',
            title: 'Maltese',
            icon: <MT />,
            enabled: false,
        },
        {
            code: 'MN',
            title: 'Mongolian',
            icon: <MN />,
            enabled: false,
        },
        {
            code: 'NP',
            title: 'Nepali',
            icon: <NP />,
            enabled: false,
        },
        {
            code: 'NO',
            title: 'Norwegian',
            icon: <NO />,
            enabled: false,
        },
        {
            code: 'PL',
            title: 'Polish',
            icon: <PL />,
            enabled: false,
        },
        {
            code: 'PT',
            title: 'Portuguese',
            icon: <PT />,
            enabled: false,
        },
        {
            code: 'RO',
            title: 'Romanian',
            icon: <RO />,
            enabled: false,
        },
        {
            code: 'SK',
            title: 'Slovak',
            icon: <SK />,
            enabled: false,
        },
        {
            code: 'SL',
            title: 'Slovenian',
            icon: <SL />,
            enabled: false,
        },
        {
            code: 'SO',
            title: 'Somali',
            icon: <SO />,
            enabled: false,
        },
        {
            code: 'ES',
            title: 'Spanish',
            icon: <ES />,
            enabled: false,
        },
        {
            code: 'SD',
            title: 'Sudanese',
            icon: <SD />,
            enabled: false,
        },
        {
            code: 'SE',
            title: 'Swedish',
            icon: <SE />,
            enabled: false,
        },
        {
            code: 'TJ',
            title: 'Tajik',
            icon: <TJ />,
            enabled: false,
        },
        {
            code: 'TH',
            title: 'Thai',
            icon: <TH />,
            enabled: false,
        },
        {
            code: 'TR',
            title: 'Turkish',
            icon: <TR />,
            enabled: false,
        },
        {
            code: 'UA',
            title: 'Ukranian',
            icon: <UA />,
            enabled: false,
        },
        {
            code: 'UZ',
            title: 'Uzbek',
            icon: <UZ />,
            enabled: false,
        },
        {
            code: 'VN',
            title: 'Vietnamese',
            icon: <VN />,
            enabled: false,
        },
        {
            code: 'ILY',
            title: 'Yiddish',
            icon: <ILY />,
            enabled: false,
        },
    ],
};

const language = createSlice({
    name: 'language',
    initialState,
    reducers: {
        handleLanguage: (state, action) => {
            const [enabled, code] = action.payload;
            state.lang.map((el) => (el.code === code ? (el.enabled = enabled) : { ...state.lang }));
        },
    },
    // extraReducers: (build) => {
    //     build
    //         .addCase(getCountry.pending, (state, action) => {
    //             console.log('Loading...');
    //         })
    //         .addCase(getCountry.fulfilled, (state, action) => {
    //             console.log('Finish');
    //             console.log(action.payload);
    //         })
    //         .addCase(getCountry.rejected, (state, action) => {});
    // },
});

export default language.reducer;
export const { handleLanguage } = language.actions;
