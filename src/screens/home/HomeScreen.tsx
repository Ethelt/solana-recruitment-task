import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { SolanaApi } from "../../SolanaApi";
import { UserData } from "../../UserData";
import { HomeScreenView } from "./HomeScreenView";

export const HomeScreen = () => {
    const [balance, setBalance] = useState<number>();
    const [isAmountSelectionShown, setIsAmountSelectionShown] = useState(false);

    useFocusEffect(useCallback(() => {
        // getUserBalance();
    }, [UserData.publicKey]));

    const getUserBalance = async () => {
        const balance = await SolanaApi.getBalance(UserData.publicKey ?? "");
        setBalance(balance);
    };

    const requestAirdrop = async (amount: number) => {
        const a = await SolanaApi.requestAirdrop(UserData.publicKey ?? "", amount);
        console.log("hello");
        // getUserBalance();
    };

    return <HomeScreenView
        balance={balance}
        requestAirdrop={requestAirdrop}
        refresh={getUserBalance}/>;
};