import Style from "styles/users/users.module.scss";
import AddUsers from "components/users/addUsers";
import UsersList from "components/users/userslist";

export default function Users() {
  return (
    <section className={Style.users}>
      <div className={Style.addusers}>
        <AddUsers />
      </div>
      <div className={Style.userslist}>
        <UsersList />
      </div>
    </section>
  );
}
