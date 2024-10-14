import React from 'react';

const products = [
  {
    name: "iqoo neo 9 pro",
    image: "https://s3-alpha-sig.figma.com/img/419c/f6fb/bc414d734f93483073c50f453ae51aaf?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=flnDr64TWjeA-fWbIpZ~88lzfAQWMpN-8Gq5xHreCDt1akgzb7hFKyWwRglh5wqotha27TkeJRmGNpjM6-nz1gQwcFBKCFIt7qopncUxbaSq9sMSmTFmMDmYDv1URCT983Bb7iXmpzNJlTHeKlaY0MXtetAaXltXixV075HjYqL5hw~LUBYOcxM7UHasPv5NWf3iwxGmDeTZOKidZWSQwhcHq0u6FRl~ROsW-gYOI3MpiWwRygR3opcCGpaWAVXWaVM15ydnN5vqx9yVTrdfjn6CVXf52HIt92yKBimTRTlpUPauhiQKXm6sUZeop6ZQ7RyVAqMUn0UIhbJuolJoMA__",
    salesVolume: "$50,000",
    unitsSold: "1000 Units",
    status: "In Stock",
  },
  {
    name: "Apple iPad mini",
    image: "https://s3-alpha-sig.figma.com/img/bf9c/f620/131f59cb28fa8762e4d036787672ee08?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DGYpPrNhLKt2jWgQmXcsxoutCbeZl8~BapKtzU9I1hh2QP5NcLXa-bLW6ijn6WZAnj8a330BnRg1W~P7wgH20qMsDXIYuvyuoNy4xSvAZljsQylrJsvOYa0E5mZw-aFl2w8KVFwNHlF6BX3ROQVxlrKYLnTy0dgb4MNCI~ZM4fBFm2l4Vs-Onbo1Opn2CoRxh0DDlRnGrAY1WCoLnnnvkbDMN-8fvIzbJfr1qC35blPOtndf9xZxvYHfylpkIsuNyxPCxb1aOSwRJ~mZlcFmE7ehGK0ij~nSayZg5xEtPcW8nFPYwie2pxL3LBwOgSyRvnlCXRfu-apiAZl3nbpIcg__",
    salesVolume: "$30,000",
    unitsSold: "1000 Units",
    status: "Out of Stock",
  },
  {
    name: "boAt Airdopes Atom",
    image: "https://s3-alpha-sig.figma.com/img/198f/dfee/b18a5bc197f2bf73b42767ecd8f8564c?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JNEhLRnf1XmIpu3oNdLEgOFFEkIa6YXSVUULdOHfOjVcgUoeRW5NDHzSdlAtMvD9mhh8BEUyhZIRea3aDkiAWlruSy3nIulGlxxGvdz26g3wKN4p0CuSx1JKBVJRqyy9NAqNnIRqlYngW7SqRFhxgqgnWuelp0kl-pUxkkGipzcvPW1QnOT1078uWR8c4aZFXoSUn2eSpTPAvx9CpxmceQ5F2k3bkqIWEcKI7b1~vWuXruGpTf9hjIfgkGFUw2ZHEqe-hxJTr8aanp2LPjm4grBlD6PD15HCj01Mj5VYZipU5WYo-CFht~yaIahL0hff-ZHzdA5POcG0A~LgiqBzbA__",
    salesVolume: "$20,000",
    unitsSold: "1000 Units",
    status: "In Stock",
  },
  {
    name: "Tribit XSound Plus",
    image: "https://s3-alpha-sig.figma.com/img/2abb/b215/08bfe6ce98ad8a19be529c68ed15241c?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d-3lb7Dgk4X2ujjHsTzGYIKFm61dVYJJ1iZes7cQZvaRb4H4-8kgstaLu384XrBKi3QVHPgMe8u4C2VuIfGm6KQk~gQqfZYhLxFxmeYIlgF2qOIp5sE1nEHKbYuJWXaysM0BLKynb8D~Yx28RLfbKnESoNiDYTxlxbKrPSt5RPMZEdIBLB4l8frdqVhO~OvL5y6DCj9hSY79i2WckA-OqLTlYKEN0HOiMGJaVV7EW579CT2DdTKly7jU3zR0TyLXo6Dx4~bQE5O71vO889eVFYR71blLBkeSOjdlf8uXHiGb3o3R4WIVwAHsuWjUNdeMu6BgDWIxfEELDJYSOKLWhg__",
    salesVolume: "$10,000",
    unitsSold: "1000 Units",
    status: "In Stock",
  },
];

const ProductsDashTable: React.FC = () => {
  return (
    <div className="bg-white rounded-lg w-full px-8 py-6">
      <div className="flex justify-between items-center">
        <h3 className="text-[16px] font-bold">Total Purchase by Supplier</h3>
        <select
          className="border border-[#565148] h-8 pl-3 pr-4 rounded-md bg-[#FEFDFA] text-xs font-semibold text-gray-800"
          style={{ color: "#585953" }}
        >
          <option>Select Supplier</option>
          <option>Other</option>
          <option>Other</option>
          <option>Other</option>
        </select>
      </div>
      <div className="overflow-x-auto pt-3">
        <table className="min-w-full table-auto text-left">
          <thead className="border-b border-tableBorder bg-[#FDF8F0] p-4">
            <tr className="bg-gray-50">
              <th className="px-4 py-4 text-xs font-semibold text-[#495160]">Product name</th>
              <th className="px-4 py-4 text-xs font-semibold text-[#495160]">Image</th>
              <th className="px-4 py-4 text-xs font-semibold text-[#495160]">Sales Volume</th>
              <th className="px-4 py-4 text-xs font-semibold text-[#495160]">Units Sold</th>
              <th className="px-4 py-4 text-xs font-semibold text-[#495160]">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b border-tableBorder">
                <td className="px-4 py-2 text-xs text-dropdownText">{product.name}</td>
                <td className="px-4 py-2">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="px-4 py-2 text-xs text-gray-700">{product.salesVolume}</td>
                <td className="px-4 py-2 text-xs text-gray-700">{product.unitsSold}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1.5 text-xs font-semibold rounded-[4px] ${
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
};

export default ProductsDashTable;
