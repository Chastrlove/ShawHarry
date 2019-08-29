import * as _ from "lodash";
import { FormState, ValidatableMapOrArray } from "formstate";
import { action, toJS, transaction } from "mobx";

import { Field } from "./Field";
import { IFieldOptionWithRules } from "common/Field";

export type IFormField<T> = { [P in keyof T]: IFieldOptionWithRules<T[P]> };

export type IForm<T> = { [P in keyof T]: Field<T[P]> };

export type FormType<T> = FormStore<IForm<T>>;

export class FormStore<TValue extends ValidatableMapOrArray> extends FormState<TValue> {
  private formId?: string;

  public get initId() {
    if (this.formId) {
      return this.formId;
    }
    return (this.formId = _.uniqueId("formId_"));
  }

  public init = () => {
    const $ = this.$;
    transaction(() => {
      if (_.isArrayLikeObject($)) {
        for (const value of $ as any) {
          if (value instanceof Field) {
            value.reset();
          } else if (value instanceof FormStore) {
            value.init();
          }
        }
      } else {
        for (const key in $) {
          if ($.hasOwnProperty(key)) {
            const value = $[key];
            if (value instanceof Field) {
              value.reset();
            } else if (value instanceof FormStore) {
              value.init();
            }
          }
        }
      }
    });
  };

  @action
  public setValues = (values, dirty = false) => {
    if (_.isEmpty(values) === false) {
      const $ = this.$;
      transaction(() => {
        for (const key in values) {
          if ($.hasOwnProperty(key)) {
            $[key].$ = values[key];
            $[key].value = values[key];
            $[key].dirty = dirty;
          }
        }
      });
    }

    return this;
  };

  @action
  public onChangeValues = (values) => {
    if (_.isEmpty(values) === false) {
      const $ = this.$;
      transaction(() => {
        for (const key in values) {
          if ($.hasOwnProperty(key)) {
            $[key].onChange(values[key]);
          }
        }
      });
    }

    return this;
  };

  public getFormValues = <T = any>(): T => {
    return _.mapValues(this.$, (item: any) => {
      return toJS(item.value);
    }) as any;
  };

  public validatorIsDirty = <T = any>(): T => {
    return _.some(this.$, (item: any) => {
      return toJS(item.dirty);
    }) as any;
  };
}
