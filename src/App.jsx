import React, { useState } from "react";
import "./App.css";

const initialData = [
  { registerNo: "23IT001", name: "Arun Kumar", email: "arun@example.com", phone: "9876543210", department: "IT", year: "III", semester: "V" },
  { registerNo: "23IT002", name: "Bavithra S", email: "bavithra@example.com", phone: "9876543211", department: "IT", year: "III", semester: "V" },
  { registerNo: "22CS014", name: "Deepak Raj", email: "deepak@example.com", phone: "9876543212", department: "CSE", year: "IV", semester: "VII" },
  { registerNo: "24CS045", name: "Divya M", email: "divya@example.com", phone: "9876543213", department: "CSE", year: "II", semester: "III" },
  { registerNo: "25CS089", name: "Hariharan K", email: "hari@example.com", phone: "9876543214", department: "CSE", year: "I", semester: "I" },
  { registerNo: "23EC011", name: "Kavitha R", email: "kavitha@example.com", phone: "9876543215", department: "ECE", year: "III", semester: "V" },
  { registerNo: "24EC032", name: "Manojkumar T", email: "manoj@example.com", phone: "9876543216", department: "ECE", year: "II", semester: "III" },
  { registerNo: "22ME005", name: "Naveen Prasad", email: "naveen@example.com", phone: "9876543217", department: "MECH", year: "IV", semester: "VII" },
  { registerNo: "23ME028", name: "Praveen V", email: "praveen@example.com", phone: "9876543218", department: "MECH", year: "III", semester: "V" },
  { registerNo: "24IT055", name: "Sneha Priya L", email: "sneha@example.com", phone: "9876543219", department: "IT", year: "II", semester: "III" },
  { registerNo: "24CS102", name: "Vigneshwaran M", email: "vignesh@example.com", phone: "9876543220", department: "CSE", year: "II", semester: "III" },
  { registerNo: "25EC067", name: "Yuvashree N", email: "yuva@example.com", phone: "9876543221", department: "ECE", year: "I", semester: "I" }
];

