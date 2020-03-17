import React from 'react'
import style from './InfoLine.scss'

const InfoLine = ({title, value}) => (
    <div className={style.infoLineContainer}>
        <span className={style.infoTitle}>{title}</span>
        : {value}
    </div>
)

export default InfoLine
