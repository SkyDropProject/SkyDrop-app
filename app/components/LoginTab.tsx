import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactElement, useState } from 'react';
import { useIntl } from 'react-intl';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import { useAlert } from '@/app/components/AlertContext';
import BodyText from '@/app/components/BodyText';
import InputField from '@/app/components/InputField';
import LinkButton from '@/app/components/LinkButton';
import SubmitButton from '@/app/components/SubmitButton';
import TitleText from '@/app/components/TitleText';
import { LoginTabProps } from '@/app/interfaces/component';
import { BodySize, TitleSize } from '@/app/utils/Typography';
import banner from '@/assets/images/banner.png';

import { LoginPayload } from '../interfaces/User';
const { width, height } = Dimensions.get('window');

const LoginTab = (props: LoginTabProps): ReactElement => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const intl = useIntl();

    const { showAlert } = useAlert();

    const handleSubmit = async (): Promise<void> => {
        const payload: LoginPayload = {
            email: email,
            password: password,
        };

        const response = await fetch('http://localhost:3001/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.status === 200) {
            const { token, user } = data;
            AsyncStorage.setItem("token", token);
            props.onSubmit();
            return;
        }

        if (response.status === 401) {
            showAlert("Vos informations ne sont pas valides", "error");
            return;
        }
        showAlert("Une erreur s'est produite", "warning");
    };
    return (
        <View style={styles.login}>
            <Image source={banner} style={styles.banner} />
            <View style={styles.viewUtil}>
                <View style={styles.title}>
                    <TitleText size={TitleSize.h1} text={intl.formatMessage({ id: 'welcome' })} />
                </View>
                <View style={styles.inputs}>
                    <InputField
                        placeholder={'Adresse email'}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <InputField
                        secureTextEntry
                        placeholder={'Mot de passe'}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={styles.buttonText}>
                    <LinkButton text={'Mot de passe oublié ?'} />
                </View>
                <View style={styles.buttonText}>
                    <SubmitButton text={'Se connecter'} onPress={handleSubmit} />
                </View>
                <View style={styles.buttonText}>
                    <BodyText size={BodySize.small} text={'Pas de compte ?'} />
                    <LinkButton text={'Inscrivez-vous'} onPress={props.onPress} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    login: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    banner: {
        width: width,
        height: 500,
        backgroundColor: '#c7dfe2',
    },
    viewUtil: {
        backgroundColor: 'white',
        height: '100%',
        borderRadius: 30,
    },
    inputs: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginTop: 30,
        marginHorizontal: 55,
        marginBottom: 10,
    },
    buttonText: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        marginHorizontal: 55,
        marginBottom: 10,
        marginTop: 10,
    },
});

export default LoginTab;
