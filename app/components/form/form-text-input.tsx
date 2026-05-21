import type {
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormTextInputPros<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<TFieldValues>;
  label?: string;
  icon?: ReactNode;
  name: TName;
  error?: string | undefined;
  onMaskChange?: (value: string) => string;
  rootClassName?: string;
  password?: boolean;
}

export const FormTextInput = <T extends FieldValues>({
  control,
  label,
  name,
  error,
  icon,
  onMaskChange,
  rootClassName = "",
  password = false,
  ...props
}: FormTextInputPros<T>): ReactElement => {
  const newId = props.id ?? name;

  return (
    <div className={`w-full flex-1 ${rootClassName}`}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="w-full">
            {label ? (
              <label htmlFor={newId} className="mb-2 block text-sm font-medium">
                {label}
              </label>
            ) : null}
            <div className="relative">
              <Input
                id={newId}
                {...field}
                {...props}
                type={password ? "password" : props.type}
                className={cn(
                  icon ? "pl-10" : "",
                  error ? "border-red-500 focus-visible:ring-red-500" : "",
                  props.className
                )}
                onChange={(e) => {
                  const maskedValue = onMaskChange
                    ? onMaskChange(e.target.value)
                    : e.target.value;
                  field.onChange(maskedValue);
                  props.onChange?.(e);
                }}
                value={props.value ?? field.value ?? ""}
              />
              {icon ? (
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                  {icon}
                </span>
              ) : null}
            </div>
            {error ? <p className="mt-1 text-sm !text-red-500">{error}s</p> : null}
          </div>
        )}
      />
    </div>
  );
};
