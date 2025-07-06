import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const addTask = async () => {
  if (!newTask.task || !newTask.assigned || !newTask.due) return;

  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("tasks")
    .insert([
      {
        user_id: user.id,
        task: newTask.task,
        assigned: newTask.assigned,
        due: newTask.due,
        status: newTask.status,
        weekly_target: newTask.weeklyTarget,
      },
    ]);

  if (error) {
    alert("Failed to save task");
  } else {
    setTasks([...tasks, newTask]);
    setNewTask({ task: "", assigned: "", due: "", status: "Not Started", weeklyTarget: "" });
  }
};

export default function ForexProjectHub() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState({ task: "", assigned: "", due: "", status: "Not Started", weeklyTarget: "" });

  const [targets, setTargets] = useState(() => {
    const saved = localStorage.getItem("targets");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTarget, setNewTarget] = useState({ target: "", assigned: "" });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("targets", JSON.stringify(targets));
  }, [targets]);

  const addTask = () => {
    if (newTask.task && newTask.assigned && newTask.due) {
      setTasks([...tasks, newTask]);
      setNewTask({ task: "", assigned: "", due: "", status: "Not Started", weeklyTarget: "" });
    }
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const updateStatus = (index, status) => {
    const updated = [...tasks];
    updated[index].status = status;
    setTasks(updated);
  };

  const addTarget = () => {
    if (newTarget.target.trim() && newTarget.assigned.trim()) {
      setTargets([...targets, newTarget]);
      setNewTarget({ target: "", assigned: "" });
    }
  };

  const deleteTarget = (index) => {
    const updated = [...targets];
    updated.splice(index, 1);
    setTargets(updated);
  };

  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const progressPercent = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const getTargetsForPerson = (name) => {
    return targets.filter(t => t.assigned === name);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Forex Project Hub</h1>
        <div className="w-full sm:w-auto flex-1">
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-4 bg-black transition-all" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
        <span className="text-sm font-medium text-right w-12">{progressPercent}%</span>
      </div>

      <div className="bg-white shadow rounded p-4 space-y-4">
        <h2 className="text-xl font-semibold">Add New Task</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <input className="border p-2 rounded" placeholder="Task" value={newTask.task} onChange={(e) => setNewTask({ ...newTask, task: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Assigned To" value={newTask.assigned} onChange={(e) => setNewTask({ ...newTask, assigned: e.target.value })} />
          <input className="border p-2 rounded" type="date" value={newTask.due} onChange={(e) => setNewTask({ ...newTask, due: e.target.value })} />
          <select
            className="border p-2 rounded"
            value={newTask.weeklyTarget}
            onChange={(e) => setNewTask({ ...newTask, weeklyTarget: e.target.value })}
          >
            <option value="">Select Weekly Target</option>
            {getTargetsForPerson(newTask.assigned).map((target, idx) => (
              <option key={idx} value={target.target}>{target.target}</option>
            ))}
          </select>
        </div>
        <button className="bg-black text-white rounded px-4 py-2 mt-2" onClick={addTask}>Add</button>
      </div>

      <div className="bg-white shadow rounded p-4 space-y-4">
        <h2 className="text-xl font-semibold">Task Tracker</h2>
        <div className="space-y-2">
          {tasks.map((t, i) => (
            <div key={i} className="flex flex-col sm:flex-row justify-between items-center gap-2 p-2 border rounded">
              <div>
                <strong>{t.task}</strong> – {t.assigned} (Due: {t.due})<br />
                <span className="text-sm text-gray-600">Target: {t.weeklyTarget || "None"}</span>
              </div>
              <div className="flex gap-2 items-center">
                <select
                  value={t.status}
                  onChange={(e) => updateStatus(i, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => deleteTask(i)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow rounded p-4 space-y-4">
        <h2 className="text-xl font-semibold">Weekly Trading Targets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input className="border p-2 rounded" placeholder="Target" value={newTarget.target} onChange={(e) => setNewTarget({ ...newTarget, target: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Assigned To" value={newTarget.assigned} onChange={(e) => setNewTarget({ ...newTarget, assigned: e.target.value })} />
          <button className="bg-black text-white rounded px-4 py-2" onClick={addTarget}>Add</button>
        </div>
        <ul className="list-disc list-inside space-y-1">
          {targets.map((t, index) => (
            <li key={index} className="flex justify-between items-center">
              <span><strong>{t.target}</strong> – {t.assigned}</span>
              <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => deleteTarget(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold">Trade Notes & Strategy Ideas</h2>
        <textarea className="border rounded w-full p-2 mt-2" rows={6} placeholder="Write your trade setups, news notes, and strategy changes here..." />
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold">Backtesting Log</h2>
        <textarea className="border rounded w-full p-2 mt-2" rows={6} placeholder="Date | Pair | TF | Strategy | Result" />
      </div>
    </div>
  );
}
