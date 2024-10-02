const URL_API = process.env.NEXT_PUBLIC_API_URL;
export default function PaymentPage() {
  const handleCheckout = async () => {
    const response = await fetch(
      `${URL_API}/payments/stripe/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: "price_1PxepLG7LObgRzJ9FJDUYGxW", // Aquí debes pasar el ID del precio
        }),
      }
    );

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url; // Redirige al usuario a la página de pago de Stripe
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="p-2 rounded-lg bg-detail text-white"
    >
      Ir a Checkout
    </button>
  );
}
