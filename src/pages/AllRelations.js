import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASEURL;

const AllRelations = () => {
  const [popupVisible, setPopupVisible] = useState(null);
  const popupRef = useRef(null);
  const [relations, setRelations] = useState([]);
  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const [rowsLimit] = useState(10);
  const [rowsToShow, setRowsToShow] = useState([]);

  const [searchValue, setSearchValue] = useState();
  const [customPagination, setCustomPagination] = useState([]);
  const [activeColumn, setActiveColumn] = useState(["Price"]);
  const [sortingColumn, setSortingColumn] = useState(["Price"]);
  const [totalPage, setTotalPage] = useState(
    Math.ceil(productList?.length / rowsLimit)
  );
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  const deleteRelation = async (id) => {
    await fetch(`${baseUrl}/relation/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/new-relation");
  };

  const togglePopup = (index) => {
    setPopupVisible((prev) => (prev === index ? null : index));
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupVisible(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = (id) => {
    deleteRelation(id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setProducts(relations);
    setProductList(relations);
    setRowsToShow(productList.slice(0, rowsLimit));
  }, [relations]);

  // Fetching all stores data
  const fetchData = () => {
    fetch(`${baseUrl}/relation`)
      .then((response) => response.json())
      .then((data) => {
        setRelations(data);
      });
  };

  const handleEditClick = (id) => {
    navigate(`/${id}/edit`);
  };

  function searchProducts(keyword) {
    keyword = keyword.toLowerCase();
    setSearchValue(keyword);
    if (!keyword == "") {
      const results = productList.filter((product) => {
        return (
          product.code.toLowerCase().includes(keyword) ||
          product.companyName.toLowerCase().includes(keyword) ||
          product.telephone.toString().includes(keyword) ||
          product.country.toLowerCase().includes(keyword)
        );
      });
      setProductList(results);
      setRowsToShow(results.slice(0, rowsLimit));
      setCurrentPage(0);
      setTotalPage(Math.ceil(results?.length / rowsLimit));
      setCustomPagination(
        Array(Math.ceil(results?.length / rowsLimit)).fill(null)
      );
    } else {
      clearData();
    }
  }
  const clearData = () => {
    setSearchValue("");
    const sortedProducts = products.slice().sort((a, b) => a.Price - b.Price);
    setProductList(sortedProducts);
    setRowsToShow(sortedProducts.slice(0, rowsLimit));
    setCustomPagination(
      Array(Math.ceil(products?.length / rowsLimit)).fill(null)
    );
    setTotalPage(Math.ceil(products?.length / rowsLimit));
  };
  const sortByColumn = (column, changeSortingColumn = true) => {
    if (column != "Price") {
      if (sortingColumn?.includes(column) && changeSortingColumn) {
        const sortData = productList
          .slice()
          .sort((a, b) =>
            b[column].toString().localeCompare(a[column].toString())
          );
        setRowsToShow(
          sortData.slice(currentPage * rowsLimit, (currentPage + 1) * rowsLimit)
        );
        if (changeSortingColumn) {
          setSortingColumn([]);
          setProductList(sortData);
        }
      } else {
        const sortData = productList
          .slice()
          .sort((a, b) =>
            a[column].toString().localeCompare(b[column].toString())
          );
        setRowsToShow(
          sortData.slice(currentPage * rowsLimit, (currentPage + 1) * rowsLimit)
        );
        if (changeSortingColumn) {
          setProductList(sortData);
          setSortingColumn([`${column}`]);
        } else {
        }
      }
    } else {
      if (sortingColumn?.includes(column)) {
        const sortedProducts = productList
          .slice()
          .sort((a, b) => b.Price - a.Price);
        setRowsToShow(
          sortedProducts.slice(
            currentPage * rowsLimit,
            (currentPage + 1) * rowsLimit
          )
        );
        if (changeSortingColumn) {
          setSortingColumn([]);
          setProductList(sortedProducts);
        }
      } else {
        const sortedProducts = productList
          .slice()
          .sort((a, b) => a.Price - b.Price);
        setRowsToShow(
          sortedProducts.slice(
            currentPage * rowsLimit,
            (currentPage + 1) * rowsLimit
          )
        );
        if (changeSortingColumn) {
          setSortingColumn([`${column}`]);
          setProductList(sortedProducts);
        }
      }
    }
    setActiveColumn([`${column}`]);
    // setCurrentPage(0);
  };
  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = products.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };
  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = productList.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };
  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = products.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };
  const handleAddNewRelation = () => {
    navigate("/new-relation");
  };
  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(productList?.length / rowsLimit)).fill(null)
    );
  }, []);
  useEffect(() => {
    const sortedProducts = products.slice().sort((a, b) => a.Price - b.Price);
    setProductList(sortedProducts);
    setRowsToShow(sortedProducts.slice(0, rowsLimit));
  }, []);
  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center px-4 rounded-3xl">
      <div className=" flex flex-col gap-5 w-full">
        <div className="overflow-x-auto rounded-3xl mb-4 border bg-white border-gray-200 ">
          <div className="w-full px-4 md:px-12 py-8 bg-gray-100">
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="flex gap-4 justify-center items-center ">
                <span className="font-bold text-headerColor text-3xl md:text-4xl">
                  Relations
                </span>
              </div>
              {/* search */}
              <div className="flex flex-wrap justify-between gap-4 py-4">
                <div className="flex justify-center items-center px-3 border-2 rounded-xl ">
                  <img
                    alt="search-icon"
                    className="w-5 h-5"
                    src={require("../assets/search-icon.png")}
                  />
                  <input
                    className="bg-gray-100 border-none outline-none focus:border-none text-lg"
                    type="text"
                    placeholder="Search relations"
                    onChange={(e) => searchProducts(e.target.value)}
                    value={searchValue}
                  />
                </div>
                <div className="px-6 py-3 text-lg font-bold bg-secondColor text-white rounded-full hover:bg-gray-300 transition ease-in-out">
                  <button className="" onClick={handleAddNewRelation}>
                    Create Relation
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none ">
              <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter">
                <thead
                  className={`text-base text-white font-semibold w-full ${
                    rowsToShow?.length > 0
                      ? "border-b-0"
                      : "border-b-0 border-tableBg20"
                  }`}
                >
                  <tr className="bg-gray-200">
                    <th className="py-6 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group">
                      <div className="flex items-center">
                        <svg
                          className={`w-4 h-4 cursor-pointer ${
                            activeColumn?.includes("code")
                              ? "text-black"
                              : "text-[#BCBDBE] group-hover:text-black rotate-180"
                          } ${
                            sortingColumn?.includes("code")
                              ? "rotate-180"
                              : "rotate-0"
                          }
           `}
                          onClick={() => sortByColumn("code")}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                        <span
                          className="cursor-pointer pl-1"
                          onClick={() => sortByColumn("code")}
                        >
                          Code
                        </span>
                      </div>
                    </th>
                    <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group">
                      <div className="flex items-center">
                        <svg
                          className={`w-4 h-4 cursor-pointer ${
                            activeColumn?.includes("companyName")
                              ? "text-black"
                              : "text-[#BCBDBE] group-hover:text-black rotate-180"
                          } ${
                            sortingColumn?.includes("companyName")
                              ? "rotate-180"
                              : "rotate-0"
                          } `}
                          onClick={() => sortByColumn("companyName")}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                        <span
                          className="cursor-pointer pl-1"
                          onClick={() => sortByColumn("companyName")}
                        >
                          Company Name
                        </span>
                      </div>
                    </th>
                    <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group">
                      <div className="flex items-center">
                        <svg
                          className={`w-4 h-4 cursor-pointer ${
                            activeColumn?.includes("phoneNumber")
                              ? "text-black"
                              : "text-[#BCBDBE] group-hover:text-black rotate-180"
                          } ${
                            sortingColumn?.includes("phoneNumber")
                              ? "rotate-180"
                              : "rotate-0"
                          } `}
                          onClick={() => sortByColumn("phoneNumber")}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                        <span
                          className="cursor-pointer pl-1"
                          // onClick={() => sortByColumn("phoneNumber")}
                        >
                          Phone Number
                        </span>
                      </div>
                    </th>
                    <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group">
                      <div className="flex items-center">
                        <svg
                          className={`w-4 h-4 cursor-pointer ${
                            activeColumn?.includes("country")
                              ? "text-black"
                              : "text-[#BCBDBE] group-hover:text-black rotate-180"
                          } ${
                            sortingColumn?.includes("country")
                              ? "rotate-180"
                              : "rotate-0"
                          } `}
                          onClick={() => sortByColumn("country")}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                        <span
                          className="cursor-pointer pl-1"
                          onClick={() => sortByColumn("country")}
                        >
                          Country
                        </span>
                      </div>
                    </th>
                    <th className=" text-[#212B36] sm:text-base font-bold whitespace-nowrap "></th>
                  </tr>
                </thead>
                <tbody className=" border-tableBg20 ">
                  {rowsToShow?.map((data, index) => (
                    <tr className="bg-white" key={index}>
                      <td
                        className={`py-2 px-3 font-normal text-base ${
                          index == 0
                            ? " border-tableBg20"
                            : index == rowsToShow?.length
                            ? "border-y"
                            : "border-t"
                        } whitespace-wrap`}
                      >
                        {data?.code}
                      </td>
                      <td
                        className={`py-2 px-3 font-normal text-base ${
                          index == 0
                            ? " border-tableBg20"
                            : index == rowsToShow?.length
                            ? "border-y"
                            : "border-t"
                        } whitespace-wrap`}
                      >
                        {data?.companyName}
                      </td>
                      <td
                        className={`py-2 px-3 text-base  font-normal ${
                          index == 0
                            ? " border-tableBg20"
                            : index == rowsToShow?.length
                            ? "border-y"
                            : "border-t"
                        } whitespace-wrap`}
                      >
                        +{data?.telephone}
                      </td>
                      <td
                        className={`py-2 px-3 text-base  font-normal ${
                          index == 0
                            ? " border-tableBg20"
                            : index == rowsToShow?.length
                            ? "border-y"
                            : "border-t"
                        } whitespace-wrap`}
                      >
                        {data?.country}
                      </td>
                      <td
                        className={`hover:bg-gray-400 py-2 font-normal flex justify-center ${
                          index === 0
                            ? " border-tableBg20"
                            : index === rowsToShow?.length
                            ? "border-y"
                            : "border-t"
                        } whitespace-nowrap relative`}
                        onClick={() => togglePopup(index)}
                      >
                        <button className="focus:outline-none  text-black text-2xl text-center">
                          ⠇
                        </button>
                        {popupVisible === index && (
                          <div
                            ref={popupRef}
                            className={`absolute z-10 bg-white border shadow-lg py-0 right-0 bottom-0 mt-2 transition-transform rounded-md transform ${
                              popupVisible === index
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-2"
                            }`}
                          >
                            <div className="px-2 py-1 cursor-pointer text-secondColor hover:bg-gray-100">
                              View
                            </div>
                            <div
                              className="px-2 py-1 cursor-pointer text-secondColor hover:bg-gray-100"
                              onClick={() => handleEditClick(data?.id)}
                            >
                              Edit
                            </div>

                            <div
                              className="px-2 py-1 cursor-pointer text-delBtn hover:bg-gray-100"
                              onClick={() => handleDelete(data?.id)}
                            >
                              Delete
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className={`w-full justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-2.5 px-1 items-center ${
                productList?.length > 0 ? "flex" : "hidden"
              }`}
            >
              <div className="text-lg">
                Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
                {currentPage == totalPage - 1
                  ? productList?.length
                  : (currentPage + 1) * rowsLimit}{" "}
                of {productList?.length} entries
              </div>
              <div className="flex">
                <ul
                  className="flex justify-center items-center gap-x-[10px] z-30"
                  role="navigation"
                  aria-label="Pagination"
                >
                  <li
                    className={`prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${
                      currentPage == 0
                        ? "bg-[#cccccc] pointer-events-none"
                        : " cursor-pointer"
                    }`}
                    onClick={previousPage}
                  >
                    <img src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" />
                  </li>
                  {customPagination?.map((data, index) => (
                    <li
                      className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-1 border-solid border-2 bg-[#FFFFFF] cursor-pointer ${
                        currentPage == index
                          ? "text-blue-600  border-sky-500"
                          : "border-[#E4E4EB] "
                      }`}
                      onClick={() => changePage(index)}
                      key={index}
                    >
                      {index + 1}
                    </li>
                  ))}
                  <li
                    className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                      currentPage == totalPage - 1
                        ? "bg-[#cccccc] pointer-events-none"
                        : " cursor-pointer"
                    }`}
                    onClick={nextPage}
                  >
                    <img src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllRelations;
