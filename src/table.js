import React from "react";
import "./App.css"
import { Button, Flex } from 'antd';

export const Tables = ({ userData, handleDelete, handleEdit, handleCheckboxChange, handleSelectAll, isAllChecked, checkedItems }) => {
    return (
        <div className="supertb">
        <table  className="tablemain">
            <thead>
                <tr className="trtables">
                    <td className="trtabless">Firstname</td>
                    <td className="trtabless">Lastname</td>
                    <td className="trtabless">Email</td>
                    <td className="trtabless">Subject</td>
                    <td className="trtabless">Delete</td>
                    <td className="trtabless">Edit</td>
                    <td className="trtabless">
                        <input type="checkbox"
                            checked={isAllChecked}
                            onChange={handleSelectAll} />
                    </td>
                </tr>
            </thead>
            <tbody>
                {userData?.map((item, index) => {
                    return (
                        <tr>
                            <td className="trtables">{item?.fname}</td>
                            <td className="trtables">{item?.lname}</td>
                            <td className="trtables">{item?.email}</td>
                            <td className="trtables">{item?.subject}</td>
                            <td className="trtables"><Button type="primary" danger onClick={() => handleDelete(index)}>Delete</Button></td>
                            <td className="trtables"><button className="editbtn" onClick={() => handleEdit(index)}>Edit</button></td>
                            <td className="trtables">
                                <input type="checkbox" checked={checkedItems.includes(index)}
                                    onChange={() => handleCheckboxChange(index)} />
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
    )
}