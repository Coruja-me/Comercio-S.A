export interface FormInput {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  options?: {label: string; value: string | number}[];
  pattern?: string;
  minlength?: number;
  maxlength?: number;
  multiple?: boolean;
}
