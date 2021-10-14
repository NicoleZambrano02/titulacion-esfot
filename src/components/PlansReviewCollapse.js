import React from "react";
import { Col, Collapse, Row } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import PlanReviewTeacher from "./PlanReviewTeacher";
import ProjectReview from "./ProjectReview";
import "../styles/plan-collapse.css";
import projectStates from "../utils/projectStates";

const { Panel } = Collapse;

const PlanReviewCollapse = (props) => {
  console.log("status", props.status);
  return (
    <>
      <Row>
        <Col span={24} className="planCollapse">
          <Collapse
            bordered={false}
            defaultActiveKey={
              projectStates.indexOf(props.status) > 10 ? ["2"] : ["1"]
            }
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            className="site-collapse-custom-collapse"
          >
            <Panel
              header="Plan de titulación"
              key="1"
              className="site-collapse-custom-panel"
            >
              <PlanReviewTeacher idPlan={props.planId} />
            </Panel>
            <Panel
              header="Proyecto de titulación"
              key="2"
              className="site-collapse-custom-panel"
              collapsible={
                projectStates.indexOf(props.status) < 10 ? "disabled" : "header"
              }
            >
              <ProjectReview idPlan={props.planId} user={"director"} />
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </>
  );
};

export default PlanReviewCollapse;
