import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        beers: [],
        isArray: false,
        isLoading: false
    },
    mutations: {
        SET_LIST_TO_STATE(state, list) {
            state.isArray = list.length > 0 ? 1 : 0;
            state.beers.push(...list);
        },
        UPDATE_BEERS(state, updatedData) {
            state.beers.map(item => {
                if (item.id == updatedData.id) {
                    item.name = updatedData.name;
                    item.description = updatedData.description;
                }
            });
        },
        REMOVE_FROM_STATE(state, id) {
            let itemArray = state.beers.filter(beer => beer.id != id);
            
            state.beers = itemArray;
        }
    },
    actions: {
        GET_LIST_FROM_API({commit}, page) {
            return axios(`https://api.punkapi.com/v2/beers?page=${page}&limit=25`, {
                method: 'GET'
            })
            .then(list => {
                this.state.isLoading = page > 1 ? true : false;
                commit('SET_LIST_TO_STATE', list.data);

                return list;
            })
            .catch(error => {
                console.log(error);

                return error;
            })
            .finally(() => {
                this.state.isLoading = false;
            });
        },
        UPDATE_BEER({commit}, beer) {
            commit('UPDATE_BEERS', beer);
        },
        DELETE_FROM_STATE({commit}, id) {
            commit('REMOVE_FROM_STATE', id);
        }
    },
    getters: {
        BEERS(state) {
            return state.beers;
        },
        IS_ARRAY(state) {
            return state.isArray;
        },
        IS_LOADING(state) {
            return state.isLoading;
        }
    }
});

export default store;