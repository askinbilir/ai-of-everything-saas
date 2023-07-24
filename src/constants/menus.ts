import {
  CodeIcon,
  ImageIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  MusicIcon,
  SettingsIcon,
  VideoIcon
} from 'lucide-react'

export const ROUTES = [
  {
    label: 'Dashboard',
    icon: LayoutDashboardIcon,
    href: '/dashboard',
    color: 'text-sky-400 dark:text-sky-600',
    active: 'bg-sky-400/10 dark:bg-sky-600/10'
  },
  {
    label: 'Conversation',
    icon: MessageSquareIcon,
    href: '/conversation',
    color: 'text-violet-400 dark:text-violet-600',
    active: 'bg-violet-400/10 dark:bg-violet-600/10'
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image',
    color: 'text-pink-400 dark:text-pink-600',
    active: 'bg-pink-400/10 dark:bg-pink-600/10'
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    href: '/video',
    color: 'text-orange-400 dark:text-orange-600',
    active: 'bg-orange-400/10 dark:bg-orange-600/10'
  },
  {
    label: 'Music Generation',
    icon: MusicIcon,
    href: '/music',
    color: 'text-emerald-400 dark:text-emerald-600',
    active: 'bg-emerald-400/10 dark:bg-emerald-600/10'
  },
  {
    label: 'Code Generation',
    icon: CodeIcon,
    href: '/code',
    color: 'text-fuchsia-400 dark:text-fuchsia-600',
    active: 'bg-fuchsia-400/10 dark:bg-fuchsia-600/10'
  },
  {
    label: 'Settings',
    icon: SettingsIcon,
    href: '/settings',
    color: 'text-red-400 dark:text-red-600',
    active: 'bg-red-400/10 dark:bg-red-600/10'
  }
]

export const TOOLS = [
  {
    label: 'Conversation',
    icon: MessageSquareIcon,
    color: 'text-violet-400 dark:text-violet-600',
    bg: 'bg-violet-400/10 dark:bg-violet-600/10',
    hover: 'hover:bg-violet-400/10 dark:hover:bg-violet-600/10',
    href: '/conversation'
  },
  {
    label: 'Music Generation',
    icon: MusicIcon,
    color: 'text-emerald-400 dark:text-emerald-600',
    bg: 'bg-emerald-400/10 dark:bg-emerald-600/10',
    hover: 'hover:bg-emerald-400/10 dark:hover:bg-emerald-600/10',
    href: '/music'
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-400 dark:text-pink-600',
    bg: 'bg-pink-400/10 dark:bg-pink-600/10',
    hover: 'hover:bg-pink-400/10 dark:hover:bg-pink-600/10',
    href: '/image'
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-orange-400 dark:text-orange-600',
    bg: 'bg-orange-400/10 dark:bg-orange-600/10',
    hover: 'hover:bg-orange-400/10 dark:hover:bg-orange-600/10',
    href: '/video'
  },
  {
    label: 'Code Generation',
    icon: CodeIcon,
    color: 'text-fuchsia-400 dark:text-fuchsia-600',
    bg: 'bg-fuchsia-400/10 dark:bg-fuchsia-600/10',
    hover: 'hover:bg-fuchsia-400/10 dark:hover:bg-fuchsia-600/10',
    href: '/code'
  }
]
