import HomeIcon from '@mui/icons-material/Home'
import CloudIcon from '@mui/icons-material/Cloud'
import StorageIcon from '@mui/icons-material/Storage'
import AddBoxIcon from '@mui/icons-material/AddBox'
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import GitHubIcon from '@mui/icons-material/GitHub'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
export interface SubDrawer {
  title: string
  role?: string
  sub: {
    name: string
    link: string
    icon: any
  }[]
}

export const listDrawer: SubDrawer[] = [
  {
    title: 'Main',
    role: 'not-admin',
    sub: [
      {
        name: 'Dashboard',
        link: '/main/dashboard',
        icon: <HomeIcon />
      },
      {
        name: 'Deploy',
        link: '/main/deploy',
        icon: <CloudIcon />
      },
      {
        name: 'Image',
        link: '/main/image',
        icon: <StorageIcon />
      },
      {
        name: 'Services',
        link: '/main/services',
        icon: <MarkunreadMailboxIcon />
      },
      {
        name: 'Support Service',
        link: '/main/support-service',
        icon: <AddBoxIcon />
      }
    ]
  },
  {
    title: 'Administrator',
    sub: [
      {
        name: 'Kube Config',
        link: '/administrator/kube-config',
        icon: <AcUnitIcon />
      },
      {
        name: 'Member',
        link: '/administrator/member',
        icon: <PeopleAltIcon />
      },
      {
        name: 'Project',
        link: '/administrator/project',
        icon: <AccountTreeIcon />
      },
      {
        name: 'Gitlab Config',
        link: '/administrator/gitlab-config',
        icon: <GitHubIcon />
      }
    ]
  },
  {
    title: 'System',
    role: 'not-admin',
    sub: [
      {
        name: 'Settings',
        link: '/system/settings',
        icon: <SettingsSuggestIcon />
      }
    ]
  }
]
