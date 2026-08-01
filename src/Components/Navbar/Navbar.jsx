import { Link } from "react-router-dom";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function NavbarApp() {
  const { token, user, logout } = useContext(AuthContext);

  return (
    <Navbar className="bg-light shadow-lg ">
      <div className="container flex items-center justify-between">
        <NavbarBrand as={Link} to={"/"}>
          <img
            src="/favicon.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Orbit Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Orbit
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              user?.photo ? (
                <Avatar
                  className="cursor-pointer"
                  alt="User settings"
                  img={user.photo}
                  rounded
                />
              ) : (
                <Avatar
                  className="cursor-pointer"
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              )
            }
          >
            {token && (
              <DropdownHeader>
                <span className="block text-sm">
                  {user?.name || "Mohmed Abodull"}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user?.email || "Example@gmail.com"}
                </span>
              </DropdownHeader>
            )}

            {token ? (
              <>
                {" "}
                <DropdownItem as={Link} to={"/myProfile"}>
                  MyProfile
                </DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownDivider />
                <DropdownItem onClick={logout}>Sign out</DropdownItem>{" "}
              </>
            ) : (
              <>
                <DropdownItem as={Link} to={"/Login"}>
                  Login
                </DropdownItem>
                <DropdownItem as={Link} to={"/Register"}>
                  Register
                </DropdownItem>
              </>
            )}
          </Dropdown>
          {/* <NavbarToggle /> */}
        </div>

        {token && (
          <NavbarCollapse>
            <NavbarLink as={Link} to={"/"} className="active">
              Feed
            </NavbarLink>
            <NavbarLink as={Link} to={"/myProfile"}>
              MyProfile
            </NavbarLink>
          </NavbarCollapse>
        )}
      </div>
    </Navbar>
  );
}
