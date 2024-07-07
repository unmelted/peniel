import { useTable, useSortBy, useGlobalFilter, usePagination} from "react-table";

//1Basic datatables

export const COLUMNS :any = [
    {
        Header: "Start date",
        accessor: "date",
    },
    {
        Header: "Name",
        accessor: "Name",
    },
    {
        Header: "Position",
        accessor: "Position",
    },
    {
        Header: "Salary",
        accessor: "Salary",
    },
];

export const DATATABLE = [
    {
        Id: "1",
        Name: "Tiger Nixon",
        Position: "System Architect",
        Office: "Edinburgh",
        Age: "61",
        date:'2011-04-25',
        Salary: "$320,800",
    },
    {
        Id: "2",
        Name: "Garrett Winters",
        Position: "Accountant",
        Office: "Tokyo",
        Age: "63",
        date:'2011-07-25',
        Salary: "$170,750",
    },
    {
        Id: "3",
        Name: "Ashton Cox",
        Position: "Junior Technical Author",
        Office: "San Francisco",
        Age: "66",
        date:'2009-01-12',
        Salary: "$86,000",
    },
    {
        Id: "4",
        Name: "Cedric Kelly",
        Position: "Senior Javascript Developer",
        Office: "Edinburgh",
        Age: "22",
        date:'2012-03-29',
        Salary: "$433,060",
    },
];
export const GlobalFilter = ({ filter, setFilter }:any) => {
    return (
        <span className="flex ms-auto">
        <input
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
            className="form-control mb-4"
            placeholder="Search..."
        />
      </span>
    );
};
//Sortable Table

export const columns:any= [
    { title: "Name", field: "name", sorter: "string"},
    { title: "Position", field: "position", sorter: "string" },
    { title: "Office", field: "office", sorter: "string" },
    { title: "Age", field: "age", sorter: "number" },
    { title: "Salary", field: "salary", sorter: "string" },
];

//Resonsive DataTable

export const EventLog = () => {

    const tableInstance = useTable(
        {
            columns: COLUMNS,
            data: DATATABLE,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const {
        getTableProps, // table props from react-table
        headerGroups, // headerGroups, if your table has groupings
        getTableBodyProps, // table body props from react-table
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        state,
        setGlobalFilter,
        page, // use, page or rows
        nextPage,
        previousPage,
        canNextPage,
        // canPreviousPage,
        // _pageOptions,
        gotoPage,
        pageCount,
        // setPageSize,
    } = tableInstance;

    const { globalFilter, } = state;

    return (
        <>
            <div className="e-table pb-5">
                <div className="flex">

                    <GlobalResFilter filter={globalFilter} setFilter={setGlobalFilter} />
                </div>
                <div className='table-responsive table-bordered text-center'>
                    <table
                        {...getTableProps()}
                        className="!border-t-0 !border-x-0  table-bordered text-nowrap !border-b-0 w-full"
                    >
                        <thead>
                        {headerGroups.map((headerGroup:any) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
                                {headerGroup.headers.map((column:any) => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())} key={Math.random()}
                                        className={column.className}
                                    >
                                        <span className="tabletitle">{column.render("Header")}</span>
                                        <span>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <i className="fa fa-angle-down"></i>
                                            ) : (
                                                <i className="fa fa-angle-up"></i>
                                            )
                                        ) : (
                                            ""
                                        )}
                                      </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                        {page.map((row:any) => {
                            prepareRow(row);
                            return (
                                <tr className="" {...row.getRowProps()} key={Math.random()}>
                                    {row.cells.map((cell:any) => {
                                        return (
                                            <td {...cell.getCellProps()} key={Math.random()}>{cell.render("Cell")}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="block sm:flex mt-4 px-4 ">

                    <span className="sm:ms-auto ">
              <button
                  className="btn-outline-light tablebutton me-2 my-2 sm:inline block"
                  onClick={() => gotoPage(0)}
                  disabled={!canNextPage}
              >
                {" Previous "}
              </button>
              <button
                  className="tablebutton me-2 my-2"
                  onClick={() => {
                      previousPage();
                  }}
                  // disabled={!canPreviousPage}
              >
                {" 1 "}
              </button>
              <button
                  className="btn-outline-light tablebutton me-2 my-2"
                  onClick={() => {
                      nextPage();
                  }}
                  disabled={!canNextPage}
              >
                {" 2 "}
              </button>
              <button
                  className="btn-outline-light tablebutton me-2 my-2"
                  onClick={() => {
                      nextPage();
                  }}
                  disabled={!canNextPage}
              >
                {" 3 "}
              </button>
              <button
                  className="btn-outline-light tablebutton me-2 my-2"
                  onClick={() => {
                      nextPage();
                  }}
                  disabled={!canNextPage}
              >
                {" Next "}
              </button>
            </span>
                </div>
            </div>

        </>
    );
};
const GlobalResFilter = ({ filter, setFilter }:any) => {
    return (
        <span className="flex ms-auto">
        <input
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
            className="form-control mb-4"
            placeholder="Search..."
        />
      </span>
    );
};



