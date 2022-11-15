import { fetchUsers, userDeleted } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom'


export function UserList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);

  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
  };
  const navigate = useNavigate()
  const handleOnClick = (id) => navigate(`/edit-user/${id}`, { replace: false });

  const regularCount = useSelector((state) => state.users.entities.find(x => x.isAdmin).length);

  return (
    <div className="container">
        <div class="row">
            <div class="col-sm-6"><p class="float-start"></p></div> 
            <div class="col-lg-6">
                <Link to="/add-user">
                    <i class="fas fa-plus fa-2x float-end" />
                </Link>
            </div>
        </div>
        <div className="d-flex justify-content-center">
            <MDBListGroup light>
                <MDBListGroupItem className='d-flex justify-content-between'>
                <div className="flex-column">
                    <div >
                    <h1>Team members</h1>
                    <h1 className="text-secondary fs-4">{`You have ${regularCount} team members.`}</h1>
                    </div>
                </div>
                </MDBListGroupItem>
     
                {loading ? (
                "Loading..."
                ) : (
                    <>
                                {entities.length &&
                                entities.map(({ id, firstName, lastName, email, phone }, i) => (
                                <MDBListGroupItem className='d-flex justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <i class="far fa-user fa-4x text-secondary"></i>
                                    <div className="col-9 fs-5" key={i} onClick={()=>handleOnClick(id)}>
                                        <span class="font-weight-bold">{`${firstName} ${lastName}`}</span>
                                        <div className="text-secondary font-weight-normal">{phone}</div>
                                        <div className="text-secondary font-weight-normal">{email}</div>
                                        
                                    </div>

                                </div>
                                </MDBListGroupItem>
                        ))}
                    </>
                )}
            </MDBListGroup>
        </div>
        
                </div>

  );
}