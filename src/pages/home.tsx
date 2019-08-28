import * as React from 'react';

import { PageProps } from '../model/model';
import '../style/home.scss';

export const Home = (props: PageProps) => {
    document.title = props.title;
    React.useEffect(() => {
        // setTimeout(() => {
        //     // JS 路由跳转
        //     props.history.push('/login');
        // }, 5000);
    });
    return (
        <div className='page_home'>
            <div className='title'>{props.title}</div>
        </div>
    );
};
