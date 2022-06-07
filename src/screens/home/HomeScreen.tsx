import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { RETRIES_COUNT } from "../../constants";
import { SolanaApi } from "../../SolanaApi";
import { UserData } from "../../UserData";
import { HomeScreenView } from "./HomeScreenView";

export const HomeScreen = () => {
    const [balance, setBalance] = useState<number>();
    const [isAmountSelectionShown, setIsAmountSelectionShown] = useState(false);

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

        const checkForBalanceChange = (retriesCount: number) => {
            setTimeout(async () => {
                const didBalanceChange = await refreshUserBalance();
                if (!didBalanceChange && retriesCount > 1) {
                    checkForBalanceChange(retriesCount - 1);
                }
            }, 1000);
        };

        checkForBalanceChange(RETRIES_COUNT)
    };

    return <HomeScreenView
        balance={balance}
        requestAirdrop={requestAirdrop}
        refresh={refreshUserBalance} />;
};