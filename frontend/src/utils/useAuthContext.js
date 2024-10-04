const AuthenticatedRoute = ({ element }) => {
    const { token } = useAuth();
  
    if (token) {
      return element;
    } else {
      return <Navigate to="/login" />;
    }
  };
  