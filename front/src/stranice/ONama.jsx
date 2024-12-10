import React, {useEffect} from 'react';
import Naslov from "../komponente/Naslov";
import {Col, Row} from "react-bootstrap";
import nikola from "../slike/nikola.jpg";
import marko from "../slike/marko.enc";
import server from "../server";

const ONama = () => {

    const onama = [
        {
            id: 1,
            ime: "Nikola Valjarevic",
            slika: nikola,
            tekst: "Nikola je programer koji je student poslednje godine Fakultete organizacionih nauka u Beogradu. Nikola je zavrsio kurs za web programiranje u IT Bootcamp-u i zeli da pomogne svima kojima je pomoc potrebna."
        },
        {
            id: 2,
            ime: "Marko Kacarevic",
            slika: marko,
            tekst: "Marko je student cetvrte godine Fakulteta organizacionih nauka u Beogradu. Marko je zavrsio kurs za management i razvija svoje menadzment sposobnosti. Markov san je ovaj sajt postane go-to mesto za sve one koji zele da dele svoje projekte."
        }
    ];

    const [prijateljSajta, setPrijateljSajta] = React.useState(null);

    useEffect(() => {
        server.get('https://randomuser.me/api/').then((response) => {
            console.log(response);
            let podaci = response.data.results[0];
            setPrijateljSajta({
                ime: podaci.name.first + ' ' + podaci.name.last,
                slika: podaci.picture.large,
                tekst: 'Ovaj sajt mi je dosta pomogao u razvoju mog projekta. Hvala! Oduvek ste mi prvi u srcu'
            });
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <>
            <Naslov naslov="Nesto o nama" podnaslov="i zasto ovo radimo" />

                {
                    onama.map((clan) => {
                        return (
                            <Row key={clan.id} className="p-4 m-1">
                                <Col md={6}>
                                    <img src={clan.slika} alt={clan.ime} className="img-fluid" />
                                </Col>
                                <Col md={6}>
                                    <h1>{clan.ime}</h1>
                                    <p>{clan.tekst}</p>
                                </Col>
                            </Row>
                        );
                    })
                }

            {
                prijateljSajta && (
                    <Row>
                        <Col>
                            <h1>{prijateljSajta.ime}</h1>
                            <img src={prijateljSajta.slika} alt={prijateljSajta.ime} className="img-thumbnail" />
                            <p>{prijateljSajta.tekst}</p>
                        </Col>
                    </Row>
                )
            }
        </>
    );
};

export default ONama;