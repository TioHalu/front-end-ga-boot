import { UseAppSelector } from '@/redux/hooks'
import Base from '../../layouts/base'
import styles from '../Images/index.module.scss'
import Table from '@/component/elements/Table'
import { API } from '@/configs'
import axios from 'axios'
import { useEffect, useState } from 'react'
import formatDate from '@/utils/formatDate'
import PersonIcon from '@mui/icons-material/Person'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MyModal from '@/component/elements/Modal'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Input from '@/component/elements/Input'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import Button from '@/component/elements/Button'
import { User } from '../GitlabConfig'
import Select, { MultiValue } from 'react-select'

export type ProjectType = {
  projectId: string
  projectName: string
  projectLead: string
  projectMembers: Array<string>
  projectNamespace: string
  createdAt: Date
  updatedAt: Date | null
}

export default function ProjectPage() {
  const user: any = UseAppSelector((state: any) => state.authLogin)
  const [projects, setProjects] = useState<ProjectType[]>()
  const [isLoading, setIsloading] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectType>()
  const [modalAdd, setModalAdd] = useState(false)
  const [projectMembers, setProjectMembers] = useState<
    MultiValue<{ label: string; value: string }>
  >([])
  const [isUpdated, setIsUpdated] = useState(false)

  const formik = useFormik({
    initialValues: {
      projectName: '',
      projectLead: ''
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required('Required'),
      projectLead: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      if (!projectMembers.length) {
        toast.error('Pilih project member!')
        return
      }
      const loading = toast.loading('Menambahkan...')
      try {
        if (isUpdated) {
          axios.put(
            API.project + `/${selectedProject?.projectId}`,
            { ...values, projectMembers: projectMembers.map((p) => p.value) },
            {
              headers: {
                'auth-token': user?.user?.data?.token
              }
            }
          )

          toast.success('Berhasil mengupdate')
        } else {
          axios.post(
            API.project,
            { ...values, projectMembers: projectMembers.map((p) => p.value) },
            {
              headers: {
                'auth-token': user?.user?.data?.token
              }
            }
          )

          toast.success('Berhasil menambahkan')
        }

        setModalAdd(false)
        formik.resetForm()
        setProjectMembers([])
        setIsUpdated(false)
        getAllProject()
      } catch (error: any) {
        console.log('🚀 ~ file: index.tsx:62 ~ ProjectPage ~ error:', error)
        toast.error(error.message)
      } finally {
        toast.remove(loading)
      }
    }
  })

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

  const getAllProject = async () => {
    setIsloading(true)
    try {
      const res = await axios(API.project, {
        headers: {
          'auth-token': user?.user?.data?.token
        }
      })

      setProjects(res.data.data)
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:12 ~ getAllProject ~ error:', error)
    } finally {
      setIsloading(false)
    }
  }

  const deleteProject = async () => {
    const loading = toast.loading('Menghapus...')
    try {
      await axios.delete(API.project + `/${selectedProject?.projectId}`, {
        headers: {
          'auth-token': user?.user?.data?.token
        }
      })

      setModalDelete(false)
      toast.success('Berhasil menghapus')
      getAllProject()
    } catch (error: any) {
      console.log('🚀 ~ file: index.tsx:53 ~ deleteProject ~ error:', error)
      toast.error(error.message)
    } finally {
      toast.remove(loading)
    }
  }

  const editButtonHandler = (id: string) => {
    return async () => {
      try {
        const res = await axios(API.project + `/${id}`, {
          headers: {
            'auth-token': user?.user?.data?.token
          }
        })

        setSelectedProject(res.data.data)
        setIsUpdated(true)
        formik.setFieldValue('projectName', res.data.data.projectName)
        formik.setFieldValue('projectLead', res.data.data.projectLead)
        setProjectMembers(
          res.data.data.projectMembers.map((p: string) => {
            return {
              label: p,
              value: p
            }
          })
        )
        setModalAdd(true)
      } catch (error) {
        console.log('🚀 ~ file: index.tsx:140 ~ editButtonHandler ~ error:', error)
      }
    }
  }

  useEffect(() => {
    getAllProject()
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dataTable = [
    {
      title: 'Project ID',
      value: projects?.map((project) => project.projectId)
    },
    {
      title: 'Project Name',
      value: projects?.map((project) => project.projectName)
    },
    {
      title: 'Project Lead',
      value: projects?.map((project) => project.projectLead)
    },
    {
      title: 'Project Members',
      value: projects?.map((project) => project.projectMembers.join(', '))
    },
    {
      title: 'CreatedAt',
      value: projects?.map((project) => formatDate(project.createdAt))
    },
    {
      title: 'Action',
      value: projects?.map((project, index) => {
        return (
          <>
            <button onClick={editButtonHandler(project.projectId)}>
              <EditIcon className='text-yellow' />
            </button>
            <button
              onClick={() => {
                setSelectedProject(project)
                setModalDelete(true)
              }}
            >
              <DeleteIcon className='text-red' />
            </button>
          </>
        )
      })
    }
  ]

  const closeModalAdd = () => {
    setModalAdd(false)
    formik.resetForm()
    setProjectMembers([])
    setIsUpdated(false)
  }

  return (
    <Base>
      <div className={styles.wrapper}>
        <h1>Project</h1>
        <Button onClick={() => setModalAdd(true)}>+ Add Project</Button>
      </div>
      <div className={styles.tableWrapper}>
        <Table data={dataTable} pageSize={10} loading={isLoading} />
      </div>

      {/* Modal Add */}
      <MyModal open={modalAdd} onClose={closeModalAdd}>
        <form onSubmit={formik.handleSubmit}>
          <Input
            variant='form'
            label='Project Name'
            disabled={isUpdated}
            errors={formik.touched.projectName && formik.errors.projectName}
            onChange={formik.handleChange}
            value={formik.values.projectName}
            icon={<AccountTreeIcon />}
            name='projectName'
          />
          <Input
            placeholder='Pilih Project Lead'
            variant='select'
            label='Project Lead'
            errors={formik.touched.projectLead && formik.errors.projectLead}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('projectLead', e.target.value)
            }
            options={users?.map((user) => {
              return {
                label: user.username,
                value: user.username
              }
            })}
            value={formik.values.projectLead}
            selected={formik.values.projectLead}
            icon={<PersonIcon />}
            name='projectLead'
          />

          <label className='font-secondary font-bold block'>Project Members</label>
          <Select
            isMulti
            name='projectMembers'
            value={projectMembers}
            onChange={(value) => {
              setProjectMembers(value)
            }}
            options={users?.map((user) => {
              return {
                label: user.username,
                value: user.username
              }
            })}
            className='basic-multi-select'
            classNamePrefix='select'
          />

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
              {isUpdated
                ? formik.isSubmitting
                  ? 'Mengupdate...'
                  : 'Update'
                : formik.isSubmitting
                ? 'Menambahkan...'
                : 'Tambah'}
            </button>
          </div>
        </form>
      </MyModal>

      {/* Modal Delete */}
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
          <button className='px-8 py-2 rounded-2xl bg-red text-white' onClick={deleteProject}>
            Hapus
          </button>
        </div>
      </MyModal>
    </Base>
  )
}
