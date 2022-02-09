import React from "react";
import { List, Icons } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { logoutUser } from "../../utils/authUser";

function SideMenu({ user: { email, username } }) {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;
  return (
    <>
      <List
        style={{ paddingTop: "1rem" }}
        size="big"
        verticalAlign="middle"
        selection
      >
        <Link href="/">
          <List.Item active={isActive("/")}>
            <Icon
              name="Home"
              size="large"
              {...(isActive("/") && { color: "teal" })}
            />
            <List.Content>
              <List.Header content="Plan" />
            </List.Content>
          </List.Item>
        </Link>
        <br />

        <br />
        <List.Item onClick={() => logoutUser(email)}>
          <Icon name="log out" size="large" />
          <List.Content>
            <List.Header content="Logout" />
          </List.Content>
        </List.Item>
      </List>
    </>
  );
}

export default SideMenu;
