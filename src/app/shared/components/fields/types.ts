import { HTMLInputTypeAttribute } from "react";

export interface Field<T> {
  type: HTMLInputTypeAttribute;
  label?: string;
  name: keyof T;
  readonly?: boolean;
  options?: Array<{ text: string; value: string | number }>;
  props?: { variant?: "standard" };
}
