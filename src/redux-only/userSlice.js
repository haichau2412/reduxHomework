import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [
            { id: 0, name: 'DefaultOnline', email: 'defaul@gmail.com', active: true },
            { id: 1, name: 'DefaultOffline', email: 'defaul@gmail.com', active: false }
        ],
        filteredUsers: {
            active: false,
            users: []
        }
    },
    reducers: {
        create: (state, action) => {
            const { users, filteredUsers } = state;
            const { id } = action.payload;
            let isExist = false;

            if (users.length === 0) {
                return { filteredUsers, users: { ...action.payload } };
            }
            const containAdded = users.map((user) => {
                if (user.id === id) {
                    return { ...user, ...action.payload };
                    isExist = true;
                }
                return user;
            });
            if (!isExist) {
                containAdded.push({ ...action.payload })
            }
            return { users: containAdded, filteredUsers }


        },
        remove: (state, action) => {
            const { users, filteredUsers } = state;
            const { id } = action.payload;
            if (users.length === 0) {
                return state;
            }

            const remainUsers = users.reduce((removedArray, user) => {
                if (user.id === id) {
                    return removedArray;
                }
                removedArray.push({ ...user });
                return removedArray;
            }, []);
            return { users: remainUsers, filteredUsers }
        },
        filter: (state, action) => {
            const { users } = state;
            const { active } = action.payload;
            const filtered = users.filter((user) => user.active === active);
            const filteredUsers = {
                active,
                users: filtered
            }
            return { users, filteredUsers };
        }

    },
});
const { actions, reducer } = userSlice;

export const { create, remove, filter } = actions;
export default reducer;
