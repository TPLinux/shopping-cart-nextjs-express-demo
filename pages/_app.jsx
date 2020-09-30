import App from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store";
import { createWrapper } from "next-redux-wrapper";
import "../styles/main.scss";

class ShopApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = (await Component.getInitialProps)
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps: pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

// withRedux wrapper that passes the store to the App Component
export default createWrapper(() => store).withRedux(ShopApp);
