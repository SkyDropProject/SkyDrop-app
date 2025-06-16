import React, { createContext, ReactElement, ReactNode, useContext, useState } from 'react';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertContextProps {
    showAlert: (message: string, type?: AlertType) => void;
    hideAlert: () => void;
    alert: { message: string; type: AlertType } | null;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = (): AlertContextProps => {
    const context = useContext(AlertContext);
    if (!context) throw new Error('useAlert must be used within AlertProvider');
    return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const [alert, setAlert] = useState<{ message: string; type: AlertType } | null>(null);

    const showAlert = (message: string, type: AlertType = 'info'): void => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 3000); // Disparait après 3s
    };

    const hideAlert = (): void => setAlert(null);

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert, alert }}>
            {children}
        </AlertContext.Provider>
    );
};
