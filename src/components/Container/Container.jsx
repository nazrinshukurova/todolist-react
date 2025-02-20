import React, { useState } from "react";
import { Input, Button, Checkbox } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./Container.css";
import Calendar from "../../shared/Calendar";

const Container = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleMyInputs = (e) => {
    setNewTodo(e.target.value);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
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

  return (
    <div className="mainBody">
      <div className="bgPhoto"></div>

      <div className="allInputs">
        <Calendar />
        <div className="listBox">
          <Input className="whatToDo"
            value={newTodo}
            onChange={handleMyInputs}
            placeholder="Add new todo..."
          />
          <Button className="addButton" onClick={handleSubmit}>
            Add new Item
          </Button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
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
