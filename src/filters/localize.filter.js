import store from '../store'
import firebase from 'firebase/app'
import ru from '../locales/ru.json'
import en from '../locales/en.json'

const locales = {
    'ru-RU': ru,
    'en-US': en
}

export default function localizeFilter(key) {
    const currentUser = firebase.auth().currentUser
    if (!currentUser) {
        const locale = localStorage.getItem('locale') || 'ru-RU'
        return locales[locale][key] || `[Localize error]: key ${key} not found`
    }
    else {
        const storeLocale = store.getters.info.locale || 'ru-RU'
        return locales[storeLocale][key] || `[Localize error]: key ${key} not found`
    }
}


