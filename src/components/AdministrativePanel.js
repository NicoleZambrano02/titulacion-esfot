import { Col, Row, Typography } from "antd";
import React, { useState } from "react";
import "../styles/teacher-panel.css";
import ShowError from "./ShowError";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";
import { useAuth } from "../providers/Auth";
import "../styles/home-teacher.css";
import ProjectsListStatus from "./ProjectsListStatus";
import { useProjects } from "../data/useProjects";

const { Title } = Typography;

const AdministrativePanel = ({ assignTribunal, assignDate, allProjects }) => {
  let location = useLocation();
  const { isAuthenticated } = useAuth();
  const { projectsList, isLoading, isError, mutate } = useProjects();

  const [menuState, setMenuState] = useState({
    current: location.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: [],
  });

  React.useEffect(() => {
    setMenuState({
      ...menuState,
      current: location.pathname,
    });
  }, [location, isAuthenticated]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ShowError error={isError} />;
  }

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
            Dirección:
          </Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <Title level={3} style={{ color: "#034c70" }}>
            Planes y proyectos de titulación
          </Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <ProjectsListStatus
            projectsList={projectsList}
            mutate={mutate}
            assignTribunal={assignTribunal}
            assignDate={assignDate}
            allProjects={allProjects}
          />
        </Col>
      </Row>
    </>
  );
};

export default AdministrativePanel;
