import * as React from 'react';
// import '../style/dashboard.scss';

import { Button } from 'antd';

export default (props: any): React.ReactElement => {
    return (
        <div className='page_home'>
            <Button onClick={() => props.history.push('/LingXeReport')}>Go to LingXeReport</Button>
        </div>
    );
};
