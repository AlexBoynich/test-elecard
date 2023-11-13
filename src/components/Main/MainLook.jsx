import Card from './Card.jsx'
import { TransitionGroup, CSSTransition } from "react-transition-group";

const MainLook = ({remove, ...props}) => {
    return (
        <div>
            <TransitionGroup className='cards'>
                {props.posts.map( (el, id) => {
                    return <CSSTransition
                                key={el.timestamp}
                                timeout={500}
                                classNames='card'             
                            >
                                <Card
                                    post={el} 
                                    key={id} 
                                    remove={remove} 
                                    className='card'
                                />
                            </CSSTransition>
                }
                )}
            </TransitionGroup>
        </div>
    )
}

export default MainLook