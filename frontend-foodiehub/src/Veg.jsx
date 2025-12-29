import React, { useEffect, useState } from "react";
import { addtocart, fetchVegProducts } from "./store.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Veg() {
  const dispatch = useDispatch();

  // Get user and veg state from Redux
  const { user } = useSelector(state => state.auth); // login state
  const { loading, vegItems, error } = useSelector(state => state.veg); // veg items state

  // Pagination
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // Always fetch veg items
  useEffect(() => {
  if (!user) return;

  dispatch(fetchVegProducts());
}, [dispatch, user]);

  const totalPages = Math.ceil(vegItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vegItems.slice(indexOfFirstItem, indexOfLastItem);

  // Show loading or error first
  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading Veg items...</p>;
  if (error) return <p style={{ textAlign: "center", marginTop: "50px", color: "red" }}>{error}</p>;

  return (
    <div className="container mt-5 pt-4">
      {!user && (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <h2>Please login to browse Veg items</h2>
          <Link to="/login" style={{ color: "#ff4f4f", fontWeight: "600" }}>Login Here</Link>
        </div>
      )}

      {user && (
        <>
          <div className="row">
            {currentItems.map(item => (
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
                        toast.success(`${item.name} Added To Cart..`, { autoClose: 2500,closeOnClick: true,pauseOnHover: true, draggable: true, progress: undefined,});
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mb-4">
            <button disabled={currentPage === 1} className="btn btn-outline-success mx-2" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            {[...Array(totalPages)].map((_, index) => (
              <button key={index} className={`btn mx-1 ${currentPage === index + 1 ? "btn-success" : "btn-outline-success"}`} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            ))}
            <button disabled={currentPage === totalPages} className="btn btn-outline-success mx-2" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Veg;
