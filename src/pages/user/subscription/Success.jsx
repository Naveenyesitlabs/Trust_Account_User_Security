import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newSubscription } from "../../../redux/slices/subscriptionPlanSlice";
import { clearAuthSession, getStoredSession, storeAuthSession } from "../../../utils/authStorage";
import { isSafeInternalPath } from "../../../utils/navigation";
import "./PaymentStatus.css";

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subscriptionData } = useSelector((state) => state.subscriptionPlan);

  useEffect(() => {
    dispatch(newSubscription());
  }, [dispatch]);

  const userData = getStoredSession();

  if (userData) {
    userData.super_admin_selected_plan = "";
    storeAuthSession(userData);
  }

  useEffect(() => {
    if (subscriptionData) {
      localStorage.setItem("isSubscribed", JSON.stringify(subscriptionData));
    }
  }, [subscriptionData]);

  const handleRedirectUrl = (event) => {
    event.preventDefault();

    const permissionsList = JSON.parse(localStorage.getItem("menuPermissions") || "[]");
    const firstAccessible = permissionsList.find(
      (item) => item?.has_read_permission === 1 || item?.has_read_permission === "1"
    );

    if (isSafeInternalPath(firstAccessible?.url)) {
      navigate(firstAccessible.url, { replace: true });
      return;
    }

    clearAuthSession();
    navigate("/login", { replace: true });
  };

  return (
    <div className="payment-status-page payment-success">
      <div className="payment-status-card">
        <div className="payment-icon">✅</div>
        <h2 className="payment-title">Payment Successful</h2>
        <p className="payment-message">
          Thank you! Your subscription has been activated. A confirmation email
          has been sent to you.
        </p>
        <a onClick={handleRedirectUrl} href="#" className="payment-btn">
          Go to dashboard
        </a>
      </div>
    </div>
  );
};

export default Success;
