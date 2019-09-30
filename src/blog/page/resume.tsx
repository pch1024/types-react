import * as React from "react";
import { useMemo } from "react";

const Resume = () => {

    return useMemo(() => (
        <div className="Resume">
            个人简历
        </div>
    ), []);

};

Resume.propTypes = {};

export default Resume;