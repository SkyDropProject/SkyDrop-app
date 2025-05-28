import {Dimensions, Image, StyleSheet, View} from "react-native";
// @ts-ignore
import banner from "@/assets/images/banner.png";
import TitleText from "@/app/components/TitleText";
import {TitleSize} from "@/app/utils/Typography";
import InputField from "@/app/components/InputField";
import {useState} from "react";
import SubmitButton from "@/app/components/SubmitButton";
import DateInput from "@/app/components/DateInput";
import {useAlert} from "@/app/components/AlertContext";
const { width, height } = Dimensions.get("window");

const InscriptionTab = () => {
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [date,setDate] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [phone,setPhone] = useState("")

    const { showAlert } = useAlert();

    const handleSubmit = () => {
        const payload = {
            email: email,
            password: password,
            confirmPassword : confirmPassword,
            firstName: firstName,
            lastName: lastName,
            birthdate: date,
            phone: phone
        }
        showAlert("incroyable", "success")

    }
    return(
        <View style={styles.inscription}>
            <Image source={banner} style={styles.banner} />
            <View style={styles.viewUtil}>
                <View style={styles.title}>
                    <TitleText size={TitleSize.h1} text={"Inscription"} />
                </View>
                <View style={styles.inputs}>
                    <View style={styles.row}>
                        <InputField small value={firstName} onChangeText={setFirstName} placeholder={"Prénom"}/>
                        <InputField small value={lastName} onChangeText={setLastName} placeholder={"Nom"} />
                    </View>
                    <InputField placeholder={"Adresse email"} value={email} onChangeText={setEmail} keyboardType={"email-address"}  />
                    <DateInput placeholder={"Date de naissance"} value={date} onChange={setDate} />
                    <InputField value={phone} onChangeText={setPhone} placeholder={"Numéro de téléphone"} keyboardType={"phone-pad"} />
                    <InputField  secureTextEntry placeholder={"Mot de passe"} value={password} onChangeText={setPassword} />
                    <InputField  secureTextEntry placeholder={"Confirmer le mot de passe"} value={confirmPassword} onChangeText={setConfirmPassword} />
                    <View style={styles.buttonText}>
                        <SubmitButton text={"S'inscrire"} onPress={handleSubmit} />
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    inscription:{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
    },
    banner:{
        width: width,
        height: 200,
        backgroundColor: "#c7dfe2"
    },
    viewUtil:{
        backgroundColor: "white",
        height: "100%",
        borderRadius: 30,
    },
    inputs:{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    title:{
        marginTop: 30,
        marginHorizontal: 55,
        marginBottom: 10,
    },
    buttonText:{
        display: "flex",
        flexDirection: "row",
        gap: 5,
        marginHorizontal: 55,
        marginBottom: 10,
        marginTop: 10,
    },
    row:{
        display: "flex",
        flexDirection: "row",
        gap: 10,
    }
})
export default InscriptionTab;