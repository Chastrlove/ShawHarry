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
 * @interface ResetPasswordDto
 */
export interface ResetPasswordDto {
  /**
   *
   * @type {string}
   * @memberof ResetPasswordDto
   */
  phone?: string;
  /**
   * 原密码
   * @type {string}
   * @memberof ResetPasswordDto
   */
  oldPassword?: string;
  /**
   * 新密码
   * @type {string}
   * @memberof ResetPasswordDto
   */
  newPassword?: string;
  /**
   * 密码确认
   * @type {string}
   * @memberof ResetPasswordDto
   */
  confirmPassword?: string;
}

export function ResetPasswordDtoFromJSON(json: any): ResetPasswordDto {
  return {
    phone: !exists(json, "phone") ? undefined : json["phone"],
    oldPassword: !exists(json, "oldPassword") ? undefined : json["oldPassword"],
    newPassword: !exists(json, "newPassword") ? undefined : json["newPassword"],
    confirmPassword: !exists(json, "confirmPassword") ? undefined : json["confirmPassword"],
  };
}

export function ResetPasswordDtoToJSON(value?: ResetPasswordDto): any {
  if (value === undefined) {
    return undefined;
  }
  return {
    phone: value.phone,
    oldPassword: value.oldPassword,
    newPassword: value.newPassword,
    confirmPassword: value.confirmPassword,
  };
}
