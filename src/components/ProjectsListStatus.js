import React, { useState } from "react";
import {
  Card,
  Col,
  Form,
  Modal,
  Row,
  Skeleton,
  Table,
  Tag,
  Typography,
} from "antd";
import ShowError from "./ShowError";
import Title from "antd/es/typography/Title";
import { useCareersList } from "../data/useCareersList";
import NewTribunalForm from "./NewTribunalForm";
import { useHistory } from "react-router-dom";
import OralDefenseSchedule from "./OralDefenseSchedule";

const { Link } = Typography;

const ProjectsListStatus = ({
  projectsList,
  assignTribunal,
  assignDate,
  allProjects,
  mutate,
  isTribunal,
}) => {
  const [showDefenseSchedule, setShowDefenseSchedule] = useState(false);
  const [form] = Form.useForm();
  const { careers, isLoading, isError } = useCareersList();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [tribunalData, setTribunalData] = useState(null);
  const [defenseProjectData, setDefenseProjectData] = useState(null);
  const [projectData, setProjectData] = useState(null);
  let titleModal = "";
  const history = useHistory();

  if (isLoading) {
    return (
      <Row justify="center" gutter={30}>
        {[...new Array(9)].map((_, i) => (
          <Col xs={24} sm={12} md={8} style={{ marginBottom: 30 }} key={i}>
            <div style={{ textAlign: "center" }}>
              <Skeleton.Image style={{ width: 200 }} />
              <Card title="" extra="" cover="" loading />
            </div>
          </Col>
        ))}
      </Row>
    );
  }
  if (isError) {
    return <ShowError error={isError} />;
  }

  const dataToAssignTribunal = projectsList
    .map(
      (project, index) =>
        project.status === "san_curriculum_2" && {
          key: index,
          originalData: project,
          student_name: `${project.student_name} ${project.student_last_name}`,
          title: project.title,
          teacher_name: `${project.teacher_name} ${project.teacher_lastName}`,
          created_at: project.created_at,
          status: project.status,
        }
    )
    .filter(Boolean);

  const dataDate = projectsList
    .map(
      (project, index) =>
        project.status === "test_defense_apt" && {
          key: index,
          originalData: project,
          student_name: `${project.student_name} ${project.student_last_name}`,
          title: project.title,
          teacher_name: `${project.teacher_name} ${project.teacher_lastName}`,
          created_at: project.created_at,
          status: project.status,
        }
    )
    .filter(Boolean);

  const data = projectsList
    .map((project, index) => ({
      key: index,
      originalData: project,
      student_name: `${project.student_name} ${project.student_last_name}`,
      title: project.title,
      teacher_name: `${project.teacher_name} ${project.teacher_lastName}`,
      created_at: project.created_at,
      status: project.status,
      career: project.teacher_career,
    }))
    .filter(Boolean);

  const dataTribunalAssigned = projectsList
    .map(
      (project, index) =>
        project.status === "tribunal_assigned" ||
        (project.status === "date_defense_assigned" && {
          key: index,
          originalData: project.originalData,
          student_name: project.student_name,
          title: project.title,
          teacher_name: project.teacher_name,
          created_at: project.created_at,
          date_defense: project.tribunalSchedule,
          status: project.status,
        })
    )
    .filter(Boolean);

  const columns = [
    {
      title: "Estudiante(s)",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Profesor",
      dataIndex: "teacher_name",
      key: "teacher_name",
    },
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
      render: (title) =>
        !(!assignTribunal && allProjects) ? (
          <Link>{title}</Link>
        ) : (
          <Typography>{title}</Typography>
        ),
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      width: 125,
      render: (status) => {
        let color = "";
        let name = "";
        {
          switch (status) {
            case "plan_saved":
              color = "orange";
              name = "Plan en desarrollo";
              break;

            case "plan_sent":
              color = "blue";
              name = "Por revisar";
              break;

            case "plan_corrections_done":
              color = "blue";
              name = "Correcciones de plan realizadas";
              break;

            case "plan_review_teacher":
              color = "orange";
              name = "Correcciones enviadas";
              break;

            case "plan_approved_director":
              color = "green";
              name = "Plan aprobado";
              break;

            case "plan_review_commission":
              color = "orange";
              name = "Correcciones de comisión enviadas";
              break;

            case "plan_corrections_done2":
              color = "blue";
              name = "Por revisar por comisión";
              break;

            case "plan_approved_commission":
              color = "green";
              name = "Plan aprobado por comisión";
              break;

            case "san_curriculum_1":
              color = "purple";
              name = "Curriculum saneado 1";
              break;

            case "san_curriculum_2":
              color = "purple";
              name = "Curriculum saneado 2";
              break;

            case "plan_rejected":
              color = "red";
              name = "Plan rechazado";
              break;

            case "project_uploaded":
              color = "cyan";
              name = "PDF por revisar";
              break;

            case "project_corrections_done":
              color = "cyan";
              name = "Correcciones de PDF realizadas";
              break;

            case "project_review_teacher":
              color = "magenta";
              name = "Correcciones de PDF enviadas";
              break;

            case "project_approved_director":
              color = "green";
              name = "PDF aprobado";
              break;

            case "tribunal_assigned":
              color = "lime";
              name = "Tribunal asignado";
              break;

            case "project_graded":
              color = "yellow";
              name = "Proyecto calificado";
              break;

            case "project_corrections_done_2":
              color = "cyan";
              name = "Correcciones de PDF realizadas (tribunal)";
              break;

            case "project_approved_send":
              color = "cyan";
              name = "Aprobado para envío";
              break;

            case "test_defense_apt":
              color = "green";
              name = "Apto para defensa oral";
              break;

            case "date_defense_assigned":
              color = "geekblue";
              name = "Fecha de defensa asignada";
              break;

            case "project_completed":
              color = "gold";
              name = "Proyecto completado";
              break;

            case "project_rejected":
              color = "red";
              name = "Proyecto rechazado";
              break;

            default:
              break;
          }
          return (
            <Tag color={color} key={status}>
              {name.toUpperCase()}
            </Tag>
          );
        }
      },
    },
    {
      title: "Fecha de defensa",
      dataIndex: "date_defense",
      key: "date_defense",
      // render: () => <Title level={5}>FECHA</Title>,
    },
  ];

  titleModal = (
    <Title level={3} style={{ color: "#034c70" }}>
      Asignar tribunal
    </Title>
  );

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const modalProps = {
    title: titleModal,
    visible,
    confirmLoading,
    closable: true,
    destroyOnClose: true,
    onCancel() {
      handleCancel();
    },
    onClose() {
      handleCancel();
    },
    cancelButtonProps: { hidden: true },
    okButtonProps: {
      style: {
        right: "43%",
        backgroundColor: "#034c70",
      },
    },
    okText: "Guardar",
    onOk() {
      handleOk();
    },
  };

  return (
    <>
      {assignTribunal && !allProjects && !assignDate ? (
        <Table
          columns={columns.filter((col) => col.key !== "date_defense")}
          dataSource={dataToAssignTribunal}
          rowKey={(dataTribunal) => dataTribunal.id}
          onRow={(record) => {
            return {
              onClick: (event) => {
                event.stopPropagation();
                setVisible(true);
                setTribunalData(record.originalData);
              },
            };
          }}
        />
      ) : assignDate && showDefenseSchedule === false ? (
        <Table
          columns={columns.filter((col) => col.key !== "date_defense")}
          dataSource={dataDate}
          rowKey={(dataDate) => dataDate.id}
          onRow={(record) => {
            return {
              onClick: (event) => {
                event.stopPropagation();
                setShowDefenseSchedule(true);
                setDefenseProjectData(record.originalData.id);
              },
            };
          }}
        />
      ) : assignDate && showDefenseSchedule === true ? (
        <OralDefenseSchedule project={defenseProjectData} />
      ) : !assignTribunal && allProjects ? (
        <Table
          columns={columns.filter((col) => col.key !== "date_defense")}
          dataSource={data}
          rowKey={(data) => data.id}
        />
      ) : (
        isTribunal && (
          <Table
            columns={columns}
            dataSource={dataTribunalAssigned}
            rowKey={(dataTribunalAssigned) => dataTribunalAssigned.id}
            onRow={(record) => {
              return {
                onClick: (event) => {
                  console.log({
                    project: record.originalData,
                    tribunalSchedule: record.date_defense,
                  });
                  event.stopPropagation();
                  setProjectData({
                    ...projectData,
                    project: record.originalData,
                    tribunalSchedule: record.date_defense,
                  });
                  // history.push({
                  //   pathname: Routes.JURY_PROJECT_REVIEW,
                  //   state: { idPlan: record.originalData.id, user: "tribunal" },
                  // });
                },
              };
            }}
          />
        )
      )}

      <Modal {...modalProps}>
        <NewTribunalForm
          project={tribunalData}
          careers={careers}
          form={form}
          mutate={mutate}
          closeModal={() => setVisible(false)}
          loadingModal={setConfirmLoading}
        />
      </Modal>
    </>
  );
};

export default ProjectsListStatus;
