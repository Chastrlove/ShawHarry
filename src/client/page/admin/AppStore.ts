import { Configuration, SysParamApi, GetAreaDictEnum } from "api/sysParam/src";
import config from "config/index";

const sysApi = new SysParamApi(new Configuration(config));

export class AppStore {
  public getValue = async () => {
    try {
      const result = await sysApi.getArea({
        dict: GetAreaDictEnum._1,
      });
    } finally {
      console.log(23);
    }
  };
}
