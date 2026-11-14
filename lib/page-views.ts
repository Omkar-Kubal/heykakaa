export function createPageViewTracker<TAnalytics>(
  initialize: () => Promise<TAnalytics | null>,
  logPageView: (analytics: TAnalytics, pathname: string) => void,
  onError: (error: unknown) => void = () => {},
): (pathname: string) => Promise<void> {
  let lastTrackedPath: string | null = null;

  return async (pathname) => {
    if (!pathname || pathname === lastTrackedPath) return;
    lastTrackedPath = pathname;

    try {
      const analytics = await initialize();
      if (analytics) logPageView(analytics, pathname);
    } catch (error) {
      onError(error);
    }
  };
}
