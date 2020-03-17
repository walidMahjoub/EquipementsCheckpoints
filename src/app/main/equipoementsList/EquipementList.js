import React, {useState, useEffect, useCallback, useContext} from 'react'
import {FormattedMessage, injectIntl} from 'react-intl'
import {Table, Icon, Input} from 'antd'
import style from './EquipementList.scss'
import {FirebaseContext} from 'appFirebase'

const {Search} = Input

const EquipementList = ({history, intl}) => {

    const [equipementList, setEquipementList] = useState([])
    const [filtredEquipementList, setFiltredEquipementList] = useState([])

    const firebase = useContext(FirebaseContext)

    const redirectToEquipementDetails = key => {
        const path = `/equipement/${key}`
        history.push(path)
    }

    const columns = [
        {
            title: <FormattedMessage id="app.main.equipementList.image"/>,
            key: 'key',
            render: record => <img alt='equipement' className={style.equipementImage} src={record.photo}/>
        },
        {
            title: <FormattedMessage id="app.main.equipementList.name"/>,
            dataIndex: 'name',
            key: 'id',
            defaultSortOrder: 'descend',
            sorter: ({name: a}, {name: b}) => b.localeCompare(a),
        },
        {
            title: <FormattedMessage id="app.main.equipementList.domain"/>,
            dataIndex: 'domain',
            key: 'domain',
            sorter: ({domain: a}, {domain: b}) => b.localeCompare(a),
        },
        {
            title: <FormattedMessage id="app.main.equipementList.nbFaults"/>,
            dataIndex: 'nbFaults',
            key: 'nbFaults',
            sorter: ({nbFaults: a}, {nbFaults: b}) => b - a,

        },
        {
            title: <FormattedMessage id="app.main.equipementList.action"/>,
            dataIndex: '',
            key: 'x',
            render: record => <Icon type="zoom-in" onClick={() => redirectToEquipementDetails(record.key)}/>,
        },
    ]

    const fetchEquipements = useCallback(() => {
        firebase.equipements().on('value', snapshot => {
            const equipementList = Object.entries(snapshot.val()).map(([key, data]) => ({key, ...data}))
            setEquipementList(equipementList)
            setFiltredEquipementList(equipementList)
        })
    }, [])

    useEffect(() => {
        fetchEquipements()
    }, [fetchEquipements])


    const searchByNameAndDomain = value => setFiltredEquipementList(equipementList.filter(item => item.name.toUpperCase().includes(value.toUpperCase()) || item.domain.toUpperCase().includes(value.toUpperCase())))

    return (
        <div>
            <div className={style.equipementListTitle}>
                <FormattedMessage id="app.main.equipementList.title"/>
            </div>

            <Search
                placeholder={intl.formatMessage({id: "app.main.equipementList.search"})}
                onSearch={searchByNameAndDomain}
                enterButton
                className={style.searchInput}
            />
            <Table dataSource={filtredEquipementList} columns={columns}/>
        </div>
    )
}

export default injectIntl(EquipementList)
