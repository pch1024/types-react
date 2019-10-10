import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { Breadcrumb } from "antd";
import { pathList, pathToName } from "@/lib/router";
import * as PropTypes from "prop-types";

/* 面包蟹导航 */

const MyBreadcrumb = (props) => {
    console.log(props.match);
    console.log(pathList[props.match.path]);
    let [show, setShow] = useState(false);

    useEffect(() => {
        setShow(pathList[props.match.path].length >= 2);
    }, [props]);

    return useMemo(() => {
        return (
            <Breadcrumb className="pageRouter"
                        style={ { display: show ? "block" : "none" } }>
                {
                    pathList[props.match.path].map((path, index) => {
                        return <Breadcrumb.Item key={ index }>{ pathToName[path] }</Breadcrumb.Item>;
                    })
                }
            </Breadcrumb>
        );
    }, [show]);
};

MyBreadcrumb.propTypes = {
    location: PropTypes.object
};

export default MyBreadcrumb;