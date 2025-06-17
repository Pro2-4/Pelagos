import React from "react";
import { Container, Alert, Button } from "react-bootstrap";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by boundary:", error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container className="py-5 text-center">
          <Alert variant="danger">
            <Alert.Heading>Đã xảy ra lỗi!</Alert.Heading>
            <p>Rất tiếc, đã có lỗi xảy ra. Vui lòng thử tải lại trang.</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={this.handleReload} variant="outline-danger">
                Tải lại trang
              </Button>
            </div>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
