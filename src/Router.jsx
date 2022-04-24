import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import App from './App';
import Admin from "./admin";

import Home from './components/Content/index';
import NotFind from "./components/notFind";
//1.城市管理
import City from "./views/city";
//2.订单管理
import Order from "./views/order";
//3.二级页面
import Common from "./common";
//3.1订单详情页面
import OrderDetail from "./views/order/orderDetail";
//4.员工管理页面
import User from "./views/User";
//5.车辆地图
import Map from "./views/map";

const Router1 = () => {
    return (
        <div>
            <Router>
                <App>
                    <Switch>
                        <Route path='/common' render={() =>
                            <Common>
                                <Switch>
                                   <Route exact={true} path='/common/orderDetail/:orderId' component={OrderDetail}/>
                                </Switch>
                            </Common>
                        } />
                        <Route path="/" render={() =>
                            <Admin>
                                <Switch>
                                    <Route exact={true} path="/" component={Home} />
                                    <Route exact={true} path="/Home" component={Home} />
                                    <Route exact={true} path="/city" component={City} />
                                    <Route exact={true} path="/order" component={Order} />
                                    <Route exact={true} path="/user" component={User} />
                                    <Route exact={true} path="/bikeMap" component={Map}/>
                                    <Route component={NotFind} />
                                </Switch>
                            </Admin>
                        } />
                    </Switch>
                </App>
            </Router>
        </div>
    );
}

export default Router1;