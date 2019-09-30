import * as React from 'react'
import "@/lib/polyfill";
import "@/lib/moment";
// Ant Design UI
// import "antd/dist/antd.less";
import "@/style/common.scss";

//import APP from "@/pages/app";
import APP from "@/blog/index";
import * as ReactDOM from "react-dom";

window["baseURL"] = "http://lingxe.anbai.com";

ReactDOM.render(<APP />, document.getElementById("app"));
