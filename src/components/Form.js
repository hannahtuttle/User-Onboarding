import React, {useState, useEffect} from 'react'
import { Form, Field, withFormik } from "formik";
import * as Yup from 'yup'
import Axios from 'axios';

import Users from './Users.js'


const UserForm = ({values, errors, touched, status}) => {
    
    const [user, setUser] = useState([])
    console.log('user', status)

    useEffect(()=> {
        if(status){
        setUser([...user, status])}
    }, [status])
    
    return(

        <div>
        <Form>
            <Field type='text' name='name' placeholder='Name'/>
                {touched.name && errors.name && <p>{errors.name}</p>}
            <Field type='email' name='email' placeholder='Email'/>
                {touched.email && errors.email && <p>{errors.email}</p>}
            <Field type='password' name='password' placeholder='Password' />
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field component="select" name="role">
          <option>Please Choose an Option</option>
          <option value="UI">UI</option>
          <option value="Front-End">Front-End</option>
          <option value="Back-End">Back-End</option>
        </Field>
            <label>
            <Field type="checkbox" name="tos" checked={values.tos}/>
            Accept Terms Of Service
            </label>
            <button type='button'>Submit</button>
        </Form> 
        {/* <Users /> */}
        {user.map(user => <p>{user.name}</p>)}
    </div>)
}

const FormikUserForm = withFormik({
    
    mapPropsToValues({name, email, password, tos, role}){
        return{
            name: name || '',
            email: email || '',
            password: password || '',   
            tos: tos || false, 
            role: role || ''   
    }},

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name required'),
        email: Yup.string().required('Email required'),
        password: Yup.string().min(6, 'Password must be 6 characters or longer').required('Password required'),
        tos: Yup.bool()

    }),

    handleSubmit(values, {setStatus}){
        Axios.post('https://reqres.in/api/users', values)
        .then(res => 
            setStatus(res.data))
        .catch(err => console.log(err))
    }

})(UserForm)

export default FormikUserForm;