import React, { useEffect, useState } from 'react';

const emptyForm = { firstName: '', email: '', password: '' };

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editIdx, setEditIdx] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(data);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setForm(emptyForm);
    setEditIdx(null);
    setShowForm(true);
  };

  const handleEdit = (idx) => {
    setForm({
      firstName: employees[idx].firstName,
      email: employees[idx].email,
      password: employees[idx].password,
    });
    setEditIdx(idx);
    setShowForm(true);
  };

  const handleDelete = (idx) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const updated = employees.filter((_, i) => i !== idx);
      setEmployees(updated);
      localStorage.setItem('employees', JSON.stringify(updated));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updated;
    if (editIdx !== null) {
      updated = employees.map((emp, i) =>
        i === editIdx ? { ...emp, ...form } : emp
      );
    } else {
      const newId = employees.length ? Math.max(...employees.map(e => e.id || 0)) + 1 : 1;
      updated = [...employees, { ...form, id: newId, taskCounts: { active: 0, newTask: 0, completed: 0, failed: 0 }, tasks: [] }];
    }
    setEmployees(updated);
    localStorage.setItem('employees', JSON.stringify(updated));
    setShowForm(false);
    setForm(emptyForm);
    setEditIdx(null);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-blue-400 drop-shadow mb-2">Manage Employees</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow font-semibold hover:bg-blue-700 focus:bg-blue-800 active:bg-blue-900 transition-colors" onClick={handleAdd}>Add Employee</button>
      </div>
      <div className="overflow-x-auto w-full max-w-full">
        <table className="min-w-[400px] bg-white rounded shadow text-black">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-100 font-bold text-black">Name</th>
              <th className="py-2 px-4 border-b bg-gray-100 font-bold text-black">Email</th>
              <th className="py-2 px-4 border-b bg-gray-100 font-bold text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr key={emp.id || idx} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-black">{emp.firstName}</td>
                <td className="py-2 px-4 border-b text-black">{emp.email}</td>
                <td className="py-2 px-4 border-b text-black">
                  <button className="text-blue-600 font-semibold mr-3 hover:underline" onClick={() => handleEdit(idx)}>Edit</button>
                  <button className="text-red-600 font-semibold hover:underline" onClick={() => handleDelete(idx)}>Delete</button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr><td colSpan="3" className="text-center py-4 text-black">No employees found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-30">
          <form className="bg-white p-8 rounded shadow max-w-sm w-full" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold mb-4 text-black">{editIdx !== null ? 'Edit' : 'Add'} Employee</h3>
            <div className="mb-4">
              <label className="block mb-1 text-black">Name</label>
              <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required className="w-full border px-3 py-2 rounded text-black" />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-black">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded text-black" />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-black">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full border px-3 py-2 rounded text-black" />
            </div>
            <div className="flex gap-4 mt-6">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
              <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => { setShowForm(false); setForm(emptyForm); setEditIdx(null); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageEmployees; 