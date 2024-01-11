import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/zgearSlice";
import Image from "../../designLayouts/Image";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
    console.log("productInfo is "+  productInfo)
    const renderSpecifications = () => {
        if (productInfo && productInfo.specifications) {
            if (typeof productInfo.specifications === "string") {
                const specsArray = productInfo.specifications.split(", ");
                return specsArray.map((spec, index) => (
                    <li key={index} className="text-base text-gray-600">
                        {spec}
                    </li>
                ));
            } else if (Array.isArray(productInfo.specifications)) {
                return productInfo.specifications.map((spec, index) => (
                    <li key={index} className="text-base text-gray-600">
                        {spec.specKey}: {spec.specValue}
                    </li>
                ));
            }
            return <li>No specifications available.</li>;
            }
        };

  return (
    <div className="flex flex-col gap-5">
        <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p className="text-xl font-semibold">${productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.description}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: productInfo.id,
              name: productInfo.productName,
              quantity: 1,
              image: productInfo.img,
              price: productInfo.price,
            })
          )
        }
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
        <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:
                {productInfo.categoryName}
        </span>
      </p>
        <div>
            <p className="font-medium text-lg">Specs:</p>
            <ul className="list-disc list-inside">{renderSpecifications()}</ul>
        </div>
    </div>
  );
};

export default ProductInfo;
