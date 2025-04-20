import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
    className?: string
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
    return <div className={cn('flex direction-column gap-2', className)}>{children}</div>
}
