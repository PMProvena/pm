/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateProject } from "@/hooks/projects/useCreateProject";
import { useCreateMilestonesBulk } from "@/hooks/projects/useCreateMilestonesBulk";

const industries = [
  "FinTech",
  "HealthTech",
  "E-Commerce",
  "EdTech",
  "SaaS",
  "Mobile Apps",
];
const difficulties = ["Beginner", "Intermediate", "Advanced"];
const skills = [
  "Mentor",
  "Product Designer",
  "Fullstack Developer",
  "Frontend Developer",
  "Backend Developer",
  "DevOps Engineer",
  "Mobile App Developer",
];

export default function CreateProjectForm() {
  const navigate = useNavigate();

  const [projectId, setProjectId] = useState<number | null>(null);

  const createProjectMutation = useCreateProject();
  const createMilestonesMutation = useCreateMilestonesBulk(projectId ?? 0);

  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teamSize, setTeamSize] = useState(1);
  const [difficulty, setDifficulty] = useState("");
  const [objectives, setObjectives] = useState<string[]>([""]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [price, setPrice] = useState<number | "">("");
  const [timeline, setTimeline] = useState(1);
  const [showMilestoneStep, setShowMilestoneStep] = useState(false);
  // const [error, setError] = useState("");

  const handleSkillToggle = (skill: string) => {
    let updatedSkills: string[];

    if (selectedSkills.includes(skill)) {
      // Unselect skill
      updatedSkills = selectedSkills.filter((s) => s !== skill);
    } else {
      // Add skill — but limit to team size
      if (selectedSkills.length >= teamSize) {
        toast.error(
          `You can only select ${teamSize} team member${
            teamSize > 1 ? "s" : ""
          }.`
        );
        return;
      }
      updatedSkills = [...selectedSkills, skill];
    }

    setSelectedSkills(updatedSkills);
  };

  const handleObjectiveChange = (index: number, value: string) => {
    const updated = [...objectives];
    updated[index] = value;
    setObjectives(updated);
  };

  const addObjective = () => setObjectives([...objectives, ""]);
  const removeObjective = (index: number) =>
    setObjectives(objectives.filter((_, i) => i !== index));

  // Add these states at the top
  const [milestones, setMilestones] = useState([
    {
      week: 1,
      // status: "pending",
      due_date: "",
      title: "",
      description: "",
      deliverables: [""],
    },
  ]);

  // Handlers
  const handleMilestoneChange = (index: number, field: string, value: any) => {
    const updated = [...milestones];
    (updated[index] as any)[field] = value;
    setMilestones(updated);
  };

  const handleDeliverableChange = (
    mIndex: number,
    dIndex: number,
    value: string
  ) => {
    const updated = [...milestones];
    updated[mIndex].deliverables[dIndex] = value;
    setMilestones(updated);
  };

  const addDeliverable = (mIndex: number) => {
    const updated = [...milestones];
    updated[mIndex].deliverables.push("");
    setMilestones(updated);
  };

  const removeDeliverable = (mIndex: number, dIndex: number) => {
    const updated = [...milestones];
    updated[mIndex].deliverables.splice(dIndex, 1);
    setMilestones(updated);
  };

  const addMilestone = () => {
    // Validate current milestones before adding a new one
    for (let i = 0; i < milestones.length; i++) {
      const ms = milestones[i];
      if (!ms.title || !ms.description || !ms.due_date) {
        return toast.error(
          `Please complete all fields for milestone week ${ms.week} before adding a new one.`
        );
      }
    }

    setMilestones([
      ...milestones,
      {
        week: milestones.length + 1,
        // status: "pending",
        due_date: "",
        title: "",
        description: "",
        deliverables: [""],
      },
    ]);
  };

  const handleCreateProject = () => {
    const payload = {
      title,
      industry: selectedIndustry!,
      description,
      objectives: objectives.filter(Boolean),
      required_skills: selectedSkills,
      duration: `${timeline} weeks`,
      difficulty,
      team_size: teamSize,
      price: Number(price),
    };

    createProjectMutation.mutate(payload, {
      onSuccess: (res) => {
        console.log("Project created:", res.project);
        setShowMilestoneStep(true);
        // store the ID for creating milestones
        setProjectId(Number(res.project._id));
      },
    });
  };

  const handleSaveMilestones = () => {
    const validMilestones = milestones.filter(
      (ms) =>
        ms.title.trim() !== "" &&
        ms.description.trim() !== "" &&
        ms.due_date.trim() !== "" &&
        ms.deliverables.some((d) => d.trim() !== "")
    );

    if (validMilestones.length === 0) {
      return toast.error("Please add at least one valid milestone.");
    }

    createMilestonesMutation.mutate(
      { milestones: validMilestones },
      {
        onSuccess: () => {
          navigate("/admin/projects");
        },
      }
    );
  };

  useEffect(() => {
    if (selectedSkills.length > teamSize) {
      setSelectedSkills((prev) => prev.slice(0, teamSize));
    }
  }, [teamSize, selectedSkills]);

  if (!selectedIndustry)
    return (
      <Card className="p-6 space-y-3 max-w-[600px] w-full mx-auto mt-10">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold">Select Industry</h2>
          <button
            onClick={() => navigate("/admin/projects")}
            className="text-sm text-gray-500 font-semibold cursor-pointer"
          >
            Go Back
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {industries.map((ind) => (
            <Button
              key={ind}
              variant="outline"
              onClick={() => setSelectedIndustry(ind)}
              className="cursor-pointer"
            >
              {ind}
            </Button>
          ))}
        </div>
      </Card>
    );

  if (showMilestoneStep)
    return (
      <Card className="p-6 space-y-3 max-w-[600px] w-full mx-auto mt-10">
        <h2 className="text-lg font-semibold">Create Project Milestones</h2>
        {milestones.map((ms, mIndex) => (
          <div key={mIndex} className="border p-4 rounded space-y-2">
            <h3 className="font-medium">Week {ms.week}</h3>

            <Input
              placeholder="Milestone Title"
              value={ms.title}
              onChange={(e) =>
                handleMilestoneChange(mIndex, "title", e.target.value)
              }
            />

            <Textarea
              placeholder="Milestone Description"
              value={ms.description}
              onChange={(e) =>
                handleMilestoneChange(mIndex, "description", e.target.value)
              }
            />

            <DatePicker
              selected={ms.due_date ? new Date(ms.due_date) : null}
              onChange={(date: Date | null) =>
                handleMilestoneChange(
                  mIndex,
                  "due_date",
                  date ? date.toISOString().split("T")[0] : ""
                )
              }
              placeholderText="Select due date"
              className="border rounded text-sm py-1 px-2 w-[150px]! cursor-pointer"
              dateFormat="yyyy-MM-dd"
            />

            {/* <select
              value={ms.status}
              onChange={(e) =>
                handleMilestoneChange(mIndex, "status", e.target.value)
              }
              className="border rounded p-2 w-full text-sm"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select> */}

            <div className="space-y-1">
              <span className="font-medium">Deliverables:</span>
              {ms.deliverables.map((d, dIndex) => (
                <div key={dIndex} className="flex items-center gap-2">
                  <Input
                    placeholder={`Deliverable ${dIndex + 1}`}
                    value={d}
                    onChange={(e) =>
                      handleDeliverableChange(mIndex, dIndex, e.target.value)
                    }
                  />
                  <Button
                    variant="ghost"
                    onClick={() => removeDeliverable(mIndex, dIndex)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => addDeliverable(mIndex)}
              >
                + Add Deliverable
              </Button>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={addMilestone}
        >
          + Add Milestone
        </Button>

        <Button onClick={handleSaveMilestones} className="cursor-pointer">
          {createMilestonesMutation.isPending ? "Saving..." : "Save Milestones"}
        </Button>

        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => navigate("/admin/projects")}
        >
          ← Back to Project
        </Button>
      </Card>
    );

  return (
    <Card className="p-6 space-y-5 max-w-[600px] w-full mx-auto mt-10">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl font-semibold">
          Create New Project ({selectedIndustry})
        </h2>
        <button
          onClick={() => setSelectedIndustry(null)}
          className="text-sm text-gray-500 font-semibold cursor-pointer"
        >
          Go Back
        </button>
      </div>

      <Input
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Team Size */}
      <div className="flex items-center gap-3">
        <span className="font-medium">Team Size:</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTeamSize((v) => Math.max(1, v - 1))}
        >
          -
        </Button>
        <span>{teamSize}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTeamSize((v) => v + 1)}
        >
          +
        </Button>
      </div>

      {/* Skills Dropdown */}
      <div>
        <span className="font-medium">Team Skilled Members:</span>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {skills.map((skill) => (
            <label key={skill} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill)}
                onChange={() => handleSkillToggle(skill)}
              />
              {skill}
            </label>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedSkills.map((s) => (
            <Badge
              key={s}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {s}
              <button onClick={() => handleSkillToggle(s)}>✕</button>
            </Badge>
          ))}
        </div>
        {/* Instant error message */}
        {/* {error && <p className="text-red-600 text-sm mt-2">{error}</p>} */}
      </div>

      {/* Difficulty */}
      <div>
        <span className="font-medium">Difficulty:</span>
        <select
          className="border rounded p-2 w-full mt-1 text-sm"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Select difficulty</option>
          {difficulties.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Objectives */}
      <div>
        <span className="font-medium">Project Objectives:</span>
        {objectives.map((obj, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <Input
              placeholder={`Objective ${index + 1}`}
              value={obj}
              onChange={(e) => handleObjectiveChange(index, e.target.value)}
            />
            <Button variant="ghost" onClick={() => removeObjective(index)}>
              ✕
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addObjective} className="mt-2">
          + Add Objective
        </Button>
      </div>

      {/* Pricing */}
      <div>
        <span className="font-medium">Pricing (₦):</span>
        <Input
          placeholder="Enter price"
          value={price ? formatCurrency(Number(price)) : ""}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9]/g, "");
            setPrice(val ? Number(val) : "");
          }}
        />
      </div>

      {/* Timeline */}
      <div className="flex items-center gap-3">
        <span className="font-medium">Project Timeline:</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTimeline((v) => Math.max(1, v - 1))}
        >
          -
        </Button>
        <span>{timeline} weeks</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTimeline((v) => v + 1)}
        >
          +
        </Button>
      </div>

      <Button
        onClick={handleCreateProject}
        disabled={createProjectMutation.isPending}
        className="cursor-pointer"
      >
        {createProjectMutation.isPending ? "Creating..." : "Create Project"}
      </Button>
    </Card>
  );
}
