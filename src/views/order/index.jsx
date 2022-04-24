import React,{useState,useEffect} from "react";
import { Card,Button, message, Form } from "antd";
import BaseForm from "../../BaseForm";
import ETable from "../../BaseTable";
import './index.less';
import axios from "../../axios";
import { Modal } from "antd";

const Order = () => {
    //1.表单数据
    let buttonType="查询"
    const formList=[
        {
            type:'SELECT',
            name:"city",
            label:"城市",
            initialValue:"0",
            list:[{name:"全部",key:"0"},{name:"杭州",key:"1"},{name:"北京",key:"2"}]
        },
        {
            type:'TIME',
            name:"time",
            label:"截至时间",
            message:"请选择起始时间",
            width:340
        },
        {
            type:'SELECT',
            name:"status",
            label:"订单状态",
            initialValue:"0",
            width:100,
            list:[{name:"全部",key:"0"},{name:"进行中",key:"1"},{name:"结束订单",key:"2"}]
        },
        {
            type:'INPUT',
            name:"model",
            label:"模式",
            placeholder:"请输入模式",
            message:"请输入模式",
            width:120
        }
    ];
    //2.表单数据查询
    const filterSubmit=(data)=>{
    //    console.log("data1",data);
     axios.ajax({
         url:"search/order",
         data:{data}
     }).then((res)=>{
         if(res.code=='0'){
             message.success("查询成功")
             renderTable()
         }
     })
    }
    //3.表格标题即索引值
    const columns=[
        {
            title:"订单编号",
            dataIndex:"order_sn"
        },
        {
            title: "用户名",
            dataIndex: "user_name"
        },
        {
            title: "手机号",
            dataIndex: "mobile"
        },
        {
            title: "里程",
            dataIndex: "distance",
            render(distance){
                return distance/1000+'KM'
            }
        },
        {
            title: "行驶时长",
            dataIndex: "total_time"
        },
        {
            title: "状态",
            dataIndex: "status",
            render(status) {
                let config = {
                    "1": "进行中",
                    "2": "结束行程"
                };
                return config[status]
            }
        },

        {
            title: "开始时间",
            dataIndex: "start_time"
        },
        {
            title: "结束时间",
            dataIndex: "end_time"
        },
        {
            title: "订单金额",
            dataIndex: "total_fee"
        },
        {
            title: "实付金额",
            dataIndex: "user_pay"
        },
    ]
    //4.表格初始数据渲染函数
    const [dataSource,setDataSource]=useState([])
    const renderTable=()=>{
        axios.ajax({
            url:"order/list",
            data:{page:1}
        }).then((res)=>{
            if(res.code=="0"){
                res.result.item_list.map((item,index)=>{
                    item.key=index;
                    return item;
                });
             setDataSource(res.result.item_list)
            }
        })
    }
    //初始化
    useEffect(()=>{
      setTimeout(()=>{
       renderTable()
      },3000)
    },[dataSource])
    //5.获得表格对应行数据
    const [tableInfo,setTableInfo]=useState({})
    const filterTableInfo=(data)=>{
    //    console.log("data2",data)
    setTableInfo(data);

    };
    //6.删除订单函数
    const [deleteShow,setDeleteShow]=useState(false);
    const deleteOrder=()=>{
        let item=tableInfo;
        if(Object.keys(item).length=="0"||!item){
            Modal.info({
                title:"提示",
                content:"请先选择一条数据"
            })
        }else{
            setDeleteShow(true)
        }
    }
    //表单布局
    const formLayout={
        labelCol:{span:8},
        wrapperCol:{span:10}
    };
    //7.弹框删除按钮
     const okDelete=()=>{
        let id=tableInfo.id;
        // console.log("id",id)
        axios.ajax({
            url:"search/order",
            data:{id}
        }).then((res)=>{
            if(res.code=="0"){
                setDeleteShow(false)
                message.success("删除成功")
            }
            renderTable() //重新调用接口
        })
     }
     //8.订单详情函数
     const openOrderDetail=()=>{
       let item=tableInfo;
       let id=tableInfo.id
       if(Object.keys(item).length=="0"||!item){
           Modal.error({
               title:"温馨提示",
               content:"请先选择一条数据"
           })
       }else{
         window.open(`/#/common/orderDetail/${id}`)
       }
     }
    return (
        <div>
            <Card className="card">
              <BaseForm formList={formList} filterSubmit={filterSubmit} buttonType={buttonType}/>
            </Card>
            <Card style={{marginTop:15}}>
                <Button type="primary" style={{marginRight:15,marginBottom:15}} onClick={()=>{openOrderDetail()}}>订单详情</Button>
                <Button type="primary" onClick={()=>{deleteOrder()}}>删除订单</Button>
                <Modal
                title="删除订单信息"
                 visible={deleteShow}
                 okText="删除"
                 onOk={()=>{okDelete()}}
                 cancelText="算了"
                 onCancel={()=>{setDeleteShow(false)}}
                >
                  <Form layout="horizontal" {...formLayout}>
                     <Form.Item
                      label="车辆编号"
                     >
                      {tableInfo.bike_sn}
                     </Form.Item>
                     <Form.Item
                      label="用户名"
                     >
                      {tableInfo.user_name}
                     </Form.Item>
                     <Form.Item
                      label="手机号码"
                     >
                      {tableInfo.mobile}
                     </Form.Item>
                     <Form.Item
                      label="行驶里程"
                     >
                      {tableInfo.distance/1000+'Km'}
                     </Form.Item>
                     <Form.Item
                      label="实付金额"
                     >
                      {tableInfo.user_pay}
                     </Form.Item>
                  </Form>
                </Modal>
                <ETable
                 columns={columns}
                 dataSource={dataSource}
                 filterTableInfo={filterTableInfo}
                />
            </Card>
        </div>
    );
}
 
export default Order;