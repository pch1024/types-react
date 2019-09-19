import * as React from "react";

import echarts from "echarts";

interface ChartProps {
    key: string;
    option: object | null;
    style: object;
    class?: string;

    callback(props): any;
}

const Chart = (props: ChartProps): JSX.Element => {
    // 挂载节点
    let chartDom = null;

    // 生命钩子函数
    React.useEffect(() => {
        // 加载状态
        function showLoading(instance): void {
            instance.showLoading("default", {
                text: "",
                color: "#c23531",
                textColor: "#000000",
                maskColor: "rgba(255, 255, 255, 0.8)",
                zlevel: 0
            });
        }

        // 获取实例对象
        let instance = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);
        showLoading(instance);
        props.callback(instance);

        if (props.option) {
            // console.log("存在参数，关闭加载状态");
            instance.hideLoading();
            instance.setOption(props.option);
        }

        return (): void => {
            // console.log("清除组件状态");
            echarts.dispose(instance);
        };
    }, [props.option]);

    // 元素挂载到浏览器事件
    const refOnRender = (el): void => chartDom = el;
    return (<div ref={refOnRender} style={props.style}/>);
};

export default Chart;
