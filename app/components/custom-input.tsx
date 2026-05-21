"use client"
import { Label } from "@/components/ui/label"

interface CustomRadioProps {
  options: Array<{ value: string; label: string; weight?: number }>
  value: string
  onChange: (value: string) => void
  className?: string,
  style?: React.CSSProperties
}

export function CustomRadio({ options, value, onChange, className, style }: CustomRadioProps) {
  return (
    <div className={className} style={style}>
      {options.map((option) => (
        <div
          key={option.value}
          className="flex items-center space-x-2 cursor-pointer "
          onClick={() => onChange(option.value)}
        >
          <div
            className={`h-4 w-4 md:h-3 md:w-3 rounded-full border-2  ${
              value === option.value ? "border-white bg-white" : "border-white"
            } flex items-center justify-center`}
          >
            {value === option.value && <div className="h-3.5 w-3.5 md:h-2.5 md:w-2.5 rounded-full bg-blue-500"></div>}
          </div>
          <Label className="text-white cursor-pointer text-sm md:text-base">{option.label}</Label>
        </div>
      ))}
    </div>
  )
}

