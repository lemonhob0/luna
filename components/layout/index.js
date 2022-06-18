import Nav from "./nav";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>{"Vertualcubes DashBoard"}</title>
      </Head>
      <main>
        <Nav />
        <div className="content">{children}</div>
      </main>
    </>
  );
}
