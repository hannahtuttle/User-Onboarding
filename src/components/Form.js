import React, {useState, useEffect} from 'react'
import { Form, Field, withFormik } from "formik";
import * as Yup from 'yup'
import Axios from 'axios';

import Users from './Users.js'


const UserForm = ({values, errors, touched, status}) => {
    
    const [user, setUser] = useState([])
    console.log('user', user)

    useEffect(()=> {
        if(status){
        setUser([...user, status])}
    }, [status])
    
    return(

        <div className='form'> 
        <Form>
            <Field type='text' name='name' placeholder='Name'/>
                {touched.name && errors.name && <p className='error'>{errors.name}</p>}
            <Field type='email' name='email' placeholder='Email'/>
                {touched.email && errors.email && <p className='error'>{errors.email}</p>}
            <Field type='password' name='password' placeholder='Password' />
                {touched.password && errors.password && <p className='error'>{errors.password}</p>}
            <Field type='text' name='education' placeholder='Education' />
                {touched.education && errors.education && <p className='error'>{errors.education}</p>}
            <Field type='text' name='work' placeholder='Work Experience' />
                {touched.work && errors.work && <p className='error'>{errors.work}</p>}
            <Field type='text' name='hobby' placeholder='Hobbies' />
                {touched.hobby && errors.hobby && <p className='error'>{errors.hobby}</p>} 
            <Field component="select" className='role-select' name="role">
                <option>Please Choose Role</option>
                <option value="UI">UI</option>
                <option value="Front-End">Front-End</option>
                <option value="Back-End">Back-End</option>
            </Field>
            <label className='label'>
            <Field type="checkbox" name="tos" checked={values.tos}/>
            <p className='tos'>Accept Terms Of Service</p>
            </label>
            <button type="submit">Submit</button>
        </Form> 
        {user.map(user => 
        <div>
        <p key={user.id}>{user.name}</p>
            <ul>
                <li>{user.work}</li>
                <li>{user.hobby}</li>
                <li>{user.education}</li>
            </ul>
        </div>)}
    </div>)
}

const FormikUserForm = withFormik({
    
    mapPropsToValues({name, email, password, tos, role, education, work, hobby}){
        return{
            name: name || '',
            email: email || '',
            password: password || '',   
            tos: tos || false, 
            role: role || '',
            education: education || '', 
            work: work || '', 
            hobby: hobby || '' 
    }},

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name required'),
        email: Yup.string().required('Email required'),
        password: Yup.string().min(6, 'Password must be 6 characters or longer').required('Password required'),
        education: Yup.string().required('education required'),
        work: Yup.string().required('Past work experience required'),
        hobby: Yup.string().required()
        // tos: Yup.bool(),
        // role: Yup.string().required()

    }),

    handleSubmit(values, {setStatus, setErrors}){
        if (values.email === "waffle@syrup.com") {
            setErrors({ email: "That email is already taken" });
          } else {
        Axios.post('https://reqres.in/api/users', values)
        .then(res => setStatus(res.data))
        .catch(err => console.log(err))
    }}

})(UserForm)

export default FormikUserForm;