import React from "react";
import { Button, Form, Select, DatePicker, Input } from "antd";
import utils from "../utils";
const { RangePicker } = DatePicker;
const BaseForm = (props) => {
    let formList = props.formList;
    const renderForm = () => {
        const BaseFormList = [];
        if (formList.length > 0 && formList) {
            formList.map((item, index) => {
                let type = item.type;
                let name = item.name;
                let label = item.label;
                let initialValue = item.initialValue || '';
                let message = item.message;
                let list = item.list;
                let width = item.width;
                let placeholder = item.placeholder
                if (type == 'SELECT') {
                    const SELECT = <Form.Item
                        name={name}
                        label={label}
                        key={name}
                        initialValue={initialValue}
                        rules={[{ required: true, message: message }]}
                    >
                        <Select style={{ width: width }}>
                            {utils.renderSelect(list)}
                        </Select>
                    </Form.Item>
                    { BaseFormList.push(SELECT) }
                };
                if (type == 'TIME') {  //主要是截至时间段
                    const TIME = <Form.Item
                        name={name}
                        label={label}
                        key={name}
                        rules={[{ required: true, message: message }]}
                    >
                        <RangePicker
                            showTime={{ format: 'HH:mm:ss' }}
                            format="YYYY-MM-DD HH:mm:ss"
                            style={{ width: width }}
                        />
                    </Form.Item>
                    { BaseFormList.push(TIME) }
                };
                if (type == 'DATE') { //具体某个时间
                    const DATE = <Form.Item
                        name={name}
                        label={label}
                        key={name}
                        rules={[{required:true,message:message}]}
                    >
                        <DatePicker showTime  format="YYYY-MM-DD" style={{ width: width }} />
                    </Form.Item>;
                    { BaseFormList.push(DATE) }
                }
                if (type == 'INPUT') {
                    const INPUT = <Form.Item
                        name={name}
                        label={label}
                        key={name}
                        rules={[{ required: true, message: message }]}
                    >
                        <Input placeholder={placeholder} style={{ width: width }} />
                    </Form.Item>
                    { BaseFormList.push(INPUT) }
                }
            })
        };
        return BaseFormList
    };
    const [form] = Form.useForm()
    const onfinsh = () => {
        let data = form.getFieldsValue();
        props.filterSubmit(data)
        form.resetFields() //清除表单数据
    }
    return (
        <div>
            <Form layout="inline" onFinish={onfinsh} form={form}>
                {renderForm()}
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>{props.buttonType}</Button>
                    <Button htmlType="reset" style={{ marginLeft: 18 }}>重置</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default BaseForm
