import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [products, setProducts] = useState([]); // Initial empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state for fetch
  const [error, setError] = useState(null); // Error handling state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset previous errors
      try {
        const response = await axios.get(`http://localhost:3000/api/products?page=${currentPage}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        // Assuming the API response looks like: { data: [...] }
        const { data, page, page_size, total_count } = response.data;

        // Make sure the data is an array and set state correctly
        if (Array.isArray(data)) {
          setProducts(data);
          // Calculate totalPages based on page_size and total_count
          setTotalPages(Math.ceil(total_count / page_size));
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError('Error fetching products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, [currentPage]); // Re-run when currentPage changes

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProducts(products.filter(product => product.id !== id)); // Remove deleted product from the state
    } catch (error) {
      alert('Error deleting product');
    }
  };

  if (loading) {
    return <div className="alert alert-info">Loading products...</div>; // Loading message while data is being fetched
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product Dashboard</h2>
      <Link to="/product/create" className="btn btn-primary mb-4">Create New Product</Link>

      {error && <div className="alert alert-danger">{error}</div>} {/* Display error message if any */}

      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card">
                <img src={product.imageUrl} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.brandname}</p>
                  <p className="card-text"><strong>${product.price}</strong></p>
                  <Link to={`/product/edit/${product.id}`} className="btn btn-warning btn-sm mr-2">Edit</Link>
                  <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>

      <div className="d-flex justify-content-between mt-4">
        {/* Pagination controls */}
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)} className="btn btn-secondary">Previous</button>
        )}
        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)} className="btn btn-secondary">Next</button>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
