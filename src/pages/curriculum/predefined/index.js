import React from 'react';
import { Badge, Button, Row, Col, ButtonGroup, Form, ListGroup} from 'react-bootstrap';
import CreateRoot from '../component/createRoot';
import CreateNode from '../component/createNode';


const getLocalData = () => {
  const lists = localStorage.getItem("CurriculumPreDefineList");
  if(lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
}
 
const getProgramData = () => {
  const lists = localStorage.getItem("programList");
  if(lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
}

const getCourseData = () => {
  const lists = localStorage.getItem("CourseList");
  if(lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
}


const Predefined = () => {

  const [selectedRoot, setSelectedRoot] = React.useState(null);
  const [selectedChild, setSelectedChild] = React.useState(null);
  const [localItems, setLocalItems] = React.useState(getLocalData());
  const [viewingItems, setViewingItems] = React.useState([]);
  const [programItems] = React.useState(getProgramData());
  const [program, setProgram] = React.useState(null);
  // const [isEditItem, setIsEditItem] = React.useState("");

  const selectingProgram = (value) => {    
    const selectedProg = programItems.filter((element) => {
      return element.id === value;
    });
    setProgram(selectedProg);
  }


  const loadProgramRoot = () => {
    if(!program){
      alert("Please select a program");
    } 

    setViewingItems([]);
    
    const selectedProgramRoot = localItems.filter((element,index) => {
      return element.program[0].id === program[0].id;
    });
    
    
    setViewingItems(selectedProgramRoot);

    // const myInputData = {
    //   id: new Date().getTime().toString(),
    //   title: inputdata
    // };
  }


  const addRoot = (type, title, syllabusName, program, subType) => {
    if(!type && !title && !syllabusName && !program && !subType){
      alert("Please fill all info for root");
    } 
    else {
      const myInputData = {
        id: new Date().getTime().toString(),
        type: type,
        title: title,
        syllabusName: syllabusName,
        program: program,
        subtype: subType,
        children: []
      };
      setLocalItems([...localItems, myInputData]);
      loadProgramRoot();
    }
  }

  const addNode = (type, title, syllabusName, isMajor, isMinor, subType) => {
    if(!type && !title && !syllabusName && !isMajor && !isMinor && !subType){
      alert("Please fill all info for node");
    } 
    else {
      const myInputData = {
        id: new Date().getTime().toString(),
        type: type,
        title: title,
        syllabusName: syllabusName,
        subtype: subType,
        children: []
      };
      selectedRoot.children.push(myInputData);
      var _updatedValueIndex = localItems.findIndex((element) => {
        return element.id === selectedRoot.id;
      });
      localItems[_updatedValueIndex] = selectedRoot;
      // setLocalItems([...localItems, myInputData]);

      // setViewingItems(selectedProgramRoot);
      loadProgramRoot();
    }
  }

  React.useEffect(() => {
    localStorage.setItem("CurriculumPreDefineList",JSON.stringify(localItems))
  }, [localItems]);

  return (
    <>
      <div>
        <h2 className='text-start'>Curriculum Predefined</h2>
      </div>
      <div>
        <Col className='mt-3'>
          <div>
            <h4 className='text-start'>Program Selection</h4>
          </div>
          <Form.Group className="mb-3">
            <Row>
              <Col xs={9}>
              <Form.Select onChange={(event) => selectingProgram(event.target.value)}>
                <option>Select Program</option>
                {
                  programItems.map((element) => {
                    return (
                        <option value={element.id} key={element.id}>{element.title}</option>
                    );
                  })
                }
              </Form.Select>
              </Col>
              <Col>
                <Button variant="primary" type="submit" onClick={loadProgramRoot}>
                  Load
                </Button>
              </Col>
              {program !== null ? <Col>
                <CreateRoot addFunction={addRoot} program={program} type={"root"}/>
              </Col> : <Col></Col>}
              
            </Row>
          </Form.Group>
        </Col>
      </div>
      <div >
        <Row>
          <Col style={{'border': '2px solid lightgray',}}>
          <div >
                <h5 className='mt-2'>
                  Root
                </h5>
          </div>
          <ListGroup className=' mb-2'>
            {viewingItems.map((element) => {
              return (
                  <ListGroup.Item
                    action onClick={() => {setSelectedRoot(element);
                    console.log(selectedRoot);}}
                    active={selectedRoot !== null ? selectedRoot.id === element.id : false}
                    as="li"
                    className="d-flex justify-content-between align-items-start "
                    key={element.id}>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{element.title}</div>
                      {element.syllabusName}
                    </div>
                    <Badge bg={selectedRoot !== null ? selectedRoot.id === element.id ? "light": "primary" : "primary" } text={selectedRoot !== null ? selectedRoot.id === element.id ? "dark": "light": "light"} pill>
                      {element.children.length}
                    </Badge>
                  </ListGroup.Item>
              );
            })}
          </ListGroup>
          </Col>
          {selectedRoot === null ? <></> : 
          <Col style={{'border': '2px solid lightgray',}}>
            <Row>
              <Col xs={5}>
                <h5 className='mt-2'>
                  {selectedRoot === null ? "Root" : selectedRoot.subtype}
                </h5>
              </Col>
              <Col>
              {/* <Badge bg="primary" pill>
                Create
              </Badge> */}
              <ButtonGroup className='mt-2' size='sm'>
                <CreateNode addFunction={addNode} program={selectedRoot} type={"node"}/>
                <Button variant="warning">Edit</Button>
                <Button variant="danger">Delete</Button>
              </ButtonGroup>
              </Col>
            </Row>
            <ListGroup className=' mb-2'>
            {selectedChild !== null && selectedChild.children === [] ? <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{selectedChild.title} have no children</div>
                      children should be {selectedChild.subtype}
                    </div>
                  </ListGroup.Item> : selectedChild !== null && selectedChild.children !== [] ? selectedRoot.children.map((element) => {
              return (
                  <ListGroup.Item
                    action onClick={() => {setSelectedChild(element)}}
                    active={selectedChild.id === element.id}
                    as="li"
                    className="d-flex justify-content-between align-items-start mb-2"
                    key={element.id}>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{element.title}</div>
                      {element.syllabusName}
                    </div>
                    <Badge bg={selectedChild.id === element.id ? "light": "primary"} text={selectedChild.id === element.id ? "dark": "light"} pill>
                      {element.children.length}
                    </Badge>
                  </ListGroup.Item>
              );
            }) : <></>}
          </ListGroup>
          </Col>
          }
          { selectedChild === null ? <></> : 
            <Col style={{'border': '2px solid lightgray',}}>
              {/* <h5>
                {selectedChild === null ? "Root" : selectedChild.subtype}
              </h5> */}
              <Row>
              <Col xs={5}>
                <h5 className='mt-2'>
                  {selectedChild === null ? "Root" : selectedRoot.subtype}
                </h5>
              </Col>
              <Col>
              {/* <Badge bg="primary" pill>
                Create
              </Badge> */}
              <ButtonGroup className='mt-2' size='sm'>
                <CreateNode addFunction={addNode} program={selectedRoot} type={"node"}/>
                <Button variant="warning">Edit</Button>
                <Button variant="danger">Delete</Button>
              </ButtonGroup>
              </Col>
            </Row>
            </Col>
          }
        </Row>
      </div>
    </>
  );
};

export default Predefined;