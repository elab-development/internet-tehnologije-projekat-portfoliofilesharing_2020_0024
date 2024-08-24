import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from "react-bootstrap";

const Naslov = props => {
    return (
        <>
            <Row className="mt-3">
                <Col md={12} className="text-center">
                    <h1 className="text-center">{props.naslov}</h1>
                    <p className="text-muted">{props.podnaslov}</p>
                </Col>
            </Row>
        </>
    );
};

Naslov.propTypes = {
    naslov: PropTypes.string.isRequired,
    podnaslov: PropTypes.string.isRequired
};

export default Naslov;