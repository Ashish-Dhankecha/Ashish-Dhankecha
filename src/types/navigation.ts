export interface NavItem {
  title: string;
  href: string;
  index?: string;
  description?: string;
  disabled?: boolean;
  external?: boolean;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}
