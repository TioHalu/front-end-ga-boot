import Base from '../../layouts/base'
import styles from './index.module.scss'
import Table from '@/component/elements/Table'
import Button from '@/component/elements/Button'
import Modal from '@/component/elements/Modal'
import Input from '@/component/elements/Input'
import PersonIcon from '@mui/icons-material/Person'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import KeyIcon from '@mui/icons-material/Key'
import EmailIcon from '@mui/icons-material/Email'
import BadgeIcon from '@mui/icons-material/Badge'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { Formik } from 'formik'
import { UseAppDispatch, UseAppSelector } from '@/redux/hooks'
import { member, requestMember, requestMemberById, requestDeleteMember, resetForm } from './reducer'
import { useRef, useEffect } from 'react'
import * as Yup from 'yup'
import { REGEX } from '@/configs'
export default function Deploy() {
	const [open, setOpen] = useState<boolean>(false)
	const user = UseAppSelector((state: any) => state.authLogin)
	const data = UseAppSelector((state: any) => state.member)
	const handleEdit = (id: string) => () => {
		dispatch(requestMemberById({ token: user?.user?.data?.token, id }))
		if (!data?.fetching) {
			setTimeout(() => {
				setOpen(true)
			}, 1000)
		}
	}

	const handledelete = (id: string) => () => {
		dispatch(requestDeleteMember({ token: user?.user?.data?.token, id }))
	}
	const dataTable = [
		{
			title: 'Developer Name',
			value: data?.member?.data?.map((item: any) => item.name),
		},
		{
			title: 'username',
			value: data?.member?.data?.map((item: any) => item.username),
		},
		{
			title: 'Email',
			value: data?.member?.data?.map((item: any) => item.email),
		},
		{
			title: 'Namespaces',
			value: data?.member?.data?.map((item: any) => item.namespaces),
		},
		{
			title: 'Role',
			value: data?.member?.data?.map((item: any) => {
				if (item.roleId === 1) {
					return 'Admin'
				} else {
					return 'User'
				}
			}),
		},
		{
			title: 'Action',
			value: data?.member?.data?.map((item: any, index: number) => {
				return (
					<div key={index} className={styles.action}>
						<button onClick={handleEdit(item.userId)}>
							<EditIcon className={styles.edit} />
						</button>
						<button onClick={handledelete(item.userId)}>
							<DeleteIcon className={styles.delete} />
						</button>
					</div>
				)
			}),
		},
	]
	const dispatch = UseAppDispatch()
	const ref = useRef<any>(null)
	const _handleSubmit = (values: any) => {
		dispatch(member({ ...values, token: user?.user?.data?.token }))
	}
	useEffect(() => {
		dispatch(requestMember({ token: user?.user?.data?.token }))
		if (data.success) {
			setOpen(false)
		}
	}, [dispatch, user, data?.success])
	const option = [
		{
			label: 'pilih',
			value: '',
		},
		{
			label: 'Admin',
			value: '1',
		},
		{
			label: 'User',
			value: '2',
		},
	]
	const handleClose = (helpers: any) => {
		setOpen(false)
		helpers.resetForm()
	}
	const renderComponentModal = (helpers: any) => {
		const { handleChange, values, handleSubmit: _handleSubmit, errors, touched, setFieldValue } = helpers
		const handleSelect = (e: any) => {
			const { value } = e.target
			setFieldValue('roleId', value)
		}
		return (
			<form onSubmit={_handleSubmit}>
				<div className={styles.modalWrapper}>
					<Input
						variant="form"
						label="Nama"
						errors={touched.name && errors.name}
						onChange={handleChange}
						value={values.name}
						icon={<PersonIcon />}
						name="name"
					/>
					<Input
						variant="form"
						label="Username"
						errors={touched.username && errors.username}
						onChange={handleChange}
						value={values.username}
						icon={<PersonAddAlt1Icon />}
						name="username"
					/>
					<Input
						variant="form"
						label="Password"
						errors={touched.password && errors.password}
						onChange={handleChange}
						value={values.password}
						icon={<KeyIcon />}
						name="password"
					/>
					<Input
						variant="form"
						name="email"
						label="Email"
						errors={touched.email && errors.email}
						onChange={handleChange}
						value={values.email}
						icon={<EmailIcon />}
					/>
					<Input
						variant="form"
						name="namespaces"
						label="Namespaces"
						errors={touched.namespaces && errors.namespaces}
						onChange={handleChange}
						value={values.namespaces}
						icon={<BadgeIcon />}
					/>
					<Input
						variant="select"
						name="roleId"
						label="Role"
						errors={touched.roleId && errors.roleId}
						onChange={handleSelect}
						options={option}
						icon={<AdminPanelSettingsIcon />}
						selected={values.roleId}
					/>
					<div className={styles.bottom}>
						<Button className={styles.add} type="submit" loading={data?.fetching} size="sm">
							Tambahkan
						</Button>
						<Button
							className={styles.batal}
							type="button"
							onClick={() => {
								setOpen(false)
								helpers.resetForm()
								dispatch(resetForm())
							}}
						>
							Batal
						</Button>
					</div>
				</div>
			</form>
		)
	}

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Nama harus diisi').min(6, 'Nama minimal 6 karakter'),
		email: Yup.string().required('Email harus diisi').matches(REGEX.email, 'Email tidak valid'),
		password: Yup.string().required('Password harus diisi').min(6, 'Password minimal 6 karakter'),
		roleId: Yup.string().required('Role harus diisi'),
		namespaces: Yup.string().required('Namespaces harus diisi').matches(REGEX.namespace, 'Namespaces tidak valid'),
		username: Yup.string().required('Username harus diisi').min(6, 'Username minimal 6 karakter'),
	})
	const handleInitialValue = () => {
		return {
			name: data?.memberId?.data?.name,
			email: data?.memberId?.data?.email,
			password: data?.memberId?.data?.password,
			roleId: data?.memberId?.data?.roleId,
			namespaces: data?.memberId?.data?.namespaces,
			username: data?.memberId?.data?.username,
		}
	}
	let test = handleInitialValue()
	const renderFormik = () => {
		return (
			<Formik
				initialValues={{
					name: data?.memberId?.data?.name || '',
					email: data?.memberId?.data?.email || '',
					password: data?.memberId?.data?.password || '',
					roleId: data?.memberId?.data?.roleId || '',
					namespaces: data?.memberId?.data?.namespaces || '',
					username: data?.memberId?.data?.username || '',
				}}
				component={renderComponentModal}
				validationSchema={validationSchema}
				onSubmit={_handleSubmit}
				innerRef={ref}
			/>
		)
	}
	return (
		<Base>
			<div className={styles.wrapper}>
				<h1>Member</h1>
				<Button onClick={() => setOpen(!open)}>+ tambahkan User</Button>
			</div>
			<div className={styles.tableWrapper}>
				<Modal onClose={() => setOpen(false)} open={open}>
					{renderFormik()}
				</Modal>
				<Table data={dataTable} pageSize={10} loading={data?.loading} />
			</div>
		</Base>
	)
}
