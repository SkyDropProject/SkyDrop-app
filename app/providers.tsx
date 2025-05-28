import { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { fr } from './lang/fr';
import { en } from './lang/en';
import { langs } from './interfaces/lang';

const messages: langs = {
    en,
    fr,
};

export const AppProviders = ({ children }: { children: ReactNode }) => {
    const language = navigator.language?.split('-')[0] ?? 'en';
    const locale = Object.keys(messages).includes(language) ? language : 'en';

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            {children}
        </IntlProvider>
    );
};
