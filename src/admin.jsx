import React from "react";
import {Row,Col } from "antd";
import './store/common.less';
import NavLeft from "./components/Navleft";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";


const Admin = (props) => {
    return (
        <div>
           <Row className="container">
               <Col span={3.5} className="left">
                 <NavLeft/>
               </Col>
               <Col span={20.5} className="right">
                    <Header/>
                  
                   <Row className="content1">
                       {props.children}
                   </Row>
                    
                    <Footer/>
                </Col>
           </Row>
        </div>
    );
}
 
export default Admin;