import { createApp } from 'vue'
import App from './App.vue'
import "./styles/app.css"
import { vuetify } from './plugins/vuetify'
import { pinia } from './plugins/pinia'
import { router } from './plugins/router'
import { initAxios } from './plugins/axios'
import { initializeApp } from 'firebase/app'
import { getAuth} from 'firebase/auth'

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBlfZjJyhjcgyPfxaqkZHSR5SciFBWC5IY",
    authDomain: "mcsynergy-55878.firebaseapp.com",
    projectId: "mcsynergy-55878",
    storageBucket: "mcsynergy-55878.appspot.com",
    messagingSenderId: "822930182678",
    appId: "1:822930182678:web:23e8f0b3e044ae06cb9b37",
    measurementId: "G-3BK4KLMGTJ"
})

const auth = getAuth(firebaseApp)
//@ts-ignore
auth._initializationPromise.then((e: any) => {
    initAxios()
    //@ts-ignore
    if(!auth.currentUser) window.location = `/login?redirect=${window.location.href}`
    else
        createApp(App)
            .use(vuetify)
            .use(pinia)
            .use(router)
            .mount('#app')
})





