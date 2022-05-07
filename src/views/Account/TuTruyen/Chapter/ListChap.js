import React, { useCallback, useEffect, useState } from 'react'
import apiMain from '../../../../api/apiMain'
import { loginSuccess } from '../../../../redux/authSlice'
import Grid from '../../../../components/Grid/Grid'
import { toast } from 'react-toastify'
import AddChapter from './AddChapter'

const ListChap = ({ url, user, dispatch,onClickBackFromListChap }) => {
    const [chapters, setChapters] = useState([])
    const [addChap, setAddChap] = useState(false)
    const [chapnumber, setChapnumber] = useState(null)
    
    
    const onClickUpdateChap = (e) => {
      const chapnumber = Number(e.target.getAttribute("data-number"))
      setChapnumber(chapnumber)
      setAddChap(true)
    }
    const onClickDeleteChap = (e) => {
      const chapnumber = Number(e.target.getAttribute("data-number"))
      if (chapnumber) {
        apiMain.deleteChapter({ url, chapnumber }, user, dispatch, loginSuccess)
          .then(res => {
            getChapter()
            toast.success(res.message)
          })
          .catch(err => {
            console.log(err)
            toast.error(err.response.details.message)
          })
      }
    }
    

    const getChapter = useCallback(async () => {
      apiMain.getNameChapters(url, {size:20})
        .then(res => {
          setChapters(res)
        })},[url])

    
    useEffect(()=>{
      getChapter()
    }, [])
  
    const onClickAddChapter = (e) => {
      e.preventDefault()
      setAddChap(true)
      setChapnumber(null)
    }
    return (
      <>{
        addChap ? <AddChapter url={url} chapnumber={chapnumber} user={user} dispatch={dispatch}
         onClickBackFromAddChap={()=>{setAddChap(false)}}
         getChapters={getChapter} /> :
  
          <div>
            <div className='d-flex' style={{ 'justifyContent': 'space-between' }}>
              <span className='text-with-icon' onClick={onClickBackFromListChap}><i className='bx bx-left-arrow' ></i> Danh sách truyện</span>
              <span className='fs-20 fw-6'>Danh sách chương</span>
              <button className='btn-primary' style={{ 'margin': '0px 10px' }} onClick={onClickAddChapter}>Thêm chương</button>
            </div>
            <Grid gap={15} col={2} snCol={1}>
              {
                chapters.map((item, index) => {
                  return (
                    <div key={item.chapnumber}>
                    <div className='d-flex'>
                      <div className="col-10 d-flex" style={{'alignItems':'center'}}>
                        <h4 key={item.chapnumber} name={item.chapnumber} className='text-overflow-1-lines'>{item.tenchap}</h4>
                      </div>
                      <div className="col-2">
                        <span className="text-with-icon" onClick={onClickUpdateChap} data-number={item.chapnumber}><i className='bx bx-edit' data-number={item.chapnumber}></i> Sửa</span>
                        <span className="text-with-icon" onClick={onClickDeleteChap} data-number={item.chapnumber}><i className='bx bx-trash' data-number={item.chapnumber}></i> Xoá</span>
                      </div>
                    </div><hr/></div>
                    )
                })
              }
            </Grid>
          </div>
      }
      </>
    )
  }

  export default ListChap