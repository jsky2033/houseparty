import { Props, useCallback, useContext, useState } from "react";
// import { AppStateContext } from '../App';

export default function TodoForm({ id, setId }) {
  //   const { state, dispatch } = useContext(AppStateContext);
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("");

  let name = "max";

  console.log(name);

  const dispatch = (obj) => {
    setId(obj.newTodo.id);
    name = "minnuie";
    console.log(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dispatch) {
      let status = taskStatus === "Complete" ? true : false;
      dispatch({
        type: "create",
        newTodo: { id: id++, task: taskName, isCompleted: status },
      });
    }
  };

  // useCallback();
  // (e: React.MouseEvent<HTMLFormElement>) => {
  //   if (dispatch) {
  //     let status = () => {{taskStatus}{""} === "Complete"}
  //     dispatch({ type: 'create', newTodo: { id: id++, task: {taskName}, isCompleted: false } });
  //   }
  // },
  // [dispatch]

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task Name:
        <input value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      </label>
      <label>
        Completion Status:
        <select
          id="Status"
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
        >
          <option value="Not Complete">Not Completed</option>
          <option value="Complete">Completed</option>
        </select>
      </label>
      <input type="submit" />
    </form>
  );
}
