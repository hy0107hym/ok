import styled from "styled-components";
import { ListBox, ElementText } from "../components/List";
import { PagingBox, PagingBtn, ArrowBtn } from "../components/Pagination";
import React, { useState, useEffect } from "react";
import axios from "axios";

const BackDiv = styled.div`
  background-color: #f3f3f3;
  // flex-direction: row;
  // display: flex;
  height: 100%;
`;

function Main() {
  const urlParams = new URLSearchParams("?");
  const searchOption = urlParams.get("select");
  const searchDiscript = urlParams.get("search");

  console.log(urlParams);

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [data, setData] = useState({});
  const [item, setItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedOption, setSelectedOption] = useState("전체");
  const [selectedRowOption, setSelectedRowOption] = useState(10);
  const onFirst = (event) => {
    event.preventDefault();
    console.log(event.value);
    setCurrentPage(parseInt(event.target.value) - 1);
  };
  const onSecond = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setCurrentPage(parseInt(event.target.value) - 1);
  };
  const onThird = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setCurrentPage(parseInt(event.target.value) - 1);
  };
  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);

      try {
        const response = await axios(
          `https://dummyjson.com/products?limit=100`
        );

        setData(response.data);
        setItem(response.data.products);
        setTotal(response.data.total);
        setSelectedOption(searchOption);
        setSearch(searchDiscript);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const [search, setSearch] = useState("");
  const onChange = (event) => {
    const {
      currentTarget: { value },
    } = event;
    setSearch(value);
    console.log(value);
  };
  const selectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    console.log("selectoption", selectedOption);
  };
  const selectRowChange = (event) => {
    const value = event.target.value;
    setSelectedRowOption(value);
    console.log("test", selectedRowOption);
  };
  const onSubmit = (event) => {
    console.log("search " + search);
    // eslint-disable-next-line no-restricted-globals
    history.pushState(
      null,
      null,
      "select=" + selectedOption + "&search=" + search
    );
  };

  console.log(item);
  console.log("currentPage " + currentPage);
  console.log("Total " + total);
  console.log("selectedRowOption " + selectedRowOption);

  return (
    <BackDiv>
      <div>Tìm sản phẩm</div>
      <div>Tìm kiếm</div>
      <form onSubmit={onSubmit}>
        <select onChange={selectChange}>
          <option>Tất cả</option>
          <option>Tên sản phẩm</option>
          <option>Thương hiệu</option>
          <option>Nội dung sản phẩm</option>
        </select>
        <input onChange={onChange} />
        <button>submit</button>
      </form>
      {isLoading ? (
        <></>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Desc</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {item &&
                item
                  .filter(
                    (Data) =>
                      currentPage * selectedRowOption < Data.id &&
                      Data.id <= (currentPage + 1) * selectedRowOption === true
                  )
                  .map((Data) => (
                    
                      <tr key={Data.id} value={Data.id}>
                        <th>{Data.id}</th>
                        <th>{Data.title}</th>
                        <th>{Data.brand}</th>
                        <th>{Data.description}</th>
                        <th>{Data.price}</th>
                        <th>{Data.rating}</th>
                        <th>{Data.stock}</th>
                      </tr>
                    
                  ))}
            </tbody>
          </table>
        </>
      )}
      <PagingBox>
        Giới hạn trong trang
        <select onChange={selectRowChange}>
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
        {currentPage > 0 ? (
          <>
            <ArrowBtn onClick={() => setCurrentPage(currentPage - 1)}>
              {"<"}
            </ArrowBtn>
          </>
        ) : (
          <></>
        )}
        {currentPage > 0 ? (
          <PagingBtn onClick={onFirst} value={currentPage}>
            {currentPage}
          </PagingBtn>
        ) : (
          <></>
        )}
        {currentPage + 1 <= total / selectedRowOption ? (
          <PagingBtn onClick={onSecond} value={currentPage + 1}>
            {currentPage + 1}
          </PagingBtn>
        ) : (
          <></>
        )}
        {currentPage + 1 < total / selectedRowOption ? (
          <PagingBtn onClick={onThird} value={currentPage + 2}>
            {currentPage + 2}
          </PagingBtn>
        ) : (
          <></>
        )}
        {currentPage + 1 < total / selectedRowOption ? (
          <ArrowBtn onClick={() => setCurrentPage(currentPage + 1)}>
            {">"}
          </ArrowBtn>
        ) : (
          <></>
        )}
      </PagingBox>
    </BackDiv>
  );
}
export default Main;
