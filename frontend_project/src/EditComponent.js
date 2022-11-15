import { MDBListGroupItem } from 'mdb-react-ui-kit';

const EditComponent = 
(firstName, lastName, email, phone, handleFirstName, handleLastName, handleEmail, handlePhone) => {
    return(
        <>
    <MDBListGroupItem className='d-flex justify-content-between'>
            <div className="flex-column d-grid gap-3">
                <label htmlFor="firstNameId"><h3>Info</h3></label>
                <input
                    className="u-full-width"
                    type="text"
                    placeholder="Firstname, e.g. Charlene"
                    id="firstNameId"
                    onChange={handleFirstName}
                    value={firstName}
                />
                <input
                    className="u-max-full-width"
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
    </>
    ); }

export default EditComponent;