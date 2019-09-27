import * as React from "react";
import * as PropTypes from "prop-types";
import echarts from "echarts";
import { useRef, createElement, ReactElement, useMemo } from "react";


const Chart = (props): ReactElement => {

    // 挂载节点
    const chartDom = useRef(null);

    // 生命钩子函数
    type Callback = () => void;
    React.useEffect((): Callback => {
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
        let instance = echarts.getInstanceByDom(chartDom.current) || echarts.init(chartDom.current);

        // 大小自适应
        const resize = (): void => instance.resize();
        window.removeEventListener("resize", resize);
        window.addEventListener("resize", resize);

        // 默认加载状态
        showLoading(instance);

        // 渲染图表
        if (props.option) {
            if (instance) instance.hideLoading();
            instance.setOption(props.option);
        }

        // 回调函数返回实例
        if (props.onRender) props.onRender(instance);

        // 销毁并清除状态
        return (): void => {
            echarts.dispose(instance);
            window.removeEventListener("resize", resize);
        };

    }, [chartDom, props, props.option]);

    // 返回组件
    return useMemo((): ReactElement =>
        createElement("div", {
            ref: chartDom,
            style: props.style,
            className: props.className
        }), [ props.style, props.className ]
    );
};

Chart.propTypes = {
    // 图表数据
    option: PropTypes.object,
    // 图表宽高
    style: PropTypes.shape({
        //图表宽度
        width: PropTypes.string.isRequired,
        //图表高度
        height: PropTypes.string.isRequired
    }).isRequired,
    //图表CSS样式类名称
    className: PropTypes.string,
    //图表回调函数返回图表实例
    onRender: PropTypes.func
};
// 导出组件模块
export default Chart;
