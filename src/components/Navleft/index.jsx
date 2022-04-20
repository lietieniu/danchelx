import React from "react";
import './index.less';
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import menuList from "../../config/menuConfig";
const { SubMenu } = Menu

const NavLeft = () => {
    const renderMenu = (list) => {
        return list.map((item) => {
            if (item.children) {
                return <SubMenu title={item.title} key={item.key}>
                    {renderMenu(item.children)}
                </SubMenu>
            }
            return <Menu.Item key={item.key} title={item.title}>
              <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }
    return (
        <div>
            <div className="navLeft">
                <img src="./assets/logo-ant.svg" alt="" />
                <h1>Imooc MS</h1>
            </div>
            <Menu theme="dark">
                {renderMenu(menuList)}
            </Menu>
        </div>
    );
}

export default NavLeft;