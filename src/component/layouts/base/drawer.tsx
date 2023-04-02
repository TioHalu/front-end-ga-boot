import styles from "./styles.module.scss";
import { listDrawer } from "../../../utils/listDrawer";
import { useState, useEffect } from "react";
import clsx from "clsx";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image'
import Link from 'next/link'
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { setList } from "./slice"
import { useDispatch } from "react-redux";

function Drawer() {
  const active = useAppSelector((state:any) => state.base.list);
  const dispatch = useAppDispatch();
  let [path, setPath] = useState<string>("");

  const _handleClick = (item: any) => {
    let id = item.target.id;
    return dispatch(setList(id))
  }
  useEffect(() => {
    let path = window.location.pathname;
    setPath(path);
  }, [])
  return (
    <div className={styles.drawerWrapper}>
      {
        listDrawer.map((item, index) => {
          return (
            <div key={index} >
              <div className={styles.drawerItemMain} id={item.title} onClick={_handleClick}>
                {item.title}
                  <KeyboardArrowDownIcon id={item.title} className={clsx(styles.drawerItemMainIcon, active.includes(item.title) && styles.active
                )} />
              </div>
                {
                item.sub.map((subItem, subIndex) => {
                    return (
                      <div key={subIndex} className={clsx(
                        styles.drawerItemSubItem, active.includes(item.title) && styles.active, path === subItem.link && styles.actived
                      )}>
                        <Link href={subItem.link} className="flex">
                        <div className={styles.drawerItemSubItemIcon} >
                          <Image src={subItem.icon} alt={subItem.name} />
                        </div>
                        <div className={styles.drawerItemSubItemName}>
                          {subItem.name}
                        </div>
                        </Link>
                      </div>
                    )
                  })
              }
              </div>
          )
        })
      }
    </div>
  )
}

export default Drawer