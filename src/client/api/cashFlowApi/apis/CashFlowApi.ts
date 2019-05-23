// tslint:disable
/**
 * es-cash-flow-api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    CashRecord,
    CashRecordFromJSON,
    CashRecordToJSON,
} from '../models';

export interface CreateCashRecordRequest {
    cashRecord: CashRecord;
}

/**
 * no description
 */
export class CashFlowApi extends runtime.BaseAPI {

    /**
     * 资金明细添加
     */
    async createCashRecordRaw(requestParameters: CreateCashRecordRequest): Promise<runtime.ApiResponse<number>> {
        if (requestParameters.cashRecord === null || requestParameters.cashRecord === undefined) {
            throw new runtime.RequiredError('cashRecord','Required parameter requestParameters.cashRecord was null or undefined when calling createCashRecord.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/cash/record`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CashRecordToJSON(requestParameters.cashRecord),
        });

        return new runtime.TextApiResponse(response);
    }

    /**
     * 资金明细添加
     */
    async createCashRecord(requestParameters: CreateCashRecordRequest): Promise<number> {
        const response = await this.createCashRecordRaw(requestParameters);
        return await response.value();
    }

}