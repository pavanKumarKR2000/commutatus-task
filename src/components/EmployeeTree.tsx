"use client";

import { useEmployee } from "@/zustand/store";
import React from "react";
import "./EmployeeTree.css";

const docArray = [];

function buildHierarchy(employees, managerId = "") {
  console.log(employees);
  const subordinates = employees.filter((emp) => emp.managerId === managerId);
  console.log(subordinates);
  if (subordinates.length === 0) return null;

  const tree = [];
  subordinates.forEach((subordinate) => {
    const node = {
      ...subordinate,
      subordinates: buildHierarchy(employees, subordinate.id),
    };
    tree.push(node);
  });
  return tree;
}

function printTree(node, depth = 0) {
  let docHTML = `<div class="emp-hir-section"><span>${'<span class="box"></span>'.repeat(
    depth
  )}</span> <div class="emp-section"> <span>${node.name}</span></div></div>`;
  docArray.push({ node, depth });
  if (node.subordinates) {
    node.subordinates.forEach((subordinate) =>
      printTree(subordinate, depth + 1)
    );
  }
}

const EmployeeTree = () => {
  const employees = useEmployee((store) => store.employees);
  const hierarchy = buildHierarchy(employees);
  if (hierarchy) {
    hierarchy.forEach((root) => printTree(root));
  }
  console.log(employees);
  console.log(docArray);
  return (
    <div>
      {docArray.map((arr) => (
        <div className="emp-hir-section" key={arr.name}>
          <span>
            {arr.length > 0 &&
              arr.depth.map((arr) => (
                <span key={arr.name} className="box"></span>
              ))}
          </span>
          <div className="emp-section">
            {" "}
            <span>{arr.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeTree;
