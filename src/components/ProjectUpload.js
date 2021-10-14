/* eslint import/no-webpack-loader-syntax: 0 */

import React, { useCallback, useEffect, useState } from "react";
import {
  Upload,
  Typography,
  Button,
  Form,
  Row,
  Col,
  Modal,
  Image,
  message,
} from "antd";
import {
  InboxOutlined,
  SendOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import {
  PdfLoader,
  PdfHighlighter,
  Highlight,
  Popup,
  AreaHighlight,
  setPdfWorker,
} from "react-pdf-highlighter";
import PDFWorker from "worker-loader!pdfjs-dist/lib/pdf.worker";
import { useStudentProject } from "../data/useStudentProjects";
import API from "../data";
import Routes from "../constants/routes";
import { useGetProjectPDF } from "../data/useGetProjectPDF";

import Spinner from "./Spinner";
import Sidebar from "./Sidebar";

import "../styles/pdf.css";

setPdfWorker(PDFWorker);

const { Dragger } = Upload;
const { Title } = Typography;
const { confirm } = Modal;

const parseIdFromHash = () =>
  document.location.hash.slice("#highlight-".length);

const resetHash = () => {
  document.location.hash = "";
};

const HighlightPopup = ({ comment }) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;

const ProjectUpload = () => {
  const { projects, isLoading } = useStudentProject();
  const [isSending, setIsSending] = useState(false);
  const [form] = Form.useForm();
  const { isLoading1 } = useGetProjectPDF(projects[0].id);

  if (
    (projects[0].status === "project_review_teacher" ||
      projects[0].status === "project_graded") &&
    isLoading &&
    isLoading1
  ) {
    return <h1>Loading...</h1>;
  }

  const initialUrl = projects[0].report_pdf;

  const url = initialUrl;

  const highlights =
    projects[0].highlights &&
    (projects[0].status === "project_review_teacher" ||
      projects[0].status === "project_graded")
      ? JSON.parse(projects[0].highlights)
      : [];

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.target.files;
  };

  const props = {
    name: "file",
    accept: "application/pdf",
    listType: "picture",
    maxCount: 1,
    showUploadList: {
      showPreviewIcon: true,
    },
    disabled: !(
      projects[0].status === "plan_approved_commission" ||
      projects[0].status === "project_review_teacher" ||
      projects[0].status === "project_graded"
    ),
    beforeUpload: () => false,
  };

  const onFinish = async (formData) => {
    setIsSending(true);
    const data = new FormData();
    data.append("report_pdf", formData.report_pdf[0]);

    try {
      await API.post(`/projects/${projects[0].id}/pdf`, data);
      switch (projects[0].status) {
        case "plan_approved_commission":
          await API.post(`/projects/${projects[0].id}/project-uploaded`);
          break;

        case "project_review_teacher":
          await API.post(
            `/projects/${projects[0].id}/project-corrections-done`
          );
          break;

        case "project_graded":
          await API.post(
            `/projects/${projects[0].id}/project-corrections-done-2`
          );
          break;

        default:
          break;
      }

      setIsSending(false);
      confirm({
        icon: <CheckCircleOutlined />,
        title: (
          <Title level={3} style={{ color: "#034c70" }}>
            ¡Buen trabajo!
          </Title>
        ),
        content: (
          <>
            <Row justify="center">
              <Col>
                <Image src="boy.png" width={100} />
                <Image src="girl.png" width={100} />
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={{ color: "#034c70" }}>
                  Tu proyecto ha sido enviado.
                  <br />
                  Ahora deberá ser aprobado por tu director.
                </p>
              </Col>
            </Row>
          </>
        ),
        okText: "Entendido",
        okButtonProps: {
          href: Routes.HOME,
          style: {
            backgroundColor: "#034c70",
            marginRight: 125,
          },
        },
        cancelButtonProps: { hidden: true },
      });
    } catch (error) {
      console.log("ERROR", error);
      message.error("Ocurrió un error, intente de nuevo");
      setIsSending(false);
    }
  };

  const modal = async (file) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: "¿Estás seguro de mandar el proyecto?",
      content: (
        <>
          <Row>
            <Col>
              <p>Una vez enviado le llegará a tu director.</p>
            </Col>
          </Row>
        </>
      ),
      okText: "Si",
      cancelText: "No",
      onOk() {
        onFinish(file);
      },
      onCancel() {
        console.log("Cancel");
      },
      okButtonProps: { style: { backgroundColor: "#034c70" } },
    });
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const getHighlightById = useCallback(
    (id) => {
      return highlights.find((highlight) => highlight.id === id);
    },
    [highlights]
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const scrollToHighlightFromHash = useCallback(() => {
    const highlight = getHighlightById(parseIdFromHash());

    if (highlight) {
      scrollViewerTo(highlight);
    }
  }, [getHighlightById]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    window.addEventListener("hashchange", scrollToHighlightFromHash, false);

    return () => {
      window.removeEventListener("hashchange", scrollToHighlightFromHash);
    };
  }, [scrollToHighlightFromHash]);

  let scrollViewerTo = () => {};

  return (
    <>
      <Title
        level={1}
        style={{
          color: "#034c70",
        }}
      >
        Proyecto de Titulación
      </Title>
      {projects[0].status !== "plan_approved_commission" && (
        <div className="App" style={{ display: "flex", height: "100vh" }}>
          {projects[0].status === "project_review_teacher" ||
          projects[0].status === "project_graded" ? (
            <Sidebar highlights={highlights} />
          ) : (
            <></>
          )}

          <div
            style={{
              height: "100vh",
              width: "75vw",
              position: "relative",
            }}
          >
            <PdfLoader url={url} beforeLoad={<Spinner />}>
              {(pdfDocument) => (
                <PdfHighlighter
                  pdfDocument={pdfDocument}
                  enableAreaSelection={(event) => event.altKey}
                  onScrollChange={resetHash}
                  // pdfScaleValue="page-width"
                  scrollRef={(scrollTo) => {
                    scrollViewerTo = scrollTo;

                    scrollToHighlightFromHash();
                  }}
                  onSelectionFinished={() => console.log("Finished!")}
                  highlightTransform={(
                    highlight,
                    index,
                    setTip,
                    hideTip,
                    viewportToScaled,
                    screenshot,
                    isScrolledTo
                  ) => {
                    const isTextHighlight = !Boolean(
                      highlight.content && highlight.content.image
                    );

                    const component = isTextHighlight ? (
                      <Highlight
                        isScrolledTo={isScrolledTo}
                        position={highlight.position}
                        comment={highlight.comment}
                      />
                    ) : (
                      <AreaHighlight
                        highlight={highlight}
                        onChange={() => {}}
                      />
                    );

                    return (
                      <Popup
                        popupContent={<HighlightPopup {...highlight} />}
                        onMouseOver={(popupContent) =>
                          setTip(highlight, () => popupContent)
                        }
                        onMouseOut={hideTip}
                        key={index}
                        children={component}
                      />
                    );
                  }}
                  highlights={highlights}
                />
              )}
            </PdfLoader>
          </div>
        </div>
      )}
      <div style={{ marginTop: 30 }}>
        <Form
          name="project-upload"
          onFinish={modal}
          initialValues={
            projects.length > 0 && projects[0].report_pdf
              ? projects[0].report_pdf
              : null
          }
          form={form}
        >
          <Form.Item
            name={"report_pdf"}
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Por favor seleccione un archivo .pdf",
              },
            ]}
          >
            <Row type="flex" justify="center" align="middle">
              <Col>
                <Dragger {...props} style={{ width: 350, height: 250 }}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{ color: "#034c70" }} />
                  </p>
                  <p className="ant-upload-text">
                    Click o arrastre un archivo a esta área para subirlo
                  </p>
                  <p className="ant-upload-hint">Suba un archivo .pdf</p>
                </Dragger>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Row type="flex" justify="center" align="middle">
              <Col>
                <Button
                  htmlType={"submit"}
                  style={{ marginLeft: 10 }}
                  loading={isSending}
                  disabled={
                    !(
                      projects[0].status === "plan_approved_commission" ||
                      projects[0].status === "project_review_teacher" ||
                      projects[0].status === "project_graded"
                    )
                  }
                >
                  <SendOutlined /> Enviar proyecto
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ProjectUpload;
