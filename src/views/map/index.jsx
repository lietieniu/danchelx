import React, { useEffect, useState } from "react";
import { Button, Card, message } from "antd";
import BaseForm from "../../BaseForm";
import axios from "../../axios";
import './index.less'

const Map = () => {
    //1.查询表单数据
    const formList = [
        {
            type: "SELECT",
            name: "city",
            label: "城市",
            message: "请选择城市",
            initialValue: "0",
            list: [{ name: "全部", key: "0" }, { name: "杭州", key: "1" }, { name: "北京", key: "2" }]
        },
        {
            type: 'TIME',
            name: "time",
            label: "选择时间",
            message: "请选择时间段",
            width: 350
        },
        {
            type: 'SELECT',
            name: "status",
            label: "订单状态",
            message: "请选择订单状态",
            initialValue: "0",
            list: [{ name: "全部", key: "0" }, { name: "进行中", key: "1" }, { name: "已结束", key: "2" }]
        }
    ];
    let buttonType = "查询";

    //2.获取表单数据进行查询;
    const filterSubmit = (data) => {
        //console.log("data",data);
        axios.ajax({
            url: "search/map",
            data: { data }
        }).then((res) => {
            if (res.code == "0") {
                message.success("查询成功");
                renderMap("map/list")//刷新地图数据
            }
        })
    };

    //3.地图初始数据渲染
    useEffect(() => {
        renderMap("map/list")
    })
    const [totalCount, setTotalCount] = useState(0)

    const renderMap = (data) => {
        axios.ajax({
            url: data,
            data: { page: 1 }
        }).then((res) => {
            if (res.code == "0") {
                setTotalCount(res.result.total_count);
                renderMapList(res.result);
            }
        })
    };

    const renderMapList = (result) => {
        //1.获得各类型数据
        let routeList = result.route_list;
        let serviceList = result.service_list;
        let bikeList = result.bike_list;
        //2.创建地图实例
        var map = new window.BMapGL.Map("mapcontainer");
        //3.创建点坐标(路线终点)
        var point = new window.BMapGL.Point(routeList[routeList.length - 1].split(',')[0], routeList[routeList.length - 1].split(',')[1]);
        //4.设置中心点+地图实例;
        map.centerAndZoom(point, 15);
        //5.添加地图控件
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        var scaleCtrl = new window.BMapGL.ScaleControl();  // 添加比例尺控件
        map.addControl(scaleCtrl);
        var zoomCtrl = new window.BMapGL.ZoomControl();  // 添加缩放控件
        map.addControl(zoomCtrl);
        var cityCtrl = new window.BMapGL.CityListControl();  // 添加城市列表控件
        map.addControl(cityCtrl);

        //6.绘制起始/终点点标注+连接路线图
        let firstRoute = new window.BMapGL.Point(routeList[0].split(',')[0], routeList[0].split(',')[1]);
        let firstIcon = new window.BMapGL.Icon('/assets/start_point.png', new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        });
        //起始点覆盖物
        let firstMarker = new window.BMapGL.Marker(firstRoute, { icon: firstIcon });
        map.addOverlay(firstMarker)

        //6.1终点
        let endRoute = new window.BMapGL.Point(routeList[routeList.length - 1].split(',')[0], routeList[routeList.length - 1].split(',')[1]);
        let endIcon = new window.BMapGL.Icon('/assets/end_point.png', new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        });
        let endMarker = new window.BMapGL.Marker(endRoute, { icon: endIcon });
        map.addOverlay(endMarker);

        //6.2连接路线图;
        let routeListArray = [];
        routeList.map((item) => {
            routeListArray.push(new window.BMapGL.Point(item.split(',')[0], item.split(',')[1]));
        });
        var polyline = new window.BMapGL.Polyline(routeListArray,
            { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5 });
        map.addOverlay(polyline);

        //7.绘制服务区;
        let serviceListArray = [];
        serviceList.map((item) => {
            serviceListArray.push(new window.BMapGL.Point(item.lon, item.lat));
        })
        var polygon = new window.BMapGL.Polygon(serviceListArray,
            {
                strokeColor: "yellow",
                strokeWeight: 2,
                strokeOpacity: 0.5,
                fillColor: 'green'
            });
        map.addOverlay(polygon);

        //8.车辆分布情况;
        bikeList.map((item) => {
            let bikePoint = new window.BMapGL.Point(item.split(',')[0], item.split(',')[1]);
            let bikeIcon = new window.BMapGL.Icon('/assets/bike.jpg', new window.BMapGL.Size(36, 42), {
                imageSize: new window.BMapGL.Size(36, 42),
                anchor: new window.BMapGL.Size(18, 42)
            });
            let bikeMarker = new window.BMapGL.Marker(bikePoint, { icon: bikeIcon });
            map.addOverlay(bikeMarker);
        })



    }
    return (
        <div>
            <Card className="card">
                <BaseForm formList={formList} buttonType={buttonType} filterSubmit={filterSubmit} />
            </Card>
            <Card className="card1" style={{ marginTop: 20 }}>
                <h2>共 <span style={{ color: 'red', fontSize: '20' }}>{totalCount}</span> 辆车</h2>
                <div id="mapcontainer" style={{ height: 500 }}></div>
            </Card>
        </div>
    );
}

export default Map;