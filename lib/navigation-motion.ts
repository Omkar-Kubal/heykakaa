export type NavigationClick = {
  href: string | null;
  currentHref: string;
  target: string | null;
  hasDownload: boolean;
  button: number;
  defaultPrevented: boolean;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
};

export function shouldStartNavigationTransition(click: NavigationClick): boolean {
  if (
    !click.href ||
    click.defaultPrevented ||
    click.hasDownload ||
    click.button !== 0 ||
    click.metaKey ||
    click.ctrlKey ||
    click.shiftKey ||
    click.altKey ||
    (click.target && click.target.toLowerCase() !== "_self")
  ) {
    return false;
  }

  try {
    const current = new URL(click.currentHref);
    const destination = new URL(click.href, current);

    if (destination.origin !== current.origin) return false;
    if (destination.pathname === current.pathname) return false;

    return true;
  } catch {
    return false;
  }
}
