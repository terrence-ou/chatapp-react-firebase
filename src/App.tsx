import { useAppSelector } from "./hooks/reduxHooks";
import Auth from "./components/Auth";
import ChatAppContainer from "./components/ChatAppContainer";

function App() {
  const authUID = useAppSelector((state) => state.messages.authUID);
  return <main>{!authUID ? <Auth /> : <ChatAppContainer />}</main>;
}

export default App;
