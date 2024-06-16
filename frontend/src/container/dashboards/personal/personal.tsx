import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Pageheader from '../../../components/common/pageheader/pageheader';

interface PersonalProps {}

const Personal: FC<PersonalProps> = () => {
    return (
        <Fragment>
            <Pageheader currentpage="Personal" activepage="Dashboards" mainpage="Personal" />
            <div className="grid grid-cols-12 gap-6">
                {/* First row */}
                <div className="col-span-3">
                    <div className="box overflow-hidden h-48">
                        <div className="box-body !p-0 h-full">
                            <div className="p-6 h-full">
                                <div className="flex items-center justify-between h-full">
                                    <div className="mb-4">
                                        <span className="block font-semibold text-[0.9375rem]">Block 1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="box overflow-hidden h-48">
                        <div className="box-body !p-0 h-full">
                            <div className="p-6 h-full">
                                <div className="flex items-center justify-between h-full">
                                    <div className="mb-4">
                                        <span className="block font-semibold text-[0.9375rem]">Block 2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="box overflow-hidden h-48 bg-gray-900 dark:bg-gray-900">
                        <div className="box-body !p-0 h-full">
                            <div className="p-6 h-full">
                                <div className="flex items-center justify-between h-full">
                                    <div className="mb-4">
                                        <span className="block font-semibold text-[0.9375rem] text-gray-400 dark:text-gray-500">Block 3 (Disabled)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="box overflow-hidden h-48 bg-gray-900 dark:bg-gray-900">
                        <div className="box-body !p-0 h-full">
                            <div className="p-6 h-full">
                                <div className="flex items-center justify-between h-full">
                                    <div className="mb-4">
                                        <span className="block font-semibold text-[0.9375rem] text-gray-400 dark:text-gray-500">Block 4 (Disabled)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Second row */}
                <div className="col-span-3">
                    <div className="box overflow-hidden h-48">
                        <div className="box-body !p-0 h-full">
                            <div className="p-6 h-full">
                                <div className="flex items-center justify-between h-full">
                                    <div className="mb-4">
                                        <span className="block font-semibold text-[0.9375rem]">Block 5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="box overflow-hidden h-48">
                        <div className="box-body !p-0 h-full">
                            <div className="p-6 h-full">
                                <div className="flex items-center justify-between h-full">
                                    <div className="mb-4">
                                        <span className="block font-semibold text-[0.9375rem]">Block 6</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="box overflow-hidden h-48">
                        <div className="box-body !p-0 h-full">
                            <div className="p-6 h-full">
                                <div className="flex items-center justify-between h-full">
                                    <div className="mb-4">
                                        <span className="block font-semibold text-[0.9375rem]">Block 7</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="box overflow-hidden h-48">
                        <div className="box-body !p-0 h-full">
                            <div className="p-6 h-full">
                                <div className="flex items-center justify-between h-full">
                                    <div className="mb-4">
                                        <span className="block font-semibold text-[0.9375rem]">Block 8</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
        </Fragment>
    );
}

export default Personal;
