'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var VueLocalStorage = _interopDefault(require('vue-localstorage'));

var DatastoreMixin = {
    data() {
        return {
            watchers: {},
        }
    },

    methods: {
        save(key, value) {
            this.$localStorage.set(key, value);
        },

        load(key) {
            return this.$localStorage.get(key)
        },

        /**
         * Load json data from Cookie (could potentially use localstorage here).
         * Use the watch parameter to determine if it should be autosaved.
         *
         * @param {string} key
         * @param {boolean} watch
         */
        loadData(key, watch = true) {
            const storedData = this.load(key);

            if (storedData) this[key] = JSON.parse(storedData);

            if (watch) this.watchData(key);
        },

        /**
         * Save data to a Cookie with the provided key
         *
         * @param {string} key
         */
        storeData(key) {
            this.save(key, JSON.stringify(this[key]));
        },

        /**
         * Automatically save data whenever it is updated
         *
         * @param {string} key
         */
        watchData(key) {
            const watcher = this.$watch(key, () => {
                this.storeData(key);
            }, {
                deep: true,
            });

            this.watchers[key] = watcher;
        },

        /**
         * Stop watching for data changes on a given key (no autosave)
         *
         * @param {*} key
         */
        endWatchData(key) {
            const watcher = this.watchers[key];

            if (typeof watcher === 'function') watcher();
        },
    },
};

const Datastore = {
    install(Vue) {
        Vue.use(VueLocalStorage);

        Vue.mixin(DatastoreMixin);
    }
};

module.exports = Datastore;
