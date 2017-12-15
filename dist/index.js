'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var VueLocalStorage = _interopDefault(require('vue-localstorage'));

var DatastoreMixin = {
    data: function data() {
        return {
            watchers: {}
        };
    },


    methods: {
        save: function save(key, value) {
            this.$localStorage.set(key, value);
        },
        load: function load(key) {
            return this.$localStorage.get(key);
        },


        /**
         * Load json data from Cookie (could potentially use localstorage here).
         * Use the watch parameter to determine if it should be autosaved.
         *
         * @param {string} key
         * @param {boolean} watch
         */
        loadData: function loadData(key) {
            var watch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var storedData = this.load(key);

            if (storedData) this[key] = JSON.parse(storedData);

            if (watch) this.watchData(key);
        },


        /**
         * Save data to a Cookie with the provided key
         *
         * @param {string} key
         */
        storeData: function storeData(key) {
            this.save(key, JSON.stringify(this[key]));
        },


        /**
         * Automatically save data whenever it is updated
         *
         * @param {string} key
         */
        watchData: function watchData(key) {
            var _this = this;

            var watcher = this.$watch(key, function () {
                _this.storeData(key);
            }, {
                deep: true
            });

            this.watchers[key] = watcher;
        },


        /**
         * Stop watching for data changes on a given key (no autosave)
         *
         * @param {*} key
         */
        endWatchData: function endWatchData(key) {
            var watcher = this.watchers[key];

            if (typeof watcher === 'function') watcher();
        }
    }
};

var Datastore = {
    install: function install(Vue) {
        Vue.use(VueLocalStorage);

        Vue.mixin(DatastoreMixin);
    }
};

module.exports = Datastore;
