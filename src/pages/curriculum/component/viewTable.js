import React from 'react';
import { Badge, Button, Row, Col, ButtonGroup, ListGroup} from 'react-bootstrap';
import CreateItem from './createItem';
import EditItem from './editItem';

const viewTable = (selectedValue, type, selectionFunction, addingFunction, updateFunction, deleteFunction) => {
  return (
    <>
      <Col style={{'border': '2px solid lightgray',}}>
            <Row>
              <Col xs={5}>
                <h5 className='mt-2'>
                  {selectedValue === null ? "Root" : selectedValue.subtype}
                </h5>
              </Col>
              <Col>
              {/* <Badge bg="primary" pill>
                Create
              </Badge> */}
              <ButtonGroup className='mt-2' size='sm'>
                <CreateItem addFunction={addingFunction} parent={selectedValue} type={type} syllabusShow={type === "node" ? true: type === "root" ? true : false}/>
                <EditItem editFunction={updateFunction} parent={selectedValue} type={type} syllabusR={type === "node" ? true: type === "root" ? true : false}/>
                <Button variant="danger">Delete</Button>
              </ButtonGroup>
              </Col>
            </Row>
            <ListGroup className=' mb-2'>
            {selectedValue !== null && selectedValue.children === [] ? <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{selectedValue.title} have no children</div>
                      children should be {selectedValue.subtype}
                    </div>
                  </ListGroup.Item> : selectedValue !== null && selectedValue.children !== [] ? selectedValue.children.map((element) => {
              return (
                  <ListGroup.Item
                    action onClick={() => {selectionFunction(element)}}
                    active={selectedValue.id === element.id}
                    as="li"
                    className="d-flex justify-content-between align-items-start mb-2"
                    key={element.id}>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{element.title}</div>
                      {element.syllabusName}
                    </div>
                    <Badge bg={selectedValue.id === element.id ? "light": "primary"} text={selectedValue.id === element.id ? "dark": "light"} pill>
                      {element.children.length}
                    </Badge>
                  </ListGroup.Item>
              );
            }) : <></>}
          </ListGroup>
      </Col>
    </>
  );
};

export default viewTable;