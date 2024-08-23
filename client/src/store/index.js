import axios from 'axios';
import { defineStore } from 'pinia';

export const useSessionManagerStore = defineStore('sessionManager', {
    state: () => ({
        auth_token: null,
        user: {
            id: null,
            username: null,
            email: null,
        },
    }),
    getters: {
        getAuthToken: (state) => {
            return state.auth_token;
        },
        getUserEmail: (state) => {
            return state.user?.email;
        },
        getUserID: (state) => {
            return state.user?.id;
        },
        isLoggedIn: (state) => {
            const loggedOut = state.auth_token == null || state.auth_token === JSON.stringify(null);
            return !loggedOut;
        },
    },
    actions: {
        async registerUser(payload) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}users`, payload);
                this.setUserInfo(response);
                return response;
            } catch (error) {
                throw error;
            }
        },
        async loginUser(payload) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}users/sign_in`, payload);
                this.setUserInfo(response);
                return response;
            } catch (error) {
                throw error;
            }
        },
        async logoutUser() {
            try {
                const config = {
                    headers: {
                        authorization: this.auth_token,
                    },
                };
                await axios.delete(`${import.meta.env.VITE_API_URL}users/sign_out`, config);
                this.resetUserInfo();
            } catch (error) {
                throw error;
            }
        },
        async loginUserWithToken(payload) {
            try {
                const config = {
                    headers : {
                        Authorization: payload.auth_token,
                    },
                };
                const response = await axios.get(`${import.meta.env.VITE_URL}member-data`, config);
                this.setUserInfoFromToken(response);
                return response;
            } catch (error) {
                throw error;
            }
        },
        setUserInfo(data) {
            this.user = data.data.user;
            this.auth_token = data.headers.authorization;
            axios.defaults.headers.common['Authorization'] = data.headers.authorization;
            localStorage.setItem('auth_token', data.headers.authorization);
        },
        setUserInfoFromToken(data) {
            this.user = data.data.user;
            this.auth_token = localStorage.getItem('auth_token');
        },
        resetUserInfo() {
            this.user = {
                id: null,
                username: null,
                email: null,
            };
            this.auth_token = null;
            localStorage.removeItem('auth_token');
            axios.defaults.headers.common['Authorization'] = null;
        },
    },
});
