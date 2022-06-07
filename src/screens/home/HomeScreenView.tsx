import { useTheme } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TextButton } from "../../components/TextButton";

interface IHomeScreenViewProps {
    readonly balance?: number;
    readonly requestAirdrop: (amount: number) => void;
    readonly refresh: () => void;
}

export const HomeScreenView: React.FC<IHomeScreenViewProps> = (props) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.background
        },
        balanceTitle: {
            fontSize: 24,
            color: colors.text
        },
        balance: {
            fontSize: 96,
            textAlign: "center",
            color: colors.text
        },
        airdropButtonContainer: {
            position: "absolute",
            bottom: 40
        }
    });

    return <SafeAreaView style={styles.container}>
        <Text style={styles.balanceTitle}>{props.balance ? "your balance is" : "checking your balance..."}</Text>
        {true ? <>
            <Text style={styles.balance}>{props.balance ? `${props.balance} SOL` : ""}</Text>
        </> : undefined}
        <View style={styles.airdropButtonContainer}>
            <TextButton text="request airdrop of 1 SOL" onPress={() => props.requestAirdrop(1)} />
            <TextButton text="refresh" onPress={() => props.refresh()} />
        </View>
    </SafeAreaView>;
};