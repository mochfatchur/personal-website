export const useToast = () => {
  const visible = useState<boolean>('toast-visible', () => false)
  const message = useState<string>('toast-message', () => '')

  const show = (text: string, duration = 3000) => {
    message.value = text
    visible.value = true

    setTimeout(() => {
      visible.value = false
    }, duration)
  }

  return {
    visible,
    message,
    show
  }
}