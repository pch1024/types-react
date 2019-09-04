import * as React from 'react';
// import '../style/home.scss';
import { Button } from 'antd';

export default (props: any): React.ReactElement => {
    return (
        <div className='page-report'>
            <Button onClick={() => props.history.push('/error')}>Go to error</Button>
        </div>
    );
};
