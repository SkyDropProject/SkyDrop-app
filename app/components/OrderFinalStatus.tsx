import {View,StyleSheet} from "react-native";
import {OrderFinalStatusProps} from "@/app/interfaces/component";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "../utils/Icon";
import TitleText from "@/app/components/TitleText";
import {TitleSize} from "@/app/utils/Typography";
import {useIntl} from "react-intl";

const OrderFinalStatus = (props: OrderFinalStatusProps) => {
    const intl = useIntl();
    const title = props.status === 0 ? "order_success" : "order_cancel"
    return (
        <View style={styles.container}>
            {
                props.status === 0 ? (
                    <LinearGradient
                        colors={['#A3FF74', '#ffffff']}
                        locations={[0, 1]}
                        style={styles.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    />
                ) : (
                    <LinearGradient
                        colors={['#FF5A5A', '#ffffff']}
                        locations={[0, 1]}
                        style={styles.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    />
                )
            }

            <View style={styles.info}>
                {props.status === 0 ? <Icon.order_success/> : <Icon.order_cancel/>}
                <TitleText size={TitleSize.h1} text={intl.formatMessage({id : title})} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: "center",
    },
    gradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    info: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 50,
        gap: 50,
    }
})

export default OrderFinalStatus;
