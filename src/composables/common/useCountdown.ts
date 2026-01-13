import { ref, onUnmounted } from 'vue'

/**
 * 倒计时
 * @param seconds 倒计时秒数
 * @example
 * const { count, counting, start, stop } = useCountdown(60)
 * start() // 开始倒计时
 */
export function useCountdown(seconds: number) {
  const count = ref(0)
  const counting = ref(false)
  let timer: ReturnType<typeof setInterval> | null = null

  const stop = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    counting.value = false
    count.value = 0
  }

  const start = () => {
    if (counting.value) return

    count.value = seconds
    counting.value = true

    timer = setInterval(() => {
      count.value--
      if (count.value <= 0) {
        stop()
      }
    }, 1000)
  }

  onUnmounted(stop)

  return {
    count,
    counting,
    start,
    stop,
  }
}
