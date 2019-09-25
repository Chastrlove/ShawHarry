import jsCookie from "js-cookie";
import { fetch as fetchPolyfill } from "whatwg-fetch";

interface IConfig {
  host: string;
  port: number;
  api: string;
}

const outCfg: IConfig | any = process.env.clientCfg || {
  host: "//localhost",
  port: 3000,
  get api() {
    return `${this.host}:${this.port}/api`;
  },
};

const config = {
  basePath: outCfg.api,
  fetchApi: fetchPolyfill,
  accessToken: jsCookie.get("Authorization"),
};

export default config;
