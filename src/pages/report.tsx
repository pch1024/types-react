import * as React from 'react';
// import '../style/home.scss';

export default (props: any): React.ReactElement => {
    props.callbackProps(props);
    return (
        <div className='page-report'>
            <div className='title'>report</div>
        </div>
    );
};
