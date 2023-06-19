import Base from '../../layouts/base'

import styles from './index.module.scss'
import Table from '@/component/elements/Table'
import Button from '@/component/elements/Button'

import Modal from '@/component/elements/Modal'
import { useCallback, useEffect, useState } from 'react'
import Input from '@/component/elements/Input'
import PersonIcon from '@mui/icons-material/Person'
import { BsBoxSeam, BsFillClipboard2Fill, BsFillTagsFill, BsStack } from 'react-icons/bs'
import { FiKey, FiTrash } from 'react-icons/fi'
import { FaDatabase } from 'react-icons/fa'
import { AiOutlineFileAdd, AiOutlinePlusCircle } from 'react-icons/ai'
import { UseAppSelector } from '@/redux/hooks'
import { useFormik } from 'formik'
import axios from 'axios'
import { API } from '@/configs'

export default function KubeConfigPage() {
  const { user } = UseAppSelector((state: any) => state.authLogin)

  const dataTable = [
    {
      title: 'Service Name',
      value: [
        'aduh',
        'aduhd',
        'adudh',
        'aduh',
        'aduh',
        'aduh',
        'aduh',
        'aduhd',
        'adudh',
        'aduh',
        'aduh',
        'aduh',
        'aduh',
        'aduhd',
        'adudh',
        'aduh',
        'aduh',
        'aduh',
        'aduh',
        'aduhd',
        'adudh',
        'aduh',
        'aduh',
        'aduh',
        'aduh',
        'aduhd',
        'adudh',
        'aduh',
        'aduh',
        'aduh'
      ]
    },
    {
      title: 'Images',
      value: ['aduh', 'aduh']
    },
    {
      title: 'Namespaces',
      value: ['test', 'tfsfd']
    },
    {
      title: 'Deploy At',
      value: ['aduh', 'aduhd', 'adudh', 'aduh', 'aduh', 'aduh']
    },
    {
      title: 'Restart',
      value: ['test', 'tfsfd']
    },
    {
      title: 'Status',
      value: ['aduh', 'aduh']
    },
    {
      title: 'Aksi',
      value: ['aduh', 'aduh']
    }
  ]

  return (
    <Base>
      <div className={styles.wrapper}>
        <h1>Deployment</h1>
        <Button>+ Deploy</Button>
      </div>
      <div className={styles.tableWrapper}>
        <Table data={dataTable} pageSize={10} />
      </div>

      {/* Modal deploy */}
      {/* <Modal width="670px" open={modalAdd} onClose={closeDeployModal}>
				<form onSubmit={formik.handleSubmit}>
					<Input
						variant="form"
						label="Developer Name"
						errors={formik.touched.devName && formik.errors.devName}
						onChange={formik.handleChange}
						disabled={user.data.roleId !== 1}
						value={formik.values.devName}
						icon={<PersonIcon />}
						name="devName"
					/>

					<Input
						variant="form"
						label="Services Name"
						errors={formik.touched.servicesName && formik.errors.servicesName}
						onChange={formik.handleChange}
						value={formik.values.servicesName}
						icon={<BsBoxSeam className="ml-1" size={22} />}
						name="repositoryName"
					/>

					<div className="flex items-center space-x-4">
						<Input
							variant="select"
							name="images"
							label="Images"
							placeholder="Pilih images"
							errors={formik.touched.images && formik.errors.images}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								formik.setFieldValue('images', e.target.value)
								const findImage = images.find(image => image.repositoryName === e.target.value)
								setPID(findImage?.projectID)
							}}
							options={images?.map(image => {
								return {
									label: image.repositoryName,
									value: image.repositoryName,
								}
							})}
							icon={<FaDatabase className="ml-1" size={22} />}
							selected={formik.values.images}
						/>
						<Input
							variant="select"
							name="tags"
							label="Tags"
							// errors={formik.touched.email && formik.errors.email}
							// onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue('email', e.target.value)}
							// options={users?.map(user => {
							// 	return {
							// 		label: user.email,
							// 		value: user.email,
							// 	}
							// })}
							icon={<BsFillTagsFill className="ml-1" size={22} />}
							// selected={formik.values.email}
						/>
					</div>

					<div className="flex items-center space-x-4">
						<Input
							variant="select"
							name="images"
							label="Images Pull Secret"
							// errors={formik.touched.email && formik.errors.email}
							// onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue('email', e.target.value)}
							// options={users?.map(user => {
							// 	return {
							// 		label: user.email,
							// 		value: user.email,
							// 	}
							// })}
							icon={<FiKey className="ml-1" size={22} />}
							// selected={formik.values.email}
						/>
						<Input
							variant="form"
							name="namespaces"
							label="Namespaces"
							onChange={formik.handleChange}
							disabled={user.data.roleId !== 1}
							errors={formik.touched.namespaces && formik.errors.namespaces}
							value={formik.values.namespaces}
							icon={<BsFillClipboard2Fill className="ml-1" size={22} />}
						/>
					</div>

					<Input
						variant="form"
						label="Custom Odoo Addons"
						// errors={formik.touched.repositoryName && formik.errors.repositoryName}
						// onChange={formik.handleChange}
						// value={formik.values.repositoryName}
						icon={<AiOutlineFileAdd className="ml-1" size={22} />}
						name="repositoryName"
					/>

					<div className="flex items-center space-x-4">
						<Input
							variant="form"
							type="number"
							label="Storage"
							// errors={formik.touched.repositoryName && formik.errors.repositoryName}
							// onChange={formik.handleChange}
							// value={formik.values.repositoryName}
							icon={<FaDatabase className="ml-1" size={22} />}
							name="storage"
						/>
						<Input
							variant="form"
							type="number"
							label="Replicas"
							// errors={formik.touched.repositoryName && formik.errors.repositoryName}
							// onChange={formik.handleChange}
							// value={formik.values.repositoryName}
							icon={<BsStack className="ml-1" size={22} />}
							name="replicas"
						/>

						<Input
							variant="toggle"
							label="Auto Sync Images"
							onChange={() => formik.setFieldValue('autoSyncImages', !formik.values.autoSyncImages)}
							name="autoSyncImages"
							value={formik.values.autoSyncImages}
						/>

						<Input
							variant="toggle"
							label="Demo Data"
							// errors={formik.touched.repositoryName && formik.errors.repositoryName}
							onChange={() => formik.setFieldValue('demoData', !formik.values.demoData)}
							name="demoData"
							value={formik.values.demoData}
						/>
					</div>

					<div>
						<label className="font-secondary font-bold block">Addons Services</label>
						{addons.length > 0 &&
							addons.map((a, id) => (
								<>
									<div className="flex items-center space-x-4" key={a.id}>
										<Input
											variant="form"
											// label="Developer Name"
											// errors={formik.touched.repositoryName && formik.errors.repositoryName}
											onChange={onChangeAddons(id)}
											value={a.key}
											name="key"
										/>
										<Input
											variant="select"
											name="addons"
											placeholder="Select Addons"
											// label="Images Pull Secret"
											// errors={formik.touched.email && formik.errors.email}
											onChange={onChangeAddons(id)}
											options={[
												{
													label: 'tes1',
													value: 'tes1',
												},
												{
													label: 'tes2',
													value: 'tes2',
												},
											]}
											selected={a.addons}
										/>
										<button onClick={deleteAddons(a.id)}>
											<FiTrash size={22} className="text-blue-500" />
										</button>
									</div>
								</>
							))}
						<button
							onClick={addMoreAddons}
							className="flex text-blue-500 items-center space-x-2 border-2 rounded-lg px-4 py-1 border-blue-500 font-semibold"
						>
							<AiOutlinePlusCircle size={22} /> <span>{addons.length > 0 ? 'Add More Addons' : 'Addons Services'}</span>
						</button>
					</div>
					<div className="mt-4">
						<label className="font-secondary font-bold block">Environment Variable</label>
						{env.length > 0 &&
							env.map((a, id) => (
								<>
									<div className="flex items-center space-x-4" key={a.id}>
										<Input
											variant="form"
											// errors={formik.touched.repositoryName && formik.errors.repositoryName}
											onChange={onChangeEnv(id)}
											value={a.key}
											name="key"
										/>
										<Input
											variant="form"
											// errors={formik.touched.repositoryName && formik.errors.repositoryName}
											onChange={onChangeEnv(id)}
											value={a.value}
											name="value"
										/>
										<button onClick={deleteEnv(a.id)}>
											<FiTrash size={22} className="text-blue-500" />
										</button>
									</div>
								</>
							))}
						<button
							onClick={addMoreEnv}
							className="flex text-blue-500 items-center space-x-2 border-2 rounded-lg px-4 py-1 border-blue-500 font-semibold"
						>
							<AiOutlinePlusCircle size={22} /> <span>{env.length > 0 ? 'Add More Variable' : 'Environment Variable'}</span>
						</button>
					</div>

					<div className="flex justify-center items-center space-x-6 mt-6">
						<button onClick={closeDeployModal} className="px-8 py-2 rounded-2xl border-2 border-red text-red" type="button">
							Batal
						</button>
						<button className="px-8 py-2 rounded-2xl bg-green text-white" type="submit">
							Deploy
						</button>
					</div>
				</form>
			</Modal> */}
    </Base>
  )
}
