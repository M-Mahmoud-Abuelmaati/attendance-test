import Routes from "./Routes";
import UserProvider from "./contexts/user";

function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}

export default App;
