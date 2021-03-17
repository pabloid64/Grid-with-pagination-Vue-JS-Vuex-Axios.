import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';
import getPayments from '@/mocks/getPayments';

Vue.use(Vuex);

const { NODE_ENV } = process.env;

export default new Vuex.Store({

  state: () => ({
    data: [],
    isLoading: false,
    isCached: false,
  }),

  mutations: {
    set(state, value) {
      Object.entries(value).forEach(([key, data]) => {
        if (!Array.isArray(state[key]) && state[key] && typeof state[key] === 'object') {
          state[key] = {
            ...state[key],
            ...data,
          };
        } else {
          state[key] = data;
          if (key === 'data') {
            localStorage.setItem('data', JSON.stringify(state[key]));
          }
        }
      });
    },
  },

  actions: {
    async load({ commit }, params = {}) {
      commit('set', { isLoading: true });

      try {
        const { data } = (NODE_ENV !== 'production') ? await getPayments(params) : await api.getPayments(params);

        if (Array.isArray(data)) {
          commit('set', { data });
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e?.message);
      } finally {
        commit('set', { isLoading: false });
      }
    },
  },
});
