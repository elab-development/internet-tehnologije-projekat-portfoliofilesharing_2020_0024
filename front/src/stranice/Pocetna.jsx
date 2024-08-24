import React from 'react';
import portfolio from '../slike/portfolio.jpg';
import {Col, Row} from "react-bootstrap";
import Naslov from "../komponente/Naslov";

const Pocetna = () => {
    return (
        <>
            <Naslov naslov="Dobrodosli"
                    podnaslov="na portfolio sajt gde mozete deliti vase projekte i fajlove u njima"/>
            <Row className="portfolio-block">
                <Col md={2}>
                    <img src={portfolio} alt="portfolio" className="img-fluid"/>
                </Col>
                <Col className="mt-2" md={10}>
                    <h1>ZASTO BAS MI</h1>

                    <p>1. Jedinstven i personalizovan dizajn: Tvoj sajt za portfolio nije samo zbirka tvojih radova već
                        odražava tvoj lični stil i kreativnost. Posetioci odmah vide tvoj jedinstven pristup dizajnu,
                        što ih može inspirisati da te angažuju za svoje projekte.</p>

                    <p>2. Interaktivno iskustvo: Tvoj sajt je dizajniran s naglaskom na korisničko iskustvo,
                        omogućavajući posetiocima da lako pregledaju tvoje radove, saznaju više o tvom procesu i
                        kontaktiraju te direktno. Ovakav pristup stvara jaču vezu između tebe i potencijalnih
                        klijenata.</p>

                    <p>3. Profesionalna prezentacija: Svaki tvoj projekat je pažljivo prikazan, s detaljima koji ističu
                        tvoj talenat i stručnost. Ovakva profesionalna prezentacija pomaže da ostaviš snažan utisak i
                        povećaš verovatnoću da te klijenti ozbiljno shvate.</p>

                    <p>4. Fleksibilnost i prilagodljivost: Tvoj sajt omogućava lako ažuriranje i dodavanje novih radova,
                        što znači da tvoji posetioci uvek vide najnovije i najrelevantnije projekte. Ovo je ključno za
                        dizajnere koji žele da prikažu svoju stalnu evoluciju i inovacije.</p>

                    <p>5. Optimizacija za sve uređaje: Tvoj portfolio je optimizovan za pregled na svim uređajima, od
                        desktop računara do mobilnih telefona, što znači da posetioci mogu uživati u tvom radu bez
                        obzira na to kako pristupaju sajtu. Ovo osigurava maksimalnu vidljivost i dostupnost.</p>

                    <p>6. Izražavanje tvoje lične marke: Tvoj sajt je više od digitalne galerije; on je izraz tvoje
                        lične marke. Posetioci dobijaju uvid u tvoje vrednosti, estetske preferencije i profesionalne
                        ciljeve, što te izdvaja od konkurencije.</p>

                </Col>
            </Row>
        </>
    );
};

export default Pocetna;