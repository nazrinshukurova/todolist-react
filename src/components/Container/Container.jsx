import React, { useState } from "react";
import { Input, Button, Checkbox } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Calendar from "../../shared/Calendar";
import "./Container.css";

const Container = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleMyInputs = (e) => {
    setNewTodo(e.target.value);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      setTodos([
        ...todos,
        { id: todos.length + 1, text: newTodo, completed: false },
      ]);
      setNewTodo("");
    }
  };

  const handleToggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    setEditingId(null);
    setEditedText("");
  };

  const handleSaveEdit = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: editedText } : todo
      )
    );
    setEditingId(null);
    setEditedText("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedText("");
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mainBody">
      <div className="bgPhoto"></div>

      <div className="allInputs">
        <Calendar />
        <div className="listBox">
          <Input
            className="whatToDo"
            value={newTodo}
            onChange={handleMyInputs}
            placeholder="Add new todo..."
            style={{ marginBottom: "10px" }}
          />
          <Input
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search todos..."
            className="whatToDo"
          />
          <Button className="addButton" onClick={handleSubmit}>
            Add new Item
          </Button>
          <ul>
            {filteredTodos.map((todo) => (
              <li className="toDoContainer" key={todo.id}>
                <Checkbox
                  className="listBox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                />
                {editingId === todo.id ? (
                  <>
                    <Input
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      style={{ width: "150px", marginRight: "5px" }}
                    />
                    <Button
                      className="verifyButton"
                      onClick={() => handleSaveEdit(todo.id)}
                    >
                      <CheckOutlined />
                    </Button>

                    <Button
                      onClick={handleCancelEdit}
                      style={{ marginLeft: "5px" }}
                    >
                      <CloseOutlined />
                    </Button>
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                        color: todo.completed ? "red" : "black",
                      }}
                    >
                      {todo.text}
                    </span>
                    <Button
                      style={{ marginLeft: "5px" }}
                      onClick={() => handleEdit(todo.id, todo.text)}
                    >
                      <EditOutlined />
                    </Button>
                    <Button
                      style={{ marginLeft: "5px" }}
                      onClick={() => handleDelete(todo.id)}
                    >
                      <DeleteOutlined />
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Container;
