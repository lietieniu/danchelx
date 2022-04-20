import React,{useState} from "react";
import { Col, Row } from "antd";
import './index.less';
import renderTime from "../../time/time";

const Header = () => {
    const [time,setTime]=useState('')
     setTimeout(()=>{
       let date=new Date();//当前时间
       let time=date.getTime();//时间戳
       let time1=renderTime(time)
       setTime(time1)
     },1000)
    return (
        <div className="header">
            <Row className="header1">
               <Col span={24}>
               <span>欢迎,抱妹妹走</span>
                <a href="#">登录</a>
               </Col>
            </Row>
            <Row className="header2">
                <Col span={6} className="bread1">
                    <span>首页</span>
                </Col>
                <Col span={16} className="bread2">
                  {time}
                </Col>
            </Row>
        </div>
    );
}

export default Header;