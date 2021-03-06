import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from 'react-bootstrap/Button';
import {MDBBtn} from 'mdbreact';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import Spinner from 'react-bootstrap/Spinner';

import GetService from '../components/apis/get.service';

//const global_details = [{}]
function Display(objectID) {

    //const resp = GetService.getInfoDetails(objectID.value);
    //console.log(resp);
    //var resp="";
    //var title="tessssssssssss";

    const [show, setShow] = useState(false); //first state fur variable show
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    
    console.log("first"+show);


    let n = 0;
    const handleClose = () => {
      console.log("handleClose")
      setShow(false);
      
      console.log(show)
    };
    //GET DETAILS RESPONSE
    


    const handleClick = () => {
      console.log(objectID);

      setLoading(true);
      
      console.log("get Click");
      var detailsL=[]
      console.log(show);
      var rep = GetService.getInfoDetails(objectID.value[1]);
      console.log("content aus SERVICE will be here transported");
      console.log(rep);
      const getRes = rep.then((res)=>{
        var a = res;
        setDetails(a[0]);
        detailsL= a;
        console.log("in function");
        console.log(detailsL);
        console.log(details);
        setLoading(false);
      });
      
      setShow(true);
    };
    
    const Flurname=(props)=>{
     
      console.log("Flurname COMPONENTEN AUFRUFEN");
      console.log(props['value']);
      
      const res = props['value'];
      console.log(show);
      return (
      <tr>
        <td>{res['title']}</td>
        <td>{res['area']}</td>
        <td>{res['evidence']}</td>
        <td>{res['note']}</td>
        <td>{res['parent']}</td>
      </tr> 
      );

    };

    return (
      <>
        
        <MDBBtn className="btn-anzeige" class="btn btn-success"onClick={handleClick} >
          Anzeige
        </MDBBtn>
        {/*POP UP Fenster wird ge??ffet*/}
        <Modal
          size="lg"
          show={show}
          onHide={() => setShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              {objectID.value[0]}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {loading ? (
            <Spinner animation="border" variant="success" />
          ):(
            <MDBTable id="detail-results" className="table-detail-result">
            <MDBTableHead>
              <tr>
                <th>Flurname</th>
                <th>Area</th>
                <th>Beleg</th>
                <th>Note</th>
                <th>Obergeordnete</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
                {details.map((item, index)=><Flurname key={index} value={item}/>)}
                
            </MDBTableBody>
            </MDBTable>
          )}
          </Modal.Body>
          <Modal.Footer>
            <Button id="btn-details-close" variant="dark" class="btn btn-dark" onClick={handleClose}>
              Schlie??en
            </Button>
        </Modal.Footer>
        </Modal>
      </>
    );
  }


export default Display;

