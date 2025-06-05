import { ReactElement } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import TitleText from '@/app/components/TitleText';
import { AccountProps } from '@/app/interfaces/component';
import { TitleSize } from '@/app/utils/Typography';

import Icon from '../utils/Icon';
const { width } = Dimensions.get('window');

const Account = (props: AccountProps): ReactElement => {
    return (
        <View style={styles.Account}>
            <Icon.profile style={styles.profile} />
            <View>
                <TitleText size={TitleSize.h2} text={props.name} />
                <Text>{props.email}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Account: {
        display: 'flex',
        flexDirection: 'row',
        gap: 30,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderRadius: 12,
        alignItems: 'center',
        width: width * 0.85,
        height: 80,
    },

    profile: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
});

export default Account;
