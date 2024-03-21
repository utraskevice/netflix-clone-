import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./Auth";
import { ContentProvider } from "./Content";

function MainProvider({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>{children}</ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default MainProvider;
