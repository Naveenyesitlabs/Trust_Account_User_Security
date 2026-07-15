import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import FullPageLoader from '../components/user/FullPageLoader';
import { useDispatch } from "react-redux";
import { checkUserPermission } from '../redux/slices/userSlice';

const isSafeInternalPath = (path) => typeof path === 'string' && path.startsWith('/') && !path.startsWith('//');

const getFirstAccessiblePath = (permissionsList) => {
  const firstAccessible = permissionsList.find(
    (item) => (item?.has_read_permission === 1 || item?.has_read_permission === '1') && isSafeInternalPath(item?.url)
  );

  return firstAccessible?.url || null;
};

const RequireReadPermission = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(checkUserPermission());
  }, [location.pathname, dispatch]);

  const permissionsList = useMemo(
    () => JSON.parse(localStorage.getItem('menuPermissions') || '[]'),
    [location.pathname]
  );

  useEffect(() => {
    const matched = permissionsList.find((item) => item.url === location.pathname);

    if (matched?.has_read_permission === '1' || matched?.has_read_permission === 1) {
      localStorage.setItem('last-allowed-url', location.pathname);
      setAllowed(true);
    } else {
      const moduleName = matched?.name || 'This module';
      toast.error(`You don't have access to ${moduleName}.`);
      setAllowed(false);
    }

    setLoading(false);
  }, [location.pathname, permissionsList]);

  if (loading) return <FullPageLoader />;

  if (!allowed) {
    const lastPath = localStorage.getItem('last-allowed-url');
    const safeLastPath = isSafeInternalPath(lastPath) ? lastPath : null;
    const matchedLastPath = permissionsList.find((item) => item.url === safeLastPath);

    if (matchedLastPath?.has_read_permission === '1' || matchedLastPath?.has_read_permission === 1) {
      return <Navigate to={safeLastPath} replace />;
    }

    const fallbackPath = getFirstAccessiblePath(permissionsList);
    if (fallbackPath) {
      return <Navigate to={fallbackPath} replace />;
    }

    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireReadPermission;
