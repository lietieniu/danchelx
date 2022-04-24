import React, { useState, useEffect } from "react";
import { Button, Card, Form, message, Select } from "antd";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import './index.less';
import BaseForm from "../../BaseForm"; //表单封装
import ETable from "../../BaseTable";
import axios from "../../axios";
import Modal from "antd/lib/modal/Modal";
import renderTime from "../../time/time";

const City = () => {
    //1.封装表单数据
    const formList = [
        {
            type: 'SELECT',
            name: "city",
            label: "城市",
            initialValue: "0",
            message: "请选择城市",
            list: [{ key: "0", name: "全部" }, { key: "1", name: "北京" }, { key: "2", name: "杭州" }]
        },
        {
            type: 'SELECT',
            name: "model",
            label: "用车模式",
            initialValue: "0",
            placeholder: "请选择模式",
            message: "请选择用车模式",
            width: 115,
            list: [{ key: "0", name: "全部" }, { key: "1", name: "停车点模式" }, { key: "2", name: "禁停区模式" }]
        },
        {
            type: 'SELECT',
            name: "mode",
            label: "营运模式",
            initialValue: "0",
            message: "请选择营运模式",
            list: [{ key: "0", name: "全部" }, { key: "1", name: "加盟" }, { key: "2", name: "自营" }]
        },
        {
            type: 'SELECT',
            name: "status",
            label: "加盟商授权状态",
            initialValue: "0",
            message: "请选择授权状态",
            list: [{ key: "0", name: "全部" }, { key: "1", name: "已授权" }, { key: "2", name: "未授权" }]
        },
    ];
    let buttonType = '查询';
    //2.表单数据提交函数
    const filterSubmit = (data) => {
        //  console.log("data1",data)
        axios.ajax({
            url: "search/city",
            data: {
                data
            }
        }).then((res) => {
            if (res.code == 0) {
                message.success("查询成功")
            }
        })
    }
    //3.表格表头初始索引值
    const columns = [
        {
            title: "城市ID",
            dataIndex: "id"
        },
        {
            title: "城市名称",
            dataIndex: "name"
        },
        {
            title: "用车模式",
            dataIndex: "mode",
            render(mode) {
                let config = {
                    1: "停车点模式",
                    2: "禁停区模式",
                };
                return config[mode]
            }
        },
        {
            title: "营运模式",
            dataIndex: "op_mode",
            render(op_mode) {
                return op_mode == 1 ? "加盟" : "自营"
            }
        },
        {
            title: "授权加盟商",
            dataIndex: "franchisee_name"
        },
        {
            title: "城市管理员",
            dataIndex: "city_admins",
            render(city_admins) {
                return city_admins.map((item, index) => {
                    return item.user_name
                }).join(',')
            }
        },
        {
            title: "城市开通时间",
            dataIndex: "open_time"
        },
        {
            title: "操作时间",
            dataIndex: "update_time",
            render(update_time){
                return renderTime(update_time)
            }

        },
        {
            title: "操作人",
            dataIndex: "sys_user_name"
        },

    ]
    //4.表格请求初始数据
    const [dataSource, setDataSource] = useState([]);
    const renderTableList = () => {
        axios.ajax({
            url: 'city/list',
            data: {
                page: 1
            }
        }).then((res) => {
            if (res.code == "0") {
                //给每一项添加个key值
                res.result.city_list.map((item, index) => {
                    item.key = index;
                    return item;
                });
            }
            setDataSource(res.result.city_list)
        })
    }
    //5.初始化调用数据
    useState(() => {
        setTimeout(() => {
            renderTableList()
        }, 2000)
    }, [dataSource])

    //6.用于获得表格对应行数据
    const [tableInfo, setTableInfo] = useState({});
    const filterTableInfo = (value) => {
        //    console.log("value",value);
        setTableInfo(value)
    }
    //7.设置弹框关闭开启按钮
    const [openCityShow, setOpenCityShow] = useState(false)
    const openCity = () => {
        setOpenCityShow(true)
    }
    //8.表单布局
    const formLayout={
        labelCol:{span:10},
        wrapperCol:{span:5}
    }
    //9.点击弹框确定按钮
    
    const openCity1=()=>{
       let value=form1.getFieldsValue();
    //  console.log("value",value)
       axios.ajax({
           url:"search/city",
           data:{value}
       }).then((res)=>{
           if(res.code=='0'){
             setOpenCityShow(false);
             message.success("开通成功!")
             renderTableList() //重新渲染表格数据
           }
        
           form1.resetFields();//表单值清空
       })
    }
    const [form1]=Form.useForm()
    return (
        <div>
            <Card className="card">
                <BaseForm formList={formList} filterSubmit={filterSubmit} buttonType={buttonType} />
            </Card>
            <Card className="card" style={{ marginTop: 15 }}>
                <Button type="primary" style={{ marginBottom: 12, marginRight: 18 }} onClick={() => { openCity() }}><PlusOutlined />开通城市</Button>
                <Button type="primary" style={{ marginBottom: 12 }}><CloseOutlined />删除城市</Button>
                <Modal
                    title="开通城市"
                    visible={openCityShow}
                    okText="开通"
                    onOk={()=>{openCity1()}}
                    cancelText="算了"
                    onCancel={() => { setOpenCityShow(false) }}
                >
                    <Form layout="horizontal" {...formLayout} form={form1}>
                        <Form.Item
                            name="city"
                            label="请选择城市"
                            initialValue="0"
                            rules={[{ required: true }]}
                        >
                          <Select>
                               <Select.Option value="0">全部</Select.Option>
                               <Select.Option value="1">北京</Select.Option>
                               <Select.Option value="2">天津</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                            name="model"
                            label="请选择用车模式"
                            initialValue="0"
                            rules={[{ required: true }]}
                        >
                          <Select>
                               <Select.Option value="0">全部</Select.Option>
                               <Select.Option value="1">禁停区模式</Select.Option>
                               <Select.Option value="2">停车点模式</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                            name="mode"
                            label="请选择经营模式"
                            initialValue="0"
                            rules={[{ required: true }]}
                        >
                          <Select>
                               <Select.Option value="0">全部</Select.Option>
                               <Select.Option value="1">加盟</Select.Option>
                               <Select.Option value="2">自营</Select.Option>
                          </Select>
                        </Form.Item>
                    </Form>
                </Modal>
                <ETable
                    columns={columns} //表头即索引值
                    dataSource={dataSource} //表格值
                    filterTableInfo={filterTableInfo} //获得对应行数据
                />
            </Card>
        </div>
    );
}

export default City;