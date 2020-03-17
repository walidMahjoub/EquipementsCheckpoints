import React from 'react'
import {Route} from 'react-router-dom'
import {IntlProvider} from "react-intl"
import {connect} from 'react-redux'
import messages_en from "translations/en.json"
import messages_fr from "translations/fr.json"
import {LANGUAGES} from './header/Language'
import Header from './header/Header'
import Main from "./main/Main"

const messages = {
    [LANGUAGES.fr]: messages_fr,
    [LANGUAGES.en]: messages_en
}

const App = ({language}) => (
    <IntlProvider locale={language} messages={messages[language]}>
        <Header/>
        <Main/>
    </IntlProvider>
)

const List = () => (
    <div>list !</div>
)
const Item = () => (
    <div>item !</div>
)

const mapStateToProps = (state) => ({
    language: state.language
})

export default connect(mapStateToProps)(App)
