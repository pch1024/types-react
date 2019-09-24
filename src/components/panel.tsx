import * as React from "react";
import * as PropTypes from "prop-types";
import {Icon} from "antd";
import "../style/panel.scss";

export default function Panel(props): React.ReactElement {
    console.log(props);
    let [height, setHeight] = React.useState("0");
    let [collapsed, setCollapsed] = React.useState(false);
    let bodyElement: (HTMLDivElement | null) = null;
    let panelElement: (HTMLDivElement | null) = null;

    // 元素挂载器
    function onRenderContent(el): void {
        if (el) {
            if (props.closeContent) {
                el.style.height = collapsed ? "0" : `${height}px`;
                setHeight(el.scrollHeight);
            }

            bodyElement = el;
        }
    }

    // 面板收缩
    function closeContent(): void {
        if (bodyElement) {
            setCollapsed(!collapsed);
            bodyElement.style.height = collapsed ? "0" : `${height}px`;
        }
    }

    // 面板删除
    function removePanel(): void {
        if (panelElement) panelElement.style.display = "none";
    }

    return (
        <div
            className={[props.className, "panel"].join(" ")}
            style={props.style}
            ref={(el): void => {
                panelElement = el;
            }}>
            {/* 面板头部*/}
            <div className="header">
                <span className="title">{props.title}</span>
                <span className="opts">
                    {props.moreLink && (
                        <a href={props.moreLink}>更多</a>
                    )}
                    {props.closeContent && (
                        <span
                            key="closeContent"
                            className="closeContent"
                            onClick={closeContent}
                        ><Icon type={collapsed ? "down" : "up"}/></span>
                    )}
                    {props.removePanel && (
                        <span
                            key="removePanel"
                            className="removePanel"
                            onClick={removePanel}
                        ><Icon type="delete"/></span>
                    )}
                </span>
            </div>
            {/*面板主体*/}
            <div className="content" ref={onRenderContent}>{
                props.children
            }</div>
        </div>
    );
}

Panel.propTypes = {
    // 标题
    title: PropTypes.string.isRequired,
    // 主体
    children: PropTypes.element.isRequired,
    // 关闭收缩
    closeContent: PropTypes.bool,
    // 删除
    removePanel: PropTypes.bool,
    // 更多链接
    moreLink: PropTypes.string,
    // 预设样式类
    className: PropTypes.string,
    // 预设样式
    style: PropTypes.object
};
