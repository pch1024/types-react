import * as React from 'react';
import '../style/home.scss';

export default (props: any): React.ReactElement => {
    document.title = props.title;
    // const [useState, useEffect] = [React.useState, React.useEffect];
    console.log(props);
    props.callbackRouter(props.history);
    return (
        <div className='page_home'>
            <div className='title'>hi</div>
        </div>
    );
};
