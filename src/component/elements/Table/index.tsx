
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import Button from "../Button"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PropTypes from 'prop-types';
import { Loading } from '@nextui-org/react';

function Component({ data, pageSize, loading }: any) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageData, setPageData] = useState<any>([]);
  useEffect(() => {
      setPageData(data?.map((_: any, index: number) => {
      return {
        title: _.title,
        value: _.value?.slice((currentPage-1)*pageSize, currentPage*pageSize)
      }
    }))
    
  }, [currentPage, data, pageSize])

  let totalPage = Math.ceil(data[0]?.value?.length / pageSize)
  const _handleChangePage = (page: number) => {
    setCurrentPage(page)
  }

  const _nextPage = () => {
    if (currentPage < totalPage) {
      return setCurrentPage(currentPage+1)
    }
  }

  const _prevPage = () => {
    if (currentPage > 1) {
      return setCurrentPage(currentPage-1)
    }
  }

  const _handlFirstPage = () => {
    setCurrentPage(1)
  }

  const _handleLastPage = () => {
    setCurrentPage(totalPage)
  }



  return (
    <div className={styles.root}>
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {pageData?.map((_: any, index: number) => {
              return (
              <th key={index}>{_.title}</th>
            )
          })}
          </tr>
          </thead>
          {!loading && <tbody>
            <tr>
              {pageData?.map((_: any, index: number) => {
                return (
                  <td key={index}>
                    <ul>
                      {_.value?.map((_: any, index: number) => {
                        return (
                          <li key={index}>{_}</li>
                        )
                      })}
                    </ul>
                  </td>
                )
              })}
            </tr>
          </tbody>}
        </table>
        {loading &&<div className={styles.loader}><Loading type="points-opacity" size="xl" /></div>}
      <div className={styles.footer}>
        {currentPage > 1 && <Button variant="small" onClick={()=>_handlFirstPage()}>First</Button>}
        <div className={styles.pagination}>
          {currentPage > 1 && <Button variant="small" className={styles.arrow} onClick={() => _prevPage()}>< ArrowBackIosIcon /></Button>}
        {Array.from({ length: totalPage}, (_, i) => i + 1).map((_: any) => {
          return (
            <Button
              variant="rounded"
              key={_}
              onClick={() => _handleChangePage(_)}
              className={currentPage === _ ? styles.active : styles.inactive}
            >{_}</Button>
            )
        })}
          {currentPage < totalPage && <Button variant="small" className={styles.arrow} onClick={()=>_nextPage()}><ArrowForwardIosIcon/></Button>}
          </div>
        {currentPage < totalPage && <Button variant="small" onClick={()=>_handleLastPage()}>Last</Button>}
      </div>
      </div>
    </div>
  )
}

export default Component

Component.propTypes = {
  data: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  loading: PropTypes.bool
}

Component.defaultProps = {
  data: [{title:"test", value:["test","sts"]},{title:"test", value:["test","sts"]}],
  pageSize: 5,
  loading: true
}