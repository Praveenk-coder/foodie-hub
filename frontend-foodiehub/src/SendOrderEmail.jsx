import emailjs from '@emailjs/browser';

function SendOrderEmail({ cartItems, finalPrice, customerEmail, GST, priceAfterDiscount, totalPrice,discountedPrice }) {
    const sendEmail=() => {

        let templateParams = {
            orders: cartItems.map(item=>({name: item.name, units: item.quantity, price: item.price})),
            order_id:Date.now(),
            total_amount: finalPrice,
            customer_name: "Valued Customer",
            email: ""+customerEmail,
            gst: GST,
            price_after_discount: priceAfterDiscount,
            total_price: totalPrice,
            discount: discountedPrice
        }
        console.log(templateParams);
        emailjs.send('service_0d1czts', 'template_ryxto27', templateParams, 'wY0DtaqFCU5TVFJBM')
          .then((response) => {
             alert('Email Sent successfully...', response.status, response.text);
          })
    }
    return (
        <div className="text-center mt-3">
            <button className="btn btn-success" onClick={sendEmail}>Send Order Summary</button>
        </div>
    );
}
export default SendOrderEmail;