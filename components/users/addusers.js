import Style from "styles/users/addusers.module.scss";
import { useState, useEffect } from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faTrash } from "@fortawesome/free-solid-svg-icons";
const Add_Users = gql`
  mutation($n: Int!) {
    makeUsers(n: $n) {
      code
      date
    }
  }
`;

export default function AddUsers() {
  const [num, setNum] = useState("");
  const [addme, { data, loading }] = useMutation(Add_Users);
  const submitHandler = e => {
    e.preventDefault();
    if (num && !loading) addme({ variables: { n: parseInt(num) } });
  };
  const [list, setList] = useState(null);
  useEffect(() => {
    if (data) setList(data.makeUsers);
  }, [data]);
  return (
    <>
      <form className={Style.form} onSubmit={submitHandler}>
        <h1>Generate Users</h1>
        <input
          value={num}
          onChange={e => setNum(e.target.value)}
          type="number"
          placeholder="1.2.3.4.5.6.7.8.9"
        />
        <button type={loading ? "button" : "submit"}>+</button>
      </form>
      <article className={Style.infos}>
        <p>
          {list ? `${list.length} new user` : loading ? "Generate..." : "..."}
        </p>
        <NewUsers list={list} setList={setList} />
      </article>
    </>
  );
}
function NewUsers({ list, setList }) {
  const [fadeIn, setFadeIn] = useState(false);

  const clickHandler = () => {
    setFadeIn(!fadeIn);
  };

  return (
    <>
      <div className={list ? Style.notify : Style.nothing}>
        <div onClick={clickHandler}>
          <FontAwesomeIcon icon={faCoffee} />
        </div>
        {list && <Ul fadeIn={fadeIn} list={list} setList={setList} />}
      </div>
    </>
  );
}

function Ul({ list, setList, fadeIn }) {
  return (
    <>
      <ul className={fadeIn ? Style.fadeIn : Style.fadeOut}>
        {list.map((e, index) => {
          const { code, date } = e;
          return <Li key={index} obj={{ code, date, setList }} />;
        })}
      </ul>
    </>
  );
}

const RemoveUser = gql`
  query($code: String!) {
    removeUser(code: $code)
  }
`;

function Li({ obj }) {
  const { code, date, setList } = obj;
  const [removeme, { loading, data }] = useLazyQuery(RemoveUser);
  const removeHandler = () => {
    removeme({ variables: { code } });
    setList(arr => {
      const newArr = arr.filter(e => e.code !== code);
      return newArr;
    });
  };
  console.log(data);

  return (
    <>
      <li>
        <p>{code}</p>
        <span>{date}</span>
        <div onClick={removeHandler}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </li>
    </>
  );
}
