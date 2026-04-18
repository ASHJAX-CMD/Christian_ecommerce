let razorpayPromise = null;

export const loadRazorpay = () => {
  // if already loading/loaded → reuse same promise
  if (razorpayPromise) return razorpayPromise;

  razorpayPromise = new Promise((resolve) => {
    // already available
    if (window.Razorpay) {
      return resolve(true);
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      razorpayPromise = null; // allow retry
      resolve(false);
    };

    document.body.appendChild(script);
  });

  return razorpayPromise;
};