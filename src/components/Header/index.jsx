import React, { useState } from "react";
import { Col, Row } from "antd";
import './index.less';
import renderTime from "../../time/time";

const Header = (props) => {
    let Common = props.Common;
    const [time, setTime] = useState('')
    setTimeout(() => {
        let date = new Date();//当前时间
        let time = date.getTime();//时间戳
        let time1 = renderTime(time)
        setTime(time1)
    }, 1000)
    return (
        <div className="header">
            <Row className="header1">
                {Common ? <Col className="header-left" span={8}>
                    <img src="assets/logo-ant.svg" alt="" />
                    <h2>IMooc 通用管理系统</h2>
                </Col> : ''}
                <Col span={Common ? 16 : 24} className="header-right">
                    <span>欢迎,抱妹妹走</span>
                    <a href="#">登录</a>
                </Col>
            </Row>
            {
                Common ? '' : <Row className="header2">
                    <Col span={6} className="bread1">
                        <span className="shouye">首页</span>
                    </Col>
                    <Col span={16} className="bread2">
                        {time}
                    </Col>
                </Row>
            }
        </div>
    );
}

export default Header;