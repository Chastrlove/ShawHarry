import { Configuration, SysParamApi } from "api/sysParam/src";

import { fetch as fetchPolyfill } from "whatwg-fetch";

const config = new Configuration({
  basePath: "http://localhost:12333",
  fetchApi: fetchPolyfill,
});

const sysApi = new SysParamApi(config);

export class AppStore {
  public getValue = async () => {
    /* console.log(23)
    await sysApi.getArea({
      dict: GetAreaDictEnum._1,
    });*/
  };
}
