import React, {ReactElement} from "react";
import { View, StyleSheet } from "react-native";

import {StatusBarsProps} from "@/app/interfaces/component";
import AnimatedBar from "@/app/components/AnimatedBar";

const StatusBars = ({ status }: StatusBarsProps): ReactElement => (
    <View style={styles.row}>
        {[0, 1, 2].map((i) => (
            <View key={i} style={styles.barContainer}>
                {i < status ? (
                    <View style={[styles.barBackground]}>
                        <View style={[styles.barFill, { width: "100%" }]} />
                    </View>
                ) : i === status ? (
                    <AnimatedBar active />
                ) : (
                    <View style={styles.barBackground} />
                )}
            </View>
        ))}
    </View>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    barContainer: {
        flex: 1,
        marginHorizontal: 4,
    }, barBackground: {
        height: 8,
        backgroundColor: "#e0e0e0",
        borderRadius: 4,
        overflow: "hidden",
    },
    barFill: {
        height: 8,
        backgroundColor: "#386BF6",
        borderRadius: 4,
    },
});

export default StatusBars;