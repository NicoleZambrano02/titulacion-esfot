import {Button, Card, Col, Row, Space, Typography} from "antd";
import React from "react";
import "../styles/home-secretary.css";
import {BulbOutlined} from "@ant-design/icons";
import Routes from "../constants/routes";
import {Link} from "react-router-dom";
import withAuth from "../hocs/withAuth";
import graduation from "../images/la_graduation-cap-solid.png";
import teacher from "../images/la_chalkboard-teacher-solid.png";
import people from "../images/raphael_people.png";

const {Title} = Typography;

const SecretaryHome = () => {
    return (
        <>
            <Row>
                <Col>
                    <Title
                        level={3}
                        style={{
                            color: "#034c70",
                            marginLeft: -30,
                        }}
                    >
                        Panel Principal:
                    </Title>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Row justify="center">
                        <Col span={6}>
                            <Card
                                className={"options main-options"}
                                title="Planes y proyectos de titulación"
                                bordered={false}
                            >
                                <Space direction="vertical" size="large">
                                    <div>
                                        <BulbOutlined className={"big-icon"}/>
                                    </div>
                                    <div>
                                        Revisa los planes y proyectos de titulación de la ESFOT
                                    </div>
                                    <div>
                                        <Button>
                                            <Link to={Routes.PROJECTS_LIST_SECRETARY}>
                                                Ver planes y proyectos
                                            </Link>
                                        </Button>
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                        <Col span={6}/>
                        <Col span={6}/>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Title
                        level={3}
                        style={{
                            color: "#034c70",
                            marginLeft: -30,
                            marginTop: 30,
                        }}
                    >
                        Administración:
                    </Title>
                </Col>
            </Row>

            <Row style={{marginTop: 75}}>
                <Col span={24}>
                    <Row justify="center">
                        <Col span={6}>
                            <Card
                                className={"adminoptions main-adminoptions"}
                                title="Estudiantes"
                                bordered={false}
                            >
                                <Space direction="vertical" size="large">
                                    <div>
                                        <img src={graduation} className={"big-icon"}/>
                                    </div>
                                    <div>Listado de estudiantes de la ESFOT</div>
                                    <div>
                                        <Button className={"btn-secretary"}>
                                            <Link to={Routes.SECRETARY_STUDENTS_LIST}>Ingresar</Link>
                                        </Button>
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                className={"adminoptions main-adminoptions"}
                                title="Profesores"
                                bordered={false}
                            >
                                <Space direction="vertical" size="large">
                                    <div>
                                        <img src={teacher} className={"big-icon"}/>
                                    </div>
                                    <div>Listado de profesores de la ESFOT</div>
                                    <div>
                                        <Button className={"btn-secretary"}>
                                            <Link to={Routes.SECRETARY_TEACHERS_LIST}>Ingresar</Link>
                                        </Button>
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                className={"adminoptions main-adminoptions"}
                                title="Comisiones y Carreras"
                                bordered={false}
                            >
                                <Space direction="vertical" size="large">
                                    <div>
                                        <img src={people} className={"big-icon"}/>
                                    </div>
                                    <div>Comisiones de titulación de la ESFOT</div>
                                    <div>
                                        <Button className={"btn-secretary"}>
                                            <Link to={Routes.SECRETARY_COMMITTEE_LIST}>Ingresar</Link>
                                        </Button>
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default withAuth(SecretaryHome);
