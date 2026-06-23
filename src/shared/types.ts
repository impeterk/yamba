import type { NavigationMenuItem } from '@nuxt/ui'

export type NavItem = NavigationMenuItem & {
  nodeType: 'file' | 'folder'
  children?: NavItem[]
}
