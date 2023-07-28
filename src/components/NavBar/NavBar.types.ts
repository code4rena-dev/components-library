import { ReactNode } from "react";

export type Web3ProviderType =
  | "metamask"
  | "walletconnect"
  | "walletConnect"
  | "wc"
  | "magicLink"
  | "web3Auth";

export type ModalProps = {
  title: string | ReactNode;
  body: string | ReactNode;
  type?: string;
  primaryButtonAction?: () => Promise<void>;
  primaryButtonText?: string | ReactNode;
  secondaryButtonAction?: () => Promise<void>;
  secondaryButtonText?: string | ReactNode;
};

type NavigationLink = {
  label: string;
  href: string;
  external?: boolean;
};

export interface NavBarProps {
  /** Boolean determining whether the user is currently logged in or not. */
  isLoggedIn: boolean;
  /** URL to the logged in user's profile image. */
  userImage?: string;
  /** Username associated to the logged in user. */
  username?: string;
  /** A function to handle logout, triggered on clicking the dropdown 'Logout' button. */
  logoutHandler: () => void;
  /** A function to handle login, triggered on clicking the dropdown 'Login' button. */
  loginHandler: (event: React.MouseEvent, provider?: Web3ProviderType) => void;
  /** A function to handle opening a modal in the main application. Provided function should be able to handle `ModalProps` as a parameter. */
  modalHandler: (modalProps: ModalProps) => void;
  /** Boolean determining whether the login/logout dropdown should be visible/hidden. */
  hideConnectWalletDropdown: boolean;
  /** List of links to be rendered in the navigation bar. Array of object type `NavigationLink` which accepts the properties `label: string`, `href: string`, `external: boolean`. */
  navLinks?: NavigationLink[];
  /** String of custom classes to extend the default styling of the component. */
  className?: string;
  /** HTML element identifier */
  id?: string;
}
