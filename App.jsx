import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todoMiniTodos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const [todo, setTodo] = useState("")
  const [editIndex, setEditIndex] = useState(null)

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
      const updatedTodos = [...todos]
      updatedTodos[editIndex] = {
        ...updatedTodos[editIndex],
        text: work,
      }
      setTodos(updatedTodos)
      setEditIndex(null)
    } else {
      setTodos([...todos, { text: work, completed: false }])
    }

    setTodo("")
  }

  const editTodo = (index) => {
    setTodo(todos[index].text)
    setEditIndex(index)
  }

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index)
    setTodos(updatedTodos)
  }

  const toggleTodoCompleted = (index) => {
    const updatedTodos = todos.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    )
    setTodos(updatedTodos)
  }
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
