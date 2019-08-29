import * as React from "react";
import { useCallback } from "react";
import { observer } from "mobx-react";
import { Form, Input } from "antd";
import { FormItemProps } from "antd/lib/form/FormItem";
import { InputProps, SearchProps } from "antd/lib/input";
import { noop } from "lodash";
import { Field } from "common/Field";
import { defaultFormItemProps } from "../defaultFormItemProps";
import { TextAreaProps } from "antd/lib/input/TextArea";

const Search = Input.Search;

interface InputBean extends InputProps {
  isHasError?: boolean;
}

export interface InputItemBean<TField = Field<any>> {
  form?: FormItemProps;
  input?: InputBean;
  textArea?: TextAreaProps;
  search?: SearchProps;
  isPwd?: boolean;
  field: TField;
}

export const InputItem = observer((props: InputItemBean) => {
  const defaultInputItemProps = {
    placeholder: "请填写",
  };
  const { textArea, form = {}, input = {}, field = new Field({ value: void 0 }), search, isPwd = false } = props;

  const { error, validateStatus, onChange, setReactInstance } = field;
  const value = field.value;
  const { hasFeedback, required, disabled } = field.extra;
  const { isHasError = true } = input;

  const inputOnChange = input ? (typeof input.onChange === "function" ? input.onChange : noop) : noop;

  const fieldOnchange = useCallback(
    (e) => {
      e.preventDefault();
      const result = inputOnChange(e) as any;
      if (result === false) {
        return;
      }
      onChange(e.target.value);
    },
    [inputOnChange, onChange],
  );

  const searchOnChange = search ? (typeof search.onChange === "function" ? search.onChange : noop) : noop;

  const searchFieldOnchange = (e) => {
    e.preventDefault();
    searchOnChange(e);
    onChange(e.target.value);
  };

  return (
    <Form.Item
      {...{
        ...defaultFormItemProps,
        ...form,
        ...{
          hasFeedback,
          required,
          validateStatus,
        },
        ...(isHasError
          ? {
              help: error || form.help,
            }
          : {}),
      }}
      ref={setReactInstance}
    >
      {textArea ? (
        <Input.TextArea {...{ ...textArea, value, onChange: fieldOnchange }} />
      ) : search ? (
        <Search
          {...{
            ...defaultInputItemProps,
            ...search,
            ...{
              value,
              placeholder: search.placeholder || `请输入${form.label || ""}`,
              disabled: disabled || input.disabled,
              onChange: searchFieldOnchange,
            },
          }}
        />
      ) : isPwd ? (
        <Input.Password
          {...{
            ...defaultInputItemProps,
            ...input,
            ...{
              value,
              placeholder: input.placeholder || `请输入${form.label || ""}`,
              disabled: disabled || input.disabled,
              onChange: fieldOnchange,
            },
          }}
        />
      ) : (
        <Input
          {...{
            ...defaultInputItemProps,
            ...input,
            ...{
              value,
              placeholder: input.placeholder || `请输入${form.label || ""}`,
              disabled: disabled || input.disabled,
              onChange: fieldOnchange,
            },
          }}
        />
      )}
    </Form.Item>
  );
});
