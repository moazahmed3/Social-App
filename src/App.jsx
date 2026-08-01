import AuthContextProvider from "./Context/AuthContext";
import AppRoutes from "./Routing/AppRoutes";

function App() {
  return (
    <>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </>
  );
}

export default App;
