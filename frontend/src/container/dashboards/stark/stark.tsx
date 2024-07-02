import React, { FC } from 'react';
import Pageheader from '../../../components/common/pageheader/pageheader';
import { RobotProps } from './starkdata';
import userRobot from '../../../assets/images/custom/user-robot.png';
import userRobotX from '../../../assets/images/custom/user-robot-x.png';

const Block: FC<RobotProps> = ({ name, status, section2Text, section3Text }) => {
    const bgColor = status === 'active' ? 'bg-green-500' : 'bg-gray-900';
    const textColor = status === 'active' ? 'text-white' : 'text-gray-400 dark:text-gray-500';

    const iconPath = status === 'active' ? userRobot : userRobotX;
    const iconSize = 'w-10 h-10'; // TailwindCSS 클래스를 사용하여 아이콘 크기 설정

    return (
        <div className="col-span-3">
            <div className="box overflow-hidden h-48">
                <div className="box-body !p-0 h-full">
                    <div className="h-full flex flex-col">
                        {/* First Section */}
                        <div className="p-2 flex items-center justify-between">
                            <span className="block font-semibold text-[0.9375rem] flex items-center">
                                <img src={iconPath} alt={name} className={`mr-2 ${iconSize}`} /> {/* 아이콘 사용 */}
                                {name}
                            </span>
                        </div>
                        {/* Second Section */}
                        <div className={`flex-1 p-2 ${bgColor} flex items-center justify-center`}>
                            <span className={`block font-semibold text-[0.9375rem] ${textColor}`}>{section2Text}</span>
                        </div>
                        {/* Third Section */}
                        <div className="p-2 flex items-center justify-between">
                            <span className="block font-semibold text-[0.9375rem]">{section3Text}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Stark: FC<RobotProps> = () => {
    return (
        <React.Fragment>
            <Pageheader currentpage="Robots" activepage="Dashboards" mainpage="Robots" />
            <div className="grid grid-cols-12 gap-6">
                {/* First row */}
                <Block name="Block 1" status="active" section2Text="Active Status" section3Text="Additional Info 1" />
                <Block name="Block 2" status="active" section2Text="Active Status" section3Text="Additional Info 2" />
                <Block name="Block 3 (Disabled)" status="inactive" section2Text="Inactive Status" section3Text="Additional Info 3" />
                <Block name="Block 4 (Disabled)" status="inactive" section2Text="Inactive Status" section3Text="Additional Info 4" />
                {/* Second row */}
                <Block name="Block 5" status="active" section2Text="Active Status" section3Text="Additional Info 5" />
                <Block name="Block 6" status="active" section2Text="Active Status" section3Text="Additional Info 6" />
                <Block name="Block 7" status="active" section2Text="Active Status" section3Text="Additional Info 7" />
                <Block name="Block 8" status="active" section2Text="Active Status" section3Text="Additional Info 8" />

                {/* Log Table */}
                <div className="col-span-12">
                    <div className="box overflow-hidden">
                        <div className="box-body !p-0">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="mb-4">
                                        <span className="block font-semibold text-[0.9375rem]">Log Table</span>
                                    </div>
                                </div>
                                {/* Add your log table component here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Stark;
