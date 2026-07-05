import type { ChatMessage } from "~/types/chat"

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
      role: 'assistant',
      text,
      createdAt: new Date()
    })
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

  return {
    open,
    messages,
    addUserMessage,
    addAssistantMessage,
    loading,
    toggle,
    close
  }
}