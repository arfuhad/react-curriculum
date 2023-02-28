import { React, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const EditItem = ({editFunction, parent, type, syllabusR, majorR, minorR, subTypeR}) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [syllabus, setSyllabus] = useState(syllabusR !== null ? syllabusR : "");
  const [subType, setSubType] = useState(subTypeR !== null ? subTypeR : "");
  const [isMajor, setIsMajor] = useState(majorR !== null ? majorR : false);
  const [isMinor, setIsMinor] = useState(minorR !== null ? minorR : false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const saveData = () => {
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    // setError(true);

    if(name === "" && !(syllabusR !== null && syllabus === "") && !(subTypeR !== null && subType === "") && parent === null){
      console.log("checked for error | " + name + " | " + syllabus + " | " + subType + " | " + parent);
      setError(true);
    }else{
      console.log("checked for not error | " + name + " | " + syllabus + " | " + subType + " | " + parent);
      setError(false);
    }
    if(!error){
      if(!syllabusR && !majorR && !minorR && !subTypeR){
        editFunction(type,name,parent);
      } else if(syllabusR && majorR && minorR && subTypeR){
        editFunction(type,name,syllabus,parent,isMajor,isMinor,subType);
      } else {
        editFunction(type,name,syllabus,parent,subType);
      }
      handleClose();
    }
  };

  return (
    <>
      <Button  variant="warning" type="submit" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create {type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={error} onSubmit={saveData}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="name"
                placeholder={type + " name"}
                autoFocus
                onChange={(event) => setName(event.target.value)}
              />
              { 
                syllabusR !== null ? 
                <>
                  <Form.Label>Syllabus Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Syllabus name"
                    onChange={(event) => setSyllabus(event.target.value)}
                  />
                </>
                : <></>
              }
              {
                subTypeR !== null ?
                <>
                  <Form.Label>Child type Selection</Form.Label>
                  <Form.Select onChange={(event) => setSubType(event.target.value)}>
                    <option value={""}>Select sub type</option>
                    <option value={"node"}>Node</option>
                    <option value={"course"}>Course</option>
                  </Form.Select>                
                </>
                : <></>
              }
              {
                majorR !== null ? 
                <>
                  <Form.Check type="checkbox" label="is Major" value={isMajor} onChange={(event)=> setIsMajor(event.target.value)}/>
                </>
                : <></>
              }
              {
                minorR !== null ? 
                <>
                  <Form.Check type="checkbox" label="is Minor" value={isMinor} onChange={(event)=> setIsMinor(event.target.value)}/>
                </>
                : <></>
              }
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

export default EditItem;