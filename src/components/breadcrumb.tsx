import * as React from "react";
import { Breadcrumb } from "antd";
import * as PropTypes from "prop-types";
import { useMemo } from "react";
import { pathToName } from "@/lib/router";
import { Link } from "react-router-dom";

/* 面包蟹导航 */

const MyBreadcrumb = (props) => useMemo(() => {
    return (
        <Breadcrumb className="pageRouter">
            {
                props.list.map((path, index) => {
                    return <Breadcrumb.Item key={ index }>
                        {
                            (index !== 0 && index !== props.list.length - 1) ?
                                <Link to={ path }>{ pathToName[path] }</Link> :
                                pathToName[path]
                        }
                    </Breadcrumb.Item>;
                })
            }
        </Breadcrumb>
    );
}, [props.list]);


MyBreadcrumb.propTypes = {
    list: PropTypes.array
};

export default MyBreadcrumb;