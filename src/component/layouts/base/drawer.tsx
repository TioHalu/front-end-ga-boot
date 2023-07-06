import styles from './styles.module.scss'
import { SubDrawer, listDrawer } from '../../../utils/listDrawer'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Link from 'next/link'
import { UseAppSelector, UseAppDispatch } from '../../../redux/hooks'
import { setList } from './slice'
import { logout } from '../../pages/Login/reducer'
import { useRouter } from 'next/router'
import ModalExpired from '@/component/elements/ModalExpired'
import { FiLogOut } from 'react-icons/fi'
function Drawer() {
  const active = UseAppSelector((state: any) => state.base.list)
  const dispatch = UseAppDispatch()
  const router = useRouter()
  const user = UseAppSelector((state: any) => state.authLogin.user)
  let [path, setPath] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  useEffect(() => {
    if (!user) {
      localStorage.clear()
      setOpen(true)
    }
  }, [user, router])
  useEffect(() => {
    let path = window.location.pathname
    setPath(path)
  }, [])
  const _handleClick = (item: any) => {
    let id = item.target.id
    return dispatch(setList(id))
  }
  const _handleModalExpired = () => {
    return (
      <>
        <ModalExpired open={open} />
      </>
    )
  }

  const logoutHandler = () => {
    dispatch(logout())
    router.push('/')
  }

  const renderDrawer = (item: SubDrawer, index: number) => {
    return (
      <div key={index}>
        <div className={styles.drawerItemMain} id={item.title} onClick={_handleClick}>
          {item.title}
          <KeyboardArrowDownIcon
            id={item.title}
            className={clsx(
              styles.drawerItemMainIcon,
              active.includes(item.title) && styles.active
            )}
          />
        </div>
        {item.sub.map((subItem, subIndex): any => {
          return (
            <div
              key={subIndex}
              className={clsx(
                styles.drawerItemSubItem,
                active.includes(item.title) && styles.active,
                path === subItem.link && styles.actived
              )}
            >
              <Link href={subItem.link} className='flex'>
                <div className={styles.drawerItemSubItemIcon}>{subItem.icon}</div>
                <div className={styles.drawerItemSubItemName}>{subItem.name}</div>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className='flex flex-col justify-between space-y-10'>
      <div className={styles.drawerWrapper}>
        {_handleModalExpired()}
        {listDrawer.map((item, index) => {
          return item.role === 'not-admin' && user?.data?.roleId !== 1
            ? renderDrawer(item, index)
            : user?.data?.roleId === 1 && renderDrawer(item, index)
        })}
      </div>

      <div className='ml-8 pb-6'>
        <button
          onClick={logoutHandler}
          className='text-lg flex items-center space-x-2 font-secondary font-medium'
        >
          <FiLogOut className='mr-2' />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Drawer
