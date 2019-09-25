import "@/lib/polyfill";
import "@/lib/moment";
// Ant Design UI
// import "antd/dist/antd.less";
import "@/style/common.scss";

import APP from "@/pages/app";
import * as ReactDOM from "react-dom";

ReactDOM.render(APP, document.getElementById("app"));
