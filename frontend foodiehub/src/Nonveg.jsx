import React, { useEffect, useState } from "react";
import { addtocart, fetchNonvegProducts } from "./store.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function NonVeg() {
  const dispatch = useDispatch();

  // Get user and non-veg state from Redux
  const { user } = useSelector(state => state.auth);
  const { loading, nonVegItems, error } = useSelector(state => state.nonveg);

  // Pagination state
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch non-veg items on component mount
  useEffect(() => {
    dispatch(fetchNonvegProducts());
  }, [dispatch,user]);

  const totalPages = Math.ceil(nonVegItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nonVegItems.slice(indexOfFirstItem, indexOfLastItem);

  // If user is not logged in
  if (!user) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: "20px"
      }}>
        <h2>Please login to browse Non-Veg items</h2>
        <p>
          <Link to="/login" style={{ color: "#ff4f4f", fontWeight: "600" }}>
            Login Here
          </Link>
        </p>
      </div>
    );
  }

  // Show loading or error if needed
  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading Non-Veg items...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", marginTop: "50px", color: "red" }}>{error}</p>;
  }

  return (
    <div className="container mt-5 pt-4">
      <div className="row">
        {currentItems.map((item) => (
          <div key={item.id} className="col-md-3 col-sm-6 col-12 mb-4 d-flex justify-content-center">
            <div className="card shadow-sm" style={{
              width: "100%",
              maxWidth: "250px",
              height: "390px",
              borderRadius: "15px",
              transition: "0.3s",
              cursor: "pointer"
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0px 8px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.1)";
              }}
            >
              <img src={item.img} alt={item.name} className="card-img-top" style={{
                height: "180px",
                objectFit: "cover",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px"
              }} />
              <div className="card-body text-center d-flex flex-column justify-content-between">
                <div>
                  <h6 className="card-title">{item.name}</h6>
                  <p className="card-text text-muted" style={{ fontSize: "13px", height: "55px", overflow: "hidden" }}>
                    {item.descript}
                  </p>
                  <p className="fw-bold text-success">₹{item.price}</p>
                </div>
                <button className="btn btn-primary w-100" style={{ borderRadius: "20px", transition: "0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#0a58ca")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#0d6efd")}
                  onClick={() => {
                    dispatch(addtocart(item));
                    toast.success(`${item.name} Added To Cart..`, {
                      closeOnClick: true,
                      autoClose: 2500,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mb-4">
        <button
          disabled={currentPage === 1}
          className="btn btn-outline-success mx-2"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn mx-1 ${currentPage === index + 1 ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          className="btn btn-outline-success mx-2"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default NonVeg;
