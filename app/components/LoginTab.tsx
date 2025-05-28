import {Image, StyleSheet, View, Dimensions} from "react-native";
// @ts-ignore
import banner from "@/assets/images/banner.png"
import TitleText from "@/app/components/TitleText";
import {BodySize, TitleSize} from "@/app/utils/Typography";
import InputField from "@/app/components/InputField";
import {useState} from "react";
import LinkButton from "@/app/components/LinkButton";
import SubmitButton from "@/app/components/SubmitButton";
import {useIntl} from "react-intl";
import BodyText from "@/app/components/BodyText";
const { width, height } = Dimensions.get("window");
const LoginTab = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const intl = useIntl()
    return(
        <View style={styles.login}>
            <Image source={banner} style={styles.banner} />
            <View style={styles.viewUtil}>
                <View style={styles.title}>
                    <TitleText size={TitleSize.h1} text={intl.formatMessage({id:"welcome"})} />
                </View>
                <View style={styles.inputs}>
                    <InputField placeholder={"Adresse email"} value={email} onChangeText={setEmail} />
                    <InputField  secureTextEntry placeholder={"Mot de passe"} value={password} onChangeText={setPassword} />
                </View>
                <View style={styles.buttonText}>
                    <LinkButton text={"Mot de passe oublié ?"}/>
                </View>
                <View style={styles.buttonText}>
                    <SubmitButton text={"Se connecter"} onPress={() => {}} />
                </View>
                <View style={styles.buttonText}>
                    <BodyText size={BodySize.small} text={"Pas de compte ?"} />
                    <LinkButton text={"Inscrivez-vous"} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    login:{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
    },
    banner:{
        width: width,
        height: 340,
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
    }
})

export default LoginTab;