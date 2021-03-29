import {
  MicrosoftLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import {
  Label,
  Form,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import DateTimePicker from "react-datetime-picker";

import ItemIconNames from "../../Utilities/IconNames";
// import SpinnerGroup from '../../Utilities/SpinnerGroup';

import React, {
  useState,
  useCallback,
  useContext,
  useCollectionData,
} from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import { AuthContext } from "../../Authorization/Auth.js";

// import { auth, firebase_auth,
//         firestore
// } from "../base";
// import { AuthContext } from "./Auth.js";
// import "../App.css";

// import { ModalContext } from "../LandingPage/ModalContext";

// import ItemIconNames from "../../Utilities/IconNames";

const categories = [
  { name: "Bieganie", category: "running" },
  { name: "Gra zespołowa", category: "ball" },
  { name: "Pływanie", category: "swim" },
  { name: "Rower", category: "bike" },
  { name: "Siłownia", category: "gym" },
];

const NewTaskModal = (props, { history }) => {
  // const { signInModal, registerModal, toggleRegisterModal, toggleSignInModal } = useContext(
  //   ModalContext
  // );

  const { currentUser } = useContext(AuthContext);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const {
        multiGroup,
        name,
        category,
        endDate,
        endH,
        n_B,
        n_C,
        n_D,
      } = event.target.elements;
      try {
        // alert(endDate.value);

        const categoryName = categories.find((item) => item.name === category.value);



        props.tasksRef.add({
          coach: currentUser.uid,
          name: name.value,
          classes: Array.from(multiGroup.selectedOptions, option => option.value),
          type: categoryName.category,

          end: new Date(`${endDate.value} ${endH.value}`),
          start: new Date(),
          notes: { B: n_B.value, C: n_C.value, D: n_D.value },
        }).then((result)=>{alert(result); console.log(result);setNewTaskModal(false)});





        //         alert(
        // // "aaaa"
        //         //  {multiGroup},
        //         //  { name },
        //           // category,
        //           stamper() + "\n"+
        //           currentUser.uid + "\n"+
        //           currentUser.email + "\n"+
        //           multiGroup.value + "\n"+
        //           name.value + "\n"+
        //           category.value + "\n"+
        //           endDate.value + "\n"+
        //           endH.value + "\n"+
        //           n_B.value + "\n"+
        //           n_C.value + "\n"+
        //           n_D.value

        //         )
        // alert(coach.checked);

        // const [users] = useCollectionData(usersRef, { idField: "id" });
        // setUserFireData();
        // userFireData
        // history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const [newTaskModal, setNewTaskModal] = useState(false);

  const addIcon = ItemIconNames.find((item) => item.name === "add");

  const [endDate, setEndDate] = useState(new Date());

  return (
    <div>
      <Button
        color="primary"
        className="btn-circle"
        onClick={() => setNewTaskModal(true)}
      >
        <span className="fa-3x"> {addIcon.faIcon} </span>
      </Button>

      <Modal isOpen={newTaskModal} toggle={() => setNewTaskModal(false)}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader
            cssModule={{ "modal-title": "w-100 text-center" }}
            toggle={() => setNewTaskModal(false)}
          >
            Nowe zadanie
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Grupa</Label>
              <Input
                type="select"
                name="multiGroup"
                id="multiGroup"
                multiple
                // required
              >
                <option>I7B2S1</option>
                {props.classes &&
                  props.classes.map(({ name }) => <option>{name}</option>)}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="name">Nazwa</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Wprowadź nazwę zadania..."
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="category">Kategoria</Label>
              <Input
                type="select"
                name="category"
                id="category"
            
                required
              >
                {categories.map(({ name }) => (
                  <option>{name}</option>
                ))}
              </Input>
            </FormGroup>

            <Row>
              <Col lg="6">
                <FormGroup>
                  <Label for="endDate">Termin</Label>
                  <Input
                    type="date"
                    id="endDate"
                    name="endDate"
                    // min="09:00"
                    // max="18:00"
                    required
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <Label for="endH">Godzina</Label>
                  <Input
                    type="time"
                    id="endH"
                    name="endH"
                    // min="09:00"
                    // max="18:00"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Table>
              <thead>
                <tr>
                  <th>Ocena</th>
                  <th>Rygor</th>
                </tr>
              </thead>
              <tbody>
                {["B", "C", "D"].map((ch) => (
                  <tr>
                    <th className="text-center" scope="row">
                      {ch}
                    </th>
                    <td>
                      <Input
                        required
                        type="text"
                        name={`n_${ch}`}
                        id={`#n-${ch}`}
                        placeholder="wprowadź rygor..."
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Dodaj
            </Button>{" "}
            <Button color="secondary" onClick={() => setNewTaskModal(false)}>
              Anuluj
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default NewTaskModal;
