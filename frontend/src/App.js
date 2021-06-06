import "./App.css";
import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat component/Chat";
import Pusher from "pusher-js";
import axios from "axios";
function App() {
  const [msg, setmsg] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9000/Messages/all").then((res) => {
      setmsg(res.data);
    });
  }, []);
  console.log(msg);
  useEffect(() => {
    var pusher = new Pusher("<ur pusher id>", {
      cluster: "<ur cluster>",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      setmsg([...msg, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [msg]);
  return (
    <div className="App">
      <div className="green"></div>
      <div className="App__body">
        <Sidebar />
        <Chat messages={msg} />
      </div>
    </div>
  );
}

export default App;
