import { useEffect } from "react"
import { getMonthes } from "../../utils/getMonthes"


const Card = ({remove, ...props}) => {

    const removeCard = () => {
        remove(props.post.timestamp)
    }

    return (
        <div className="card">
            <div 
                className="pointer"
                onClick={removeCard}
            >
               &#10006;
            </div>
            <figure>
                <p>
                    <img
                        src={`http://contest.elecard.ru/frontend_data/${props.post.image}`}
                        alt={props.post.category}
                        className="cardImage"
                    />
                </p>
                <figcaption>Название: {props.post.name}</figcaption>
                <figcaption>Категория: {props.post.category}</figcaption>
                <figcaption>Дата: {new Date(props.post.timestamp).getDate()} {getMonthes(new Date(props.post.timestamp).getMonth())} {new Date(props.post.timestamp).getHours()}:{new Date(props.post.timestamp).getMinutes()}</figcaption>
                <figcaption>Размер файла: {props.post.filesize} кб</figcaption>
            </figure>
        </div>
    )
}

export default Card