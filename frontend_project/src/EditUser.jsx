import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { useState } from "react";
import { userUpdated, userDeleted } from "./usersSlice";
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import EditComponent from "./EditComponent";

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
  const [isAdmin, setAdmin] = useState(user.isAdmin);

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleAdmin = (e) => {
    if (e.target.value === 'admin'){
        setAdmin(true);
    } else {
        setAdmin(false);
    }
  };
  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
    navigate(`/`, { replace: false });
  };
  const handleBack = () => {navigate('/', {replace: false})};

  const handleClick = () => {
    if (firstName && lastName && email && phone) {
        dispatch(
            userUpdated({
            id: userId,
            firstName,
            lastName,
            email,
            phone,
            isAdmin,
          })
        );

      navigate(`/`, { replace: false });
    }
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
                <h1>Edit team member</h1>
                <div className="text-secondary fs-4">Edit contact info, locaiton, and role.</div>
            </div>
        </MDBListGroupItem>
        {EditComponent(firstName, lastName, email, phone, handleFirstName, handleLastName, handleEmail, handlePhone)}
                </MDBListGroup>
        <MDBListGroup style={{ minWidth: '22rem' }} light>
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
            <MDBListGroupItem class="d-flex justify-content-between">
                <div>
                    <label class="form-check-label fs-5" for="adminId">
                        Admin - Can delete members
                    </label>
                </div>
                    <input class="form-check-input" type="radio" onChange={handleAdmin} name="admin" id="adminId" value="admin" checked={isAdmin}/>
            </MDBListGroupItem>
            <MDBListGroupItem>
                <button onClick={() => handleDelete(userId)} className="text-danger">Delete</button>
                <button onClick={handleClick} className="button-primary float-end">
                    Save
                </button>
            </MDBListGroupItem>
        </MDBListGroup>
                
    </div>
    </>
  );
}