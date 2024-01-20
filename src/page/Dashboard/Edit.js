import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function Edit({ employees, selectedemployee, setEmployees, setISEditing }) {
  const id = selectedemployee.id;

 
  const [firstName, setFirstName] = useState(selectedemployee.firstName);
  const [lastName, setLastName] = useState(selectedemployee.lastName);
  const [email, setEmail] = useState(selectedemployee.email);
  const [salary, setSalary] = useState(selectedemployee.salary);
  const [date, setDate] = useState(selectedemployee.date);

  
  useEffect(() => {
    setFirstName(selectedemployee.firstName);
    setLastName(selectedemployee.lastName);
    setEmail(selectedemployee.email);
    setSalary(selectedemployee.salary);
    setDate(selectedemployee.date);
  }, [selectedemployee]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !salary || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'All fields are required',
        showConfirmButton: true
      });
    }

    const updatedEmployee = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      salary: salary,
      date: date
    };

    const updatedEmployees = [...employees];
    const index = updatedEmployees.findIndex((employee) => employee.id === id);

    if (index !== -1) {
      updatedEmployees[index] = updatedEmployee;
      setEmployees(updatedEmployees);

      Swal.fire({
        icon: 'success',
        title: 'Updated',
        text: `${updatedEmployee.firstName} ${updatedEmployee.lastName}'s data has been updated`,
        showConfirmButton: false,
        timer: 1500
      });

      setISEditing(false);
    } else {
      
      console.error("Employee not found");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <form onSubmit={handleUpdate} className="space-y-4">
        <h1 className="text-2xl font-semibold mb-4">Update Employee</h1>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border rounded-md p-2 w-full"
        />

        <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border rounded-md p-2 w-full"
        />

        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-md p-2 w-full"
        />

        <label htmlFor="salary" className="block text-sm font-medium text-gray-600">
          Salary (₹)
        </label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="border rounded-md p-2 w-full"
        />

        <label htmlFor="date" className="block text-sm font-medium text-gray-600">
          Date
        </label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-md p-2 w-full"
        />

        <div className="mt-4 flex space-x-2">
          <input
            type="submit"
            value="Update"
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 cursor-pointer"
          />
          <input
            type="button"
            value="Cancel"
            onClick={() => setISEditing(false)}
            className="bg-gray-300 text-gray-600 rounded-md px-4 py-2 hover:bg-gray-400 cursor-pointer"
          />
        </div>
      </form>
    </div>
  )
}

export default Edit
