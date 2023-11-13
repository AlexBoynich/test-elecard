import classes from './Header.module.css'

const Header = (props) => {
    return (
        <div className={classes.header}>
            <h1 className={classes.title}>Header</h1>
            <div style={{display: 'flex', gap: '20px'}}>
                <label htmlFor="">
                    <input type="radio" name="look" value='main' defaultChecked onClick={(event)=> props.setLook(event.target.value)} />Карточки
                </label>
                <label htmlFor="">Древовидный список
                    <input type="radio" name="look" value='tree' onClick={(event)=> props.setLook(event.target.value)} />
                </label>
            </div>
        </div>
    )
}

export default Header