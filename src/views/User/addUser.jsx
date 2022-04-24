import React, { useRef} from "react";
import { Button, DatePicker, Form, Input,message, Modal, Radio, Select } from "antd";
import axios from "../../axios";

const CreateUser = (props) => {
    //1.父组件传递过来的弹框开关信息
    let addShow = props.addShow;
    let setAddShow = props.setAddShow
   
   //2.设置表单布局
    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 9 }
    }
    //3.获取表单数据
    const [form] = Form.useForm();
    const bt1 = useRef();
   
    const onFinsh = () => {
        let value = form.getFieldsValue();
        //console.log("value",value)
        CreateUserInfo(value);
        setAddShow(false);
        form.resetFields() //弹框关闭表单数据清空
    }

    //4 获得弹框表单数据,进行后台交互
    const CreateUserInfo = (data) => {
        // console.log("data3", data);
        axios.ajax({
            url: "create/user",
            data: { data }
        }).then((res) => {
            if (res.code == "0") {
                message.success("员工创建成功");
                props.renderTable(); //重新刷新表格数据
            }
        })
    };

    return (
        <div>
            <Modal
                title="创建员工"
                visible={addShow}
                okText="创建"
                onOk={() => { bt1.current.click() }}
                cancelText="算了"
                onCancel={() => { setAddShow(false) }}
            >
                <Form layout="horizontal" {...formLayout} form={form} onFinish={onFinsh}>
                    <Form.Item
                        name="username"
                        label="员工姓名"
                        rules={[{ required: true, message: "请输入姓名" }]}
                        
                    >
                        <Input placeholder="请输入姓名" style={{ width: 135 }} />
                    </Form.Item>
                    <Form.Item
                        name="sex"
                        label="性别"
                        rules={[{ required: true }]}
                        initialValue={0}
                    >
                        <Radio.Group>
                            <Radio value={0}>男</Radio>
                            <Radio value={1}>女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="state"
                        label="状态"
                        rules={[{ required: true }]}
                        initialValue={2}
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
                        rules={[{ required: true, message: "请选择出生日期" }]}
                        //initialValue={type=='edit'?moment().toString(tableInfo.birthday):''}
                        >
                        <DatePicker 
                        showTime format="YYYY-MM-DD" 
                        
                        style={{ width: 125 }}/>
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="联系地址"
                        rules={[{ required: true, message: "请输入联系地址" }]}
                    >
                        <Input.TextArea style={{ width: 300 }} rows={2} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" style={{ display: 'none' }} ref={bt1}>创建</Button>
                </Form>
            </Modal>
        </div>
    );
}

export default CreateUser;