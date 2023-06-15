import React, { useState } from 'react';
import "./style.css"

const Table = ({ data, columns, pageLimit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilters, setSearchFilters] = useState({});
  
  const filteredData = data.filter(item => {
    for (const key in searchFilters) {
      const searchValue = searchFilters[key].toLowerCase();
      const itemValue = String(item[key]).toLowerCase();
      if (itemValue.indexOf(searchValue) === -1) {
        return false;
      }
    }
    return true;
  });
  
  const pageCount = Math.ceil(filteredData.length / pageLimit);
  const startIndex = (currentPage - 1) * pageLimit;
  const endIndex = startIndex + pageLimit;
  const currentData = filteredData.slice(startIndex, endIndex);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const handleSearchChange = (event, column) => {
    const { value } = event.target;
    setSearchFilters(prevFilters => ({
      ...prevFilters,
      [column]: value
    }));
  };
  
  return (
    <div className='AAp'>
      <table>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column}>
                <input
                  type="text"
                  value={searchFilters[column] || ''}
                  onChange={(event) => handleSearchChange(event, column)}
                  placeholder={`Search ${column}`}
                  className='search'
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td key={column}>{item[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className='page_btn'>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
            className='pagi'
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;
