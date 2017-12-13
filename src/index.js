import VueLocalStorage from 'vue-localstorage'
import DatastoreMixin from './DatastoreMixin'

const Datastore = {
    install(Vue) {
        Vue.use(VueLocalStorage)

        Vue.mixin(DatastoreMixin)
    },
}

export default Datastore
