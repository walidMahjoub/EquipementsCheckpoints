import React from 'react'
import {IntlProvider} from "react-intl"
import {connect} from 'react-redux'
import messages_en from "translations/en.json"
import messages_fr from "translations/fr.json"
import {LANGUAGES} from './header/Language'
import Header from './header/Header'
import Main from "./main/Main"
import Firebase, {FirebaseContext} from 'appFirebase'

const messages = {
    [LANGUAGES.fr]: messages_fr,
    [LANGUAGES.en]: messages_en
}

const App = ({language}) => (
    <IntlProvider locale={language} messages={messages[language]}>
        <FirebaseContext.Provider value={new Firebase()}>
            <Header/>
            <Main/>
        </FirebaseContext.Provider>
    </IntlProvider>
)

const mapStateToProps = (state) => ({
    language: state.language
})

export default connect(mapStateToProps)(App)
