import React, { useEffect, useState, useRef } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination} from "react-table";

export const COLUMNS = [
    { Header: "DateTime", accessor: "datetime", width: 15 },
    { Header: "Type", accessor: "type", width: 10 },
    { Header: "Command", accessor: "command", width: 10 },
    { Header: "Subcommand", accessor: "subcommand", width: 10 },
    { Header: "From", accessor: "from", width: 10 },
    { Header: "To", accessor: "to", width: 10 },
    { Header: "Data", accessor: "data" },
];

const MAX_QUEUE_SIZE = 200;
const PAGE_SIZE = 20;
const useLogQueue = () => {
    const [logs, setLogs] = useState([]);

    const addLog = (log) => {
        setLogs(prevLogs => {
            const newLogs = [...prevLogs, log];
            return newLogs.length > MAX_QUEUE_SIZE ? newLogs.slice(-MAX_QUEUE_SIZE) : newLogs;
        });
    };

    return [logs, addLog];
};

export const EventLog = () => {
    const [logs, addLog] = useLogQueue();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        console.log("Attempting to connect to WebSocket...");
        if (!socket) {  // socket이 이미 설정되어 있다면 새로 설정하지 않음
            const ws = new WebSocket("ws://localhost:19800");
            setSocket(ws);

            ws.onopen = () => {
                console.log("WebSocket connection established.");
            };

            ws.onmessage = (event) => {
                const log = JSON.parse(event.data);
                console.log("onmessage log ", log);
                addLog(log);
            };

            return () => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.close();
                }
            };
        }
    }, [socket, addLog]);

    const data = logs;

    const {
        getTableProps,
        headerGroups,
        getTableBodyProps,
        prepareRow,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageCount,
        state,
        setGlobalFilter,
        gotoPage
    } = useTable(
        { columns: COLUMNS, data, initialState: { pageSize: PAGE_SIZE } },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { globalFilter } = state;

    return (
        <>
            <div className="e-table pb-5">
                <div className="flex">
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                </div>
                <div className='table-responsive table-bordered text-center'>
                    <table
                        {...getTableProps()}
                        className="!border-t-0 !border-x-0  table-bordered text-nowrap !border-b-0 w-full"
                    >
                        <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())} key={Math.random()}
                                        className={`table-column-${column.id}`}
                                        style={{width: column.width ? `${column.width}%` : 'auto'}}
                                    >
                                        <span className="tabletitle">{column.render("Header")}</span>
                                        <span>
                                                {column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <i className="fa fa-angle-down"></i>
                                                    ) : (
                                                        <i className="fa fa-angle-up"></i>
                                                    )
                                                ) : ("")}
                                            </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row);
                            return (
                                <tr className="" {...row.getRowProps()} key={Math.random()}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} key={Math.random()}>{cell.render("Cell")}</td>
                                    ))}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="block sm:flex mt-4 px-4 ">
                    <span className="sm:ms-auto">
                        <button
                            className="btn-outline-light tablebutton me-2 my-2 sm:inline block"
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                        >
                            {"Previous"}
                        </button>
                        <button
                            className="btn-outline-light tablebutton me-2 my-2"
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            {"1"}
                        </button>
                        <button
                            className="btn-outline-light tablebutton me-2 my-2"
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            {"2"}
                        </button>
                        <button
                            className="btn-outline-light tablebutton me-2 my-2"
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            {"3"}
                        </button>
                        <button
                            className="btn-outline-light tablebutton me-2 my-2"
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            {"Next"}
                        </button>
                    </span>
                </div>
            </div>
        </>
    );
};

const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <span className="flex ms-auto">
            <input
                value={filter || ""}
                onChange={e => setFilter(e.target.value)}
                className="form-control mb-4"
                placeholder="Search..."
            />
        </span>
    );
};