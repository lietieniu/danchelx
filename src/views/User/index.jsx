import React, { useState, useEffect } from "react";
import { Card, Button, message, Modal } from "antd";
import { PlusOutlined, InfoOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons'
import BaseForm from '../../BaseForm/index';
import ETable from '../../BaseTable/index';
import './index.less';
import axios from "../../axios";
import qs from 'qs'; //qs将对象转换成key=value的形式;
//1.创建员工共组件
import CreateUser from "./addUser";
//2.员工详情组件
import DetailUser from "./detailUser";
//3.编辑员工组件
import EditUser from "./editUser";


const User = () => {
    const formList = [
        {
            type: 'INPUT',
            name: "name",
            label: "用户名",
            width: 110,
            placeholder: "请输入用户名",
            message: "请输入用户名"
        },
        {
            type: 'INPUT',
            name: "mobile",
            label: "员工电话",
            width: 120,
            placeholder: "电话",
            message: "请输入电话号",
        },
        {
            type: "DATE",
            name: "time",
            label: "入职时间",
            message: "请选择入职时间",
            width: 130
        }
    ];

    //2.获取表单数据--进行后台数据刷新
    const filterSubmit = (data) => {
        // let data2=qs.stringify(data)---将对象行驶{name:"tom",age:20}-->"name=tom&age=20"
        // console.log("data2",data2),
        axios.ajax({
            url: 'search/user',
            data: { data }
        }).then((res) => {
            if (res.code == "0") {
                message.success("查询成功");
                //重新刷新表格数据
            }
        })
    }
    let buttonType = "查询"
    //3.表格标题即索引值
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            align: "center"
        },
        {
            title: "用户名",
            dataIndex: "username",
            align: "center"
        },
        {
            title: "性别",
            dataIndex: "sex",
            width: 80,
            align: "center",
            render(sex) {
                let config = {
                    0: "男",
                    1: "女"
                };
                return config[sex]
            }
        },
        {
            title: "状态",
            dataIndex: "state",
            align: "center",
            render(state) {
                return {
                    1: "中级",
                    2: "高级",
                    3: "高级+",
                    4: "资深",
                    5: "如来"
                }[state]
            }
        },
        {
            title: "爱好",
            dataIndex: "interest",
            align: "center",
            render(interest) {
                return {
                    1: '游戏',
                    2: '麻将',
                    3: '看书'
                }[interest]
            }
        },
        {
            title: "生日",
            dataIndex: "birthday",
            align: "center"
        },
        {
            title: "联系地址",
            dataIndex: "address", align: "center"
        },
        {
            title: "早起时间",
            dataIndex: "time",
            align: "center"
        }
    ];
    //3.1渲染表格初始数据
    const [dataSource, setDataSource] = useState([])
    const renderTable = () => {
        axios.ajax({
            url: "user/list",
            data: { page: 1 }
        }).then((res) => {
            if (res.code == "0") {
                res.result.user_list.map((item, index) => {
                    item.key = index;
                    return item;
                })
            };
            setDataSource(res.result.user_list);
        })
    }
    //3.2初始化渲染
    useEffect(() => {
        setTimeout(() => {
            renderTable()
        }, 3000)
    }, [dataSource]);
    //3.3 获取表格对应行数据
    const [tableInfo, setTableInfo] = useState({});
    const filterTableInfo = (data) => {
        setTableInfo(data)
    }

    //4.创建员工函数
    const [addShow, setAddShow] = useState(false)
    const createUser = () => {
        setAddShow(true);
    }

    //5.员工详情函数
    const [detailShow, setDetailShow] = useState(false);
    const detailUser = () => {
        let item = tableInfo;
        if (Object.keys(item).length == "0" || !item) {
            Modal.error({
                title: "提示",
                content: "请先选择一条员工数据",
                okText: "知道了"
            })
        } else {
            setDetailShow(true)
        }
    }

    //6.编辑员工函数
    const [editShow, setEditShow] = useState(false)
    const editUser = () => {
        let item = tableInfo;
        if (Object.keys(item).length == "0" || !item) {
            Modal.error({
                title: "提示",
                content: "请先选择一条员工数据",
                align: "center",
                okText: "知道了"
            })
        } else {
            setEditShow(true);
        }
    };

    //7.删除员工
    const deleteUser = () => {
        let item = tableInfo;
        if (Object.keys(item).length == "0" || !item) {
            Modal.error({
                title: "提示",
                content: "请先选择一条员工数据",
                align: "center",
                okText: "知道了"
            })
        } else {
            Modal.info({
                title: "提示",
                content: "确定删除该员工信息吗?",
                okText: "确定",
                onOk: () => { DeleteUser(item.id) },
                cancelText: "取消"
            })
        }
    };
    const DeleteUser = (id) => {
        axios.ajax({
            url: "delete/user",
            data: { id }
        }).then((res) => {
            if (res.code == "0") {
                message.success("员工删除成功");
                renderTable()
            }
        })
    }
    return (
        <div>
            <Card className="card" style={{ marginBottom: 15 }}>
                <BaseForm formList={formList} buttonType={buttonType} filterSubmit={filterSubmit} />
            </Card>
            <Card className="card">
                <Button type="primary" onClick={() => { createUser() }}><PlusOutlined />创建员工</Button>
                <Button type="primary" onClick={() => { detailUser() }}><InfoOutlined />员工详情</Button>
                <Button type="primary" onClick={() => { editUser() }}><EditOutlined />编辑员工</Button>
                <Button type="primary" onClick={() => { deleteUser() }}><CloseCircleOutlined />删除员工</Button>
                {/* 1.创建员工--- */}
                <CreateUser
                    addShow={addShow}
                    setAddShow={setAddShow}
                    renderTable={renderTable}
                />
                {/* 2.员工详情 */}
                <DetailUser
                    detailShow={detailShow}
                    setDetailShow={setDetailShow}
                    tableInfo={tableInfo}
                />
                {/* 3.编辑员工 */}
                <EditUser
                    editShow={editShow}
                    setEditShow={setEditShow}
                    tableInfo={tableInfo}
                    renderTable={renderTable}
                />
                <ETable
                    columns={columns}
                    dataSource={dataSource}
                    filterTableInfo={filterTableInfo}
                />
            </Card>
        </div>
    );
}

export default User;