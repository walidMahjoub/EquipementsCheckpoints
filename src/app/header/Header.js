import React from 'react'
import style from './Header.scss'
import {FormattedMessage} from 'react-intl'
import Language from './Language'
import {Link} from 'react-router-dom'

const Header = () => (
    <div className={style.header}>
        <Link to='/'>
            <div className={style.title}>
                <FormattedMessage id="app.header.title"/>
            </div>
        </Link>
        <Language/>
    </div>
)

export default Header
