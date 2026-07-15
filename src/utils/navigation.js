export const isSafeInternalPath = (path) => {
  return typeof path === "string" && path.startsWith("/") && !path.startsWith("//");
};

export const navigateToInternalPath = (path) => {
  if (!isSafeInternalPath(path)) {
    return false;
  }

  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  return true;
};

export const isSafeExternalUrl = (value) => {
  try {
    const parsedUrl = new URL(value, window.location.origin);
    return parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:";
  } catch (error) {
    return false;
  }
};

export const navigateToExternalUrl = (value) => {
  if (!isSafeExternalUrl(value)) {
    return false;
  }

  const link = document.createElement("a");
  link.href = value;
  link.rel = "noopener noreferrer";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return true;
};
