import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { create, remove, filter } from './userReducer';
import { useInput } from './useInput';
import PropTypes from 'prop-types';
export default function User() {
    const getName = (state) => {
        return state.user
    }
    const users = useSelector(getName);
    const dispatch = useDispatch();
    const [id, setId] = useState(0);
    const [email, resetEmail] = useInput('');
    const [name, resetName] = useInput('');
    const [active, setActive] = useState(true);
    const handleIdInput = (e) => {
        let value = e.target.value;
        value = parseInt(value);

        if(!isNaN(value)){      
            setId(value);
        }
    }
    const handleActiveInput = (e) => {
        e.target.value === 'true' ? setActive(true) : setActive(false);
    }

    return (
        <>
            <h1>Current User in System</h1>
            <ol>
                {users.map((cur, index) => {
                    return <li key={index}>ID:{cur.id}, User: {cur.name}, Email:{cur.email}, Active: {cur.active ? 'Online' : 'Offline'}</li>
                })}
            </ol>
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
            <button onClick={() => dispatch(remove({ id}))}>Remove User</button><br />
            <button onClick={() => dispatch(filter({ active }))}>Filter current {active ? 'Online' : 'Offline'} User</button>
        </>
    )
};
User.propTypes = {
    id: PropTypes.number,
}