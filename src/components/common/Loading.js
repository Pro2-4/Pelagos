import React from "react";
import { Spinner } from "react-bootstrap";
import "../../styles/components/Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Đang tải...</span>
      </Spinner>
      <p className="loading-text">Đang tải...</p>
    </div>
  );
};

export default React.memo(Loading);
