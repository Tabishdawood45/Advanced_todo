import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Row from './components/Row';

const url = 'http://localhost:3001/'

function App() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(url)
    .then(response => {
      // console.log('Fetched tasks:', response.data);
      setTasks(response.data) 
    }).catch(error => {
      console.error('Error fetching tasks:', error);
      alert(error.response?.data?.error ? error.response.data.error : error.message)
    })
  }, [])

  // const addTask = () => {
  //   // const headers = {headers: {Authorization:user.token}}
  //   axios.post(url + 'create', {
  //     description: task
  //   })
  //   .then(response => {
  //     console.log('Task added: ' ,response.data)
  //     setTasks([...tasks,{id: response.data.id,description: task}])
  //     setTask('')
  //   }).catch(error => {
  //       alert (error.response?.data?.error ? error.response.data.error : error)
  //   })
  // }
  const addTask = () => {
    axios.post(url + 'create', { description: task })
      .then(response => {
        const newTaskId = response.data.id?.id || response.data.id;
        const newTask = {
          id: newTaskId,
          description: task
        };
        setTasks([...tasks, newTask]);
        setTask('');
      })
      .catch(error => {
        // console.error('Error adding task:', error);
        alert(error.response?.data?.error ? error.response.data.error : error.message);
      });
  };
  
  // const addTask = () => {
  //   const token = localStorage.getItem('token'); // or wherever you're storing the token
  //   axios.post(url + 'create', { description: task }, {
  //     headers: {
  //       Authorization: `Bearer ${token}`  // Include the token in the Authorization header
  //     }
  //   })
  //   .then(response => {
  //     const newTaskId = response.data.id?.id || response.data.id;
  //     const newTask = {
  //       id: newTaskId,
  //       description: task
  //     };
  //     setTasks([...tasks, newTask]);
  //     setTask('');
  //   })
  //   .catch(error => {
  //     alert(error.response?.data?.error ? error.response.data.error : error.message);
  //   });
  // };
  
  // const deleteTask = (id) => {
  //   const token = localStorage.getItem('token'); // Same here for token
  //   axios.delete(url + 'delete/' + id, {
  //     headers: {
  //       Authorization: `Bearer ${token}`  // Include the token in the Authorization header
  //     }
  //   })
  //   .then(response => {
  //     const withoutRemoved = tasks.filter(item => item.id !== id);
  //     setTasks(withoutRemoved);
  //   })
  //   .catch(error => {
  //     alert(error.response?.data?.error ? error.response.data.error : error.message);
  //   });
  // };
  

  // const deleteTask = (id) => {
  //   // const headers = {headers: {Authorization:user.token}}
  //   axios.delete(url + 'delete/' + id) 
  //   .then(response => {
  //     const withoutRemoved = tasks.filter((item) => item.id !== id )
  //     setTasks(withoutRemoved)
  //   }).catch(error => {
  //       alert (error.response?.data?.error ? error.response.data.error : error)
  //   })
  // }


  const deleteTask = (id) => {
    axios.delete(url + 'delete/' + id)
      .then(response => {
        const withoutRemoved = tasks.filter(item => item.id !== id);
        setTasks(withoutRemoved);
      })
      .catch(error => {
        // console.error('Error deleting task:', error);
        alert(error.response?.data?.error ? error.response.data.error : error.message);
      });
  };
  
  return (
    <div id="container">
      <h3>Todos</h3>
      <form>
        <input type="Add new task" 
         value={task}
         onChange={e => setTask(e.target.value)}
         onKeyDown={e => {
           if (e.key === 'Enter') {
             e.preventDefault()
             addTask()
           }
         }}
          />
      </form>
      {/* <ul>
        {
          tasks.map(item => (
            <Row key={item.id} item={item} deleteTask={deleteTask} />
          ))
        }
      </ul> */}

<ul>
  {tasks.map(item => (
    <Row key={item.id} item={item} deleteTask={deleteTask} />
  ))}
</ul>

    </div>
  );
}

export default App;


// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';
// import Row from './components/Row';

// const url = 'http://localhost:3001/'; 

// function App() {
//   const [task, setTask] = useState(''); // Stores the current input value
//   const [tasks, setTasks] = useState([]); 

//   // Fetch tasks when the component mounts
//   useEffect(() => {
//     axios.get(url)  // Fetch tasks from backend
//       .then(response => setTasks(response.data))  // Update state with fetched tasks
//       .catch(error => {
//         alert(error.response?.data?.error ? error.response.data.error : error.message);
//       });
//   }, []);

//   // Add a new task
//   const addTask = () => {
//     if (!task.trim()) return; // Avoid adding empty tasks

//     axios.post(url + 'create', { description: task })  // POST new task to backend
//       .then(response => {
//         setTasks(prevTasks => [
//           ...prevTasks, 
//           { id: response.data.id, description: task }
//         ]);  // Update tasks state with new task
//         setTask('');  // Clear input field
//       })
//       .catch(error => {
//         alert(error.response?.data?.error ? error.response.data.error : error.message);  // Show error if any
//       });
//   };

//   // Delete a task
//   const deleteTask = (id) => {
//     axios.delete(url + 'delete/' + id) // Delete task by ID
//       .then(response => {
//         setTasks(prevTasks => prevTasks.filter((item) => item.id !== id)); // Remove task from state
//       })
//       .catch(error => {
//         alert(error.response?.data?.error ? error.response.data.error : error.message);
//       });
//   };
  
//   return (
//     <div id="container">
//       <h3>Todos</h3>
//       <form>
//         <input
//           placeholder="Add new task"
//           value={task}
//           onChange={(e) => setTask(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {
//               e.preventDefault();
//               addTask(); // Add task on Enter key
//             }
//           }}
//         />
//       </form>
      
//         <ul>



   
//   {
//   tasks.map(item => (
//     <Row 
//       key={item.id} 
//       item={item} 
//       deleteTask={deleteTask} 
//     />
//   ))
//   }
// </ul>

      
//     </div>
//   );
// }

// export default App;
