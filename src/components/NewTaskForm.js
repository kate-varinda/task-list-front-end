import { useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';

const INITIAL_FORM_DATA = {
  title: 'New Task',
  description: 'Task Desc',
};

const NewTaskForm = (props) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const changeData = (e) => {
    const newData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newData);
  };

  return (
    <form>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={changeData}
      />
      <input type="submit" value="Add Task" />
    </form>
  );
};

export default NewTaskForm;