export default function App() {
  const [students, setStudents] = useState(initialData);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);

  // Form State
  const [formData, setFormData] = useState({ registerNo: "", name: "", email: "", phone: "", department: "", year: "", semester: "" });
  const [formErrors, setFormErrors] = useState({});
  const [editStudent, setEditStudent] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [toast, setToast] = useState("");

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // KPI Calculations
  const deptCounts = students.reduce((acc, s) => { acc[s.department] = (acc[s.department] || 0) + 1; return acc; }, {});
  const yearCounts = { "I": 0, "II": 0, "III": 0, "IV": 0 };
  students.forEach(s => { if (yearCounts[s.year] !== undefined) yearCounts[s.year]++; });

  // Filtering & Sorting
  const filteredStudents = students
    .filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.registerNo.toLowerCase().includes(search.toLowerCase());
      const matchDept = !filterDept || s.department === filterDept;
      const matchYear = !filterYear || s.year === filterYear;
      return matchSearch && matchDept && matchYear;
    })
    .sort((a, b) => {
      let vA = a[sortField].toLowerCase();
      let vB = b[sortField].toLowerCase();
      if (vA < vB) return sortAsc ? -1 : 1;
      if (vA > vB) return sortAsc ? 1 : -1;
      return 0;
    });

  // Validation
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.registerNo.trim()) errors.registerNo = "Register Number is required.";
    else if (students.some(s => s.registerNo.toUpperCase() === formData.registerNo.trim().toUpperCase())) {
      errors.registerNo = "Duplicate Register Number.";
    }
    if (!formData.name.trim()) errors.name = "Student Name is required.";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Valid email is required.";
    if (!formData.phone.trim() || !/^[0-9]{10}$/.test(formData.phone)) errors.phone = "Valid 10-digit phone number is required.";
    if (!formData.department) errors.department = "Department is required.";
    if (!formData.year || !formData.semester) errors.year = "Year and Semester are required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setStudents([{ ...formData, registerNo: formData.registerNo.trim().toUpperCase() }, ...students]);
    setFormData({ registerNo: "", name: "", email: "", phone: "", department: "", year: "", semester: "" });
    setFormErrors({});
    triggerToast("Student added successfully!");
    setActiveTab("students");
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    setStudents(students.map(s => s.registerNo === editStudent.registerNo ? editStudent : s));
    setEditStudent(null);
    triggerToast("Student details updated!");
  };

  const handleDelete = () => {
    setStudents(students.filter(s => s.registerNo !== deleteCandidate.registerNo));
    triggerToast(`Deleted ${deleteCandidate.name}`);
    setDeleteCandidate(null);
  };

  return (
    <div className="sms-layout">
      {/* Sidebar Navigation */}
      <aside className="sms-sidebar">
        <div className="sms-brand">
          <h2>Student<span>ERP</span></h2>
          <p>Management System</p>
        </div>
        <nav className="sms-nav">
          <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>📊 Dashboard</button>
          <button className={activeTab === "students" ? "active" : ""} onClick={() => setActiveTab("students")}>🎓 Student List</button>
          <button className={activeTab === "add" ? "active" : ""} onClick={() => setActiveTab("add")}>➕ Add Student</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="sms-main">
        <header className="sms-header">
          <h1>{activeTab === "dashboard" ? "Dashboard Overview" : activeTab === "students" ? "Student Directory" : "Register Student"}</h1>
          <span className="badge">Admin Portal</span>
        </header>

        <div className="sms-content">
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div>
              <div className="stats-cards">
                <div className="card">
                  <h4>Total Students</h4>
                  <div className="card-num">{students.length}</div>
                  <p>Active enrollment</p>
                </div>
                <div className="card">
                  <h4>Departments</h4>
                  <div className="card-num">{Object.keys(deptCounts).length}</div>
                  <p>Academic branches</p>
                </div>
                <div className="card">
                  <h4>Academic Years</h4>
                  <div className="card-num">4</div>
                  <p>Year I to IV</p>
                </div>
              </div>

              <div className="dash-panels">
                <div className="panel">
                  <h3>Department-wise Count</h3>
                  <ul>
                    {Object.keys(deptCounts).map(d => (
                      <li key={d}><span><strong>{d}</strong></span><span className="pill">{deptCounts[d]} Students</span></li>
                    ))}
                  </ul>
                </div>

                <div className="panel">
                  <h3>Year-wise Summary</h3>
                  <ul>
                    {["I", "II", "III", "IV"].map(y => (
                      <li key={y}><span>Year <strong>{y}</strong></span><span className="pill">{yearCounts[y]} Enrolled</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STUDENT LIST */}
          {activeTab === "students" && (
            <div>
              <div className="filter-card">
                <input
                  type="text"
                  placeholder="🔍 Search name or reg number..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="search-bar"
                />
                <select value={filterDept} onChange={e => setFilterDept(e.target.value)}>
                  <option value="">All Departments</option>
                  <option value="IT">IT</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="MECH">MECH</option>
                </select>
                <select value={filterYear} onChange={e => setFilterYear(e.target.value)}>
                  <option value="">All Years</option>
                  <option value="I">Year I</option>
                  <option value="II">Year II</option>
                  <option value="III">Year III</option>
                  <option value="IV">Year IV</option>
                </select>
                <div style={{ marginLeft: "auto", fontSize: "14px", color: "#64748b" }}>
                  <strong>{filteredStudents.length}</strong> Records
                </div>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th onClick={() => { setSortField("registerNo"); setSortAsc(!sortAsc); }}>Register No ⬍</th>
                      <th onClick={() => { setSortField("name"); setSortAsc(!sortAsc); }}>Student Name ⬍</th>
                      <th>Department</th>
                      <th>Year/Sem</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map(s => (
                        <tr key={s.registerNo}>
                          <td><strong>{s.registerNo}</strong></td>
                          <td>{s.name}</td>
                          <td><span className="dept-tag">{s.department}</span></td>
                          <td>Year {s.year} / Sem {s.semester}</td>
                          <td>{s.email}</td>
                          <td>{s.phone}</td>
                          <td>
                            <button className="btn-sm btn-edit" onClick={() => setEditStudent(s)}>Edit</button>
                            <button className="btn-sm btn-del" onClick={() => setDeleteCandidate(s)}>Delete</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="7" style={{ textAlign: "center", padding: "30px", color: "#94a3b8" }}>No students match your filter criteria.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ADD STUDENT */}
          {activeTab === "add" && (
            <div className="form-card">
              <h3>Create Student Record</h3>
              <form onSubmit={handleAddSubmit}>
                <div className="grid-2">
                  <div>
                    <label>Register Number *</label>
                    <input
                      type="text"
                      placeholder="e.g. 23IT001"
                      value={formData.registerNo}
                      onChange={e => setFormData({ ...formData, registerNo: e.target.value })}
                    />
                    {formErrors.registerNo && <span className="err">{formErrors.registerNo}</span>}
                  </div>
                  <div>
                    <label>Student Name *</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                    {formErrors.name && <span className="err">{formErrors.name}</span>}
                  </div>
                  <div>
                    <label>Email Address *</label>
                    <input
                      type="email"
                      placeholder="student@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                    {formErrors.email && <span className="err">{formErrors.email}</span>}
                  </div>
                  <div>
                    <label>Phone Number (10 digits) *</label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      maxLength="10"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {formErrors.phone && <span className="err">{formErrors.phone}</span>}
                  </div>
                  <div>
                    <label>Department *</label>
                    <select value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })}>
                      <option value="">Select Department</option>
                      <option value="IT">IT</option>
                      <option value="CSE">CSE</option>
                      <option value="ECE">ECE</option>
                      <option value="MECH">MECH</option>
                    </select>
                    {formErrors.department && <span className="err">{formErrors.department}</span>}
                  </div>
                  <div>
                    <label>Year & Semester *</label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <select value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })}>
                        <option value="">Year</option>
                        <option value="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                      </select>
                      <select value={formData.semester} onChange={e => setFormData({ ...formData, semester: e.target.value })}>
                        <option value="">Semester</option>
                        <option value="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                        <option value="V">V</option>
                        <option value="VI">VI</option>
                        <option value="VII">VII</option>
                        <option value="VIII">VIII</option>
                      </select>
                    </div>
                    {formErrors.year && <span className="err">{formErrors.year}</span>}
                  </div>
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: "20px" }}>Add Student</button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Delete Modal */}
      {deleteCandidate && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to remove <strong>{deleteCandidate.name}</strong> ({deleteCandidate.registerNo})?</p>
            <div className="modal-btns">
              <button onClick={() => setDeleteCandidate(null)} className="btn-secondary">Cancel</button>
              <button onClick={handleDelete} className="btn-del-confirm">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editStudent && (
        <div className="modal-backdrop">
          <div className="modal-box" style={{ maxWidth: "540px" }}>
            <h3>Edit Student Record</h3>
            <form onSubmit={handleEditSave}>
              <div className="grid-2">
                <div>
                  <label>Register No</label>
                  <input type="text" value={editStudent.registerNo} disabled style={{ background: "#f1f5f9" }} />
                </div>
                <div>
                  <label>Name</label>
                  <input type="text" value={editStudent.name} onChange={e => setEditStudent({ ...editStudent, name: e.target.value })} required />
                </div>
                <div>
                  <label>Email</label>
                  <input type="email" value={editStudent.email} onChange={e => setEditStudent({ ...editStudent, email: e.target.value })} required />
                </div>
                <div>
                  <label>Phone</label>
                  <input type="tel" maxLength="10" value={editStudent.phone} onChange={e => setEditStudent({ ...editStudent, phone: e.target.value })} required />
                </div>
                <div>
                  <label>Department</label>
                  <select value={editStudent.department} onChange={e => setEditStudent({ ...editStudent, department: e.target.value })} required>
                    <option value="IT">IT</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                  </select>
                </div>
                <div>
                  <label>Year / Semester</label>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <select value={editStudent.year} onChange={e => setEditStudent({ ...editStudent, year: e.target.value })} required>
                      <option value="I">I</option>
                      <option value="II">II</option>
                      <option value="III">III</option>
                      <option value="IV">IV</option>
                    </select>
                    <select value={editStudent.semester} onChange={e => setEditStudent({ ...editStudent, semester: e.target.value })} required>
                      <option value="I">I</option>
                      <option value="II">II</option>
                      <option value="III">III</option>
                      <option value="IV">IV</option>
                      <option value="V">V</option>
                      <option value="VI">VI</option>
                      <option value="VII">VII</option>
                      <option value="VIII">VIII</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-btns" style={{ marginTop: "18px" }}>
                <button type="button" onClick={() => setEditStudent(null)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div className="sms-toast">{toast}</div>}
    </div>
  );
}
