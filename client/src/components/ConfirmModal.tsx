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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-xl rounded-xl bg-bg-primary border border-border shadow-2xl">

                {/* Header */}
                <div className="px-8 py-4 bg-bg-secondary">
                    <h2 className="text-xl font-semibold text-white">
                        {title}
                    </h2>

                    {description && (
                        <p className="mt-2 text-sm text-text-secondary">
                            {description}
                        </p>
                    )}
                </div>

                {/* Content */}
                {children && (
                    <div className="px-8 py-4">
                        {children}
                    </div>
                )}

                {/* Footer */}
                <div className="flex justify-end gap-3 px-8 py-4 border-t border-border bg-bg-secondary rounded-b-xl">
                    <Button
                        text={cancelText}
                        onClick={onClose}
                        type="button"
                        disabled={loading}
                        buttonType="secondary"
                        className="px-4"
                    ></Button>

                    <Button
                        text={loading ? "Processing.. " : confirmText}
                        onClick={onConfirm}
                        type="button"
                        disabled={loading}
                        buttonType="primary"
                        className="px-4"
                    >

                    </Button>
                </div>
            </div>
        </div>
    )
}
