import * as React from "react";
import { useMemo } from "react";

const Home = () => {

    return useMemo(() => (
        <div className="Home">
            我的小站
        </div>
    ), []);

};

Home.propTypes = {};

export default Home;