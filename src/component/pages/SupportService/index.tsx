import { UseAppSelector } from '@/redux/hooks'
import Base from '../../layouts/base'
import styles from './index.module.scss'
import Table from '@/component/elements/Table'
import { API } from '@/configs'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import formatDate from '@/utils/formatDate'
import DeleteIcon from '@mui/icons-material/Delete'
import { toast } from 'react-hot-toast'
import Button from '@/component/elements/Button'
import MyModal from '@/component/elements/Modal'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Input from '@/component/elements/Input'
import PersonIcon from '@mui/icons-material/Person'
import { FiTrash } from 'react-icons/fi'
import { BsFillClipboard2Fill, BsFillBoxSeamFill, BsDatabaseFill } from 'react-icons/bs'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { TfiTarget } from 'react-icons/tfi'

export type SupportServiceType = {
  name: string
  developerName: string
  namespace: string
  status: string
  restarts: number
  image: string
  creationTimestamp: Date
  serviceNetworkName: string
}

export type SupportForm = {
  devName: string
  namespace: string
  serviceName: string
  image: string
  targetPort: number
  volumeMounts: string
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

export default function SupportServicePage() {
  const user: any = UseAppSelector((state: any) => state.authLogin)
  const [supportService, setSupportService] = useState<SupportServiceType[]>()
  const [isLoading, setIsloading] = useState(false)
  const [selectedSupport, setSelectedSupport] = useState<SupportServiceType>()
  const [modalDelete, setModalDelete] = useState(false)
  const [modalAdd, setModalAdd] = useState(false)
  const [env, setEnv] = useState<{ id: number; key: string; value: string }[]>([])

  const [namespace, setNamespace] = useState<Array<string>>()
  const getNamespace = async () => {
    try {
      const res = await axios(API.deployment + '/namespace', {
        headers: {
          'auth-token': user?.user?.data?.token
        }
      })

      setNamespace(res.data.data)
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:136 ~ getNamespaces ~ error:', error)
    }
  }

  const [users, setUsers] = useState<User[]>()
  const getUsers = async () => {
    try {
      const res = await axios(API.user, {
        headers: {
          'auth-token': user?.user?.data?.token
        }
      })

      setUsers(res.data.data)
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:136 ~ getNamespaces ~ error:', error)
    }
  }

  const formik = useFormik<SupportForm>({
    initialValues: {
      devName: user?.user?.data?.name,
      namespace: '',
      serviceName: '',
      image: '',
      targetPort: 1,
      volumeMounts: ''
    },
    validationSchema: Yup.object<SupportForm>({
      devName: Yup.string().required('Required'),
      serviceName: Yup.string().required('Required'),
      namespace: Yup.string().required('Required'),
      image: Yup.string().required('Required'),
      volumeMounts: Yup.string().required('Required'),
      targetPort: Yup.number().min(1, 'Minimal 1').required('Required')
    }),
    onSubmit: async (values) => {
      const envv = {
        env: { ...envToEnv }
      }

      const loading = toast.loading('Menambahkan...')
      console.log({ ...values, env: envv.env })
      try {
        await axios.post(
          API.supportService,
          { ...values, env: envv.env },
          {
            headers: {
              'auth-token': user?.user?.data?.token
            }
          }
        )

        toast.success('Berhasil deploy')

        closeModalAdd()
        getAllImage()
      } catch (error: any) {
        console.log('🚀 ~ file: index.tsx:187 ~ Deploy ~ error:', error)
        toast.error(error.message)
      } finally {
        toast.remove(loading)
      }
    }
  })

  const envToEnv = useMemo(() => {
    return env.reduce((acc: any, obj) => {
      acc[obj.key] = obj.value
      return acc
    }, {})
  }, [env])

  const onChangeEnv = (id: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const copyEnv: Array<any> = [...env]
      copyEnv[id][e.target.name] = e.target.value
      setEnv(copyEnv)
    }
  }

  const addMoreEnv = () => {
    setEnv((prev) => [...prev, { id: Date.now(), key: '', value: '' }])
  }

  const deleteEnv = (id: number) => {
    return () => {
      const filtered = env.filter((a) => a.id !== id)
      setEnv(filtered)
    }
  }

  const deleteSupportService = async () => {
    const loading = toast.loading('Menghapus...')
    try {
      await axios.delete(
        API.supportService +
          `?namespace=${selectedSupport?.namespace}&serviceName=${selectedSupport?.name}&devName=${selectedSupport?.developerName}`,
        {
          headers: {
            'auth-token': user?.user?.data?.token
          }
        }
      )

      toast.success('Berhasil menghapus')
      getAllImage()
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:41 ~ deleteSupportService ~ error:', error)
      toast.error('Kesalahan!')
    } finally {
      setModalDelete(false)
      toast.remove(loading)
    }
  }

  const getAllImage = async () => {
    setIsloading(true)
    try {
      const res = await axios(API.supportService, {
        headers: {
          'auth-token': user?.user?.data?.token
        }
      })

      setSupportService(res.data.data)
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:12 ~ getAllImage ~ error:', error)
    } finally {
      setIsloading(false)
    }
  }

  useEffect(() => {
    getAllImage()
    getNamespace()
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dataTable = [
    {
      title: 'Support Services Name',
      value: supportService?.map((s) => s.name)
    },
    {
      title: 'Image',
      value: supportService?.map((s) => s.image)
    },
    {
      title: 'Namespace',
      value: supportService?.map((s) => s.namespace)
    },
    {
      title: 'Restarts',
      value: supportService?.map((s) => s.restarts)
    },
    {
      title: 'Status',
      value: supportService?.map((s) => s.status)
    },
    {
      title: 'Developer Name',
      value: supportService?.map((s) => s.developerName)
    },
    {
      title: 'Creation Timestamp',
      value: supportService?.map((s) => formatDate(s.creationTimestamp))
    },
    {
      title: 'Action',
      value: supportService?.map((data, index) => {
        return (
          <div key={index} className={styles.action}>
            <button
              onClick={() => {
                setSelectedSupport(data)
                setModalDelete(true)
              }}
              title='Delete Support Service'
            >
              <DeleteIcon className='text-red' />
            </button>
          </div>
        )
      })
    }
  ]

  const closeModalAdd = () => {
    setModalAdd(false)
    formik.resetForm()
    setEnv([])
  }

  return (
    <Base>
      <div className={styles.wrapper}>
        <h1>Support Service</h1>
        <Button onClick={() => setModalAdd(true)}>+ Add Support Service</Button>
      </div>
      <div className={styles.tableWrapper}>
        <Table data={dataTable} pageSize={10} loading={isLoading} />
      </div>

      <MyModal width='670px' open={modalAdd} onClose={closeModalAdd}>
        <form onSubmit={formik.handleSubmit}>
          {user?.user?.data?.roleId === 1 ? (
            <Input
              placeholder='Pilih Developer'
              variant='select'
              label='Developer Name'
              errors={formik.touched.devName && formik.errors.devName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                formik.setFieldValue('devName', e.target.value)
              }
              options={users?.map((user) => {
                return {
                  label: user.username,
                  value: user.username
                }
              })}
              value={formik.values.devName}
              icon={<PersonIcon />}
              name='devName'
            />
          ) : (
            <Input
              variant='form'
              label='Developer Name'
              disabled={true}
              errors={formik.touched.devName && formik.errors.devName}
              onChange={formik.handleChange}
              value={formik.values.devName}
              icon={<PersonIcon />}
              name='devName'
            />
          )}
          <Input
            variant='select'
            name='namespace'
            placeholder='Pilih namespace'
            label='Namespace'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('namespace', e.target.value)
            }
            options={namespace?.map((ns: string) => {
              return {
                label: ns,
                value: ns
              }
            })}
            errors={formik.touched.namespace && formik.errors.namespace}
            selected={formik.values.namespace}
            icon={<BsFillClipboard2Fill className='ml-1' size={22} />}
          />
          <Input
            variant='form'
            label='Addons Service Name'
            errors={formik.touched.serviceName && formik.errors.serviceName}
            onChange={formik.handleChange}
            value={formik.values.serviceName}
            icon={<BsFillBoxSeamFill className='ml-1' size={22} />}
            name='serviceName'
          />
          <Input
            variant='form'
            label='Images'
            errors={formik.touched.image && formik.errors.image}
            onChange={formik.handleChange}
            value={formik.values.image}
            icon={<BsFillBoxSeamFill className='ml-1' size={22} />}
            name='image'
          />
          <Input
            variant='form'
            label='Mount Path'
            errors={formik.touched.volumeMounts && formik.errors.volumeMounts}
            onChange={formik.handleChange}
            value={formik.values.volumeMounts}
            icon={<BsDatabaseFill className='ml-1' size={22} />}
            name='volumeMounts'
          />
          <Input
            variant='form'
            label='Target Port'
            errors={formik.touched.targetPort && formik.errors.targetPort}
            onChange={formik.handleChange}
            value={formik.values.targetPort}
            icon={<TfiTarget className='ml-1' size={22} />}
            name='targetPort'
            type='number'
          />

          <div className='mt-4'>
            <label className='font-secondary font-bold block'>Environment Variable</label>
            {env.length > 0 &&
              env.map((a, id) => (
                <>
                  <div className='flex items-center space-x-4' key={a.id}>
                    <Input
                      variant='form'
                      // errors={formik.touched.repositoryName && formik.errors.repositoryName}
                      onChange={onChangeEnv(id)}
                      value={a.key}
                      name='key'
                    />
                    <Input
                      variant='form'
                      // errors={formik.touched.repositoryName && formik.errors.repositoryName}
                      onChange={onChangeEnv(id)}
                      value={a.value}
                      name='value'
                    />
                    <button onClick={deleteEnv(a.id)} type='button'>
                      <FiTrash size={22} className='text-blue-500' />
                    </button>
                  </div>
                </>
              ))}
            <button
              type='button'
              onClick={addMoreEnv}
              className='flex text-blue-500 items-center space-x-2 border-2 rounded-lg px-4 py-1 border-blue-500 font-semibold'
            >
              <AiOutlinePlusCircle size={22} />{' '}
              <span>{env.length > 0 ? 'Add More Variable' : 'Environment Variable'}</span>
            </button>
          </div>

          <div className='flex justify-center items-center space-x-6 mt-6'>
            <button
              disabled={formik.isSubmitting}
              onClick={closeModalAdd}
              className='px-8 py-2 rounded-2xl border-2 border-red text-red'
              type='button'
            >
              Batal
            </button>
            <button
              disabled={formik.isSubmitting}
              className='px-8 py-2 rounded-2xl bg-green text-white disabled:bg-gray-300'
              type='submit'
            >
              {formik.isSubmitting ? 'Menambahkan...' : 'Tambah'}
            </button>
          </div>
        </form>
      </MyModal>

      {/* Modal delete deploy */}
      <MyModal open={modalDelete} onClose={() => setModalDelete(false)}>
        <h1>Yakin ingin menghapusnya ?</h1>

        <div className='flex justify-center items-center space-x-6 mt-6'>
          <button
            onClick={() => {
              setModalDelete(false)
            }}
            className='px-8 py-2 rounded-2xl border-2 border-red text-red'
            type='button'
          >
            Batal
          </button>
          <button
            className='px-8 py-2 rounded-2xl bg-red text-white'
            onClick={deleteSupportService}
          >
            Hapus
          </button>
        </div>
      </MyModal>
    </Base>
  )
}
