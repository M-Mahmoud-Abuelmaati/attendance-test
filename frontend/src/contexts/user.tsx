import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IUser, IUserContext, UserGroup } from "../types";
import { apis, axiosInstance } from "../services";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const UserContext = createContext<Partial<IUserContext>>({});

interface UserProviderProps extends PropsWithChildren {}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<Partial<IUser> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getUser = useCallback(() => {
    const token = _getToken();
    setLoading(true);
    if (token) {
      const { _id, group, name } = jwtDecode(token) as {
        _id: string;
        name: string;
        group: UserGroup;
      };
      setUser({ _id, group, name });
      _setToken(token);
    } else {
      _removeToken();
    }
    setLoading(false);
  }, []);

  const signIn = useCallback(
    async (payload: { email: string; password: string }) => {
      try {
        setLoading(true);
        const response = await axiosInstance.post(apis.login, payload);
        _setToken(response.data?.accessToken);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const _getToken = () => Cookies.get("token");
  const _setToken = (token: string) => {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    Cookies.set("token", token);
  };
  const _removeToken = () => {
    delete axiosInstance.defaults.headers.common.Authorization;
    Cookies.remove("token");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated: useMemo(() => !!_getToken(), [_getToken]),
        user,
        loading,
        signIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): Partial<IUserContext> => useContext(UserContext);

export default UserProvider;
