import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { RootStackParamList } from "../../../App";
import { UserData } from "../../UserData";
import { LoginScreenView } from "./LoginScreenView";

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen = ({ route, navigation }: Props) => {
    const [publicKey, setPublicKey] = useState("");

    const goToHome = () => {
        if (!publicKey) {
            UserData.publicKey = "B6naaoEfVGT3NvktQLYNccnarJX8tqpes967PF4bppdM";
        } else {
            UserData.publicKey = publicKey;
        }
        
        navigation.navigate("Home");
    };

    return <LoginScreenView publicKey={publicKey} setPublicKey={setPublicKey} goToHome={goToHome} />;
};