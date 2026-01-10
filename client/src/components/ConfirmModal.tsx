import React from "react"
import Button from "./Button"

export type ConfirmModalProps = {
    open: boolean
    title: string
    description?: string
    children?: React.ReactNode

    confirmText?: string
    cancelText?: string
    danger?: boolean
    loading?: boolean

    onConfirm: () => void | Promise<void>
    onClose: () => void
}

export const ConfirmModal = ({
    open,
    title,
    description,
    children,
    confirmText = "Confirm",
    cancelText = "Cancel",
    danger = false,
    loading = false,
    onConfirm,
    onClose,
  }: ConfirmModalProps) => {
    if (!open) return null
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="w-full max-w-2xl rounded-xl bg-bg-primary border border-border shadow-xl overflow-hidden">
  
          {/* Header */}
          <div className="px-10 py-4 bg-bg-secondary border-b border-border">
            <h2 className="text-base font-semibold text-white">
              {title}
            </h2>
  
            {description && (
              <p className="mt-1 text-sm text-text-secondary">
                {description}
              </p>
            )}
          </div>
  
          {/* Content */}
          {children && (
            <div className="px-10 py-8 text-sm text-text-primary">
              {children}
            </div>
          )}
  
          {/* Footer */}
          <div className="flex justify-end gap-2 px-6 py-3 bg-bg-secondary border-t border-border">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                px-4 py-2 text-sm rounded-md
                border border-bg-text-secondary
                text-text-secondary
                hover:bg-bg-secondary
                disabled:opacity-50
                focus:border-accent-primary
                focus:border-2
                outline-none
                hover:cursor-pointer
              "
            >
              {cancelText}
            </button>
  
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className={`
                px-4 py-2 text-sm rounded-md text-bg-primary
                ${danger
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-accent-primary hover:accent-primary/80 outline-none focus:ring-2 focus:ring-accent-primary hover:cursor-pointer"}
                disabled:opacity-50
              `}
            >
              {loading ? "Processing…" : confirmText}
            </button>
          </div>
        </div>
      </div>
    )
  }
  