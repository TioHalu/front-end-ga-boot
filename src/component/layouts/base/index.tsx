import Button from '../../elements/Button'
import Search from '../../elements/Search'
import styles from './styles.module.scss'
import Drawer from './drawer'
import Logo from '@/assets/icons/logo.svg'
import Image from 'next/image'
import { UseAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
export default function Base({ children }: any) {
	const user = UseAppSelector((state: any) => state.authLogin.user)
	const router = useRouter()
	useEffect(() => {
		const pathone = router.pathname.split('/')
		if (pathone[1] === 'administrator' && user.data.roleId !== 1) {
			router.push('/main/dashboard')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.pathname, user?.data?.roleId])

	return (
		<div className={styles.root}>
			<div className={styles.sideBar}>
				<div className={styles.title}>
					<Image src={Logo} alt="logo" />
					<Drawer />
				</div>
			</div>
			<div className={styles.navbarWrapper}>
				<div className={styles.appBar}>
					<h1>Gaboot Deployment Platform</h1>
					<div className={styles.right}>
						<Search placeholder="Cari" />
						<Button>Sync</Button>
					</div>
				</div>
				<div className={styles.content}>{children}</div>
			</div>
		</div>
	)
}
