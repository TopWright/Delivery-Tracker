import DataTable from "react-data-table-component";
import { Loader } from "../helpers/Functions";

// Define the Shipment type
interface CustomDataTableProps {
    column: any[];
    data: any[];
    [key: string]: any;
}

const CustomDataTable = ({ column, data, ...restProps }: CustomDataTableProps) => {
    const customStyles = {
        rows: {
            style: {
                backgroundColor: "#fff",
                color: '#052137',
                fontSize: '1.5rem',
                fontWeight: "400",
                border: 'solid 1px #33415530',
            },
        },
        headCells: {
            style: {
                fontSize: "1.6rem",
                fontWeight: "700",
                backgroundColor: "#e2e8f090",
                color: '#10609F',
                padding: '2rem 3rem',
                borderBottom: 'solid 1px #33415540',
            },
        },
        cells: {
            style: {
                padding: '2rem 3rem',
                color: '#052137',
            },
        },
    };

    return (
        <div className="data-table rounded-2xl">
            <DataTable
                columns={column}
                data={data}
                customStyles={customStyles}
                className="overflow-x-auto shadow-lg pt-0"
                paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
                progressComponent={<Loader className="my-20" white={false} />}
                {...restProps}
            />
        </div>
    );
};

export default CustomDataTable;
