/**
 * Created by chalosalvador on 2/5/20
 */
import React, { useEffect } from "react";
import api from "../data";
import { message } from "antd";
import { translateMessage } from "../utils/translateMessage";
import ErrorList from "../components/ErrorList";

/**
 * Context está diseñado para compartir datos que pueden
 * considerarse “globales” para un árbol de componentes en React
 * Este contexto sirve para pasar la información de la sesión del usuario
 *
 * https://es.reactjs.org/docs/context.html
 *
 * @type {React.Context<{setAuthenticated: setAuthenticated, isAuthenticated: boolean}>}
 */
const AuthContext = React.createContext({
  isAuthenticated: false,
  setAuthenticated: () => {},
});

/**
 * El provider del contexto expone las siguientes variables que pueden ser usadas
 * por los componentes que consumen este contexto
 *
 *  - isAuthenticated,
 *  - isCheckingAuth,
 *  - setAuthenticated,
 *  - currentUser,
 *  - setCurrentUser
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState(null);

  const handleUser = (user) => {
    if (user) {
      setCurrentUser(user);
      setAuthenticated(true);
      setIsCheckingAuth(false);
      return user;
    } else {
      setCurrentUser(false);
      setAuthenticated(false);
      setIsCheckingAuth(false);
      return false;
    }
  };

  // async function register(data) {
  //   try {
  //     const response = await api.post("/register", data);
  //     console.log("rersponse", response);
  //     handleUser(response.data);
  //     return response;
  //   } catch (error) {
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       // that falls out of the range of 2xx
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //       return Promise.reject(error.response);
  //       // return error.response;
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //       // http.ClientRequest in node.js
  //       console.log(error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.log("Error", error.message);
  //     }
  //     console.log(error.config);
  //   }
  // }

  async function login(data) {
    try {
      const response = await api.post("/login", data);
      localStorage.setItem("login", JSON.stringify(true)); // this is to sync auth state in local storage
      handleUser(response.data.user);
      return response;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        const errorList = error.error && <ErrorList errors={error.error} />;
        message.error(
          <>
            {translateMessage(error.message)}
            {errorList}
          </>
        );
      }
      console.log(error.config);
    }
  }

  async function logout() {
    try {
      const response = await api.post("/logout");
      handleUser(null);
      localStorage.removeItem("login");

      return response;
    } catch (error) {}
  }

  const sendPasswordResetEmail = async (email) => {
    // try {
    await api.post("/forgot-password", { email });
    // } catch (error) {
    //   if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    //     return error.response;
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //     // http.ClientRequest in node.js
    //     console.log(error.request);
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.log("Error", error.message);
    //   }
    //   console.log(error.config);
    // }
  };

  const confirmPasswordReset = async (
    email,
    password,
    password_confirmation,
    token
  ) => {
    // try {
    await api.post("/reset-password", {
      email,
      password,
      password_confirmation,
      token,
    });
    // } catch (error) {
    //   if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    //     return error.response;
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //     // http.ClientRequest in node.js
    //     console.log(error.request);
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.log("Error", error.message);
    //   }
    //   console.log(error.config);
    // }
  };

  /**
   * Este efecto se lanza cuando se monta el contexto y
   * determina si existe una sesión activa en el navegador
   * También añade el evento storage para mantener sincronizadas
   * las sesiones en las diferentes ventanas que tengan abierta la sesión
   */
  useEffect(() => {
    window.addEventListener("storage", syncLogout);
    console.log("added storage event");

    async function getAuthenticatedUser() {
      try {
        const response = await api.get("/user");
        console.log("response user", response);
        handleUser(response.data);
        return response;
      } catch (error) {
        handleUser(false);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          return error.response;
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    }
    getAuthenticatedUser();

    return () => {
      console.log("remove storage event");

      window.removeEventListener("storage", syncLogout);
    };
  }, [isAuthenticated]);

  /**
   * Esta es la función que se lanza en otras ventanas
   * que tienen abierto el sistema para mantener
   * sincronizada la sesión del usuario.
   *
   * @param event
   */
  const syncLogout = (event) => {
    console.log("event", event);

    // if( event.key === 'login' ) {
    // if( event.newValue === 'true' ) {
    //   console.log( 'login from storage!' );
    //   // const token = Cookies.get( 'token' ); // check if the token exists
    //   setAuthenticated( true );
    window.location.reload();
    // }
    // else {
    //   console.log( 'logged out from storage!' );
    //   // Cookies.remove( 'token' );
    //   setCurrentUser( null );
    //   setAuthenticated( false );
    // }
    // }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isCheckingAuth,
        setAuthenticated,
        currentUser,
        setCurrentUser,
        login,
        // register,
        logout,
        sendPasswordResetEmail,
        confirmPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Este es un hook personalizado que nos permite acceder a la información
 * de la autenticación en cualquier componente del sistema.
 *
 * @returns {{setAuthenticated: setAuthenticated, isAuthenticated: boolean}}
 */
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
