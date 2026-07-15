import getSymbolFromCurrency from 'currency-symbol-map';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../contexts/AuthContext';
import { getingAllPlans, subscribePlan } from '../../../redux/slices/subscriptionPlanSlice';
import { getStoredSession } from '../../../utils/authStorage';
import { navigateToExternalUrl } from '../../../utils/navigation';

const SubscriptionPlan = () => {
    const { isSidebarOpen } = useAuth();
    const dispatch = useDispatch();
    const { allPlans } = useSelector((state) => state.subscriptionPlan);
    const [activePlan, setActivePlan] = useState('');
    const [userData, setUserData] = useState({});
    const [user_id, setUser_id] = useState('');
    const [superAdminPlan, setSuperAdminPlan] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const session = getStoredSession();
        if (!session?.userid) {
            navigate('/login');
        }
    }, [navigate]);

    const handleBuySubscription = async (plan_id) => {
        const formData = {
            plan_id,
            user_id
        };
        const result = await dispatch(subscribePlan(formData));
        const url = result?.payload?.data?.checkoutUrl;

        if (url && navigateToExternalUrl(url)) {
            return;
        }

        toast.error('Checkout URL not found or invalid.');
    };

    useEffect(() => {
        setActivePlan(localStorage.getItem('trust-account-subscription-plan'));
        const isSubscribedData = JSON.parse(localStorage.getItem('isSubscribed'));

        if (isSubscribedData) {
            setActivePlan(isSubscribedData?.plan_id);
        }

        setUserData(getStoredSession());
        dispatch(getingAllPlans());
    }, [dispatch]);

    useEffect(() => {
        setUser_id(userData?.userid);
        setSuperAdminPlan(userData?.super_admin_selected_plan);
    }, [userData]);

    const formatedFitchur = (rawFeatures) => {
        if (!rawFeatures) return [];
        try {
            const cleaned = rawFeatures.replace(/'/g, '"');
            const parsed = JSON.parse(cleaned);
            return Array.isArray(parsed) ? [...new Set(parsed)] : [];
        } catch (error) {
            console.error('Invalid features format:', error);
            return [];
        }
    };

    return (
        <>
            <div className={`dashboard-body-wrp subscription-plan ${isSidebarOpen ? "active" : ""}`}>
                <div className="dashboard-body">
                    <div className="plans-inr">
                        <div className="sec-head">
                            <h2>Subscription Plan</h2>
                        </div>
                        <div className="plans-inr-wrp">
                            <div className="plans-wrp row">
                                {allPlans?.length > 0 &&
                                    allPlans.map((plan, index) => {
                                        return (
                                            superAdminPlan != null ? (
                                                <div key={index} className={`plan-item ${plan?.is_featured == 1 ? "popular" : ""} ${superAdminPlan == plan.id ? "" : 'using'} `}>
                                                    {plan?.is_featured == 1 && <div className="popularity">Most popular</div>}
                                                    <div className="plan-item-inr">
                                                        <div className="plan-item-head">
                                                            <p>{plan?.name}</p>
                                                            <h3 className="price">
                                                                {getSymbolFromCurrency(plan.currency)}{plan?.price}
                                                                <span> /{plan?.duration}</span>
                                                            </h3>
                                                        </div>
                                                        <div className="plan-item-content">
                                                            <ul>
                                                                {formatedFitchur(plan.features).map((feature, fIndex) => (
                                                                    <li key={fIndex}>
                                                                        <img src="/images/check-icon.svg" alt="check-icon" />
                                                                        {feature}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div
                                                            className="plan-item-btn"
                                                            onClick={superAdminPlan == plan.id ? () => handleBuySubscription(plan?.id) : undefined}
                                                        >
                                                            <a href="#" className="blue-btn" style={{
                                                                fontSize: superAdminPlan == plan.id ? "inherite" : "14px"
                                                            }}>{superAdminPlan == plan.id ? "Buy now" : " Admin not assigned "}</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                activePlan ? (
                                                    <div key={index} className={`plan-item ${plan?.is_featured == 1 ? "popular" : ""} ${activePlan == plan.id ? "using" : ''} `}>
                                                        {plan?.is_featured == 1 && <div className="popularity">Most popular</div>}
                                                        <div className="plan-item-inr">
                                                            <div className="plan-item-head">
                                                                <p>{plan?.name}</p>
                                                                <h3 className="price">
                                                                    {getSymbolFromCurrency(plan.currency)}{plan?.price}
                                                                    <span> /{plan?.duration}</span>
                                                                </h3>
                                                            </div>
                                                            <div className="plan-item-content">
                                                                <ul>
                                                                    {formatedFitchur(plan.features).map((feature, fIndex) => (
                                                                        <li key={fIndex}>
                                                                            <img src="/images/check-icon.svg" alt="check-icon" />
                                                                            {feature}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <div
                                                                className="plan-item-btn"
                                                                onClick={activePlan == plan.id ? undefined : () => handleBuySubscription(plan?.id)}
                                                            >
                                                                <a href="#" className="blue-btn">{activePlan == plan.id ? "Already using" : "Buy now"}</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div key={index} className={`plan-item ${plan?.is_featured == 1 ? "popular" : ""} `}>
                                                        {plan?.is_featured == 1 && <div className="popularity">Most popular</div>}
                                                        <div className="plan-item-inr">
                                                            <div className="plan-item-head">
                                                                <p>{plan?.name}</p>
                                                                <h3 className="price">
                                                                    {getSymbolFromCurrency(plan.currency)}{plan?.price}
                                                                    <span> /{plan?.duration}</span>
                                                                </h3>
                                                            </div>
                                                            <div className="plan-item-content">
                                                                <ul>
                                                                    {formatedFitchur(plan.features).map((feature, fIndex) => (
                                                                        <li key={fIndex}>
                                                                            <img src="/images/check-icon.svg" alt="check-icon" />
                                                                            {feature}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <div
                                                                className="plan-item-btn"
                                                                onClick={() => handleBuySubscription(plan?.id)}
                                                            >
                                                                <a href="#" className="blue-btn">{"Buy now"}</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default SubscriptionPlan;
