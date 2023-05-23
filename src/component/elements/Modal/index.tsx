import { Modal, Text } from '@nextui-org/react'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'

type Props = {
	open: boolean
	title?: string
	children?: any
	onClose: () => void
	width?: string
}

export default function component({ open, title, children, onClose, width }: Props) {
	return (
		<Modal width={width} onClose={onClose} open={open} className={styles.root}>
			<Modal.Header>
				<Text h3>{title}</Text>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
		</Modal>
	)
}
