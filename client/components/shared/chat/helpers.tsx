export const formatTime = (date?: Date | string) => {
    if (!date) return ''
    return new Date(date).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    })
}

const URL_REGEX = /(https?:\/\/[^\s]+)/gi

export const renderMessageText = (content: string) => {
    return content.split(URL_REGEX).map((part, index) => {
        const isUrl = /^https?:\/\/\S+$/i.test(part)

        if (isUrl) {
            return (
                <a
                    key={`url-${part}-${index}`}
                    href={part}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline underline-offset-2 break-all hover:text-primary/80 transition-colors"
                >
                    {part}
                </a>
            )
        }

        return (
            <span key={`text-${index}`} className="break-words">
                {part}
            </span>
        )
    })
}
