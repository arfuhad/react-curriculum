import React from 'react';
import { Table, Button, Row, Col} from 'react-bootstrap';


const getLocalData = () => {
  const lists = localStorage.getItem("programList");
  if(lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
}

const Program = () => {

  const [inputdata, setInputData] = React.useState("");
  const [items, setItems] = React.useState(getLocalData());
  const [isEditItem, setIsEditItem] = React.useState("");


  const addItem = () => {
    if(!inputdata){
      alert("Please fill the Program Info");
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
    localStorage.setItem("programList",JSON.stringify(items))
  }, [items]);

  return (
    <>
      <Row>
      <div>
        <h2>Program</h2>
      </div>
      </Row>
      <div>
        <Row>
          <Col xs={1}/>
          <Col xs={8}>
          <input type="text" 
                placeholder='Add Program' 
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
                Program Name
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

export default Program;