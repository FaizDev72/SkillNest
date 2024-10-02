import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { paymentsEndpoints } from "../apis";
import { resetCart } from "../../components/redux/slice/cartSlice";
import isProduction from "../../utils/logger";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src

        script.onload = () => {
            resolve(true);
        }

        script.onerror = () => {
            resolve(false);
        }

        document.body.appendChild(script)
    })

}

export const buyCourse = async (courses, token, user, dispatch, navigate) => {
    const toast_id = toast.loading("Loading")
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if (!res) {
            toast.error(
                "Razorpay SDK failed to load. Check your Internet Connection."
            )
            return
        }
        const orderResponse = await apiConnector("POST", paymentsEndpoints.CAPTUREPAYMENT_API, { courses, }, { Authorization: `Bearer ${token}` })

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message)
        }

        // open razarpay sdk
        const options = {
            key: process.env.RARAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: orderResponse.data.data.amount,
            order_id: orderResponse.data.data.id,
            name: "SkillNest",
            description: "Thank you for Purchasing the Course",
            image: rzpLogo,
            prefill: {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
            },
            handler: function (response) {
                paymentSuccessEmail(response, orderResponse.data.data.amount, token)
                verifySignture({ ...response, courses }, token, navigate, dispatch)
            },
        }

        const paymentObject = new window.Razorpay(options)

        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops! Payment Failed.")
            if (!isProduction()) {
            console.log(response.error)}
        })

    } catch (error) {
        if (!isProduction()) {
        console.log("PAYMENT API ERROR............", error)}
        toast.error("Could Not make Payment.")
    }
    toast.dismiss(toast_id)
}

// Verify Payment   
async function verifySignture(bodyData, token, navigate, dispatch) {
    const toast_id = toast.loading("Loading")
    try {
        const response = await apiConnector("POST", paymentsEndpoints.VERIFYSIGNATURE_API, { bodyData, }, { Authorization: `Bearer ${token}` })

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Payment Successful. You are Added to the course ")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart())
    } catch (error) {
        if (!isProduction()) {
        console.log("PAYMENT VERIFY ERROR............", error)}
        toast.error("Could Not Verify Payment.")
    }
    toast.dismiss(toast_id)
}

// Send Payment Success Email
async function paymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", paymentsEndpoints.PAYMENTSUCCESSEMAIL_API, {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            amount,
        }, { Authorization: `Bearer ${token}` })
    } catch (error) {
        if (!isProduction()) {
        console.log("PAYMENT SUCCESS EMAIL ERROR............", error)}
    }
}
