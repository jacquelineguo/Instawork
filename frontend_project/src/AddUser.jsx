import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userAdded } from "./usersSlice";
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import EditComponent from "./EditComponent";


export function AddUser() {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setAdmin] = useState(false);

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleAdmin = (e) => {
    if (e.target.value === 'admin'){
        setAdmin(true);
    } else {
        setAdmin(false);
    }
  };

  const usersAmount = useSelector((state) => state.users.entities.length);
  const navigate = useNavigate()
  const handleBack = () => {navigate('/', {replace: false})};

  const handleClick = () => {
    if (firstName && lastName && email && phone) {
      dispatch(
        userAdded({
          id: usersAmount + 1,
          firstName,
          lastName,
          email,
          phone,
          isAdmin
        })
      );

      navigate(`/`, { replace: false });
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAdmin(false);
  };

  return (
    <>
    <div className="d-flex flex-column align-items-center mt-5">

    <div class="d-flex justify-content-end w-auto">
        <div onClick={handleBack}>
                <i class="far fa-window-close fa-2x float-end text-primary" /> 
        </div>
    </div>
        <MDBListGroup style={{ minWidth: '25rem' }} light>
        <MDBListGroupItem className='d-flex justify-content-between'>
            <div className="flex-column">
                <h1>Add a team member</h1>
                <div className="text-secondary fs-4">Set email, locaiton, and role.</div>
            </div>
        </MDBListGroupItem>
        {EditComponent(firstName, lastName, email, phone, handleFirstName, handleLastName, handleEmail, handlePhone)}
                </MDBListGroup>
        <MDBListGroup style={{ minWidth: '25rem' }} light>
            <MDBListGroupItem>

            <div className="flex-column d-grid gap-3">
                <label htmlFor="nameInput"><h3>Role</h3></label>
                <div class="d-flex justify-content-between">
                    <label class="form-check-label fs-5" for="regularId">
                        Regular - Can't delete members
                    </label>
                    <input class="form-check-input" type="radio" onChange={handleAdmin} name="regular" id="regularId" value="regular" checked={!isAdmin}/>
                </div>
            </div>
            </MDBListGroupItem>
            <MDBListGroupItem>
                <div class="d-flex justify-content-between">
                    <label class="form-check-label fs-5" for="adminId">
                        Admin - Can delete members
                    </label>
                    <input class="form-check-input" type="radio" onChange={handleAdmin} name="admin" id="adminId" value="admin" checked={isAdmin}/>
                </div>
            </MDBListGroupItem>
            <MDBListGroupItem>
                <button onClick={handleClick} className="button-primary float-end">
                    Save
                </button>
            </MDBListGroupItem>
        </MDBListGroup>
                
    </div>
    </>
  );
}