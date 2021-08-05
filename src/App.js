import { useState, useRef } from "react";
import "./App.css";
import shortid from "shortid";

function App() {
  const initialState = [
    { id: "id-1", name: "John", sirname: " Piters", age: "30" },
    { id: "id-2", name: "Piter", sirname: "Johnson", age: "25" },
    { id: "id-3", name: "Pit", sirname: "Ivans", age: "25" },
    { id: "id-4", name: "Ivan", sirname: "Piterson", age: "20" },
    { id: "id-5", name: "Govard", sirname: "Ivory", age: "35" },
  ];

  const [filter, setFilter] = useState("");

  const [contacts, setContacts] = useState(initialState);

  const nameRef = useRef(null);
  const sirnameRef = useRef(null);
  const ageRef = useRef(null);
  const filterRef = useRef("");

  let contact = { nameRef, sirnameRef, ageRef };

  function addContact({ nameRef, sirnameRef, ageRef }) {
    const contact = {
      id: shortid.generate(),
      name: nameRef.current.value,
      sirname: sirnameRef.current.value,
      age: ageRef.current.value,
    };

    if (
      nameRef.current.value &&
      sirnameRef.current.value &&
      ageRef.current.value
    ) {
      contacts.find(
        (contact) =>
          contact.name.toLowerCase() === nameRef.current.value.toLowerCase()
      ) &&
      contacts.find(
        (contact) =>
          contact.sirname.toLowerCase() ===
          sirnameRef.current.value.toLowerCase()
      )
        ? alert(
            `${sirnameRef.current.value} ${nameRef.current.value} is already added.`
          )
        : setContacts((prevContacts) => [contact, ...prevContacts]);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addContact(contact);
    nameRef.current.value = "";
    sirnameRef.current.value = "";
    ageRef.current.value = "";
  };

  const onDelete = (userId) => {
    setContacts(() => contacts.filter((contact) => contact.id !== userId));
  };

  const onFilter = () => {
    setFilter(
      contacts.filter(
        (contact) =>
          contact.name
            .toLowerCase()
            .includes(filterRef.current.value.toLowerCase()) ||
          contact.sirname
            .toLowerCase()
            .includes(filterRef.current.value.toLowerCase()) ||
          contact.age
            .toLowerCase()
            .includes(filterRef.current.value.toLowerCase())
      )
    );
  };

  const fetchContacts = filter
    ? filter.map(({ id, name, sirname, age }) => (
        <tr className="table__item" key={id}>
          <td className="table__item">{name}</td>
          <td className="table__item">{sirname}</td>
          <td className="table__item">{age}</td>
          <td className="table__item">
            <button
              className="table__button"
              type="button"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    : contacts.map(({ id, name, sirname, age }) => (
        <tr className="table__item" key={id}>
          <td className="table__item">{name}</td>
          <td className="table__item">{sirname}</td>
          <td className="table__item">{age}</td>
          <td>
            <button
              className="table__button"
              type="button"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ));

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <fieldset className="form__fieldset">
          <legend>Add new contact</legend>
          <input
            className="form__input"
            placeholder="new name"
            ref={nameRef}
            type="text"
          />
          <input
            className="form__input"
            placeholder="new sirname"
            ref={sirnameRef}
            type="text"
          />
          <input
            className="form__input"
            placeholder="new age"
            ref={ageRef}
            type="text"
          />
          <button className="form__button" type="submit">
            Add contact
          </button>
        </fieldset>

        <fieldset className="form__fieldset">
          <legend>Filter</legend>
          <input
            className="form__filterInput form__input"
            ref={filterRef}
            type="text"
            onChange={onFilter}
          />
        </fieldset>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th className="table__head">Name</th>
            <th className="table__head">Sirname</th>
            <th className="table__head">Age</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{fetchContacts}</tbody>
      </table>
    </div>
  );
}

export default App;
