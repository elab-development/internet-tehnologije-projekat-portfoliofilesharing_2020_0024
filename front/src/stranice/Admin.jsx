import React, {useEffect} from 'react';
import Naslov from "../komponente/Naslov";
import {Col, Row, Table} from "react-bootstrap";
import {Chart} from "react-google-charts";
import server from "../server";
import {CSVLink} from "react-csv";
import {FaDownload} from "react-icons/fa6";

const Admin = () => {
    const [poruka, setPoruka] = React.useState('');
    const [chartData, setChartData] = React.useState([
        ['Status', 'Broj projekata']
    ]);

    const [projekti, setProjekti] = React.useState([]);
    const [url, setUrl] = React.useState('paginate-projects');
    const [links, setLinks] = React.useState([]);
    const [osvezi, setOsvezi] = React.useState(false);

    const [sviProjekti, setSviProjekti] = React.useState([]);
    const [csvData, setCsvData] = React.useState([]);

    useEffect(() => {
        server.get('projects').then((response) => {
            console.log(response);
            setSviProjekti(response.data.data);

            let csv = [];

            for (let i = 0; i < response.data.data.length; i++) {
                let projekat = response.data.data[i];
                csv.push({
                    id: projekat.id,
                    name: projekat.name,
                    status: projekat.status,
                    deadline_date: projekat.deadline_date
                });
            }

            setCsvData(csv);


        }).catch((error) => {
            console.log(error);
            setPoruka('Greska prilikom ucitavanja projekata');
        });
    }, []);


    useEffect(() => {
        server.get('chart').then((response) => {
            console.log(response);
            let data = response.data.data;
            let chart = [
                ['Status', 'Broj projekata'],
            ];

            for (let i = 0; i < data.length; i++) {
                chart.push([data[i].status, parseInt(data[i].total)]);
            }

            setChartData(chart);
        }).catch((error) => {
            console.log(error);
            setPoruka('Greska prilikom ucitavanja podataka');
        });
    }, []);

    useEffect(() => {
        server.get(url).then((response) => {
            console.log(response);
            setProjekti(response.data.data.data);

            let linksData = response.data.data.links;
            console.log(linksData);



            console.log(linksData);

            setLinks(linksData);

        }).catch((error) => {
            console.log(error);
            setPoruka('Greska prilikom ucitavanja projekata');
        });
    }, [url]);

    return (
        <div>
            <Naslov naslov="Admin stranica" podnaslov={poruka} />

            <Row>
                <Col className="text-center">
                    <CSVLink
                        data={csvData}
                        filename={"projekti.csv"}
                        className="btn btn-primary"
                        target="_blank"
                    >
                        <FaDownload/> Skinite podatke o projektima
                    </CSVLink>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Chart
                        chartType="PieChart"
                        data={chartData}
                        options={{
                            title: 'Ukupno projekata po statusu',
                            is3D: true,
                        }}
                        width={"100%"}
                        height={"400px"}
                    />
                </Col>
            </Row>

            <Row>
                <Table hover>
                    <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Status</th>
                        <th>Deadline</th>
                    </tr>

                    </thead>
                    <tbody>
                    {
                        projekti.map((projekat) => {
                            return (
                                <tr key={projekat.id}>
                                    <td>{projekat.name}</td>
                                    <td>{projekat.status}</td>
                                    <td>{projekat.deadline_date}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
            </Row>
            <Row>
                <Col>
                {
                    links.map((link) => {
                        let linkLabel = link.label;
                        if (linkLabel === '&laquo; Previous') {
                            linkLabel = 'Prethodna';
                        } else if (linkLabel === 'Next &raquo;') {
                            linkLabel = 'Sledeca';
                        }
                        return (
                            <>

                                    <button key={link.url}
                                            className={link.active ? 'btn btn-primary m-1' : 'btn btn-outline-primary m-1'}
                                            onClick={() => {
                                                setUrl(link.url);
                                            }} disabled={
                                        link.url === null
                                    }>
                                        {linkLabel}
                                    </button>

                            </>
                        );
                    })
                }
                </Col>
            </Row>
        </div>
    );
};

export default Admin;