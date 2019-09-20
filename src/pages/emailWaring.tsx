import * as React from "react";
// import '../style/home.scss';
import {Button} from "antd";

const emailWaring = (props: any): React.ReactElement => {
    return (
        <div className='page-report'>
            <Button onClick={(): void => props.history.push("/error")}>Go to error</Button>
        </div>
    );
};
export default emailWaring;