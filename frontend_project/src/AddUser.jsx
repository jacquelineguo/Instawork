import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userAdded } from "./usersSlice";
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';


export function AddUser() {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  const [error, setError] = useState(null);

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

      setError(null);
      navigate(`/`, { replace: false });
    } else {
      setError("Fill in all fields");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAdmin(false);
  };

  return (
    <>
    <div>
        <div class="col-sm-6"><p class="float-start"></p></div> 
        <div class="col-lg-6" onClick={handleBack}>
                <i class="far fa-window-close fa-2x float-end text-primary" /> 
        </div>
    </div>
    <div className="d-flex flex-column align-items-center mt-5">
        <MDBListGroup style={{ minWidth: '22rem' }} light>
        <MDBListGroupItem className='d-flex justify-content-between'>
            <div className="flex-column">
                <h1>Add a team member</h1>
                <div className="text-secondary fs-4">Set email, locaiton, and role.</div>
            </div>
        </MDBListGroupItem>
        <MDBListGroupItem className='d-flex justify-content-between'>
            <div className="flex-column d-grid gap-3">
                <label htmlFor="firstNameId"><h3>Info</h3></label>
                <input
                    className="u-full-width fs-5"
                    type="text"
                    placeholder="Firstname, e.g. Charlene"
                    id="firstNameId"
                    onChange={handleFirstName}
                    value={firstName}
                />
                <input
                    className="u-full-width fs-5"
                    type="text"
                    placeholder="Last Name, e.g. Pham"
                    id="lastNameId"
                    onChange={handleLastName}
                    value={lastName}
                />
                <input
                    className="u-full-width fs-5"
                    type="text"
                    placeholder="Email, e.g. charlene@instawork.com"
                    id="emailId"
                    onChange={handleEmail}
                    value={email}
                />
                <input
                    className="u-full-width fs-5"
                    type="text"
                    placeholder="Phone, e.g. 415-310-1619"
                    id="phoneId"
                    onChange={handlePhone}
                    value={phone}
                />
            </div>
         </MDBListGroupItem>
                </MDBListGroup>
        <MDBListGroup style={{ minWidth: '22rem' }} light>
            <MDBListGroupItem className='d-flex justify-content-between align-items-left'>

            <div className="flex-column d-grid gap-3">
                <label htmlFor="nameInput"><h3>Role</h3></label>
                <div>
                    <label class="form-check-label fs-5" for="adminId">
                        Regular - Can't delete members
                    </label>
                    <input class="form-check-input" type="radio" onChange={handleAdmin} name="admin" id="adminId" value="admin" checked={isAdmin}/>
                </div>
            </div>
            </MDBListGroupItem>
            <MDBListGroupItem >
                <div>
                    <label class="form-check-label fs-5" for="regularId">
                        Admin - Can delete members
                    </label>
                    <input class="form-check-input" type="radio" onChange={handleAdmin} name="regular" id="regularId" value="regular" checked={!isAdmin}/>
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