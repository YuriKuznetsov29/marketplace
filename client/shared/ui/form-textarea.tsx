'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ClearButton } from './clear-button'
import { Textarea } from '@/components/ui/textarea'
import { RequiredSymbol } from './required-symbol'
import { FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string
    name: string
    label?: string
    required?: boolean
    textareaClassName?: string
}

export const FormTextarea: React.FC<Props> = ({
    className,
    name,
    label,
    required,
    textareaClassName,
    ...props
}) => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext()

    const value = watch(name)
    const errorText = errors[name]?.message as string

    const onClickClear = () => {
        setValue(name, '')
    }

    return (
        <div className={className}>
            {label && (
                <p className="mb-2 font-medium">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <div className="relative">
                <Textarea
                    className={cn(
                        'min-h-[140px] resize-y leading-relaxed text-base',
                        textareaClassName
                    )}
                    {...register(name)}
                    {...props}
                />

                {value && <ClearButton onClick={onClickClear} />}
            </div>

            {errorText && <FormMessage className="mt-2">{errorText}</FormMessage>}
        </div>
    )
}
