import { DarkTheme, DefaultTheme } from "@react-navigation/native";

export const Colors = {
    AccentText: "#F2F2F2",
    Disabled: "grey"
}

export const CustomLightTheme = {
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        background: "#F8F8F8",
        text: "#0B0B0B",
        primary: "#764AF1",
        border: "#764AF1"
    },
};

export const CustomDarkTheme = {
    dark: true,
    colors: {
        ...DarkTheme.colors,
        background: "#121212",
        text: Colors.AccentText,
        primary: "#764AF1",
        border: "#764AF1"
    },
};