import React, { useEffect, useState } from "react";
import withAuth from "../hocs/withAuth";
import { Col, Comment, List, Row } from "antd";

const ViewComments = (props) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    let renderComment = [];
    let comments = [];
    switch (props.comments) {
      case "title_comment":
        comments = JSON.parse(props.plan[0].title_comment);
        renderComment = [
          {
            content: (
              <div>
                {comments.length > 0
                  ? comments.map((data, index) => (
                      <div key={index}>
                        <p>
                          <b>{data.author}: </b>
                          {data.comment}
                        </p>
                      </div>
                    ))
                  : ""}
              </div>
            ),
          },
        ];
        break;
      case "problem_comment":
        if (props.plan[0].problem_comment) {
          comments = JSON.parse(props.plan[0].problem_comment);
        }
        renderComment = [
          {
            content: (
              <div>
                {comments.length > 0
                  ? comments.map((data, index) => (
                      <div key={index}>
                        <p>
                          <b>{data.author}: </b>
                          {data.comment}
                        </p>
                      </div>
                    ))
                  : ""}
              </div>
            ),
          },
        ];
        break;
      case "justification_comment":
        comments = JSON.parse(props.plan[0].justification_comment);
        renderComment = [
          {
            content: (
              <div>
                {comments.length > 0
                  ? comments.map((data, index) => (
                      <div key={index}>
                        <p>
                          <b>{data.author}: </b>
                          {data.comment}
                        </p>
                      </div>
                    ))
                  : ""}
              </div>
            ),
          },
        ];
        break;
      case "hypothesis_comment":
        comments = JSON.parse(props.plan[0].hypothesis_comment);
        renderComment = [
          {
            content: (
              <div>
                {comments.length > 0
                  ? comments.map((data, index) => (
                      <div key={index}>
                        <p>
                          <b>{data.author}: </b>
                          {data.comment}
                        </p>
                      </div>
                    ))
                  : ""}
              </div>
            ),
          },
        ];
        break;
      case "general_objective_comment":
        comments = JSON.parse(props.plan[0].general_objective_comment);
        renderComment = [
          {
            content: (
              <div>
                {comments.length > 0
                  ? comments.map((data, index) => (
                      <div key={index}>
                        <p>
                          <b>{data.author}: </b>
                          {data.comment}
                        </p>
                      </div>
                    ))
                  : ""}
              </div>
            ),
          },
        ];
        break;
      case "specifics_objectives_comment":
        comments = JSON.parse(props.plan[0].specifics_objectives_comment);
        renderComment = [
          {
            content: (
              <div>
                {comments.length > 0
                  ? comments.map((data, index) => (
                      <div key={index}>
                        <p>
                          <b>{data.author}: </b>
                          {data.comment}
                        </p>
                      </div>
                    ))
                  : ""}
              </div>
            ),
          },
        ];
        break;
      case "methodology_comment":
        comments = JSON.parse(props.plan[0].methodology_comment);
        renderComment = [
          {
            content: (
              <div>
                {comments.length > 0
                  ? comments.map((data, index) => (
                      <div key={index}>
                        <p>
                          <b>{data.author}: </b>
                          {data.comment}
                        </p>
                      </div>
                    ))
                  : ""}
              </div>
            ),
          },
        ];
        break;
      case "work_plan_comment":
        comments = JSON.parse(props.plan[0].work_plan_comment);
        renderComment = [
          {
            content: (
              <div>
                {comments.length > 0
                  ? comments.map((data, index) => (
                      <div key={index}>
                        <p>
                          <b>{data.author}: </b>
                          {data.comment}
                        </p>
                      </div>
                    ))
                  : ""}
              </div>
            ),
          },
        ];
        break;
      case "schedule_comment":
        comments = JSON.parse(props.plan[0].schedule_comment);
        renderComment = [
          {
            content: (
              <div>
                {comments.length > 0
                  ? comments.map((data, index) => (
                      <div key={index}>
                        <p>
                          <b>{data.author}: </b>
                          {data.comment}
                        </p>
                      </div>
                    ))
                  : ""}
              </div>
            ),
          },
        ];
        break;
      case "bibliography_comment":
        comments = JSON.parse(props.plan[0].bibliography_comment);
        renderComment = [
          {
            content: (
              <div>
                {comments.length > 0
                  ? comments.map((data, index) => (
                      <div key={index}>
                        <p>
                          <b>{data.author}: </b>
                          {data.comment}
                        </p>
                      </div>
                    ))
                  : ""}
              </div>
            ),
          },
        ];
        break;
      default:
        console.log("No existe el campo");
        renderComment = [];
        break;
    }
    setComments(() => renderComment);
    return () => {
      setComments([]);
    };
  }, [props.comments]);

  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={(props) => <Comment {...props} />}
    />
  );

  return (
    <>
      <Row>
        <Col>{comments.length > 0 && <CommentList comments={comments} />}</Col>
      </Row>
    </>
  );
};

export default withAuth(ViewComments);
