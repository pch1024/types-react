import * as React from 'react';
import '../style/dashboard.scss';

import {Button} from 'antd';

export default (props: any): React.ReactElement => {
    console.log('page', props)
    props.callbackProps(props);
    return (
        <div className='page_home'>
            <div className='title'>hi</div>
            <Button
                onClick={() => props.history.push('/LingXeReport')}>Default</Button>
        </div>
    );
};
