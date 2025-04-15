// TableData.js
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import moment from "moment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./home.css";
import { updateTransactionAPI, deleteTransactionAPI } from "../../utils/ApiRequest";
import axios from "axios";

const TableData = (props) => {
  const [show, setShow] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [currId, setCurrId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState(null);

  const [values, setValues] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
  });

  // Handler for clicking the edit icon:
  const handleEditClick = (itemKey) => {
    console.log("Clicked button ID:", itemKey);
    const editTranArr = props.data.filter((item) => item._id === itemKey);
    if (editTranArr.length) {
      const editTran = editTranArr[0];
      setCurrId(itemKey);
      setEditingTransaction(editTran);
      // Pre-populate form values from the selected transaction
      setValues({
        title: editTran.title,
        amount: editTran.amount,
        description: editTran.description,
        category: editTran.category,
        date: editTran.date ? editTran.date.split("T")[0] : "",
        transactionType: editTran.transactionType,
      });
      handleShow();
    }
  };

  // Handler for editing (updating) a transaction.
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${updateTransactionAPI}/${currId}`, values);
      if (data.success) {
        handleClose();
        setRefresh((prev) => !prev);
        // Optionally, you can also update the state without reloading:
        window.location.reload();
      } else {
        console.error("Error updating transaction:", data.message);
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  // Handler for clicking the delete icon.
  const handleDeleteClick = async (itemKey) => {
    console.log("Clicked button ID for delete:", itemKey);
    setCurrId(itemKey);
    try {
      const { data } = await axios.post(`${deleteTransactionAPI}/${itemKey}`, {
        userId: props.user?._id,
      });
      if (data.success) {
        setRefresh((prev) => !prev);
        window.location.reload();
      } else {
        console.error("Error deleting transaction:", data.message);
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    setUser(props.user);
    setTransactions(props.data);
  }, [props.data, props.user, refresh]);

  return (
    <>
      <Container>
        <Table responsive="md" className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {props.data.map((item) => (
              <tr key={item._id}>
                <td>{moment(item.date).format("YYYY-MM-DD")}</td>
                <td>{item.title}</td>
                <td>{item.amount}</td>
                <td>{item.transactionType}</td>
                <td>{item.category}</td>
                <td>
                  <div className="icons-handle">
                    <EditNoteIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleEditClick(item._id)}
                    />
                    <DeleteForeverIcon
                      sx={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleDeleteClick(item._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal for editing a transaction */}
      {editingTransaction && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Transaction Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder={editingTransaction.title}
                  value={values.title}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  name="amount"
                  type="number"
                  placeholder={editingTransaction.amount}
                  value={values.amount}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSelect">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                >
                  <option value="">{editingTransaction.category}</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Rent">Rent</option>
                  <option value="Salary">Salary</option>
                  <option value="Tip">Tip</option>
                  <option value="Food">Food</option>
                  <option value="Medical">Medical</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder={editingTransaction.description}
                  value={values.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSelect1">
                <Form.Label>Transaction Type</Form.Label>
                <Form.Select
                  name="transactionType"
                  value={values.transactionType}
                  onChange={handleChange}
                >
                  <option value="">{editingTransaction.transactionType}</option>
                  <option value="credit">Credit</option>
                  <option value="expense">Expense</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default TableData;
