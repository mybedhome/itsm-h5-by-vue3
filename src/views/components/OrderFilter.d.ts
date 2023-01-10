export type SelectFilterItemValue = string | number | number[];
export type SelectFilterItem = {
  label: string;
  name: string;
  value: SelectFilterItemValue;
};
export type OrderFilterConfirmEventParams = SelectFilterItem[];
