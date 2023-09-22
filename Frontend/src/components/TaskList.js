import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Container,
  Grid,
} from '@mui/material';
import axios from 'axios';

const TaskList = () => {

  const [tasks, setTasks] = useState([])
  const [ID, setID] = useState(null)

  // API call to delete the tasks
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/deletetask/${id}`);
      // console.log(response)
      setID(null)
      alert("Task deleted successfully!");
    } catch (err) {
      console.error("Error in deleting tasks:", err)
    }
  }

  // API call to fetch all tasks
  useEffect(() => {
    console.log("effect")
    fetchTasks();
  }, [ID]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getalltasks');
      // console.log(response)
      setTasks(response.data)
    } catch (err) {
      console.error("Error in fetching tasks:", err)
    }
  };


  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Task List</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Map through tasks and render rows */}
          {tasks.map((task) => {
            return (<TableRow>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.dueDate.slice(0, 10)}</TableCell>
              <TableCell>{task.status ? "Completed" : "Not Completed"}</TableCell>
              <TableCell><Link to={`/Edit/:${task._id}`}><Button>Edit</Button></Link><Button onClick={() => {
                setID(task._id)
                handleDelete(task._id)}}>Delete</Button></TableCell>
            </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Grid item style={{ textAlign: "center", padding: "1rem" }}>
        <Link to="/create">
          <Button variant="contained" color="primary">
            Create New Task
          </Button>
        </Link>
      </Grid>

    </Container>
  );
};

export default TaskList;
