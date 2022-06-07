import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../themes";

interface ITextButtonProps {
    readonly text: string;
    readonly disabled?: boolean;
    readonly onPress: () => void;
}

export const TextButton: React.FC<ITextButtonProps> = (props) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: props.disabled ? Colors.Disabled : colors.primary,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            alignItems: "center"
        },
        text: {
            color: Colors.AccentText,
            fontSize: 20,
            lineHeight: 22
        }
    });

    return <TouchableOpacity style={styles.container} onPress={props.onPress} disabled={props.disabled}>
        <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>;
};