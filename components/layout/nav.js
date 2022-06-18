import Link from "next/link";
import Style from "styles/layout/nav.module.scss";
export default function Nav() {
  return (
    <nav className={Style.nav}>
      <Link href={"/"}>
        <p>Vertual Cube</p>
      </Link>
      <ul>
        <Link href={"/users"}>
          <li>users</li>
        </Link>
        <li>courses</li>
        <li>Practices</li>
      </ul>
    </nav>
  );
}
