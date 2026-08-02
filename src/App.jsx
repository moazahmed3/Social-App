import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./Context/AuthContext";
import AppRoutes from "./Routing/AppRoutes";
import { ReactQueryDevtools } from "./../node_modules/@tanstack/react-query-devtools/src/index";
import { Bounce, ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <AppRoutes />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="light"
            transition={Bounce}
          />
          <ReactQueryDevtools />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
