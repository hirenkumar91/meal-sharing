export const getApiUrl = (endpoint: string) => {
  if (typeof window !== "undefined") {
    const isGitHubCodespaces =
      window.location.hostname.includes("github.dev") ||
      window.location.hostname.includes("github.com");

    const baseUrl = isGitHubCodespaces
      ? `https://${window.location.hostname.split(":")[0]}:3001`
      : process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

    const fullUrl = `${baseUrl}/${endpoint.replace(/^\/+/, "")}`;

    return fullUrl;
  }

  return "http://localhost:3001";
};