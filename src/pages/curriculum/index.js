import React from 'react';
import { Table, Button, Row, Col, Dropdown} from 'react-bootstrap';


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


const Curriculum = () => {

  const [inputdata, setInputData] = React.useState("");
  const [items, setItems] = React.useState(getLocalData());
  const [programItems, setProgramItems] = React.useState(getProgramData());
  const [program, setProgram] = React.useState("");
  const [isEditItem, setIsEditItem] = React.useState("");


  const addItem = () => {
    if(!inputdata){
      alert("Please fill the Course Info");
    } 
    else if (inputdata && isEditItem) {
      setItems(items.map((element) => {
        if(element.id === isEditItem){
          // element.title = inputdata;
          return {...element, title:inputdata};
        }
        return element;
      }));
      setInputData("");
      setIsEditItem("");
    }
    else {
      const myInputData = {
        id: new Date().getTime().toString(),
        title: inputdata
      };
      setItems([...items, myInputData]);
      setInputData("");
    }
  }


  const updateItem = (id) => {
    const item_todo_edited = items.find((element) => {
      return element.id === id;
    });
    setIsEditItem(item_todo_edited.id);
    setInputData(item_todo_edited.title);
  }


  const deleteItem = (id) => {
    const updatedItems = items.filter((element) => {
      return element.id !== id;
    });
    setItems(updatedItems);
  }

  React.useEffect(() => {
    localStorage.setItem("CurriculumPreDefineList",JSON.stringify(items))
  }, [items]);

  return (
    <>
      <Row>
        <Col xs={1}>
          <div>
            <h2>Curriculum</h2>
          </div>
        </Col>
        <Col xs={9}>
        </Col>
      </Row>
      <div>
        <Row>
          <Col xs={1}/>
          <Col xs={8}>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-autoclose-true">
              {program === "" ? "Select Program" : program }
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {
                programItems.map((element, index) => {
                  return (
                    <>
                      <Dropdown.Item onClick={() => setProgram(element.title)} key={index}>{element.title}</Dropdown.Item>
                    </>
                  );
                })
              }
            </Dropdown.Menu>
          </Dropdown>
          <input type="text" 
                placeholder='Add Root' 
                className='form-control'
                value={inputdata}
                onChange={(event) => setInputData(event.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addItem();
                  }
                }}
              />
          </Col>
          {/* <Col xs={8}>
          <input type="text" 
                placeholder='Add Root' 
                className='form-control'
                value={inputdata}
                onChange={(event) => setInputData(event.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addItem();
                  }
                }}
              />
          </Col> */}
          <Col>
              {isEditItem === "" ? <Button onClick={addItem}> Create </Button> : <Button variant='warning' onClick={addItem}> Edit </Button>}
          </Col>
        </Row>
            {/* {isEditItem === "" ? <i className="fa fa-plus add-btn" onClick={addItem}></i> : <i className="fa fa-edit add-btn" onClick={addItem}></i>} */}
      </div>
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>
                id
              </th>
              <th>
                Course Name
              </th>
              <th>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((element, index) => {
              return (
                <tr key={index}>
                  <td>
                    {element.id}
                  </td>
                  <td>
                    {element.title}
                  </td>
                  <td>
                    <Row xs={2}>
                      <Col>
                        <Button variant='warning' onClick={() => updateItem(element.id)}> Edit </Button>
                      </Col>
                      <Col>
                        <Button variant='danger' onClick={() => deleteItem(element.id)}> Delete</Button>
                      </Col>
                    </Row>
                  </td> 
                </tr>
            );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Curriculum;