import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { SolanaApi } from "../../SolanaApi";
import { UserData } from "../../UserData";
import { HomeScreenView } from "./HomeScreenView";

export const HomeScreen = () => {
    const [balance, setBalance] = useState<number>();

    useFocusEffect(useCallback(() => {
        refreshUserBalance();
    }, [UserData.publicKey]));

    const refreshUserBalance = async () => {
        const newBalance = await SolanaApi.getBalance(UserData.publicKey ?? "");
        const oldBalance = balance;
        setBalance(newBalance);
        return oldBalance != newBalance; // returns true if the balance changed
    };

    const requestAirdrop = async (amount: number) => {
        await SolanaApi.requestAirdrop(UserData.publicKey ?? "", amount);
        watchForBalanceChange();
    };

    const watchForBalanceChange = () => {
        const RETRIES_COUNT = 3;
        const RETRY_INTERVAL = 1000;

        const checkForBalanceChange = (retriesCount: number) => {
            setTimeout(async () => {
                const didBalanceChange = await refreshUserBalance();
                if (!didBalanceChange && retriesCount > 1) {
                    checkForBalanceChange(retriesCount - 1);
                }
            }, RETRY_INTERVAL);
        };

        checkForBalanceChange(RETRIES_COUNT);
    };

    return <HomeScreenView
        balance={balance}
        requestAirdrop={requestAirdrop} />;
};