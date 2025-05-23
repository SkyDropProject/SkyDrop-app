import {View, StyleSheet} from "react-native";
import IconButton from "@/app/components/IconButton";
import Icon from "@/app/utils/Icon";
import Account from "@/app/components/Account";
import {useIntl} from "react-intl";
import TitleText from "@/app/components/TitleText";
import {TitleSize} from "@/app/utils/Typography";

const ProfileTab = () => {
    const intl = useIntl()
    return(
        <View style={styles.profilemenu}>
            <View style={styles.header}>
                <TitleText size={TitleSize.h2} text={intl.formatMessage({id:"account_title"})} />
            </View>
            <View style={styles.account}>
                <Account name={"Ian Bertin"} email={"ian.bertin@etu.mines-ales.fr"} />
            </View>
            <View style={styles.buttons}>
                <IconButton text={intl.formatMessage({id:"personal_information"})} icon={Icon.profile} />
                <IconButton text={intl.formatMessage({id:"order_history"})} icon={Icon.order} />
                <IconButton text={intl.formatMessage({id:"notification_settings"})} icon={Icon.megaphone} />
                <IconButton text={intl.formatMessage({id:"privacy_policy"})} icon={Icon.lock} />
                <IconButton text={intl.formatMessage({id:"logout"})} icon={Icon.logout} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profilemenu:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        width: "100%",
        height: "100%",
    },
    account : {
        marginTop: 40,
    },
    buttons : {
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
    },
    header : {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "85%",
        height: 50,
        paddingHorizontal: 15,
        marginTop: 5
    }
})
export default ProfileTab;