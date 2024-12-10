import React, {useState} from 'react';
import Naslov from "../komponente/Naslov";
import {Form, Row} from "react-bootstrap";
import useForm from "../useForm";
import server from "../server";

const Login = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [poruka, setPoruka] = useState('');

    const naslov = isLogin ? 'Prijavi se' : 'Registruj se';

    const {formData, handleChange} = useForm({
        email : '',
        password: '',
        name: ''
    });

    const login = () => {
        console.log(formData);

        server.post('/login', {
            email: formData.email,
            password: formData.password
        }).then((response) => {
            console.log(response);
            let podaci = response.data.data;

            sessionStorage.setItem('token', podaci.token);
            sessionStorage.setItem('user', JSON.stringify(podaci.user));
            window.location = '/';
        }).catch((error) => {
            console.log(error);
            setPoruka('Neuspesno logovanje');
        });
    }

    const register = () => {
        console.log(formData);

        server.post('/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }).then((response) => {
            console.log(response);
            let podaci = response.data.data;

            setPoruka('Uspesna registracija');
        }).catch((error) => {
            console.log(error);
            setPoruka('Neuspesna registracija');
        });
    }

    return (
        <>
            <Naslov naslov={naslov} podnaslov={poruka} />

            <div style={{
                minHeight: '70vh'
            }}>



            {
                isLogin && (
                    <>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email adresa</Form.Label>
                            <Form.Control name="email" onChange={handleChange} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Lozinka</Form.Label>
                            <Form.Control name="password" onChange={handleChange}  type="password" placeholder="Password" />
                        </Form.Group>
                        <button className="btn btn-outline-secondary" onClick={
                            () => {
                                setIsLogin(false);
                            }
                        } role="link">Nemate nalog, registrujte se</button>
                        <hr/>
                        <button onClick={login} className="btn btn-dark" type="button">
                            Login
                        </button>

                    </>
                )
            }


                {
                    !isLogin && (
                        <>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Ime i prezime</Form.Label>
                                <Form.Control name="name" onChange={handleChange} type="text" placeholder="Ime i prezime" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email adresa</Form.Label>
                                <Form.Control name="email" onChange={handleChange} type="email" placeholder="Unesi email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Lozinka</Form.Label>
                                <Form.Control name="password" onChange={handleChange}  type="password" placeholder="Unesi lozinku" />
                            </Form.Group>
                            <button className="btn btn-outline-secondary" onClick={
                                () => {
                                    setIsLogin(true);
                                }
                            } role="link">Imate nalog, ulogujte se</button>
                            <hr/>
                            <button onClick={register} className="btn btn-dark" type="button">
                                Registruj se
                            </button>

                        </>
                    )
                }

            </div>
        </>
    );
};

export default Login;