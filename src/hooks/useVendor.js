import { useEffect, useState } from "react";
import { subscribeToVendor, subscribeToMenu } from "../services/vendors.js";

// Listens for updates to one vendor and its menu.
export function useVendor(vendorId) {
  const [vendor, setVendor] = useState(undefined);
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vendorId) return;

    const stopVendor = subscribeToVendor(vendorId, setVendor, (err) =>
      setError(err.message),
    );
    const stopMenu = subscribeToMenu(vendorId, setMenu, (err) =>
      setError(err.message),
    );

    // Stop both Firestore listeners when the vendor changes or the page unmounts.
    return () => {
      stopVendor();
      stopMenu();
    };
  }, [vendorId]);

  return {
    vendor,
    menu,
    loading: vendor === undefined && !error,
    error,
  };
}
