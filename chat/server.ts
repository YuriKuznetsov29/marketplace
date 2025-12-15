import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
    log: ["query", "warn", "error"],
})
const app = express()
app.use(cors())
app.use(express.json())

const clients: Record<string, Set<any>> = {}

// SSE поток
app.get("/chat/:chatId/stream", (req, res) => {
    const { chatId } = req.params

    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")

    if (!clients[chatId]) clients[chatId] = new Set()
    clients[chatId].add(res)

    req.on("close", () => {
        clients[chatId].delete(res)
    })

    // начальное событие
    res.write(`event: connected\ndata: ok\n\n`)
})

// Отправка сообщений
app.post("/chat/:chatId/send", async (req, res) => {
    const { chatId } = req.params
    const { text, userId } = req.body // userId вместо senderId

    const message = await prisma.message.create({
        data: { chatId, text, userId },
    })

    // push всем подписанным клиентам
    const set = clients[chatId]
    if (set) {
        set.forEach((clientRes) => {
            clientRes.write(`data: ${JSON.stringify(message)}\n\n`)
        })
    }

    res.json({ ok: true, message })
})

// Создание чата
app.post("/chat/create", async (req, res) => {
    const { userIds } = req.body

    const chat = await prisma.chat.findFirst({
        where: {
            members: {
                some: {
                    userId: userIds[1],
                },
            },
        },
    })

    if (chat) {
        res.json(chat)
    } else {
        const newChat = await prisma.chat.create({
            data: {
                members: {
                    create: userIds.map((id: string) => ({ userId: id })),
                },
            },
        })

        res.json(newChat)
    }
})

// Получение истории сообщений
app.get("/chat/:chatId/messages", async (req, res) => {
    const { chatId } = req.params

    const messages = await prisma.message.findMany({
        where: { chatId },

        orderBy: { createdAt: "asc" },
    })

    res.json({
        messages,
        nextCursor: messages.length > 0 ? messages[messages.length - 1].id : null,
    })
})

app.listen(4000, () => console.log("SSE server running on port 4000"))
