import { useState } from "react"
import MyModal from "../UI/MyModal/MyModal"
import { getMonthes } from "../../utils/getMonthes"


const TreeLook = (props) => {

    const [modal, setModal] = useState(false)
    const [children, setChildren] = useState('')

    const openModal = (el) => {
        setChildren(el)
        setModal(true)
    }

    return (
        <div style={{margin: '120px 20px 120px'}}>
            <MyModal visible={modal} setVisible={setModal}>
                {children ? <img style={{maxWidth: '100%'}} src={children} alt="" /> : ''}
            </MyModal>
            <details>
                <summary>root</summary>
                <div >{props.posts.map((el, index)=> {
                return  <details style={{marginLeft: '20px'}} key={el.timestamp}>
                    <summary>{index}</summary>
                    <div style={{marginLeft: '20px'}}>
                        <img src={`http://contest.elecard.ru/frontend_data/${el.image}`} style={{width: '80px', height: '40px'}} onClick={el => openModal(el.target.src)} alt="" />
                        <p>Дата: {new Date(el.timestamp).getDate()} {getMonthes(new Date(el.timestamp).getMonth())} Время: {new Date(el.timestamp).getHours()}:{new Date(el.timestamp).getMinutes()}</p>
                        <p>Категория: {el.category}</p>
                        <p>Размер файла: {el.filesize}</p>
                    </div>
            </details>
        })}</div>
        </details>
        </div>
    )
}

export default TreeLook