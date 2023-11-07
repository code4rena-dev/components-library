import React, { useState } from "react";
import clsx from "clsx";
import signoutIcon from "../../../public/icons/sign-out.svg";
import metamaskIcon from "../../../public/logos/meta-mask-logo.svg";
import walletConnectIcon from "../../../public/logos/wallet-connect-logo.svg";
import c4LogoIcon from "../../../public/logos/c4-logo.svg";
import registerIcon from "../../../public/icons/register.svg";
import { Dropdown } from "../Dropdown/Dropdown";
import { ModalProps, NavBarProps, Web3ProviderType } from "./NavBar.types";
import "./NavBar.scss";
import { Avatar } from "../Avatar";

const UserDropdown = ({
  userImage = "/",
  username = "",
  logoutHandler,
}: {
  userImage?: string;
  username?: string;
  logoutHandler: () => void;
}) => {
  const avatar = () => (
    <Avatar
      imgElement={userImage ? <img src={userImage} alt={username} /> : undefined}
      name={username}
      size={30}
      round={30}
    />
  );

  const children = (
    <div className={"user-dropdown__user-dropdown-list"}>
      <a href={`/@${username}`} className="c4dropdown--button">
        <span>My Profile</span>
      </a>
      <a href="/account" className="c4dropdown--button">
        Manage Account
      </a>
      <button
        type="button"
        onClick={logoutHandler}
        className="c4dropdown--button"
      >
        <img
          src={signoutIcon}
          alt="Logout icon"
          style={{ transform: "rotateY(180deg)" }}
          width={20}
          height={20}
        />
        Logout
      </button>
    </div>
  );

  return (
    <>
      <Dropdown
        wrapperClass="nav--dropdown--user"
        triggerButtonClass="nav--dropdown--user--trigger"
        triggerButton={avatar()}
        openOnHover={true}
        hideDownArrow={false}
      >
        {children}
      </Dropdown>
      <div className="nav--user--mobile">{children}</div>
    </>
  );
};

const Login = ({
  modalHandler,
  loginHandler,
}: {
  modalHandler: (modalProps: ModalProps) => void;
  loginHandler: (event: React.MouseEvent, provider?: Web3ProviderType) => void;
}) => {
  const openLoginModal = (e: React.MouseEvent) => {
    e.preventDefault();
    modalHandler({ title: "Log in", body: "", type: "login" });
  };

  const children = (
    <>
      <button
        type="button"
        aria-label="Login with MetaMask"
        onClick={(e) => loginHandler(e, "metamask")}
        className="c4dropdown--button"
      >
        <img
          src={metamaskIcon}
          alt="logout icon"
          className={"login__icon"}
          width={20}
          height={20}
        />
        MetaMask
      </button>
      <button
        type="button"
        aria-label="Login with WalletConnect"
        onClick={(e) => loginHandler(e, "walletConnect")}
        className="c4dropdown--button"
      >
        <img
          src={walletConnectIcon}
          alt="logout icon"
          className={"login__icon"}
          width={20}
          height={20}
        />
        WalletConnect
      </button>
      <button
        className="c4dropdown--button"
        aria-label="Email login"
        type="button"
        onClick={openLoginModal}
      >
        <img src={signoutIcon} alt="login icon" width={20} height={20} />
        Log in
      </button>
      <a
        aria-label="Create an account"
        href="/register"
        className="c4dropdown--button"
      >
        <img src={registerIcon} alt="register icon" width={20} height={20} />
        Register
      </a>
    </>
  );

  return (
    <>
      {/* Desktop View */}
      <Dropdown
        wrapperClass="nav--dropdown--login"
        triggerButtonClass="nav--dropdown--login--trigger"
        triggerButton="Connect"
        hideDownArrow={false}
        openOnHover={true}
      >
        {children}
      </Dropdown>
      {/* Mobile view */}
      <div className="nav--login--mobile">{children}</div>
    </>
  );
};

/**
 * A responsive navigation bar with support for multiple navigation links (`navLinks`) and default login/logout states.
 *
 * @param isLoggedIn - Boolean determining whether the user is currently logged in or not.
 * @param userImage - URL to the logged in user's profile image.
 * @param username - Username associated to the logged in user.
 * @param logoutHandler - A function to handle logout, triggered on clicking the dropdown 'Logout' button.
 * @param loginHandler - A function to handle login, triggered on clicking the dropdown 'Login' button.
 * @param modalHandler - A function to handle opening a modal in the main application. Provided function should be able to handle `ModalProps` as a parameter.
 * @param hideConnectWalletDropdown - Boolean determining whether the login/logout dropdown should be visible/hidden.
 * @param navLinks - List of links to be rendered in the navigation bar. Array of object type `NavigationLink` which accepts the properties `label: string`, `href: string`, `external: boolean`.
 */
export const NavBar: React.FC<NavBarProps> = ({
  id,
  className,
  isLoggedIn,
  userImage,
  username,
  hideConnectWalletDropdown,
  logoutHandler,
  loginHandler,
  modalHandler,
  navLinks,
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const hideMobileNav = () => {
    setMobileNavOpen(false);
  };

  return (
    <>
      <header
        id={id ? id : undefined}
        className={clsx(className && className, "nav--wrapper")}
      >
        <a className="visually-hidden focusable" href="#skip-to-main">
          Skip navigation
        </a>
        <nav role="navigation" className={clsx(mobileNavOpen && "open")}>
          <a aria-label="Navigate to home" className="logo" href="/">
            <img
              style={{
                objectFit: "cover",
                minWidth: "143px",
                minHeight: "28px",
              }}
              alt="Code4rena Logo"
              src={c4LogoIcon}
              width={143}
              height={28}
              loading="lazy"
            />
          </a>
          <button
            className="menu--hamburger"
            onClick={() => setMobileNavOpen((isOpen: boolean) => !isOpen)}
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileNavOpen}
          >
            <svg
              height="22"
              viewBox="0 0 22 22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#d8d8d8" fillRule="evenodd">
                <rect className="top-bun" height="2" rx="1.5" width="22" />
                <rect className="patty" height="2" rx="1.5" width="22" y="9" />
                <rect
                  className="bottom-bun"
                  height="2"
                  rx="1.5"
                  width="22"
                  y="18"
                />
              </g>
            </svg>
          </button>
          <div className="nav--links">
            {navLinks?.map((link) => {
              return (
                <a
                  key={`nav_link_${link.label}`}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer noopener" : undefined}
                  aria-label={
                    link.external
                      ? `${link.label} (opens in new window)`
                      : link.label
                  }
                  onClick={hideMobileNav}
                >
                  {link.label}
                </a>
              );
            })}
            {loginHandler && logoutHandler && modalHandler && (
              <div className="nav--buttons">
                {!hideConnectWalletDropdown &&
                  (isLoggedIn ? (
                    <UserDropdown
                      userImage={userImage}
                      username={username}
                      logoutHandler={logoutHandler}
                    />
                  ) : (
                    <Login
                      loginHandler={loginHandler}
                      modalHandler={modalHandler}
                    />
                  ))}
              </div>
            )}
          </div>
        </nav>
      </header>
      <span id="skip-to-main" />
    </>
  );
};

NavBar.defaultProps = {
  isLoggedIn: false,
  hideConnectWalletDropdown: false,
  navLinks: [],
  username: undefined,
  userImage: "/",
};
