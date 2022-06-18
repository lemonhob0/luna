import Style from "styles/users/userslist.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
const FistQuery = gql`
  query {
    users {
      code
    }
  }
`;

const FetchMore = gql`
  query {
    users {
      code
    }
  }
`;

export default function UsersList() {
  const { loading, data } = useQuery(FistQuery);
  const [list, setList] = useState(null);
  useEffect(() => {
    if (data) setList(data.users);
  }, [data]);

  return (
    <>
      <Catie />
      <Ulist obj={{ loading, list, setList }} />
    </>
  );
}

function Catie() {
  return (
    <ul className={Style.caties}>
      <li className={Style.s}>all</li>
      <li>online</li>
      <li>offline</li>
      <form>
        <input type="text" placeholder="search-user" />
      </form>
    </ul>
  );
}

function Ulist({ obj }) {
  const { loading, list, setList } = obj;
  return (
    <ul className={Style.ulist}>
      {loading ? (
        <li className={Style.loading}></li>
      ) : (
        list &&
        list.map((e, i) => <UserLi key={i} setList={setList} code={e.code} />)
      )}
    </ul>
  );
}

function UserLi({ code, setList }) {
  return (
    <li className={Style.userli}>
      <div className={Style.pfp}></div>
      <p>{code}</p>
      <RemoveMe setList={setList} code={code} />
    </li>
  );
}

const RemoveUser = gql`
  query($code: String!) {
    removeUser(code: $code)
  }
`;

function RemoveMe({ code, setList }) {
  const [removeme] = useLazyQuery(RemoveUser);
  const clickHandler = () => {
    removeme({ variables: { code } });
    setList(arr => arr.filter(e => e.code !== code));
  };
  return (
    <div onClick={clickHandler} className={Style.removeme}>
      <FontAwesomeIcon icon={faTrash} />
    </div>
  );
}
