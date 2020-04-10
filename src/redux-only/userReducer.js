import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: [{ id: 0, name: 'DefaultOnline', email: 'defaul@gmail.com', active: true },
    { id: 1, name: 'DefaultOffline', email: 'defaul@gmail.com', active: false }],
    reducers: {
        create: (state, action) => {
            console.log(action.payload);
            if (state.length === 0) {
                return [{ ...action.payload }];
            }
            let isExisted = false;
            let newState = state.map((user) => {
                if (user.id === action.payload.id) {
                    isExisted = true;
                    return { ...user, ...action.payload };
                }
                return user;
            });
            return isExisted ? newState : [...state, { ...action.payload }];


        },
        remove: (state, action) => {
            if (state.length === 0) {
                return state;
            }

            let isExisted = false;
            let newState = state.reduce((removedArray, user) => {
                if (user.id === action.payload.id) {
                    console.log(user.id);
                    isExisted = true;
                    return removedArray;
                }
                removedArray.push({ ...user });
                return removedArray;
            }, []);
            return isExisted ? newState : [...state];
        },
        filter: (state, action) => {
            let activeFilteredArray = state.filter((user) => user.active === action.payload.active);
            return activeFilteredArray;
        }

    },
});

export const { create, remove, filter } = userSlice.actions;

console.log(userSlice);


export default userSlice.reducer;
