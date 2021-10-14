import React, { useEffect, useState } from "react";
import withAuth from "../hocs/withAuth";
import { useAuth } from "../providers/Auth";
import { Button, Col, Comment, Form, Input, List, message, Row } from "antd";
import API from "../data";

const { TextArea } = Input;

const AddComments = (props) => {
  const [sending, setSending] = useState(false);
  const [solving, setSolving] = useState(false);
  const [comments, setComments] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    let comments = [];
    if (props.plan[props.comments]) {
      comments = JSON.parse(props.plan[props.comments]);
    }
    let renderComment = [
      {
        content: (
          <div>
            {comments.length > 0
              ? comments.map((data, index) => (
                  <div key={index}>
                    <p>
                      <b>
                        {data.author ===
                        `${currentUser.name} ${currentUser.last_name}`
                          ? "Yo"
                          : data.author}
                        :{" "}
                      </b>
                      {data.comment}
                    </p>
                    <br />
                  </div>
                ))
              : "No has realizado ningún comentario aún."}
          </div>
        ),
      },
    ];

    setComments(renderComment);
  }, [props.comments, props.plan]);

  const CommentList = ({ comments }) => (
    <>
      <Row>
        <Col span={15}>
          <List
            dataSource={comments}
            itemLayout="horizontal"
            renderItem={(props) => <Comment {...props} />}
          />
        </Col>
        <Col span={9}>
          {(props.user === "director" &&
            props.plan.status === "plan_corrections_done") ||
          (props.user === "committee" &&
            props.plan.status === "plan_corrections_done2") ? (
            <Button
              loading={solving}
              style={{ marginTop: 5 }}
              danger
              disabled={!props.plan[props.comments]}
              onClick={() => solveComment()}
            >
              Solventar comentarios
            </Button>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </>
  );

  const Editor = ({ onChange, onSubmit }) => (
    <>
      <Form onFinish={onSubmit}>
        <Form.Item name={props.comments}>
          <TextArea
            placeholder={
              !props.plan[props.comments]
                ? "Ingresa tu comentario"
                : "Editar tu comentario"
            }
            rows={2}
            style={{ width: 500 }}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            loading={sending}
            style={{
              backgroundColor: "#034c70",
              color: "#ffffff",
            }}
          >
            Guardar Comentario
          </Button>

          <Button type="link" onClick={props.onClose}>
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </>
  );

  const onFinish = async (values) => {
    setSending(true);
    let commentsArray = [];
    let dataToSend = {};
    const commentData = {
      author: `${currentUser.name} ${currentUser.last_name}`,
      comment: values[props.comments],
    };
    if (props.plan[props.comments]) {
      commentsArray = JSON.parse(props.plan[props.comments]);
      commentsArray.push(commentData);
    } else {
      commentsArray.push(commentData);
    }
    dataToSend[props.comments] = JSON.stringify(commentsArray);

    try {
      await API.post(`/projects/${props.planID}`, dataToSend);
      setSending(false);
      message.success("Comentario agregado con éxito!");
      let comment = [
        {
          content: (
            <div>
              {commentsArray.length > 0
                ? commentsArray.map((data, index) => (
                    <div key={index}>
                      <p>
                        <b>
                          {data.author ===
                          `${currentUser.name} ${currentUser.last_name}`
                            ? "Yo"
                            : data.author}
                          :{" "}
                        </b>
                        {data.comment}
                      </p>
                      <br />
                    </div>
                  ))
                : "No se han realizado comentarios aún."}
            </div>
          ),
        },
      ];

      setComments(comment);
    } catch (e) {
      console.log("ERROR", e);
      message.error("No se guardaron los datos, intente de nuevo");
      setSending(false);
    }
  };

  const handleChange = (e) => {
    console.log("value", e.target.value);
  };

  const solveComment = async () => {
    setSolving(true);
    const data = {};
    data[props.comments] = "";

    console.log("DATOS", data);

    try {
      await API.post(`/projects/${props.planID}`, data);
      setSolving(false);
      message.success("Comentario solventado con éxito!");
      let noComment = [
        {
          content: <div>No has realizado ningún comentario aún.</div>,
        },
      ];
      setComments(noComment);
    } catch (e) {
      console.log("ERROR", e);
      setSolving(false);
      message.error(`No se guardaron los datos:¨${e}`);
    }
  };

  return (
    <>
      <Row>
        <Col>
          {comments.length > 0 && <CommentList comments={comments} />}
          <Comment
            content={<Editor onChange={handleChange} onSubmit={onFinish} />}
          />
        </Col>
      </Row>
    </>
  );
};

export default withAuth(AddComments);
