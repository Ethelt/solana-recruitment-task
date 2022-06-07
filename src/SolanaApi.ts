import { LAMPORTS_PER_SOL } from "./constants";

interface ISolanaApiResponse<T> {
    id: number;
    jsonrpc: string;
    result: {
        context: {
            slot: number;
        },
        value: T;
    };
}

export class SolanaApi {
    private static nodeUrl = "https://api.devnet.solana.com";

    static async getBalance(publicKey: string) {
        const response = await SolanaApi.makeRequest<[string], number>("getBalance", [publicKey]);
        return response.result.value / LAMPORTS_PER_SOL;
    }

    static async requestAirdrop(publicKey: string, amount: number) {
        const res = await SolanaApi.makeRequest<[string, number]>("requestAirdrop", [publicKey, amount * LAMPORTS_PER_SOL]);
        return res;
    }

    private static async makeRequest<Req extends Array<unknown> = [], Res = {}>(method: string, params: Req, id?: number): Promise<ISolanaApiResponse<Res>> {
        const headers = {
            "Content-Type": "application/json"
        };

        const paramsWithConfiguration = [...params, { commitment: "confirmed" }];
        const body = {
            jsonrpc: "2.0",
            id: id ?? 1,
            method,
            params: paramsWithConfiguration
        };

        //TODO: there should be error handling here
        const response = await fetch(SolanaApi.nodeUrl, { method: "POST", body: JSON.stringify(body), headers });
        const data: ISolanaApiResponse<Res> = await response.json();
        return data;
    }
}