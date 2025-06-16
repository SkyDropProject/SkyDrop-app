import axios from 'axios';
import { ReactElement, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

import {API_URL} from "@/app/utils/Api";

import { langs } from './interfaces/lang';
import { en } from './lang/en';
import { fr } from './lang/fr';
import { AuthProvider } from './providers/AuthProvider';

const messages: langs = {
    en,
    fr,
};

export const AppProviders = ({ children }: { children: ReactNode }): ReactElement => {
    const language = navigator.language?.split('-')[0] ?? 'fr';
    const locale = Object.keys(messages).includes(language) ? language : 'fr';
   axios.defaults.baseURL = API_URL;

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <AuthProvider>{children}</AuthProvider>
        </IntlProvider>
    );
};
