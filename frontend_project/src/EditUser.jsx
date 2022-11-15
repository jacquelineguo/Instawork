import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { useState } from "react";
import { userUpdated, userDeleted } from "./usersSlice";
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';


export function EditUser() {
  const { pathname } = useLocation();
  console.log(pathname)
  const userId = parseInt(pathname.replace("/edit-user/", ""));

  const user = useSelector((state) =>
    state.users.entities.find((user) => user.id === userId)
  );

  console.log(userId)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState(null);

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
    navigate(`/`, { replace: false });
  };

  const handleClick = () => {
    if (firstName && lastName && email && phone) {
        dispatch(
            userUpdated({
            id: userId,
            firstName,
            lastName,
            email,
            phone,
          })
        );

      setError(null);
      navigate(`/`, { replace: false });
    } else {
      setError("Fill in all fields");
    }
  };

  return (
    <>
    <div>
        <div class="col-sm-6"><p class="float-start"></p></div> 
        <div class="col-lg-6">
                <i class="far fa-window-close fa-2x float-end text-primary" /> 
        </div>
    </div>
    <div className="d-flex justify-content-around">
        <MDBListGroup style={{ minWidth: '22rem' }} light>
        <MDBListGroupItem className='d-flex justify-content-between'>
            <div className="flex-column">
                <h1>Edit team member</h1>
                <div className="text-secondary fs-4">Edit contact info, locaiton, and role.</div>
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
                <label htmlFor="nameInput"><h3>Role</h3></label>
                <ul class="list-group list-group-light d-grid gap-3">
                    <li class="list-group-item">
                    <label class="form-check-label fs-5" for="defaultCheck1">
                        Regular - Can't delete members
                    </label>
                    <input class="form-check-input " type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
                    </li>
                    <li class="list-group-item">
                    <label class="form-check-label fs-5" for="exampleRadios3">
                        Admin - Can delete members
                    </label>
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" disabled/>
                    </li>
                    <li>
                        <button onClick={() => handleDelete(userId)}>Delete</button>
                        <button onClick={handleClick} className="button-primary float-end">
                            Save
                        </button>
                    </li>
                </ul>
                
            </div>
        </MDBListGroupItem>
        
        </MDBListGroup>
        
        </div>
    </>
  );
}