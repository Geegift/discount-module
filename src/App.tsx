
import "./App.css";
import { Breadcrumb } from "antd";
import Order from "./pages/Order.tsx/Order";

function App() {
    return (
        <div className="App">
            <Breadcrumb
                items={[
                    {
                        title: <a href="/product">Product</a>,
                    },
                    {
                        title: <a href="/order">Order</a>,
                    },
                ]}
            />
        </div>
    );
}

export default App;
