import { React, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const CreateRoot = ({addFunction, program, type}) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [subType, setSubType] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const saveData = () => {
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    // setError(true);

    if(name === "" && syllabus === "" && subType === "" && program === null){
      console.log("checked for error | " + name + " | " + syllabus + " | " + subType + " | " + program);
      setError(true);
    }else{
      console.log("checked for not error | " + name + " | " + syllabus + " | " + subType + " | " + program);
      setError(false);
    }
    if(!error){
      addFunction(type,name,syllabus,program,subType);
      handleClose();
    }
  };

  return (
    <>
      <Button  variant="primary" type="submit" onClick={handleShow}>
        Create Root
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Root</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={error} onSubmit={saveData}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="name"
                placeholder="root name"
                autoFocus
                onChange={(event) => setName(event.target.value)}
              />
              <Form.Label>Syllabus Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Syllabus name"
                onChange={(event) => setSyllabus(event.target.value)}
              />
              <Form.Label>Child type Selection</Form.Label>
              {/* <Form.Control
                type="name"
                placeholder="Syllabus name"
                autoFocus
                onChange={(value) => setSyllabus(value)}
              /> */}
              <Form.Select onChange={(event) => setSubType(event.target.value)}>
                <option value={""}>Select sub type</option>
                <option value={"node"}>Node</option>
                <option value={"course"}>Course</option>
              </Form.Select>
            </Form.Group>
            {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateRoot;