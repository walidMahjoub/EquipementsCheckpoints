import React, {useState, useEffect, useCallback, useContext} from 'react'
import Card from 'components/Card/Card'
import InfoLine from 'components/InfoLine/InfoLine'
import {FormattedMessage} from 'react-intl'
import {Icon, Table} from "antd"
import style from './EquipementDetails.scss'
import {FirebaseContext} from 'appFirebase'

const EquipementDetails = ({match: {params: {equipementId}}}) => {

    const [equipement, setEquipement] = useState(null)
    const [checkPoints, setCheckPoints] = useState([])

    const firebase = useContext(FirebaseContext)

    const fetchEquipementItem = useCallback(() => {
        firebase.equipement(equipementId).on('value', snapshot => {
            setEquipement(snapshot.val())
        })
    }, [equipementId])

    const fetchCheckPoints = useCallback(() => {
        firebase.checkPointsByEquipementId(equipementId).on('value', snapshot => {
            const checkPoints = Object.entries(snapshot.val()).map(([key, data]) => ({key, ...data}))
            setCheckPoints(checkPoints)
        })
    }, [equipementId])

    useEffect(() => {
        fetchEquipementItem()
        fetchCheckPoints()
    }, [fetchEquipementItem, fetchCheckPoints])

    const columns = [
        {
            title: <FormattedMessage id="app.main.checkPoints.image"/>,
            key: 'key',
            render: record => record.photo ?
                <img alt='equipement' className={style.checkPointImage} src={record.photo}/>
                : <Icon className={style.checkPointImage} type="camera"/>
        },
        {
            title: <FormattedMessage id="app.main.checkPoints.name"/>,
            dataIndex: 'name',
            key: 'id',
            sorter: ({name: a}, {name: b}) => b.localeCompare(a),
        },
        {
            title: <FormattedMessage id="app.main.checkPoints.fault"/>,
            dataIndex: 'fault',
            key: 'fault',
            sorter: ({fault: a}, {fault: b}) => b.localeCompare(a),
        },
        {
            title: <FormattedMessage id="app.main.checkPoints.recommandation"/>,
            dataIndex: 'recommandation',
            key: 'recommandation',
        },
    ]

    return (

        <div>
            {equipement ?
                <div style={{display: 'flex'}}>
                    <Card
                        image={equipement.photo}
                        title={<FormattedMessage id="app.main.equipementDetails.info"/>}
                    >
                        <InfoLine
                            title={<FormattedMessage id="app.main.equipementList.name"/>}
                            value={equipement.name}
                        />
                        <InfoLine
                            title={<FormattedMessage id="app.main.equipementList.domain"/>}
                            value={equipement.domain}
                        />
                        <InfoLine
                            title={<FormattedMessage id="app.main.equipementList.nbFaults"/>}
                            value={equipement.nbFaults}
                        />
                    </Card>

                    <Card
                        title={<FormattedMessage id="app.main.equipementDetails.characteristics"/>}
                        customStyle={{marginLeft: 10}}
                    >
                        <InfoLine
                            title={<FormattedMessage id="app.main.equipementDetails.building"/>}
                            value={equipement.building}
                        />
                        <InfoLine
                            title={<FormattedMessage id="app.main.equipementDetails.local"/>}
                            value={equipement.local}
                        />
                        <InfoLine
                            title={<FormattedMessage id="app.main.equipementDetails.niveau"/>}
                            value={equipement.niveau}
                        />
                        <InfoLine
                            title={<FormattedMessage id="app.main.equipementDetails.status"/>}
                            value={equipement.status}
                        />
                    </Card>
                </div> : null}
            <div className={style.checkPoints}>
                <div className={style.checkPointsTitle}>
                    <FormattedMessage id="app.main.checkPoints.title"/>
                </div>
                <Table dataSource={checkPoints} columns={columns}/>
            </div>
        </div>
    )
}

export default EquipementDetails
