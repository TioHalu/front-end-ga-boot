import { UseAppSelector } from '@/redux/hooks'
import Base from '../../layouts/base'
import styles from './index.module.scss'
import Table from '@/component/elements/Table'
import { API } from '@/configs'
import axios from 'axios'
import { useEffect, useState } from 'react'
import formatDate from '@/utils/formatDate'
import DeleteIcon from '@mui/icons-material/Delete'

export type ImageType = {
  userId: string
  devName: string
  repositoryName: string
  username: string
  email: string
  projectID: number
  namespaces: string
  updatedAt: string | null
  createdAt: Date
}

export default function ImagePage() {
  const user: any = UseAppSelector((state: any) => state.authLogin)
  const [images, setImages] = useState<ImageType[]>()
  const [isLoading, setIsloading] = useState(false)

  const getAllImage = async () => {
    setIsloading(true)
    try {
      const res = await axios(API.images, {
        headers: {
          'auth-token': user?.user?.data?.token
        }
      })

      setImages(res.data.data)
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:12 ~ getAllImage ~ error:', error)
    } finally {
      setIsloading(false)
    }
  }

  useEffect(() => {
    getAllImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dataTable = [
    {
      title: 'Repository',
      value: images?.map((image) => image.repositoryName)
    },
    {
      title: 'Developer Name',
      value: images?.map((image) => image.devName)
    },
    {
      title: 'Namespace',
      value: images?.map((image) => image.namespaces)
    },
    {
      title: 'Project ID',
      value: images?.map((image) => image.projectID)
    },
    {
      title: 'CreatedAt',
      value: images?.map((image) => formatDate(image.createdAt))
    },
    {
      title: 'Action',
      value: images?.map((data, index) => {
        return (
          <div key={index} className={styles.action}>
            <button
              // onClick={() => {
              //   setSelectedDeploy(data)
              //   setModalDelete(true)
              // }}
              title='Delete Image'
            >
              <DeleteIcon className='text-red' />
            </button>
          </div>
        )
      })
    }
  ]

  return (
    <Base>
      <div className={styles.wrapper}>
        <h1>Images Registry</h1>
      </div>
      <div className={styles.tableWrapper}>
        <Table data={dataTable} pageSize={10} loading={isLoading} />
      </div>
    </Base>
  )
}
