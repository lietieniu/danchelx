import React from "react";
import { Modal, Form, Button } from "antd";

const DetailUser = (props) => {
    //1.获得弹框开关信息+表格对应行数据
    let item = props.tableInfo;
    let detailShow = props.detailShow;
    let setDetailShow = props.setDetailShow;

    //2.1表单布局
    const formLayout = {
        labelCol: { span: 9 },
        wrapperCol: { span: 13 }
    }
    //2.2 等级渲染函数
    const renderState = (data) => {
        let config = {
            1: "中级",
            2: "高级",
            3: "高级+",
            4: "资深",
            5: "如来"
        };
        return config[data];
    }
    return (
        <div>
            <Modal
                title="员工详情"
                visible={detailShow}
                okText="朕知道了"
                onOk={() => { setDetailShow(false) }}
                cancelText="取消"
                onCancel={() => { setDetailShow(false) }}
            >
                <Form layout="horizontal" {...formLayout}>
                    <Form.Item label="员工姓名">{item.username}</Form.Item>
                    <Form.Item label="性别">{item.sex == 0 ? "男" : "女"}</Form.Item>
                    <Form.Item label="职称等级">{renderState(item.state)}</Form.Item>
                    <Form.Item label="出生日期">{item.birthday}</Form.Item>
                    <Form.Item label="联系地址">{item.address}</Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default DetailUser;