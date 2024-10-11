import s from './Container.module.css'

export const Container = ({children, type}) => {
    return <div className={`${s.container} ${s[type]}`}>
        {children}
    </div>
}
