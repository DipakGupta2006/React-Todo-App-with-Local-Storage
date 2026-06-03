import { useState, useEffect } from 'react'

function App() {
  // Load todos from localStorage once on app start
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todoMiniTodos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const [todo, setTodo] = useState("")
  const [editIndex, setEditIndex] = useState(null)

  // Update the input value as the user types
  const handleTodo = (e) => {
    setTodo(e.target.value)
  }

  const addTodo = (e) => {
    e.preventDefault()
    const work = todo.trim()

    if (work === '') {
      alert('Enter a valid todo')
      return
    }

    if (editIndex !== null) {
      // Update an existing todo text while preserving its completed state
      const updatedTodos = [...todos]
      updatedTodos[editIndex] = {
        ...updatedTodos[editIndex],
        text: work,
      }
      setTodos(updatedTodos)
      setEditIndex(null)
    } else {
      // Add a new todo item with completed=false
      setTodos([...todos, { text: work, completed: false }])
    }

    // Clear the input after add/update
    setTodo("")
  }

  const editTodo = (index) => {
    // Load the selected todo text into the input for editing
    setTodo(todos[index].text)
    setEditIndex(index)
  }

  const deleteTodo = (index) => {
    // Remove the item from the todo array
    const updatedTodos = todos.filter((_, i) => i !== index)
    setTodos(updatedTodos)
  }

  const toggleTodoCompleted = (index) => {
    // Toggle the completed state and render the item with <del> when checked
    const updatedTodos = todos.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    )
    setTodos(updatedTodos)
  }

  // Save todos to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem('todoMiniTodos', JSON.stringify(todos))
  }, [todos])

  return (
    <>
      <div className="contianer">
        <h1 className="heading">my todo app</h1>

        <div className="data">
          <h3 className="add">Add todo:&nbsp;</h3>
          <input type="text" name="" value={todo} onChange={handleTodo} id="" />
          <button onClick={addTodo}>{editIndex !== null ? 'Update Todo' : 'Add Todo'}</button>
        </div>


        <hr />

        <div className="list">
          <ul>
            {todos.map((item, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTodoCompleted(index)}
                />
                {' '}
                {item.completed ? <del>{item.text}</del> : item.text}
                {' '}
                <button onClick={() => editTodo(index)}>Edit</button>{' '}
                <button onClick={() => deleteTodo(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
