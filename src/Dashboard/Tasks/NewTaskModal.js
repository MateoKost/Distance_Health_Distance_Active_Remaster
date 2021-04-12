import React, { useState, useContext } from "react";
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
import ItemIconNames from "../../Utilities/IconNames";
import { FireDataContext } from "../../Authorization/FireDataContext";

const categories = [
  { name: "Bieganie", category: "running" },
  { name: "Gra zespołowa", category: "ball" },
  { name: "Pływanie", category: "swim" },
  { name: "Rower", category: "bike" },
  { name: "Siłownia", category: "gym" },
];

const NewTaskModal = () => {
  const { classes, createTask } = useContext(FireDataContext);
  const handleSubmit = async (event) => {
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
    const categoryName = categories.find(
      (item) => item.name === category.value
    );

    const data = {
      name: name.value,
      classes: Array.from(multiGroup.selectedOptions, (option) => option.value),
      type: categoryName.category,
      end: new Date(`${endDate.value} ${endH.value}`),
      start: new Date(),
      notes: { B: n_B.value, C: n_C.value, D: n_D.value },
      status: "pending",
    };

    createTask(data, setNewTaskModal);
  };

  const [newTaskModal, setNewTaskModal] = useState(false);
  const addIcon = ItemIconNames.find((item) => item.name === "add");

  return (
    <div>
      <Button
        color="danger"
        className="orange"
        onClick={() => setNewTaskModal(true)}
      >
        {addIcon.faIcon} Dodaj zadanie
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
                required
              >
                <option>I7B2S1</option>
                {classes && classes.map(({ name }) => <option>{name}</option>)}
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
              <Input type="select" name="category" id="category" required>
                {categories.map(({ name }) => (
                  <option>{name}</option>
                ))}
              </Input>
            </FormGroup>

            <Row>
              <Col lg="6">
                <FormGroup>
                  <Label for="endDate">Termin</Label>
                  <Input type="date" id="endDate" name="endDate" required />
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
            <Button color="danger" className="orange" type="submit">
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
