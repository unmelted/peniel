import React, { FC, useState, useEffect } from 'react';
import { RobotProps } from './StarkData.tsx';
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

const RobotList: FC = () => {
    const [robots, setRobots] = useState<RobotProps[]>([]);

    useEffect(() => {
        // 초기 데이터 가져오기
        fetch('/api/getRobots')
            .then(response => response.json())
            .then(data => setRobots(data))
            .catch(error => console.error('Error fetching robots:', error));

        // 웹소켓 설정
        const ws = new WebSocket('ws://localhost:3000');

        ws.onmessage = (event) => {
            const newRobot = JSON.parse(event.data);
            setRobots(prevRobots => [...prevRobots, newRobot]);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div className="grid grid-cols-12 gap-6">
            {robots.map((robot, index) => (
                <Block key={index} {...robot} />
            ))}

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
    );
}

export default RobotList;