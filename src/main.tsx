import * as React from 'react'
import * as ReactDOM from "react-dom";
import "@/lib/polyfill";
import "@/lib/moment";
// Ant Design UI
// import "antd/dist/antd.less";

import APP from "@/pages/app";


window["baseURL"] = "http://lingxe.anbai.com";

import "@/style/common.scss";
ReactDOM.render(APP, document.getElementById("app"));
