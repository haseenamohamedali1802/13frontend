import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Home.css";

const API_URL = process.env.REACT_APP_API_URL || '';

function Home() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(async () => {
  try {
    let url = `${API_URL}/api/getApplicantsData/?page=${currentPage}`;

    if (startDate && endDate) {
      const start = startDate.toISOString().split("T")[0];
      const end = endDate.toISOString().split("T")[0];
      url += `&start_date=${start}&end_date=${end}`;
    }

    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery.trim())}`;
    }

    const response = await fetch(url);
    const jsonData = await response.json();

    setData(jsonData.data || []);
    setTotalPages(jsonData.total_pages || 1);
  } catch (error) {
    console.error("Error fetching data", error);
  }
}, [currentPage, startDate, endDate, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);



  return (
    <div className="page-container">
  <div className="container mt-2">

    <h1>Applicant Details</h1>
    <hr />

    <Row>
      <p>Filter By Date of Application</p>

      <Col md={2}>
        <DatePicker
          selected={startDate}
          className="form-control"
          onChange={(date) => setStartDate(date)}
          placeholderText="From Date"
        />
      </Col>

      <Col md={2}>
        <DatePicker
          selected={endDate}
          className="form-control"
          onChange={(date) => setEndDate(date)}
          placeholderText="To Date"
        />
      </Col>

      <Col md={3}></Col>

      <Col md={5}>
        <input
          type="text"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search By Applicant Id"
        />
      </Col>
    </Row>

    <hr />

    {/* 🔹 ONLY TABLE SCROLLS */}
    <div className="table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Applicant Name</th>
            <th>Gender</th>
            <th>District</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Ownership</th>
            <th>Govt ID Type</th>
            <th>ID Number</th>
            <th>Category</th>
            <th>Load Applied</th>
            <th>Date of Application</th>
            <th>Status</th>
            <th>Reviewer ID</th>
            <th>Reviewer Name</th>
            <th>Reviewer Comments</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {data.map((connection) => (
            <tr key={connection.id}>
              <td>{connection.id}</td>
              <td>{connection.Applicant.Applicant_Name}</td>
              <td>{connection.Applicant.Gender}</td>
              <td>{connection.Applicant.Districts}</td>
              <td>{connection.Applicant.State}</td>
              <td>{connection.Applicant.Pincode}</td>
              <td>{connection.Applicant.Ownership}</td>
              <td>{connection.Applicant.GotId_Type}</td>
              <td>{connection.Applicant.Id_Number}</td>
              <td>{connection.Applicant.Category}</td>
              <td>{connection.Load_Applied}</td>
              <td>{connection.Date_of_Application}</td>
              <td>{connection.Status}</td>
              <td>{connection.Reviewer_Id}</td>
              <td>{connection.Reviewer_Name}</td>
              <td>{connection.Reviewer_Comment}</td>
              <td>
                <Link
                  to={`/editApplicant/${connection.Applicant.id}`}
                  className="btn btn-outline-success btn-sm"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


<div className="pagination-wrapper">
  <ul className="pagination justify-content-center gap-2">

    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
      <button
        className="btn btn-outline-dark"
        onClick={() => setCurrentPage(1)}
      >
        Go to First
      </button>
    </li>

    {Array.from({ length: totalPages }).map((_, index) => (
      <li key={index} className="page-item">
        <button
          className={`btn ${
            currentPage === index + 1
              ? "btn-dark text-white"
              : "btn-outline-dark"
          }`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      </li>
    ))}

    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
      <button
        className="btn btn-outline-dark"
        onClick={() => setCurrentPage(totalPages)}
      >
        Go to Last
      </button>
    </li>

  </ul>
</div>


  </div>
</div>

  );
}

export default Home;
