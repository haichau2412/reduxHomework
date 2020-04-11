import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { create, remove, filter } from './userSlice';
import { useInput } from './useInput';
import PropTypes from 'prop-types';

const getName = (state) => {
    return state.users.users
};
const getFiltered = (state) => {
    return state.users.filteredUsers
};

export default function User() {

    const users = useSelector(getName);

    const { active: type, users: filteredUsers } = useSelector(getFiltered);


    const dispatch = useDispatch();
    const [id, setId] = useState(0);
    const [email, resetEmail] = useInput('');
    const [name, resetName] = useInput('');
    const [active, setActive] = useState(true);
    const [runFilter, setRunFilter] = useState(false);

    const handleIdInput = (e) => {
        let value = e.target.value;
        value = parseInt(value);

        if (!isNaN(value)) {
            setId(value);
        }
    }

    const handleActiveInput = (e) => {
        e.target.value === 'true' ? setActive(true) : setActive(false);
    }

    return (
        <>
            <h2>Current User in System</h2>
            <ol>
                {users.map((cur, index) => {
                    return <li key={index}>ID:{cur.id}, User: {cur.name}, Email:{cur.email}, Active: {cur.active ? 'Online' : 'Offline'}</li>
                })}
            </ol>
            {runFilter ? <>
                <h2>Current {type ? 'Online' : 'Offline'}</h2>
                <ol>
                    {filteredUsers.map((cur, index) => {
                        return <li key={index}>ID:{cur.id}, User: {cur.name}, Email:{cur.email}, Active: {cur.active ? 'Online' : 'Offline'}</li>
                    })}
                </ol>
            </> : <></>}

            <p>ID: {id}</p>

            <p>Name: {name.value}</p>

            <p>Email: {email.value}</p>

            <p>Active: {active ? 'Online' : 'Offline'}</p>

            <h2>Form</h2>
            <form action="#">

                <label >ID</label>
                <input type="number" onChange={handleIdInput} />
                <br />
                <label >Name</label>
                <input type="text" onChange={name.onChange} />
                <br />
                <label >Email</label>
                <input type="text" onChange={email.onChange} />

                <br />
                <label>Online</label>
                <input type="radio" name="active" value='true' onChange={handleActiveInput} />
                <label >Offline</label>
                <input type="radio" name="active" value='false' onChange={handleActiveInput} />
                <br />

            </form>
            <button onClick={() => dispatch(create({ id, name: name.value, email: email.value, active }))}>Create User</button><br />
            <button onClick={() => dispatch(remove({ id }))}>Remove User</button><br />
            <button onClick={() => {
                setRunFilter(true);
                dispatch(filter({ active }));
            }}
            >Filter current {active ? 'Online' : 'Offline'} User</button>
        </>
    )
};
User.propTypes = {
    id: PropTypes.number,
}