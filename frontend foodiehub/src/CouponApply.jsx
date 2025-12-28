import { useState } from "react";
import { useDispatch } from "react-redux";
import { applyCoupon } from "./store";

const CouponApply =  () => 
    {const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const HandleApply = () => {
        dispatch(applyCoupon({ code: input }));
    };


    


    return (
        <>
        
            <input
                type="text"
                placeholder="Enter Coupon Code"
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
            />
            <button className="btn btn-primary mx-2" onClick={() => HandleApply()}>
                Apply
            </button>
        </>
    );
}

export default CouponApply;
