import React, { useEffect, useRef } from "react";
import { Button, Form, Input, Modal, Radio, Select, DatePicker, message } from "antd";
import axios from "../../axios";


const EditUser = (props) => {
    //1.弹框开关与否+表格对应行数据
    let editShow = props.editShow;
    let setEditShow = props.setEditShow;
    let tableInfo = props.tableInfo;
    let renderTable = props.renderTable;
     console.log(tableInfo)

    //2.表单初始数据刷新
    const [form] = Form.useForm();
    const form1 = useRef();
    const bt1 = useRef()
    useEffect(() => {
        form1.current.setFieldsValue({
            "username": tableInfo.username,
            "sex": tableInfo.sex,
            "state": tableInfo.state,
            //  "birthday":tableInfo.birthday,
            "address": tableInfo.address

        })
    }, [tableInfo]);

    //3.设置表单布局
    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 9 }
    };

    //4.获取表单数据/更改的表单数据进行后台交互
    const onFinsh = () => {
        let value = form.getFieldsValue();
        // console.log("edit", value);
        axios.ajax({
            url: "edit/user",
            data: { value }
        }).then((res) => {
            if (res.code == "0") {
                form.getFieldValue(); //弹框关闭+表单值清空
                setEditShow(false);
                message.success("员工修改成功");
                renderTable() //重新刷新表格数据
            }
        })
    };

    return (
        <div>
            <Modal
                forceRender //弹框预渲染
                visible={editShow}
                title="编辑员工"
                okText="提交"
                onOk={() => { bt1.current.click() }} //利用ref对隐藏的按钮点击,触发rules+onfinsh事件
                cancelText="取消"
                onCancel={() => { setEditShow(false) }}
            >
                <Form layout="horizontal"
                    form={form}
                    ref={form1}
                    {...formLayout}
                    onFinish={onFinsh}
                >
                    <Form.Item
                        name="username"
                        label="员工姓名"
                        initialValue={tableInfo.username}
                        rules={[{ required: true, message: "请输入员工姓名" }]}
                    >
                        <Input style={{ width: 130 }} />
                    </Form.Item>
                    <Form.Item
                        name="sex"
                        label="性别"
                        initialValue={tableInfo.sex}
                        rules={[{ required: true }]}
                    >
                        <Radio.Group>
                            <Radio value={0}>男</Radio>
                            <Radio value={1}>女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="state"
                        label="状态"
                        initialValue={tableInfo.state}
                        rules={[{ required: true }]}
                    >
                        <Select style={{ width: 80 }}>
                            <Select.Option value={1}>中级</Select.Option>
                            <Select.Option value={2}>高级</Select.Option>
                            <Select.Option value={3}>高级+</Select.Option>
                            <Select.Option value={4}>资深</Select.Option>
                            <Select.Option value={5}>如来</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="birthday"
                        label="出生日期"
                        //initialValue={moment(tableInfo.birthday).toString()}
                        rules={[{ required: true, message: "请选择出生日期" }]}
                    >
                        <DatePicker style={{ width: 135 }} />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="联系地址"
                        initialValue={tableInfo.address}
                        rules={[{ required: true, message: "请填写联系地址" }]}
                    >
                        <Input.TextArea style={{ width: 300 }} />
                    </Form.Item>
                    <Button style={{ display: 'none' }} htmlType="submit" ref={bt1}>提交</Button>
                </Form>
            </Modal>
        </div>
    );
}

export default EditUser;