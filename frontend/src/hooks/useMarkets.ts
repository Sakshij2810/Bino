import { binanceAxios } from "../lib/binance";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const fetchMarkets = async (symbols: string[]) => {
  try {
    const res = await binanceAxios.get(`/ticker/24hr`, {
      params: { symbols: JSON.stringify(symbols) },
    });

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
};

export function useMarkets(symbols: string[]) {
  return useQuery({
    queryKey: ["markets", symbols], // kind of useEffect dependency array
    queryFn: () => {
      return fetchMarkets(symbols);
    },
    refetchInterval: 100_000,
  });
}
