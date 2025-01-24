import { useNavigate } from "react-router-dom";
import CustomDataTable from "../components/CustomTable";



const data = [
  {
    id: 1,
    ID: 'OR-1203',
    products: `Ball Pepper, onions, rice, +7 others `,
    contact: 'Ajayi Daniel',
    number: `+2348123456789 +234987654321`,
    status: 'In Progress',
  },
  {
    id: 2,
    ID: 'OR-1203',
    products: `Ball Pepper, onions, rice, +7 others `,
    contact: 'Ajayi Daniel',
    number: `+2348123456789 +234987654321`,
    status: 'In Progress',
  },
  {
    id: 3,
    ID: 'OR-1203',
    products: `Ball Pepper, onions, rice, +7 others `,
    contact: 'Ajayi Daniel',
    number: `+2348123456789 +234987654321`,
    status: 'In Progress',
  },
  {
    id: 4,
    ID: 'OR-1203',
    products: `Ball Pepper, onions, rice, +7 others `,
    contact: 'Ajayi Daniel',
    number: `+2348123456789 +234987654321`,
    status: 'In Progress',
  },
  {
    id: 5,
    ID: 'OR-1203',
    products: `Ball Pepper, onions, rice, +7 others `,
    contact: 'Ajayi Daniel',
    number: `+2348123456789 +234987654321`,
    status: 'In Progress',
  },
  {
    id: 6,
    ID: 'OR-1203',
    products: `Ball Pepper, onions, rice, +7 others `,
    contact: 'Ajayi Daniel',
    number: `+2348123456789 +234987654321`,
    status: 'In Progress',
  },
  {
    id: 7,
    ID: 'OR-1203',
    products: `Ball Pepper, onions, rice, +7 others `,
    contact: 'Ajayi Daniel',
    number: `+2348123456789 +234987654321`,
    status: 'In Progress',
  },
]


const Dashboard = () => {

  const navigate = useNavigate();

  const columns = [
    {
      name: "",
      selector: (row) => (
        <div className="w-[7rem] bg-white shadow rounded-2xl ">
          <img src={row.image} alt="food item" className="w-full" />
        </div>
      ),
    },
    {
      name: "ID",
      selector: (row) => row?.ID,
    },
    {
      name: "Products Ordered",
      selector: (row) => row?.products,
      width: '300px'
    },
    {
      name: "Contact Name",
      selector: (row) => row?.contact,
    },
    {
      name: "Contact Tel. No",
      selector: (row) => row?.number,
    },
    {
      name: "Status",
      selector: (row) => <div className='text-red-600'>{row?.status}</div>,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex gap-7">

        </div>
      ),
      width: '170px'
    },
  ];

  return (
    <div>
      <CustomDataTable
        column={columns}
        data={data}
        pointerOnHover
        highlightOnHover
      />
    </div>
  )
}

export default Dashboard