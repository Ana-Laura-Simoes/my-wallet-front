import styled from "styled-components";
import { useState, useContext } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Expired from "../Components/Expired";
import { useParams } from "react-router-dom";

export default function NewTransaction() {
  const { transaction } = useParams();
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [Value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  function HandleData(e) {
    e.preventDefault();
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const body = {
      value: Value,
      description: description,
    };

    const request = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/${transaction}`,
      body,
      config
    );

    request.then((data) => setLoading(false), history.push("/menu"));

    request.catch((error) => {
      setLoading(false);
      if (error.response.status === 401) {
        setIsOpen(true);
      } else
        alert(
          `Falha ao salvar ${transaction === "entrance" ? "Entrada" : "Saída"}!`
        );
    });
  }

  return (
    <>
      {isOpen ? <Expired /> : ""}
      <Container>
        <span>Nova {transaction === "entrance" ? "Entrada" : "Saída"}</span>

        <form onSubmit={HandleData}>
          <input
            type="number"
            required
            placeholder="Valor"
            value={Value}
            onChange={(e) => setValue(e.target.value)}
            disabled={loading}
          />

          <input
            type="text"
            required
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />

          <button className="Save" type="submit" required isdisabled={loading}>
            {!loading ? (
              `Salvar ${transaction === "entrance" ? "Entrada" : "Saída"}`
            ) : (
              <Loader type="ThreeDots" color="#FFF" height={45} width={50} />
            )}
          </button>
        </form>

        <Cancel
          isdisabled={loading}
          disabled={loading}
          onClick={() => history.push("/menu")}
        >
          Cancelar
        </Cancel>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 25px;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 31px;
  color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    display: block;
    margin-bottom: 40px;
  }

  form {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  input {
    width: 326px;
    height: 58px;
    background: #ffffff;
    border-radius: 5px;
    border: none;
    margin-bottom: 15px;
    padding: 15px;

    ::placeholder {
      color: #000000;
      font-size: 20px;
    }
    @media (max-width: 360px) {
      width: 90vw;
    }
  }

  .Save {
    margin-top: 20px;
    width: 326px;
    height: 58px;
    background: #a328d6;
    border-radius: 5px;
    border: none;
    padding: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    color: #ffffff;
    opacity: ${(props) => (props.isdisabled ? 0.8 : 1)};
    @media (max-width: 360px) {
      width: 90vw;
    }
  }
`;

const Cancel = styled.button`
  width: 326px;
  height: 58px;
  margin-top: 15px;
  background: #ffffff;
  border-radius: 5px;
  border: none;
  padding: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  color: #a328d6;
  opacity: ${(props) => (props.isdisabled ? 0.8 : 1)};

  @media (max-width: 360px) {
    width: 90vw;
  }
`;
