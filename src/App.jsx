import { useState, useEffect } from "react";
import { Card, CardContent } from "./omponents/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Progress } from "./components/ui/progress";

export default function ForexProjectHub() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState({ task: "", assigned: "", due: "", status: "Not Started" });

  const [targets, setTargets] = useState(() => {
    const saved = localStorage.getItem("targets");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTarget, setNewTarget] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("targets", JSON.stringify(targets));
  }, [targets]);

  const addTask = () => {
    if (newTask.task && newTask.assigned && newTask.due) {
      setTasks([...tasks, newTask]);
      setNewTask({ task: "", assigned: "", due: "", status: "Not Started" });
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
    if (newTarget.trim() !== "") {
      setTargets([...targets, newTarget]);
      setNewTarget("");
    }
  };

  const deleteTarget = (index) => {
    const updated = [...targets];
    updated.splice(index, 1);
    setTargets(updated);
  };

  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const totalItems = tasks.length + targets.length;
  const progressPercent = totalItems > 0 ? Math.round((completedTasks / totalItems) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Forex Project Hub</h1>
        <div className="flex-1 mx-6">
          <Progress value={progressPercent} className="h-4" />
        </div>
        <span className="text-sm font-medium w-12 text-right">{progressPercent}%</span>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">Add New Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <Input placeholder="Task" value={newTask.task} onChange={(e) => setNewTask({ ...newTask, task: e.target.value })} />
            <Input placeholder="Assigned To" value={newTask.assigned} onChange={(e) => setNewTask({ ...newTask, assigned: e.target.value })} />
            <Input type="date" value={newTask.due} onChange={(e) => setNewTask({ ...newTask, due: e.target.value })} />
            <Button onClick={addTask}>Add</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">Task Tracker</h2>
          <div className="space-y-2">
            {tasks.map((t, i) => (
              <div key={i} className="flex flex-col md:flex-row justify-between items-center gap-2 p-2 border rounded-xl">
                <div>
                  <strong>{t.task}</strong> – {t.assigned} (Due: {t.due})
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
                  <Button variant="destructive" size="sm" onClick={() => deleteTask(i)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">Weekly Trading Targets</h2>
          <div className="flex gap-2">
            <Input placeholder="Add new target..." value={newTarget} onChange={(e) => setNewTarget(e.target.value)} />
            <Button onClick={addTarget}>Add</Button>
          </div>
          <ul className="list-disc list-inside space-y-1">
            {targets.map((target, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{target}</span>
                <Button variant="destructive" size="sm" onClick={() => deleteTarget(index)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold">Trade Notes & Strategy Ideas</h2>
          <Textarea placeholder="Write your trade setups, news notes, and strategy changes here..." rows={8} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold">Backtesting Log</h2>
          <Textarea placeholder="Date | Pair | TF | Strategy | Result" rows={6} />
        </CardContent>
      </Card>
    </div>
  );
}