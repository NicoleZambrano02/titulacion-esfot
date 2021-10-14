import React from "react";
import { useAuth } from "../providers/Auth";
import { Button, Col, Popover, Row, Typography } from "antd";
import "../styles/headers.css";
import logoEPN from "../images/Logotipo-ESFOT.png";
import logoESFOT from "../images/Logotipo-ESFOT2.png";
import logoEPNB from "../images/epnblanco.png";
import logoESFOTB from "../images/esfotblanco.png";

const { Title } = Typography;

const Headers = () => {
  const { isAuthenticated, currentUser } = useAuth();

  return (
    <>
      {!isAuthenticated ? (
        <Row type="flex" justify="space-between" align="bottom">
          <Col xs={24} md={6} className="logo-wrapper">
            <a href="https://www.epn.edu.ec/">
              <img className="logo" src={logoEPN} alt="" />
            </a>
          </Col>
          <Col xs={2} align="right" className="responsive-menu-button">
            <Popover
              trigger="click"
              placement="rightTop"
              overlayClassName="responsive-menu-wrapper"
            >
              <Button type="primary">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  className=""
                  data-icon="menu"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
                </svg>
              </Button>
            </Popover>
          </Col>

          <Col xs={22} md={4} className="logos-social-header" align="right">
            <a href="https://esfot.epn.edu.ec/">
              <img className="logo" src={logoESFOT} alt="" />
            </a>
          </Col>
        </Row>
      ) : currentUser.role === "ROLE_TEACHER" ? (
        <Row
          type="flex"
          justify="space-between"
          align="bottom"
          className={"header-auth"}
        >
          <Col xs={24} md={6} className="logo-wrapper">
            <Title level={2} className={"titles"}>
              PANEL PROFESOR
            </Title>
          </Col>

          <Col xs={2} align="right" className="responsive-menu-button">
            <Popover
              trigger="click"
              placement="rightTop"
              overlayClassName="responsive-menu-wrapper"
            >
              <Button type="primary">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  className=""
                  data-icon="menu"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
                </svg>
              </Button>
            </Popover>
          </Col>
          <Col
            xs={22}
            md={4}
            offset={10}
            align="right"
            className="logo-wrapper"
          >
            <a href="https://www.epn.edu.ec/">
              <img className="logo-epn" src={logoEPNB} alt="" />
            </a>
          </Col>
          <Col xs={22} md={4} className="logos-social-header" align="right">
            <a href="https://esfot.epn.edu.ec/">
              <img className="logo" src={logoESFOTB} alt="" />
            </a>
          </Col>
        </Row>
      ) : currentUser.role === "ROLE_STUDENT" ? (
        <Row
          type="flex"
          justify="space-between"
          align="bottom"
          className={"header-auth"}
        >
          <Col xs={24} md={6} className="logo-wrapper">
            <Title level={2} className={"titles"}>
              PANEL ESTUDIANTE
            </Title>
          </Col>

          <Col xs={2} align="right" className="responsive-menu-button">
            <Popover
              trigger="click"
              placement="rightTop"
              overlayClassName="responsive-menu-wrapper"
            >
              <Button type="primary">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  className=""
                  data-icon="menu"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
                </svg>
              </Button>
            </Popover>
          </Col>
          <Col
            xs={22}
            md={4}
            offset={10}
            align="right"
            className="logo-wrapper"
          >
            <a href="https://www.epn.edu.ec/">
              <img className="logo-epn" src={logoEPNB} alt="" />
            </a>
          </Col>
          <Col xs={22} md={4} className="logos-social-header" align="right">
            <a href="https://esfot.epn.edu.ec/">
              <img className="logo" src={logoESFOTB} alt="" />
            </a>
          </Col>
        </Row>
      ) : currentUser.role === "ROLE_SECRETARY" ? (
        <Row
          type="flex"
          justify="space-between"
          align="bottom"
          className={"header-auth"}
        >
          <Col xs={24} md={6} className="logo-wrapper">
            <Title level={2} className={"titles"}>
              PANEL SECRETARÍA
            </Title>
          </Col>

          <Col xs={2} align="right" className="responsive-menu-button">
            <Popover
              trigger="click"
              placement="rightTop"
              overlayClassName="responsive-menu-wrapper"
            >
              <Button type="primary">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  className=""
                  data-icon="menu"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
                </svg>
              </Button>
            </Popover>
          </Col>
          <Col
            xs={22}
            md={4}
            offset={10}
            align="right"
            className="logo-wrapper"
          >
            <a href="https://www.epn.edu.ec/">
              <img className="logo-epn" src={logoEPNB} alt="" />
            </a>
          </Col>
          <Col xs={22} md={4} className="logos-social-header" align="right">
            <a href="https://esfot.epn.edu.ec/">
              <img className="logo" src={logoESFOTB} alt="" />
            </a>
          </Col>
        </Row>
      ) : (
        <Row
          type="flex"
          justify="space-between"
          align="bottom"
          className={"header-auth"}
        >
          <Col xs={24} md={6} className="logo-wrapper">
            <Title level={2} className={"titles"}>
              PANEL DIRECCIÓN
            </Title>
          </Col>

          <Col xs={2} align="right" className="responsive-menu-button">
            <Popover
              trigger="click"
              placement="rightTop"
              overlayClassName="responsive-menu-wrapper"
            >
              <Button type="primary">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  className=""
                  data-icon="menu"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
                </svg>
              </Button>
            </Popover>
          </Col>
          <Col
            xs={22}
            md={4}
            offset={10}
            align="right"
            className="logo-wrapper"
          >
            <a href="https://www.epn.edu.ec/">
              <img className="logo-epn" src={logoEPNB} alt="" />
            </a>
          </Col>
          <Col xs={22} md={4} className="logos-social-header" align="right">
            <a href="https://esfot.epn.edu.ec/">
              <img className="logo" src={logoESFOTB} alt="" />
            </a>
          </Col>
        </Row>
      )}

      {/*<Menu*/}
      {/*  mode={ props.mode }*/}
      {/*  onClick={ handleClick }*/}
      {/*  className='menu'*/}
      {/*  theme='dark'*/}
      {/*  selectedKeys={ [ menuState.current ] }*/}
      {/*  style={ {*/}
      {/*    lineHeight: '64px',*/}
      {/*    width: 'fit-content'*/}
      {/*  } }*/}
      {/*>*/}
      {/*  <Menu.Item key={ Routes.INDEX }>*/}
      {/*    <Link to={ Routes.INDEX } style={ linkStyle }>Home</Link>*/}
      {/*  </Menu.Item>*/}

      {/*  <Menu.Item key={ Routes.HOME }>*/}
      {/*    <Link to={ Routes.HOME } style={ linkStyle }>Menú Principal</Link>*/}
      {/*  </Menu.Item>*/}

      {/*  <Menu.Item key={ Routes.ABOUT }>*/}
      {/*    <Link to={ Routes.ABOUT } style={ linkStyle }>About</Link>*/}
      {/*  </Menu.Item>*/}

      {/*  {*/}
      {/*    isAuthenticated*/}
      {/*      ? <Menu.SubMenu icon={ <UserOutlined /> } title={ currentUser && currentUser.name }>*/}
      {/*        <Menu.ItemGroup title='Item 1'>*/}
      {/*          <Menu.Item key='setting:1'>Option 1</Menu.Item>*/}
      {/*          <Menu.Item key='setting:2'>Option 2</Menu.Item>*/}
      {/*        </Menu.ItemGroup>*/}
      {/*        <Menu.ItemGroup title='Item 2'>*/}
      {/*          <Menu.Item key='setting:3'>Option 3</Menu.Item>*/}
      {/*          <Menu.Item key='setting:4'>Option 4</Menu.Item>*/}
      {/*        </Menu.ItemGroup>*/}

      {/*        <Menu.Item key={ Routes.LOGIN }>*/}
      {/*          <Link to={ Routes.LOGOUT } className='logout-link'>*/}
      {/*            {*/}
      {/*              isCheckingAuth*/}
      {/*                ? <LoadingOutlined />*/}
      {/*                : <><LogoutOutlined /> Salir</>*/}
      {/*            }*/}
      {/*          </Link>*/}
      {/*        </Menu.Item>*/}
      {/*      </Menu.SubMenu>*/}
      {/*      : <Menu.Item key={ Routes.LOGIN }>*/}
      {/*        <Link to={ Routes.LOGIN }>*/}
      {/*          {*/}
      {/*            isCheckingAuth*/}
      {/*              ? <LoadingOutlined />*/}
      {/*              : <><LoginOutlined /> Ingresar</>*/}
      {/*          }*/}
      {/*        </Link>*/}
      {/*      </Menu.Item>*/}
      {/*  }*/}
      {/*</Menu>*/}
    </>
  );
};
export default Headers;
