import { ReactElement, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';

import { useAlert } from '@/app/components/AlertContext';
import BodyText from '@/app/components/BodyText';
import DateInput from '@/app/components/DateInput';
import InputField from '@/app/components/InputField';
import LinkButton from '@/app/components/LinkButton';
import SubmitButton from '@/app/components/SubmitButton';
import TitleText from '@/app/components/TitleText';
import { InscriptionTabProps } from '@/app/interfaces/component';
import { BodySize, TitleSize } from '@/app/utils/Typography';
import banner from '@/assets/images/banner.png';

import { InscriptionUserPayload } from '../interfaces/User';

const { width, height } = Dimensions.get('window');

const InscriptionTab = (props: InscriptionTabProps): ReactElement => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(new Date());
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');

    const { showAlert } = useAlert();

    const handleSubmit = async (): Promise<void> => {
        const payload: InscriptionUserPayload = {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            firstName: firstName,
            lastName: lastName,
            birthdate: date.getTime(),
            phone: phone,
        };

        const response = await fetch('http://localhost:3001/user/', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        
        const data = await response.json();

        if (response.status && response.status !== 200) {
            if (data.error && data.error === "email-already-exist") {
                showAlert("Cet email existe déjà", "error");
            } else {
                showAlert("Erreur lors de l'inscription", "error");
            }
            return;
        }

        const { token, user } = data; //TODO: user to remove if data not used after

        localStorage.setItem("token", token)
        props.onRegisterSubmit();
        showAlert('Vous êtes bien inscrit. Vous pouvez désormais vous connecter.', 'success'); //TODO: don't work actually
    };
    return (
        <ScrollView style={styles.inscription}>
            <Image source={banner} style={styles.banner} />
            <View style={styles.viewUtil}>
                <View style={styles.title}>
                    <TitleText size={TitleSize.h1} text={'Inscription'} />
                </View>
                <View style={styles.inputs}>
                    <View style={styles.row}>
                        <InputField
                            small
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholder={'Prénom'}
                        />
                        <InputField
                            small
                            value={lastName}
                            onChangeText={setLastName}
                            placeholder={'Nom'}
                        />
                    </View>
                    <InputField
                        placeholder={'Adresse email'}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType={'email-address'}
                    />
                    <DateInput
                        placeholder={'Date de naissance'}
                        value={date.getTime().toString()}
                        onChange={(text: string) => {
                            const newDate = new Date(text);
                            if (!isNaN(newDate.getTime())) {
                                setDate(newDate);
                            }
                        }}
                    />
                    <InputField
                        value={phone}
                        onChangeText={setPhone}
                        placeholder={'Numéro de téléphone'}
                        keyboardType={'phone-pad'}
                    />
                    <InputField
                        secureTextEntry
                        placeholder={'Mot de passe'}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <InputField
                        secureTextEntry
                        placeholder={'Confirmer le mot de passe'}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <View style={styles.buttonText}>
                        <SubmitButton text={"S'inscrire"} onPress={handleSubmit} />
                    </View>
                </View>
                <View style={styles.row}>
                    <BodyText size={BodySize.small} text={'Vous avez un compte ?'} />
                    <LinkButton text={'Connectez-vous'} onPress={props.onPress} />
                </View>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    inscription: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    banner: {
        width: width,
        height: 200,
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
    row: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
});
export default InscriptionTab;
