import { ReactElement, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

import { langs } from './interfaces/lang';
import { en } from './lang/en';
import { fr } from './lang/fr';
import { AuthProvider } from './providers/AuthProvider';

const messages: langs = {
    en,
    fr,
};

export const AppProviders = ({ children }: { children: ReactNode }): ReactElement => {
    const language = navigator.language?.split('-')[0] ?? 'en';
    const locale = Object.keys(messages).includes(language) ? language : 'en';

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </IntlProvider>
    );
};
