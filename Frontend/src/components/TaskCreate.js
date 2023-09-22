import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Grid,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

const TaskCreate = () => {

  const [checked, setChecked] = React.useState(false);

  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: checked
  });


  const handleCheckbox = (event) => {
    setChecked(event.target.checked);
    setTask({ ...task, status: event.target.checked })
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Performing form validation here
    if (task.title.trim() === '' || task.description.trim() === '') {
      alert('Please fill in all fields');
      return;
    }
    console.log(task)
    // Calling function to create a task
    try {
      await axios.post("http://localhost:8080/createtask", {
        ...task
      });
      alert("Task created successfully!");

    } catch (error) {
      console.error("Error creating task:", error);
    }

    // Redirecting to the task listing page after task creation
    navigate('/');
  };

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Create New Task</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Title"
              variant="outlined"
              fullWidth
              value={task.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
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
              value={task.dueDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} >
            <span style={{ fontWeight: "bold" }}>Completed</span><Checkbox
              checked={checked}
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
              Create Task
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

export default TaskCreate;
