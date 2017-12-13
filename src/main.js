import Vue from 'vue'
import Datastore from './index'

Vue.use(Datastore)

/* eslint-disable no-new */
new Vue({
    el: '#app',

    data() {
        return {
            datastore: {
                foo: 'bar',
            },
        }
    },

    created() {
        console.log('Datastorage test')
        this.emit('foo')
        this.loadData('datastore')
    },
})
