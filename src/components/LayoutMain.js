/**
 * Created by chalosalvador on 3/1/20
 */
import React from "react";
import { Col, Layout, Row } from "antd";
import { FacebookOutlined } from "@ant-design/icons";
import Headers from "./Headers";

const Header = Layout.Header;
const Content = Layout.Content;
const Footer = Layout.Footer;

/**
 * Este componente renderiza los elementos comunes para toda la aplicación
 *
 * Header (menu), Content y Footer
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MainLayout = (props) => {
  console.log("props", props);

  return (
    <div className="app">
      <Layout>
        <Row type="flex" justify="center" className="header-wrapper">
          <Col span={24}>
            <Header className="header">
              <Headers />
            </Header>
          </Col>
        </Row>

        <Content className="content">{props.children}</Content>

        <Footer className="footer">
          <Row>
            <Col xs={{ span: 24 }} md={6} className="logo-blanco"></Col>

            <Col
              xs={{
                span: 24,
                offset: 0,
              }}
              md={{
                span: 5,
                offset: 3,
              }}
              className="footer-text"
            >
              © Escuela de Formación de Tecnólogos https://esfot.epn.edu.ec/
              <br />
              diresfot@epn.edu.ec
              <br />
            </Col>

            <Col
              xs={{
                span: 24,
                offset: 0,
              }}
              md={{
                span: 4,
                offset: 4,
              }}
              className="contact-links"
            >
              <a
                href="https://www.facebook.com/ESFOT-EPN-UIO-163137570522102/?ref=bookmarks"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginLeft: 30,
                  marginRight: 30,
                }}
              >
                <FacebookOutlined className={"big-icon"} />
              </a>
            </Col>
          </Row>
        </Footer>
      </Layout>
    </div>
  );
};

export default MainLayout;
