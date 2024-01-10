import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import { useParams } from "react-router-dom";
import {getProductByName} from "../../features/product/productReducerService";
import {useDispatch, useSelector} from "react-redux";
import {productSelector} from "../../features/product/productReducer";

const ProductDetails = () => {
  const location = useLocation();
  const  params = useParams();
  const productName= params.productName;
  const [prevLocation, setPrevLocation] = useState("");
  const dispatch= useDispatch();
  const productInfo = useSelector(state => state.products.value)|| {};
  console.log(productInfo.imageUrls)
  function formatProductName(productName) {
    const words = productName.split('-');
    const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return formattedWords.join(' ');
  }
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (currentImageIndex < productInfo.imageUrls.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const previousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const renderImage = () => {
    if (!productInfo.imageUrls || productInfo.imageUrls.length === 0) {
      return <div>No images available.</div>;
    }
    return (
        <div className="relative">
          <img
              className="w-full h-full object-cover"
              src={productInfo.imageUrls[currentImageIndex]}
              alt={productInfo.productName}
          />
          <div className="absolute top-0 right-0 left-0 flex justify-between">
            <button onClick={previousImage} className="p-2 bg-white text-gray-700">
              Previous
            </button>
            <button onClick={nextImage} className="p-2 bg-white text-gray-700">
              Next
            </button>
          </div>
        </div>
    );
  };

  useEffect(() => {
    dispatch(getProductByName(formatProductName(productName)));
  }, [productName, dispatch]);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full">
            <ProductsOnSale />
          </div>
          <div className="h-full xl:col-span-2">
              {renderImage()}
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            {Object.keys(productInfo).length === 0 ? (
                <div>Loading...</div>
            ) : (
                <ProductInfo productInfo={productInfo} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
