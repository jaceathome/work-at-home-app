import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import firestore__ from "@/database/firestore";

Vue.use(Vuex)

const defaultState = {
    user: null,
    mailed: false,
    users: [],
    roles: [],
    departments: [],
    work_positions: [],
    loading: false,
    tasks: [],
    tasks_users: [],
    allUsers: [],
    logs: [],
    roomName: '',
    messages: [],
    assistance: [],
};
export default new Vuex.Store({
    state: defaultState,
    mutations: {
        async setUser(state, payload) {
            state.user = payload
            if (payload) {
                state.user.role = state.roles.find(role => role.id === state.user.role_id).title
                state.user.role_title = state.roles.find(role => role.id === state.user.role_id).text
                state.user.department = state.departments.find(d => d.id === state.user.department_id).title
                state.user.work = state.work_positions.find(d => d.id === state.user.work_position_id).title
                if (!state.user.avatar) {
                    state.user.avatar = 'https://joeschmoe.io/api/v1/' + state.user.name;
                }
            }
        },
        setMailVerified(state) {
            state.mailed = true
        },
        setUsers(state) {
            // state.users = []
            firestore__.collection('users').orderBy('timestamp').onSnapshot(snapshot => {
                const docs = snapshot.docs.map((e, c) => {
                    let avatar = e.get('avatar')
                    const doc = e.data();
                    doc.role = state.roles.find(role => role.id === doc.role_id).text
                    doc.department = state.departments.find(department => department.id === doc.department_id).title
                    doc.work_position = state.work_positions.find(work_position => work_position.id === doc.work_position_id).title
                    const data = { ...doc, id: e.id };
                    if (!!!avatar) {
                        data.avatar = "https://joeschmoe.io/api/v1/" + doc.name
                    }
                    return data;
                })

                const users = docs.filter(e => e.email !== state.user.email)
                const role = state.user.role
                if (role === 'manager-role') {
                    state.users = users.filter(user => (user.role === 'employee-role' && user.managerId === null) || user.managerId === state.user.id);
                } else if (role === 'admin-role') {
                    state.users = users
                }
            })
        },
        setMessages(state) {
            firestore__.collection('messages')
                .onSnapshot(snapshot => {
                    state.messages = snapshot.docs.map(e => ({ ...e.data(), id: e.id }))
                })
        },
        setAllUsers(state) {
            // state.users = []
            firestore__.collection('users').orderBy('timestamp').onSnapshot(snapshot => {
                state.allUsers = snapshot.docs.map((e, c) => {
                    let avatar = e.get('avatar')
                    const doc = e.data();
                    doc.role = state.roles.find(role => role.id === doc.role_id).text
                    doc.department = state.departments.find(department => department.id === doc.department_id).title
                    doc.work_position = state.work_positions.find(work_position => work_position.id === doc.work_position_id).title
                    const data = { ...doc, id: e.id };
                    if (!!!avatar) {
                        data.avatar = 'https://joeschmoe.io/api/v1/' + e.get('name')
                    }
                    return data;
                });
            })
        },
        setRoles(state) {
            // state.roles = []
            firestore__.collection('roles').onSnapshot(snapshot => {
                state.roles = snapshot.docs.map(e => ({ ...e.data(), id: e.id }))
                // state.roles.unshift({ id: null, title: 'None' })
            })
        },
        setDepartments(state) {
            // state.departments = []
            firestore__.collection('departments').onSnapshot(snapshot => {
                state.departments = snapshot.docs.map(e => {
                    return {
                        title: e.get('title'), id: e.id,
                    }
                })
                state.departments.unshift({ id: '', title: 'None' })
            })
        },
        setWorkPositions(state) {
            // state.work_positions = []
            firestore__.collection('work_positions').onSnapshot(snapshot => {
                state.work_positions = snapshot.docs.map(e => ({ ...e.data(), id: e.id }))
                // state.work_positions.unshift({ id: null, title: 'None' })
            })
        },
        setLogs(state) {
            firestore__.collection('logs')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {
                    state.logs = snapshot.docs.map(e => ({ ...e.data(), id: e.id }))
                })
        },
        setAssistance(state) {
            firestore__.collection('assistance')
                .orderBy('createdAt', 'desc')
                .onSnapshot(snapshot => {
                    state.assistance = snapshot.docs.map(e => ({ ...e.data(), id: e.id }))
                })
        },
        setTasksUsers(state) {
            // state.tasks_users = []
            firestore__.collection('tasks_users').onSnapshot(snapshot => {
                state.tasks_users = snapshot.docs.map(e => ({ ...e.data(), id: e.id }))
            })
        },
        setLoading(state, payload) {
            if (!payload) {
                state.loading = payload
            } else {
                state.loading = !state.loading
            }
        },
        setRoomName(state, payload) {
            state.roomName = payload
        },
        async setTasks(state) {
            state.tasks = [];
            await firestore__.collection('tasks')
                .where("created_by", "==", state.user.id)
                .onSnapshot(snapshot => {
                    state.tasks = snapshot.docs.map(e => ({ ...e.data(), id: e.id }))
                    // 
                })
        },
        resetState(state) {
            Object.assign(state, defaultState)
        }
    },
    actions: {
        setUser(state, payload) {
            if (!payload) {
                state.commit("resetState")
            }
            state.commit("setUser", payload)
        },
        setMailVerified(state) {
            state.commit("setMailVerified")
        },
        setUsers(state) {
            state.commit('setUsers')
        },
        setRoles(state) {
            state.commit('setRoles')
        },
        setDepartments(state) {
            state.commit('setDepartments')
        },
        setMessages(state) {
            state.commit('setMessages')
        },
        setWorkPositions(state) {
            state.commit('setWorkPositions')
        },
        setTasks(state) {
            state.commit('setTasks')
        },
        setTasksUsers(state) {
            state.commit('setTasksUsers')
        },
        setLoading(state, payload = true) {
            state.commit('setLoading', payload)
        },
        setAllUsers(state) {
            state.commit('setAllUsers')
        },
        setRoomName(state, payload) {
            state.commit('setRoomName', payload)
        },
        setLogs(state) {
            state.commit('setLogs')
        },
        setAssistance(state) {
            state.commit('setAssistance')
        },
    },
    getters: {
        getUser: state => state.user,
        getUsers: state => state.users,
        getRoles: state => state.roles,
        getMailed: state => state.mailed,
        getDepartments: state => state.departments,
        getWorkPositions: state => state.work_positions,
        getLoading: state => state.loading,
        getTasks: state => state.tasks,
        getTasksUsers: state => state.tasks_users,
        allUsers: state => state.allUsers,
        logs: state => state.logs,
        roomName: state => state.roomName,
        messages: state => state.messages,
        assistance: state => state.assistance
    },
    plugins: [createPersistedState(/*{
        storage: window.sessionStorage,
    }*/)]
})
