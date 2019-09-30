import * as React from "react";
import { useMemo } from "react";

const Website = () => {

    return useMemo(() => (
        <div className="Website">
            开发案例
        </div>
    ), []);

};

Website.propTypes = {};

export default Website;