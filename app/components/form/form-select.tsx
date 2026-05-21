import type { ReactElement, SelectHTMLAttributes } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type ItensProps = { text: string; value: string; disabled?: boolean }[];

interface FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends SelectHTMLAttributes<HTMLSelectElement> {
  control: Control<TFieldValues>;
  label: string;
  name: TName;
  items: ItensProps;
  error?: string | undefined;
  rootClassName?: string;
  placeholder?: string;
}

export const FormSelect = <T extends FieldValues>({
  control,
  label,
  name,
  items,
  error,
  rootClassName = "",
  disabled,
  placeholder,
  ...props
}: FormSelectProps<T>): ReactElement => {
  const newId = String(props.id ?? name);

  return (
    <div className={`w-full flex-1 ${rootClassName}`}>
      <Controller
        control={control}
        name={name}
        render={({ field: { ref: _ref, ...field } }) => (
          <div className="w-full">
            <label className="mb-2 block text-sm font-medium" htmlFor={newId}>
              {label}
            </label>

            <Select
              disabled={disabled}
              name={field.name}
              onValueChange={field.onChange}
              value={field.value ?? ""}
            >
              <SelectTrigger
                aria-invalid={Boolean(error)}
                className={cn(
                  error ? "border-red-500 focus:ring-red-500" : "",
                  props.className
                )}
                id={newId}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent>
                {items.map(({ text, value, disabled: itemDisabled }) => (
                  <SelectItem disabled={itemDisabled} key={value} value={value}>
                    {text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {error ? <p className="mt-1 text-sm text-red-500">{error}</p> : null}
          </div>
        )}
      />
    </div>
  );
};
