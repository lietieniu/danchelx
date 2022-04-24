import React, { useState, useEffect } from "react";
import { Card } from "antd";
import './index.less';
import axios from "../../axios";

const OrderDetail = (props) => {

    let id = props.match.params.orderId;
    //1.调用地图数据函数
    const [mapInfo, setMapInfo] = useState({})
    const renderMap = () => {
        axios.ajax({
            url: 'order/detail',
            data: { id }
        }).then((res) => {
            if (res.code == "0") {
                setMapInfo(res.result);
                renderMapList(res.result)
            }
        })
    }
    //2.页面初始化渲染
    useEffect(() => {
        setTimeout(() => {
            renderMap()
        }, 4000)
    }, [mapInfo])

    //3.渲染地图函数
    const renderMapList = (result) => {
        //1.创建地图实例
        var map = new window.BMapGL.Map("orderDetailMap");
        let list = result.position_list
        let first = list[0];
        let last = list[list.length - 1];
        //2.创建中心点(使用终点);
        var point = new window.BMapGL.Point(last.lon, last.lat);
        map.centerAndZoom(point, 15); //地图初始化，同时设置地图展示级别
        //3.添加地图控件
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        var scaleCtrl = new window.BMapGL.ScaleControl();  // 添加比例尺控件
        map.addControl(scaleCtrl);
        var zoomCtrl = new window.BMapGL.ZoomControl();  // 添加缩放控件
        map.addControl(zoomCtrl);
        var cityCtrl = new window.BMapGL.CityListControl();  // 添加城市列表控件
        map.addControl(cityCtrl);
        //4.创建起始点坐标
        let startPoint = new window.BMapGL.Point(first.lon, first.lat); //起点
        let endPoint = new window.BMapGL.Point(last.lon, last.lat);
        //4.1起始点标注
        let startIcon = new window.BMapGL.Icon('assets/start_point.png', new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42),

        })
        let startMarker = new window.BMapGL.Marker(startPoint, { icon: startIcon });
        map.addOverlay(startMarker)
        //4.2创建终点标注
        let endIcon = new window.BMapGL.Icon('/assets/end_point.png', new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        });
        let endMarker = new window.BMapGL.Marker(endPoint, { icon: endIcon });
        map.addOverlay(endMarker);
        //5.连接起始点
        let PositionList = [];
        list.map((item, index) => {
            PositionList.push(new window.BMapGL.Point(item.lon, item.lat));
        });
        var polyline = new window.BMapGL.Polyline(PositionList,
            {
                strokeColor: "blue",
                strokeWeight: 2,
                strokeOpacity: 0.5
            });
        map.addOverlay(polyline);
        //6.绘制成服务区
        let list1 = result.area;
        let serviceList = [];
        list1.map((item) => {
            serviceList.push(new window.BMapGL.Point(item.lon, item.lat))
        });
        var polygon = new window.BMapGL.Polygon(serviceList,
            {
                strokeColor: "red",
                strokeWeight: 3,
                strokeOpacity: 0.5,
                fillColor: 'green'
            });
        map.addOverlay(polygon);
    }

    return (
        <div>
            <Card className="card">
                <div id="orderDetailMap" className="order-map"></div>
                <div className="detail-items">
                    <div className="item-title">基础信息</div>
                    <ul className="detail-form">
                        <li>
                            <div className="detail-form-left">用车模式</div>
                            <div className="detail-form-content">{mapInfo.mode == 1 ? "服务区" : "停车点"}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">订单编号</div>
                            <div className="detail-form-content">{mapInfo.order_sn}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">车辆编号</div>
                            <div className="detail-form-content">{mapInfo.bike_sn}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">用户姓名</div>
                            <div className="detail-form-content">{mapInfo.user_name}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">手机号码</div>
                            <div className="detail-form-content">{mapInfo.mobile}</div>
                        </li>
                    </ul>
                </div>
                <div className="detail-items">
                    <div className="item-title">行驶轨迹</div>
                    <ul className="detail-form">
                        <li>
                            <div className="detail-form-left">行程起点</div>
                            <div className="detail-form-content">{mapInfo.start_location}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">行程终点</div>
                            <div className="detail-form-content">{mapInfo.end_location}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">行驶里程</div>
                            <div className="detail-form-content">{mapInfo.distance / 1000 + '公里'}</div>
                        </li>

                    </ul>
                </div>
            </Card>
        </div>
    );
}

export default OrderDetail;