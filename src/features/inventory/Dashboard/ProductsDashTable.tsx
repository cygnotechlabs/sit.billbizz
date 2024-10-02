type Props = {};

// Sample product data
const products = [
  {
    name: "iqoo neo 9 pro",
    image: "/path/to/image1.png", // Add your image paths
    salesVolume: "$50,000",
    unitsSold: "1000 Units",
    status: "In Stock",
  },
  {
    name: "Apple iPad mini",
    image: "/path/to/image2.png",
    salesVolume: "$30,000",
    unitsSold: "1000 Units",
    status: "Out of Stock",
  },
  {
    name: "boAt Airdopes Atom",
    image: "/path/to/image3.png",
    salesVolume: "$20,000",
    unitsSold: "1000 Units",
    status: "In Stock",
  },
  {
    name: "Tribit XSound Plus",
    image: "/path/to/image4.png",
    salesVolume: "$10,000",
    unitsSold: "1000 Units",
    status: "In Stock",
  },
];

function ProductsDashTable({}: Props) {
  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-base text-textColor font-semibold mb-4">
        Top Selling Products
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-sm font-semibold text-gray-600">
                Product name
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-600">
                Image
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-600">
                Sales Volume
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-600">
                Units Sold
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 text-sm text-gray-700">{product.name}</td>
                <td className="px-4 py-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {product.salesVolume}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {product.unitsSold}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-lg ${
                      product.status === "In Stock"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsDashTable;
