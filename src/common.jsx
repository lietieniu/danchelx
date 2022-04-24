import React from "react";
import { Row, Col } from "antd";
import Header from "./components/Header";
import './store/common.less'

const Common = (props) => {
    return (
        <div>
            <div className="common">
                <Header Common="Common" />
            </div>
            <Row>
                {props.children}
            </Row>
        </div>
    );
}

export default Common;