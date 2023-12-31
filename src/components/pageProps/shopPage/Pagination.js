import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import {productListSelector} from '../../../features/product/productsReducer';
import {getProducts} from "../../../features/product/productReducerService";
import { useDispatch, useSelector } from 'react-redux';
import Product from "../../home/Products/Product";

function Items({ currentItems }) {
    return (
        <>
            {currentItems.map((item) => (
                <div key={item.id} className="w-full">
                    <Product
                        _id={item.id}
                        img={item.imageUrls.length > 0 ? item.imageUrls[0] : 'default-image.jpg'}
                        productName={item.productName}
                        price={item.price}
                        categoryName={item.categoryName}
                        description={item.description}
                        specifications={item.specifications.map(spec => `${spec.specKey}: ${spec.specValue}`).join(', ')}
                    />
                </div>
            ))}
        </>
    );
}

const Pagination = ({ itemsPerPage }) => {
    const dispatch = useDispatch();
    const products = useSelector(productListSelector) || [];
    const [currentPage, setCurrentPage] = useState(0);
    const pageCount = Math.ceil(products.total / itemsPerPage);
    const { content = [], totalPages = 0 } = products;

    useEffect(() => {
        // Dispatch getProducts action with current page and size
        dispatch(getProducts({ page: currentPage, size: itemsPerPage }));
    }, [dispatch, currentPage, itemsPerPage]);
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    if (!products) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
                <Items currentItems={content} />
            </div>
            <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
                <ReactPaginate
                    nextLabel=""
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel=""
                    pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
                    pageClassName="mr-6"
                    containerClassName="flex text-base font-semibold font-titleFont py-10"
                    activeClassName="bg-black text-white"
                />
                <p className="text-base font-normal text-lightText">
                    Showing page {currentPage + 1} of {totalPages}
                </p>
            </div>
        </div>
    );
};

export default Pagination;
