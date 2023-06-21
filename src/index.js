/* 
    入口js
*/
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import storageUtils from "./utils/storageUtils"
import memoryUtils from "./utils/memoryUtils"

// 读取local中保存的user，保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user

ReactDOM.createRoot(document.getElementById("root")).render(
    <App/>
)

/* 

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />); 
这样写会出现错误（虽然我也不知道为啥）：
Warning: React.jsx: type is invalid -- expected a string (for built-in components) 
or a class/function (for composite components) but got: object.

*/
