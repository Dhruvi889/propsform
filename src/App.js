import { useState } from 'react';
import './App.css';
import { Tables } from './table';

function App() {



  const [userDetails, setUserDetails] = useState({ email: "", subject: "", fname: "", lname: "" })
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")) || [])
  const [isEditing, setisEditing] = useState(false)
  const [editIndex, seteditIndex] = useState(null)
  const [selectedColumn, setSelectedColumn] = useState("fname");
  const [isSortedAsc, setisSortedAsc] = useState(true)
  const [search, setsearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [checkedItems, setcheckedItems] = useState([]);
  const [isAllchecked, setisAllchecked] = useState(false);

  const handleOnChange = (e) => {
    console.log(e.target.value, e.target.name);
    // destructuring 
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value })
  }

  const handleSubmit = () => {
    if (isEditing) {
      const updatedData = data.map((item, index) =>
        index === editIndex ? userDetails : item
      );

      setData(updatedData);
      localStorage.setItem("data", JSON.stringify(updatedData));
      setisEditing(false);
      seteditIndex(null);
    } else {
      setData([...data, userDetails]);
      localStorage.setItem("data", JSON.stringify([...data, userDetails]));
    }
    setUserDetails({ email: "", subject: "", fname: "", lname: "" });
  };

  const deleteData = (idx) => {
    setData(data?.filter((item, index) => { return (index !== idx) }))
    localStorage.setItem("data", JSON.stringify(data?.filter((item, index) => { return (index !== idx) })))
  }

  const editData = (idx) => {
    const selectedUser = data[idx];
    setUserDetails(selectedUser);
    setisEditing(true);
    seteditIndex(idx);
  }

  const sortbyfname = () => {
    const sortedData = [...data].sort((a, b) => {
      if (a.fname.toLowerCase() < b.fname.toLowerCase()) {
        return isSortedAsc ? -1 : 1;
      }
      if (a.fname.toLowerCase() > b.fname.toLowerCase()) {
        return isSortedAsc ? 1 : -1;
      }
      return 0;
    });
    setisSortedAsc(!isSortedAsc);
    setData(sortedData);
  };

  const sortTable = () => {
    const sortedData = [...data].sort((a, b) => {
      if (a[selectedColumn].toLowerCase() < b[selectedColumn].toLowerCase()) {
        return isSortedAsc ? -1 : 1;
      }
      if (a[selectedColumn].toLowerCase() > b[selectedColumn].toLowerCase()) {
        return isSortedAsc ? 1 : -1;
      }
      return 0;
    });
    setisSortedAsc(!isSortedAsc);
    setData(sortedData);
  };

  const handleSearch = () => {
    const filteredData = data.filter(item => {
      return (
        item.fname.toLowerCase().includes(search.toLowerCase()) ||
        item.lname.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.subject.toLowerCase().includes(search.toLowerCase())
      );
    });
    setData(filteredData);
  }
  const searchTable = () => {
    if (searchValue.trim() === "") {
      setData(JSON.parse(localStorage.getItem("data")) || []);
      return;
    }
    const filteredData = data.filter((item) =>
      item[selectedColumn].toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  }

  const Checkboxchange = (index) => {
    const updatedCheckedItems = checkedItems.includes(index)
      ? checkedItems.filter(item => item !== index)
      : [...checkedItems, index];
    setcheckedItems(updatedCheckedItems);
    setisAllchecked(updatedCheckedItems.length === data.length);
  };

  const SelectAll = () => {
    if (isAllchecked) {
      setcheckedItems([]);
    } else {
      setcheckedItems(data.map((idx, index) => index));
    }
    setisAllchecked(!isAllchecked);
  };

  const deleteSelected = () => {
    const updatedData = data.filter((idx, index) => !checkedItems.includes(index));
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));
    setcheckedItems([]);
    setisAllchecked(false);
  };

  console.log(data);
  console.log(userDetails);

  return (
    <>
      <div className='mainform'>
        <div className="form1">
          <div className="form2">
            <h1>Have Question ? Get In Touch !</h1>
            <div className="aab">
              <input className='inputname' type="text" id="firstName" value={userDetails.fname} onChange={(e) => handleOnChange(e)} name="fname" placeholder="First Name" />
              <input className='inputname' type="text" id="lastName" value={userDetails.lname} onChange={(e) => handleOnChange(e)} name="lname" placeholder="Last Name" />
            </div>
            <div className="aab">
              <input className='inputname' type="email" id="email" value={userDetails.email} onChange={(e) => handleOnChange(e)} name="email" placeholder="Email Address  " />
            
              <input className='inputname' type="Subject" id="subject" value={userDetails.subject} onChange={(e) => handleOnChange(e)} name="subject" placeholder=" Subject  " />
            </div>
            <div>
              <textarea className='texa' rows="3" cols="40" name="comment" form="usrform" placeholder='Enter text here...'>
              </textarea>

            </div>
            <div className='mainbuttons'>
              <div className="btn09">
                <button className='subbtn' onClick={() => handleSubmit()}>Submit Form</button>
             
                <button className='subbtn' onClick={() => sortbyfname()}>Sort by Firstname</button>
              </div>
              <div className='sortselected'>
                <select className='subbtn' id="sortColumn">
                  <option value="fname">Firstname</option>
                  <option value="lname">Lastname</option>
                  <option value="email">Email</option>
                  <option value="subject">Subject</option>

                </select>
                <button className='subbtn' onClick={() => sortTable()}>Sort</button>
              </div>
              <div className='sortselected'>
                <input className='subbtn' value={search} onChange={(e) => setsearch(e.target.value)} type='text' placeholder='Search' />
                <button className='subbtn' id='' onClick={handleSearch}>Search</button>
              </div>
              <div className='sortselected'>
                <select className='subbtn' value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value)} >
                  <option value="fname">Firstname</option>
                  <option value="lname">Lastname</option>
                  <option value="email">Email</option>
                  <option value="subject">Subject</option>

                </select>
                <input className='subbtn' type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search..." />
                <button className='subbtn' onClick={searchTable}>Search</button>
              </div>
              <div>
                <button className='deletebtns' onClick={() => deleteSelected()}>Delete selected</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* parent => child  = props */}
      {/* child => parent => lifting stateup  */}

      <Tables userData={data} handleDelete={(idx) => deleteData(idx)}
        handleEdit={(idx) => editData(idx)}
        handleCheckboxChange={(idx) => Checkboxchange(idx)}
        handleSelectAll={(idx) => SelectAll(idx)}
        isAllChecked={isAllchecked}
        checkedItems={checkedItems}
      />


    </>
  );
}

export default App;
