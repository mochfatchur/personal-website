import type { ChatMessage } from "~/types/chat"

const STORAGE_KEY = 'chatbot-conversation'

export function useChat() {
  const open = useState('chat-open', () => false)

  const messages = useState<ChatMessage[]>(
    'chat-messages',
    () => []
  );

  const addUserMessage = (text: string) => {
    messages.value.push({
      id: crypto.randomUUID(),
      role: 'user',
      text,
      createdAt: new Date()
    })
  }

  const addAssistantMessage = (text: string) => {
      messages.value.push({
        id: crypto.randomUUID(),
        role: 'model',
        text,
        createdAt: new Date()
      })
    }

  const addMessage = (
    role: 'user' | 'model',
    text: string
  ) => {

    messages.value.push({
      id: crypto.randomUUID(),
      role,
      text,
      createdAt: new Date()
    })

    saveConversation()
  }

  const loading = useState(
    'chat-loading',
    () => false
  );

  const toggle = () => {
    open.value = !open.value
  }

  const close = () => {
    open.value = false
  }

  const saveConversation = () => {
    // handle localstorage in SSR
    if (import.meta.client) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(messages.value)
      )
    }
  }

  onMounted(() => {
    loadConversation()
  })

  const loadConversation = () => {
    if (!import.meta.client) return

    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) return

    try {
      messages.value = JSON.parse(saved)
    } catch {
      messages.value = []
    }
  }

  const sendMessage = async (
    text: string
  ) => {

    addMessage('user', text)

    loading.value = true

    addMessage(
      'model',
      'Gemini is thinking...'
    )

    const thinkingIndex =
      messages.value.length - 1

    try {

      const response = await fetch(
        'http://localhost:3002/api/chat',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            conversation: messages.value.map(m => ({
              role: m.role,
              text: m.text
            }))
          })
        }
      )

      const data = await response.json()

      const thinkingMsg = messages.value[thinkingIndex]
      if (thinkingMsg) thinkingMsg.text = data.reply

    } catch {

      const thinkingMsg = messages.value[thinkingIndex]
      if (thinkingMsg) thinkingMsg.text = 'Something went wrong.'
    }

    saveConversation()

    loading.value = false

  }

  return {
    open,
    messages,
    addMessage,
    addUserMessage,
    addAssistantMessage,
    loading,
    toggle,
    close,
    saveConversation,
    loadConversation,
    sendMessage
  }
}