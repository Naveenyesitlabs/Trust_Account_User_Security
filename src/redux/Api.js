import axios from 'axios';
import { clearAuthSession } from '../utils/authStorage';

export const baseURL = import.meta.env.VITE_BACKEND_URL;

const API = axios.create({
  baseURL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 401 || status === 403 || message === "Invalid token.") {
      clearAuthSession();
      window.dispatchEvent(new Event("auth-expired"));
    }

    return Promise.reject(error);
  }
);

export const userInfo = () => API.get("/protected");
export const signup = (formData) => API.post("/signup", formData);
export const login = (formData) => API.post("/login", formData);
export const logout = (id) => API.post('/logout', id);
export const forgotPassword = (formData) => API.post('/forgot-password', formData);
export const verifyOtp = (formData) => API.post(`/verify-otp`, formData);
export const loginVerifyOtp = (formData) => API.post(`/verify-otp-login`, formData);
export const resetPassword = (formData) => API.post(`/reset-password`, formData);
export const getUser = (formData) => API.post(`/my-profile-get`, formData);
export const deleteUser = (userid) => API.delete(`/delete-account`, userid);
export const getProfile = () => API.get(`/get-profile`);
export const updateUser = (formData) => API.put(`/update-profile`, formData);
export const fetchNotifaction = () => API.get(`/user/get-notification`);
export const markAsRead = (formData) => API.put(`/admin/mark-notification-as-read`, formData);
export const userPermissionCheck = () => API.get(`/check-user-permission-update`);
export const uploadBankStatement = (formData) => API.post(`/user/bank-statement/upload`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});
export const getBankStatements = () => API.get(`/user/bank-statement`);
export const uploadTrustDocument = (formData) => API.post(`/user/client-trust-entry/upload`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});
export const getTrustDocuments = () => API.get(`/user/client-trust-entry`);
export const getAllBankList = () => API.get(`/user/get-all-banks`);
export const getJournals = (formData) => API.post(`/admin/get-journal-entries`, formData);
export const addJournalEntry = (formData) => API.post(`/admin/add-journal-entry`, formData);
export const updateJournalEntry = (id, formData) => API.put(`/admin/update-journal-entry/${id}`, formData);
export const getClientDropdown = () => API.get(`/user/all-ledger-client`);
export const getClient = () => API.get(`/user/all-clients`);
export const getClientList = () => API.get(`/user/ledger-client-list`);
export const getClientLedger = (formData) => API.post(`/user/individual-ledgers`, formData);
export const createClient = (formData) => API.post(`/user/create-client`, formData);
export const fetchClients = () => API.get(`/user/get-all-clients`);
export const getLedgerClientList = () => API.get(`/admin/get-ledger-clients`);
export const createMatter = (formData) => API.post(`/user/add-lien`, formData);
export const fetchAllMatterByClientId = (formData) => API.get(`/user/get-matter-by-client/${formData}`);
export const getOutstandingDeposits = () => API.get(`/user/outstanding-deposits`);
export const getOutstandingDisbursement = () => API.get(`/user/outstanding-disbursement`);
export const getClientName = () => API.get(`/user/all-ledger-client`);
export const getLedgerSummary = (formData) => API.post(`/user/client-ledger-summary`, formData);
export const getAllFirmName = () => API.get(`/admin/get-firms`);
export const getAllBankName = () => API.get(`/user/get-all-banks`);
export const getAllReconciliationData = (formData) => API.post(`/user/genrate-reconciliation`, formData);
export const saveReasonForDiscard = (formData) => API.post(`/user/save-discard-reason`, formData);
export const confirmReconciliation = (formData) => API.post(`/user/save-reconcile-confirmation`, formData);
export const getReconcilitationReasons = (formData) => API.post(`/user/get-discard-reason`, formData);
export const allBankFirm = () => API.get(`/user/get-bank-ledger-firms`);
export const getAllBankLedgersData = (formData) => API.post(`/user/get-all-bank-ledger`, formData);
export const getAllLien = () => API.get(`/user/get-lien`);
export const addNotes = ({ liensId, formData }) => API.put(`/user/add-lien-notes/${liensId}`, formData);
export const resolveLienStatus = ({ resolveId, formData }) => API.put(`/user/update-lien-status/${resolveId}`, formData);
export const getAllModule = () => API.get(`/user/get-report-modules`);
export const getAllMonthRepots = (formData) => API.post(`/user/get-reports`, formData);
export const LienTransactionById = ({ lien_id }) => API.get(`/user/get-lien-transaction/${lien_id}`);
export const addNewLienTransaction = (formData) => API.post(`/user/add-lien-transaction`, formData);
export const getAllsubscriptionPlan = () => API.get(`/user/get-subscriptions`);
export const addNewPlan = (formData) => API.post(`/user/init-subscription-payment`, formData);
export const isSubscribed = () => API.get(`/user/check-user-subscription`);
export const getAllCases = () => API.get(`/user/case`);
export const addNewCase = (formData) => API.post(`/user/case/create`, formData);
export const getClientsByCaseId = (case_id) => API.get(`/user/case/clients/${case_id}`);
