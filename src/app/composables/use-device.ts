import { useStorage } from '@vueuse/core'
import { computed, toValue } from 'vue'

export const devices = ['desktop', 'tablet', 'mobile'] as const

export type Device = (typeof devices)[number]
const device = useStorage<Device>('device', 'desktop', localStorage)

export const useDevice = () => device

export function useDeviceStyles() {
  return computed(() => {
    let res = ['rounded-lg', 'overflow-scroll', 'mt-4', 'border', 'border-accented']
    switch (toValue(device)) {
      case 'mobile':
        res.push('max-w-sm', 'h-[40rem]')
        break
      case 'tablet':
        res.push('max-w-2xl', 'max-h-[calc(100vh_-_10rem)]')
        break
      default:
        res = []
    }
    return res
  })
}
