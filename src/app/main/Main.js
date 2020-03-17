import React from 'react'
import {Route} from 'react-router-dom'
import EquipementDetails from './equipementDetails/EquipementDetails'
import EquipementList from './equipoementsList/EquipementList'
import style from './Main.scss'

const Main = () => (
    <div className={style.main}>
        <Route exact path="/" component={EquipementList}/>
        <Route exact path="/equipement/:equipementId" component={EquipementDetails}/>
    </div>
)

export default Main
