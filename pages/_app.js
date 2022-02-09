import App from "next/app";
import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import baseUrl from "../utils/baseUrl";
import { redirectUser } from "../utils/authUser";
import Layout from "../components/Layout/Layout";
import "semantic-ui-css/semantic.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};

  const protectedRoutes = ctx.pathname === "/" || ctx.pathname === "/plans";

  if (!token) {
    protectedRoutes && redirectUser(ctx, "/login");
  }
  //
  else {
    try {
      const getFollowingData =
        ctx.pathname === "/notifications" || ctx.pathname === "/[username]";

      const res = await axios.get(`${baseUrl}/api/auth`, {
        headers: { Authorization: token, getFollowingData },
        params: { getFollowingData },
      });

      const { user, userFollowStats } = res.data;

      if (user) !protectedRoutes && redirectUser(ctx, "/");

      pageProps.user = user;
      pageProps.userFollowStats = userFollowStats;
    } catch (error) {
      destroyCookie(ctx, "token");
      redirectUser(ctx, "/login");
    }
  }

  return { pageProps };
};

export default MyApp;
