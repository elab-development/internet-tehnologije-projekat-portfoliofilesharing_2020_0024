import React, {useEffect, useState} from 'react';
import Naslov from "../komponente/Naslov";
import server from "../server";
import {Alert, Col, Row} from "react-bootstrap";

const Projekti = () => {

    const [poruka, setPoruka] = useState('');
    const [projekti, setProjekti] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [ucitaniProjekat, setUcitaniProjekat] = useState(null);

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

    return (
        <>
            <Naslov naslov="Moji projekti" podnaslov={poruka} />
            <Row>
                {
                    projekti.map((projekat) => {

                        const variant = projekat.status === 'pending' ? 'danger' : projekat.status === 'ongoing' ? 'warning' : projekat.status === 'completed' ? 'success' : 'secondary';

                        return (
                            <Col md={6} key={projekat.id}>
                                 <Alert variant={variant}>
                                    <Alert.Heading>{projekat.name}</Alert.Heading>
                                    <p>
                                       Rok za zavrsetak projekta:  {projekat.deadline_date}
                                       Status projekta: {projekat.status}
                                    </p>
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
        </>
    );
};

export default Projekti;