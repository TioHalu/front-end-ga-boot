import Base from '../../layouts/base'

import styles from './index.module.scss'
import Table from '@/component/elements/Table'
import Button from '@/component/elements/Button'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import api from '@/configs/api'
import { UseAppSelector } from '@/redux/hooks'
import formatDate from '@/utils/formatDate'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Modal from '@/component/elements/Modal'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import PersonIcon from '@mui/icons-material/Person'
import Input from '@/component/elements/Input'
import { API } from '@/configs'
import { FiGitlab, FiKey } from 'react-icons/fi'
import { AiFillProject, AiOutlineMail } from 'react-icons/ai'
import { BiNotepad } from 'react-icons/bi'
import { BsShieldFill, BsFillClipboard2Fill } from 'react-icons/bs'
import { toast } from 'react-hot-toast'

export interface Gitlab {
	userId: string
	devName: string
	repositoryName: string
	username: string
	email: string
	projectID: number
	namespaces: string
	updatedAt: Date | null
	createdAt: Date
}

export interface User {
	userId: string
	name: string
	username: string
	email: string
	roleId: number
	namespaces: string
	createdAt: string
	updatedAt: string | null
}

export default function GitlabConfig() {
	const [gitlabConfigs, setGitlabConfigs] = useState<Gitlab[] | null>()
	const [loading, setLoading] = useState<boolean>(false)
	const [modalAdd, setModalAdd] = useState<boolean>(false)
	const [modalDelete, setModalDelete] = useState(false)
	const [users, setUsers] = useState<User[]>()
	const [selectedId, setSelectedId] = useState<string>()

	const user = UseAppSelector((state: any) => state.authLogin)

	const getAllUser = useCallback(async () => {
		try {
			const res = await axios.get(API.user, {
				headers: {
					'auth-token': user?.user?.data?.token,
				},
			})

			setUsers(res.data.data)
			formik.setFieldValue('devName', res.data.data.at(0)?.name)
			formik.setFieldValue('email', res.data.data.at(0)?.email)
			formik.setFieldValue('namespaces', res.data.data.at(0)?.namespaces)
		} catch (error) {
			console.log('🚀 ~ file: index.tsx:42 ~ getAllUser ~ error:', error)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.user?.data?.token])

	useEffect(() => {
		getAllUser()
	}, [getAllUser])

	const formik = useFormik({
		initialValues: {
			devName: users?.at(0)?.name,
			repositoryName: '',
			username: '',
			password: '',
			projectID: '',
			accessToken: '',
			email: users?.at(0)?.email,
			namespaces: users?.at(0)?.namespaces,
		},
		// validationSchema: Yup.object({
		// 	firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
		// 	lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
		// 	email: Yup.string().email('Invalid email address').required('Required'),
		// }),
		onSubmit: async values => {
			const toastLoading = toast.loading('Menambahkan...')
			try {
				await axios.post(API.gitlab, values, {
					headers: {
						'auth-token': user?.user?.data?.token,
					},
				})

				setModalAdd(false)
				formik.resetForm()
				getGitlabConfig()
				toast.success('Berhasil menambahkan gitlab config')
			} catch (error) {
				console.log('🚀 ~ file: index.tsx:95 ~ GitlabConfig ~ error:', error)
				toast.error('Gagal Menambahkan')
			} finally {
				toast.remove(toastLoading)
			}
		},
	})

	console.log(formik.values)

	const getGitlabConfig = useCallback(async () => {
		setLoading(true)
		try {
			const res = await axios.get(api.gitlab, {
				headers: {
					'auth-token': user?.user?.data?.token,
				},
			})

			setGitlabConfigs(res.data.data)
		} catch (error) {
			console.log('🚀 ~ file: index.tsx:41 ~ getGitlabConfig ~ error:', error)
		} finally {
			setLoading(false)
		}
	}, [user?.user?.data?.token])

	const deleteGitlabHandler = async () => {
		const toastLoad = toast.loading('Menghapus...')
		try {
			await axios.delete(API.gitlab + selectedId, {
				headers: {
					'auth-token': user?.user?.data?.token,
				},
			})

			toast.success('Berhasil Menghapus!')
			setModalDelete(false)
			getGitlabConfig()
		} catch (error) {
			console.log('🚀 ~ file: index.tsx:141 ~ deleteGitlabHandler ~ error:', error)
			toast.error('Gagal Menghapus!')
		} finally {
			toast.remove(toastLoad)
		}
	}

	useEffect(() => {
		getGitlabConfig()
	}, [getGitlabConfig])

	const dataTable = [
		{
			title: 'Developer Name',
			value: gitlabConfigs?.map(data => data.devName),
		},
		{
			title: 'Repository',
			value: gitlabConfigs?.map(data => data.repositoryName),
		},
		{
			title: 'Project ID',
			value: gitlabConfigs?.map(data => data.projectID),
		},
		{
			title: 'Email',
			value: gitlabConfigs?.map(data => data.email),
		},
		{
			title: 'Username Gitlab DeOps',
			value: gitlabConfigs?.map(data => data.username),
		},
		{
			title: 'Namespace',
			value: gitlabConfigs?.map(data => data.namespaces),
		},
		{
			title: 'Created At',
			value: gitlabConfigs?.map(data => formatDate(data.createdAt)),
		},
		,
		{
			title: 'Action',
			value: gitlabConfigs?.map((data, index) => {
				return (
					<div key={index} className={styles.action}>
						<button>
							<EditIcon className="text-yellow" />
						</button>
						<button
							onClick={() => {
								setSelectedId(data.userId)
								setModalDelete(true)
							}}
						>
							<DeleteIcon className="text-red" />
						</button>
					</div>
				)
			}),
		},
	]

	return (
		<Base>
			<div className={styles.wrapper}>
				<h1>Gitlab Config</h1>
				<Button onClick={() => setModalAdd(prev => !prev)}>+ Tambahkan Gitlab Config</Button>
			</div>
			<div className={styles.tableWrapper}>
				<Modal
					width="600px"
					onClose={() => {
						setModalAdd(false)
						formik.resetForm()
					}}
					open={modalAdd}
				>
					<form onSubmit={formik.handleSubmit}>
						<Input
							variant="select"
							name="devName"
							label="Developer Name"
							errors={formik.touched.devName && formik.errors.devName}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								formik.setFieldValue('devName', e.target.value)

								formik.setFieldValue('email', users?.find(user => user.name === e.target.value)?.email)
								formik.setFieldValue('namespaces', users?.find(user => user.name === e.target.value)?.namespaces)
							}}
							options={users?.map(user => {
								return {
									label: user.name,
									value: user.name,
								}
							})}
							icon={<PersonIcon />}
							selected={formik.values.devName}
						/>

						<Input
							variant="form"
							label="Repository"
							errors={formik.touched.repositoryName && formik.errors.repositoryName}
							onChange={formik.handleChange}
							value={formik.values.repositoryName}
							icon={<FiGitlab className="ml-1" size={22} />}
							name="repositoryName"
						/>

						<div className="flex items-center space-x-4 w-full">
							<Input
								variant="form"
								label="Project ID"
								errors={formik.touched.projectID && formik.errors.projectID}
								onChange={formik.handleChange}
								value={formik.values.projectID}
								icon={<FiKey className="ml-1" size={22} />}
								name="projectID"
							/>
							<Input
								variant="form"
								label="Access Token"
								errors={formik.touched.accessToken && formik.errors.accessToken}
								onChange={formik.handleChange}
								value={formik.values.accessToken}
								icon={<AiFillProject className="ml-1" size={22} />}
								name="accessToken"
							/>
						</div>

						<Input
							variant="form"
							label="Username Deploy Token"
							errors={formik.touched.username && formik.errors.username}
							onChange={formik.handleChange}
							value={formik.values.username}
							icon={<BiNotepad className="ml-1" size={22} />}
							name="username"
						/>

						<Input
							variant="form"
							label="Password Deploy Token"
							errors={formik.touched.password && formik.errors.password}
							onChange={formik.handleChange}
							value={formik.values.password}
							icon={<BsShieldFill className="ml-1" size={22} />}
							name="password"
						/>

						<Input
							variant="select"
							name="email"
							label="Email"
							errors={formik.touched.email && formik.errors.email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue('email', e.target.value)}
							options={users?.map(user => {
								return {
									label: user.email,
									value: user.email,
								}
							})}
							icon={<AiOutlineMail />}
							selected={formik.values.email}
						/>

						<Input
							variant="select"
							name="namespaces"
							label="Namespaces"
							errors={formik.touched.namespaces && formik.errors.namespaces}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue('namespaces', e.target.value)}
							options={users?.map(user => {
								return {
									label: user.namespaces,
									value: user.namespaces,
								}
							})}
							icon={<BsFillClipboard2Fill />}
							selected={formik.values.namespaces}
						/>

						<div className="flex justify-center items-center space-x-6 mt-6">
							<button
								onClick={() => {
									setModalAdd(false)
									formik.resetForm()
								}}
								className="px-8 py-2 rounded-2xl border-2 border-red text-red"
								type="button"
							>
								Batal
							</button>
							<button className="px-8 py-2 rounded-2xl bg-green text-white" type="submit">
								Tambahkan User
							</button>
						</div>
					</form>
				</Modal>
				<Modal open={modalDelete} onClose={() => setModalDelete(false)}>
					<h1>Yakin ingin menghapusnya ?</h1>

					<div className="flex justify-center items-center space-x-6 mt-6">
						<button
							onClick={() => {
								setModalDelete(false)
							}}
							className="px-8 py-2 rounded-2xl border-2 border-red text-red"
							type="button"
						>
							Batal
						</button>
						<button className="px-8 py-2 rounded-2xl bg-red text-white" onClick={deleteGitlabHandler}>
							Hapus
						</button>
					</div>
				</Modal>
				<Table data={dataTable} pageSize={10} loading={loading} />
			</div>
		</Base>
	)
}
