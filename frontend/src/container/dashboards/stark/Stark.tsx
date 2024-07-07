import React, { FC } from 'react';
import Pageheader from '../../../components/common/pageheader/pageheader';
import RobotList from './RobotList.tsx';

const Stark: FC = () => {
    return (
        <React.Fragment>
            <Pageheader currentpage="Robots" activepage="Dashboards" mainpage="Robots"/>
            <RobotList/>
        </React.Fragment>
    );
}
export default Stark;
