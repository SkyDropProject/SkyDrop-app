import CategoryButton from "@/app/components/CategoryButton";
import Icon from "@/app/utils/Icon";
import InputField from "@/app/components/InputField";
import SubmitButton from "@/app/components/SubmitButton";
import {useState} from "react";
import {View} from "react-native";
import ProductCard from "@/app/components/ProductCard";

const ComponentTest = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    return(
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            //backgroundColor: "#f1f1f1"
        }}>
            <View style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <CategoryButton icon={Icon.alcool} text={"Alcool"} />
                <CategoryButton icon={Icon.boisson} text={"Boisson"} />
            </View>

            <InputField placeholder={"Adresse mail"} value={mail} onChangeText={setMail}
                        error="Adresse mail invalide"/>
            <InputField placeholder={"Mot de passe"} value={password} onChangeText={setPassword} disabled/>
            <SubmitButton text={"Se connecter"} onPress={() => {
            }}/>
        </View>
    )
}

export default ComponentTest;