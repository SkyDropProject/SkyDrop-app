import { ReactElement, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { StyleSheet, View } from 'react-native';

import Account from '@/app/components/Account';
import IconButton from '@/app/components/IconButton';
import TitleText from '@/app/components/TitleText';
import { UserType } from '@/app/interfaces/User';
import { useAuth } from '@/app/providers/AuthProvider';
import Icon from '@/app/utils/Icon';
import { TitleSize } from '@/app/utils/Typography';

const ProfileTab = (): ReactElement => {
    const intl = useIntl();
    const { signOut } = useAuth();
    const [user, setUser] = useState<UserType>({
        _id: '',
        accountType: '',
        address: '',
        city: '',
        favoriteProductsId: [],
        password: '',
        phone: '',
        registrationDate: new Date(),
        stripeId: '',
        token: '',
        verificationDate: undefined,
        zip: '',
        firstName: '',
        lastName: '',
        email: '',
    });
    const initUser = (): void => {
        // init User ici
        const user: UserType = {
            firstName: 'Ian',
            lastName: 'Bertin',
            email: 'ian.bertin@etu.mines-ales.fr',
            password: '',
            registrationDate: new Date(),
            address: '',
            zip: '',
            city: '',
            phone: '',
            accountType: '',
            favoriteProductsId: [],
        };
        setUser(user);
    };

    useEffect(() => {
        initUser();
    }, []);
    return (
        <View style={styles.profilemenu}>
            <View style={styles.header}>
                <TitleText size={TitleSize.h2} text={intl.formatMessage({ id: 'account_title' })} />
            </View>
            <View style={styles.account}>
                <Account name={user.firstName + ' ' + user.lastName} email={user.email} />
            </View>
            <View style={styles.buttons}>
                <IconButton
                    text={intl.formatMessage({ id: 'personal_information' })}
                    icon={Icon.profile}
                />
                <IconButton text={intl.formatMessage({ id: 'order_history' })} icon={Icon.order} />
                <IconButton
                    text={intl.formatMessage({ id: 'notification_settings' })}
                    icon={Icon.megaphone}
                />
                <IconButton text={intl.formatMessage({ id: 'privacy_policy' })} icon={Icon.lock} />
                <IconButton text={intl.formatMessage({ id: 'logout' })} icon={Icon.logout} onPress={() => { void signOut(); }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    profilemenu: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    account: {
        marginTop: 10,
    },
    buttons: {
        marginTop: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%',
        paddingHorizontal: 15,
        marginTop: 5,
    },
});
export default ProfileTab;
