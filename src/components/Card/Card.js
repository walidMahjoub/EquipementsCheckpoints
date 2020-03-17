import React from 'react'
import {Card} from 'antd'
import style from './Card.scss'

const {Meta} = Card

const CustomCard = ({image, title, customStyle, children}) => (
    <Card
        hoverable
        className={style.card}
        style={customStyle}
        cover={image ? <img className={style.cardImg} alt="equipement" src={image}/> : null}

    >
        <Meta title={title}/>
        {children}
    </Card>
)

export default CustomCard
