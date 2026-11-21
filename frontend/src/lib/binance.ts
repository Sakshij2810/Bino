// Create src/lib/binance.ts with an Axios client whose baseURL is https://data-api.binance.vision/api/v3. Do not reuse api.ts: Binance must not get our cookie.

import axios from "axios";

export const binanceAxios = axios.create({
  baseURL: "https://data-api.binance.vision/api/v3",
});
