import React  from "react";
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    CompassOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { isMobile } from "react-device-detect";
import sutdLogo from "../images/sutdLogoWhite.png";
import {LinkContainer} from "react-router-bootstrap";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signoutUser } from "../actions/authActions";

const { Header, Sider } = Layout;
const { SubMenu } = Menu;

function MenuHeader(){
    const history = useHistory();
    const dispatch = useDispatch();
    const admin = localStorage.getItem("admin");

    const renderAllocationMapMenu = () => {
        if (admin === "true"){
            return <LinkContainer to="/allocation-map/admin" className="pointer">
                <div className="d-flex flex-row align-items-center">
                    <CompassOutlined className="mr-2"/>
                    Allocation Map
                </div>
            </LinkContainer>
        } else {
            return <LinkContainer to="/allocation-map/student" className="pointer">
                <div className="d-flex flex-row align-items-center">
                    <CompassOutlined className="mr-2"/>
                    Allocation Map
                </div>
            </LinkContainer>
        }
    }

    const renderManageRequirementsMenu = () => {
        if (admin === "true"){
            return <LinkContainer to="/manage-requirements/admin" className="admin-manage-requirements">
                <div className="d-flex flex-row align-items-center">
                    <UploadOutlined className="mr-2"/>
                    Manage Requirements
                </div>
            </LinkContainer>
        } else {
            return <LinkContainer className="student-manage-requirements" to="/manage-requirements/student">
                <div className="d-flex flex-row align-items-center">
                    <UploadOutlined className="mr-2"/>
                    Manage Requirements
                </div>
            </LinkContainer>
        }
    }

    const renderAccountsMenu = () => {
        if (admin === "true"){
            return <SubMenu
                key="account"
                className = "account"
                title={
                    <div className="d-flex flex-row align-items-center">
                        <UserOutlined className="mr-2"/>
                        Account
                    </div>
                }
            >
                <Menu.Item key="settings">
                    <LinkContainer to="/user-settings" className="pointer">
                        <div>
                            Settings
                        </div>
                    </LinkContainer>
                </Menu.Item>
                <Menu.Item key="signup">
                    <LinkContainer to="/signup" className="pointer">
                        <div>
                            Signup
                        </div>
                    </LinkContainer>
                </Menu.Item>
                <Menu.Item key="signout" name = "signout-button" onClick={() => handleLogout()}>Sign Out</Menu.Item>
            </SubMenu>
        } else {
            return <SubMenu
                key="account"
                title={
                    <div className="d-flex flex-row align-items-center">
                        <UserOutlined className="mr-2"/>
                        Account
                    </div>
                }
            >
                <Menu.Item key="settings">
                    <LinkContainer to="/user-settings" className="pointer">
                        <div>
                            Settings
                        </div>
                    </LinkContainer>
                </Menu.Item>
                <Menu.Item key="signout" name = "signout-button" onClick={() => handleLogout()}>Sign Out</Menu.Item>
            </SubMenu>
        }
    }

    const handleLogout = () => {
        signoutUser(history, dispatch);
    }

    return(
        <div>
            {
                isMobile ?
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        className="vh-100"
                    >
                        <div className="p-3">
                            <img
                                src={sutdLogo}
                                className="img-fluid"
                                alt=""
                            />
                        </div>

                        <Menu theme="dark" mode="inline">
                            <Menu.Item key="req">
                                {renderManageRequirementsMenu()}
                            </Menu.Item>
                            <Menu.Item key="map">
                                {renderAllocationMapMenu()}
                            </Menu.Item>
                            
                        </Menu>
                    </Sider>
                    :
                    <Header className="d-flex align-items-center">
                        <LinkContainer to="/home" className="pointer">
                            <img
                                src={sutdLogo}
                                className="menu-logo p-1"
                                alt="SUTD LOGO"
                            />
                        </LinkContainer>
                        <div style={{width: "90vw"}}/>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            className="d-flex justify-content-end"
                        >
                            <Menu.Item key="req">
                                {renderManageRequirementsMenu()}
                            </Menu.Item>
                            <Menu.Item key="map">
                                {renderAllocationMapMenu()}
                            </Menu.Item>
                            {renderAccountsMenu()}
                        </Menu>
                    </Header>
            }
        </div>
    )
}

export default MenuHeader;