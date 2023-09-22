import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Grid,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

const TaskEdit = () => {
  const [task, setTask] = useState({});

  const location = useLocation()

  // API call to fetch all tasks
  useEffect(() => {
    fetchTasksByid();
  }, []);

  const fetchTasksByid = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getbyid/${location.pathname.slice(7)}`);
      // console.log(response)
      setTask(response.data[0])
    } catch (err) {
      console.error("Error in fetching tasks:", err)
    }
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleCheckbox = (event) => {
    setTask({ ...task, status: event.target.checked })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Performing form validation here
    if (task.title.trim() === '' || task.description.trim() === '') {
      alert('Please fill in all fields');
      return;
    }

    // console.log(task)
    // Calling function to update the task
    try {
      await axios.patch(`http://localhost:8080/updatetask/${task._id}`, {
        ...task
      });
      alert("Task updated successfully!");

    } catch (error) {
      console.error("Error creating task:", error);
    }

    // Redirecting to the task listing page after task creation
    navigate('/');
  };

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              // label="Title"
              variant="outlined"
              fullWidth
              value={task.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              // label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={task.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="dueDate"
              label="Due Date"
              type="date"
              variant="outlined"
              inputProps={{
                min: new Date().toISOString().slice(0, 10)
              }}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={task.dueDate?.slice(0, 10)}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} >
            <span style={{ fontWeight: "bold" }}>Completed</span><Checkbox
              checked={task.status ? true : false}
              onChange={handleCheckbox}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Grid>
          <Grid item container style={{ justifyContent: "space-between" }} xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Update Task
            </Button>
            <Link to="/">
              <Button variant="outlined">Cancel</Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TaskEdit;
