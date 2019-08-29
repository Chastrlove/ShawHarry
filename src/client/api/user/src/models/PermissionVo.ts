// tslint:disable
/**
 * yhxk-api
 * Application related APIs.
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from "../runtime";
/**
 *
 * @export
 * @interface PermissionVo
 */
export interface PermissionVo {
  /**
   * 权限代码
   * @type {string}
   * @memberof PermissionVo
   */
  code?: string;
  /**
   * 层级
   * @type {number}
   * @memberof PermissionVo
   */
  level?: number;
  /**
   * 权限名称
   * @type {string}
   * @memberof PermissionVo
   */
  name?: string;
  /**
   * 是否拥有该权限
   * @type {boolean}
   * @memberof PermissionVo
   */
  owned?: boolean;
  /**
   * 上级权限代码
   * @type {string}
   * @memberof PermissionVo
   */
  parentCode?: string;
  /**
   * 当前权限属于哪个角色
   * @type {string}
   * @memberof PermissionVo
   */
  role?: string;
  /**
   * 同一级下展示顺序
   * @type {number}
   * @memberof PermissionVo
   */
  seq?: number;
  /**
   * 权限类型，1菜单，2URL,3请求
   * @type {number}
   * @memberof PermissionVo
   */
  type?: number;
}

export function PermissionVoFromJSON(json: any): PermissionVo {
  return {
    code: !exists(json, "code") ? undefined : json["code"],
    level: !exists(json, "level") ? undefined : json["level"],
    name: !exists(json, "name") ? undefined : json["name"],
    owned: !exists(json, "owned") ? undefined : json["owned"],
    parentCode: !exists(json, "parentCode") ? undefined : json["parentCode"],
    role: !exists(json, "role") ? undefined : json["role"],
    seq: !exists(json, "seq") ? undefined : json["seq"],
    type: !exists(json, "type") ? undefined : json["type"],
  };
}

export function PermissionVoToJSON(value?: PermissionVo): any {
  if (value === undefined) {
    return undefined;
  }
  return {
    code: value.code,
    level: value.level,
    name: value.name,
    owned: value.owned,
    parentCode: value.parentCode,
    role: value.role,
    seq: value.seq,
    type: value.type,
  };
}
