import { omit } from "lodash";

interface TableProps {
  cols: string[];
  rows: any[];
  className?: string;
  onClick?: (id: string) => void;
}
const Table = ({ cols, rows, className, onClick }: TableProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  {cols.map((col, idx) => (
                    <th key={idx} scope="col" className="px-6 py-4">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b dark:border-neutral-500 ${
                      onClick && "cursor-pointer"
                    }`}
                    onClick={() => onClick && onClick(row._id)}
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {idx + 1}
                    </td>
                    {Object.keys(omit(row, "_id"))?.map((key) => (
                      <td key={key} className="whitespace-nowrap px-6 py-4">
                        {row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
