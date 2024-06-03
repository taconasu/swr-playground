type Props = {
  headers: string[];
  data: string[][];
};
export const Table: React.FC<Props> = ({ headers, data }) => (
  <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {headers.map((header, index) => (
            <th key={`${header}-${index}`} scope="col" className="px-6 py-3">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr
            key={`row-${i}`}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            {row.map((cell, j) => (
              <td key={`cell-${i}-${j}`} className="px-6 py-4">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
