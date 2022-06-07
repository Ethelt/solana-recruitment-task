import { useTheme } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import { TextButton } from "../../components/TextButton";

interface ILoginScreenViewProps {
    readonly publicKey: string;
    readonly setPublicKey: (key: string) => void;
    readonly goToHome: () => void;
}

export const LoginScreenView: React.FC<ILoginScreenViewProps> = (props) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.background,
            paddingHorizontal: 32
        },
        title: {
            color: colors.text,
            fontSize: 48
        },
        input: {
            borderColor: colors.border,
            borderWidth: 1,
            width: "100%",
            marginTop: 16,
            marginBottom: 24,
            paddingHorizontal: 16,
            borderRadius: 8
        }
    });

    return <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Solana Wallet</Text>
        <TextInput
            value={props.publicKey}
            onChangeText={props.setPublicKey}
            placeholder="input your public key"
            style={styles.input}
            selectionColor={colors.primary} />
        <TextButton text={props.publicKey.length === 0 ? "proceed with a default wallet" : "proceed with your wallet"} onPress={props.goToHome} />
    </SafeAreaView>;
};