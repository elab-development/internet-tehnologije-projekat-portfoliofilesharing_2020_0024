import React, {useEffect, useState} from 'react';
import Naslov from "../komponente/Naslov";
import server from "../server";
import {Alert, Col, Form, Row} from "react-bootstrap";
import useForm from "../useForm";
import {FaDownload} from "react-icons/fa6";

const Projekti = () => {

    const [poruka, setPoruka] = useState('');
    const [projekti, setProjekti] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [ucitaniProjekat, setUcitaniProjekat] = useState(null);
    const [fajlovi, setFajlovi] = useState([]);
    const [osvezi, setOsvezi] = useState(false);

    const {formData, handleChange} = useForm({
        name: '',
        deadline_date: '',
        status: 'pending',
        description: ''
    });

    useEffect(() => {
        server.get('projects/user/' + user.id).then((response) => {
            console.log(response);
            setProjekti(response.data.data);
        }).catch((error) => {
            console.log(error);
            setPoruka('Greska prilikom ucitavanja projekata');
        });
    }, [user.id]);

    const ucitajProjekat = (projekat) => {
        setUcitaniProjekat(projekat);
    }

    const sacuvajProjekat = () => {
        server.post('projects', {
            name: formData.name,
            deadline_date: formData.deadline_date,
            status: formData.status,
            user_id: user.id
        }).then((response) => {
            console.log(response);
            setPoruka('Uspesno sacuvan projekat');
            setProjekti([...projekti, response.data.data]);
        }).catch((error) => {
            console.log(error);
            setPoruka('Greska prilikom cuvanja projekta');
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let project_file = e.target.project_file.files[0];
        let fd = new FormData()
        fd.append('project_file', project_file);
        fd.append('description', formData.description);
        fd.append('project_id', ucitaniProjekat.id);
        console.log(project_file);
        console.log(fd);

        server.defaults.headers['Content-Type'] = 'multipart/form-data';

        server.post('project-files', fd).then((response) => {
            console.log(response);
            setPoruka('Uspesno sacuvan fajl');
            setOsvezi(!osvezi);
        }).catch((error) => {
            console.log(error);
            setPoruka('Greska prilikom cuvanja fajla');
        });
    }

    useEffect(() => {
        if (ucitaniProjekat) {
            server.get('project-files/project/' + ucitaniProjekat.id).then((response) => {
                console.log(response);
                setFajlovi(response.data.data);
            }).catch((error) => {
                console.log(error);
                setPoruka('Greska prilikom ucitavanja fajlova');
            });
        }
    }, [ucitaniProjekat, osvezi]);

    return (
        <>
            <Naslov naslov="Moji projekti" podnaslov={poruka} />

            <Row className="m-3">
                <Col md={12}>
                    <Form.Group>
                        <Form.Label>Naziv Projekta</Form.Label>
                        <Form.Control type="text" name="name" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rok Projekta</Form.Label>
                        <Form.Control type="date" name="deadline_date" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Status Projekta</Form.Label>
                        <Form.Select name="status" onChange={handleChange}>
                            <option value="pending">Pending</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </Form.Select>
                    </Form.Group>
                    <hr/>
                    <button type="button" className="btn btn-outline-dark" onClick={sacuvajProjekat}>Sacuvaj projekat</button>
                </Col>
            </Row>

            <Row>
                {
                    projekti.map((projekat) => {

                        const variant = projekat.status === 'pending' ? 'danger' : projekat.status === 'ongoing' ? 'warning' : projekat.status === 'completed' ? 'success' : 'secondary';

                        return (
                            <Col md={6} key={projekat.id}>
                                <Alert variant={variant}>
                                    <Alert.Heading>{projekat.name}</Alert.Heading>

                                        <p>Rok za zavrsetak projekta:  {projekat.deadline_date}</p>
                                        <p>Status projekta: {projekat.status}</p>

                                    <hr />
                                    <p className="mb-0">

                                        <button onClick={() => {
                                            ucitajProjekat(projekat);
                                        }} className="btn btn-outline-dark">Ucitaj projekat</button>
                                    </p>
                                </Alert>
                            </Col>
                        );
                    })
                }
            </Row>

            <Row>
                {
                    ucitaniProjekat && (
                        <>
                            <h1 className="text-center">Ucitani Projekat</h1>
                            <Col md={12}>
                                <Alert variant="info">
                                    <Alert.Heading>{ucitaniProjekat.name}</Alert.Heading>
                                    <p>Rok za zavrsetak projekta: {ucitaniProjekat.deadline_date}</p>
                                    <p>Status projekta: {ucitaniProjekat.status}</p>
                                </Alert>
                            </Col>

                            <Col md={6}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Opis Fajla</Form.Label>
                                        <Form.Control type="text" name="description" onChange={handleChange}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Fajl</Form.Label>
                                        <Form.Control type="file" name="project_file"/>
                                    </Form.Group>
                                    <hr/>
                                    <button type="submit" className="btn btn-outline-dark">Sacuvaj Fajl</button>
                                </Form>
                            </Col>

                            <Col md={6}>
                                <Alert variant="info">
                                    <Alert.Heading>Fajlovi</Alert.Heading>
                                    <p>Lista fajlova</p>
                                </Alert>

                                {
                                    fajlovi.map((fajl) => {
                                        return (
                                            <Alert key={fajl.id} variant="success">
                                                <Alert.Heading>{fajl.description}</Alert.Heading>
                                                <a className="btn btn-outline-dark" href={fajl.url} target="_blank" rel="noreferrer"><FaDownload /> Preuzmi fajl</a>
                                            </Alert>
                                        );
                                    })
                                }

                            </Col>
                        </>

                    )
                }
            </Row>


        </>
    );
};

export default Projekti;