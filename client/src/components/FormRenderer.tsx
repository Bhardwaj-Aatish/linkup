import React from "react"

export type FieldType = "text" | "email" | "textarea"

export type FieldConfig = {
  label: string
  type: FieldType
  placeholder?: string
}

export type FormSchema<T extends string> = Record<T, FieldConfig>

type FormRendererProps<T extends Record<string, string>> = {
  schema: FormSchema<keyof T & string>
  values: T
  onChange: <K extends keyof T>(key: K, value: T[K]) => void
}

export const FormRenderer = <T extends Record<string, string>>({
  schema,
  values,
  onChange,
}: FormRendererProps<T>) => {
  return (
    <div className="space-y-5">
      {Object.entries(schema).map(([key, config]) => {
        const value = values[key]

        return (
          <div key={key} className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary">
              {config.label}
            </label>

            {config.type === "textarea" ? (
              <textarea
                rows={4}
                className="w-full rounded-md bg-bg-secondary border border-border px-3 py-2 text-white placeholder-text-teritary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                placeholder={config.placeholder}
                value={value}
                onChange={(e) =>
                  onChange(key as keyof T, e.target.value as T[keyof T])
                }
              />
            ) : (
              <input
                type={config.type}
                className="w-full rounded-md bg-bg-secondary border border-border px-3 py-2 text-white placeholder-text-teritary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                placeholder={config.placeholder}
                value={value}
                onChange={(e) =>
                  onChange(key as keyof T, e.target.value as T[keyof T])
                }
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
