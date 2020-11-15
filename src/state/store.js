import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

import { fetch } from '@/main';

import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== 'production',
  state() {
    return {
      isLoggedIn: false,
      email: null,
      token: null,
    };
  },
  mutations: {
    login(state, params) {
      state.isLoggedIn = true;
      state.token = params.token;
      state.email = params.email;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.email = null;
      state.tokenExpiration = 0;
    },
    setToken(state, newToken) {
      state.token = newToken;
    }
  },
  actions: {
    async login(context, credentials) {
      let data = await fetch.post('login', credentials);
      //console.log(data);
      if(data.data.access_token !== null) {
        //const dataExpiration = 60;
        const expiration = +data.data.expires_in * 1000; //milliseconds
        const expirationDate = new Date().getTime() + expiration; //in milliseconds
        let params = {
          token: data.data.access_token,
          email: credentials.email,
        };
        context.commit('login', params);
        window.localStorage.setItem('vb5token', data.data.access_token);
        window.localStorage.setItem('vb5email', credentials.email);
        window.localStorage.setItem('tokenExpirationDate', expirationDate);
        this.state.token = data.data.access_token;
        fetch.setToken(data.data.access_token);
      } else {
        // eslint-disable-next-line no-console
        console.log('Unauthenticated');
      }
    },
    autoLogin(context) {
      const userEmail = window.localStorage.getItem('vb5email');
      const userToken = window.localStorage.getItem('vb5token');
      const expirationDate = window.localStorage.getItem('tokenExpirationDate');
      const expireIn = +expirationDate - new Date().getTime();
      if(expireIn < 1) {
        context.dispatch('logout');
        router.replace('/login');
      }
      else {
        if(userEmail && userToken) {
          let params = {
            token: userToken,
            email: userEmail
          };
          context.commit('login', params);
        }
      }

    },
    logout(context) {
      window.localStorage.removeItem('vb5email');
      window.localStorage.removeItem('vb5token');
      window.localStorage.removeItem('tokenExpirationDate');
      context.commit('logout');
    },
    setToken(context, newToken) {
      context.commit('setToken', newToken);
    }
  },
  getters: {
    getEmail(state) {
      return state.email;
    },
    getToken() {
      return localStorage.getItem('vb5token');
    },
    isSignedIn(state) {
      return state.isLoggedIn;
    },
    getStorageTokenExpiration() {
      return localStorage.getItem('tokenExpirationDate');
    },
    getStoreToken(state) {
      return state.token;
    }
  }
})

export default store

