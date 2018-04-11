import ItemList from './ItemList.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
export default function createListView(type) {
    return {
        name: `${type}-stories-view`,

        asyncData({ store }) {
            // var p = new Promise(function (resolve, reject) {
            //     setTimeout(function () {
            //         resolve({
            //             title: "MainVue —— SSR Template ",
            //             description: "this is main description",
            //             keywords: "view, main"
            //         });
            //     }, 1000);
            // });
            // return p;
            return store.dispatch('FETCH_LIST_DATA', { type: type })
        },

        title: camelize(type),

        render(h) {
            return h(ItemList, { props: { type } })
        }
    }
}
