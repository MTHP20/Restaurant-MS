import React, { useState, useEffect } from 'react';
import '../css/User.css';
import logo from '../logo.png';
import avatar from '../profile-picture.png';
import '../fonts/Bayon-Regular.ttf';
import { Link } from 'react-router-dom';

/**
 * A component for prompting the user to input their allergy information.
 *
 * @param {Object} props - The props object.
 * @param {Function} props.onSave - A function to handle the saving of the allergy information.
 * @returns {JSX.Element} A JSX element containing the allergy prompt form.
 */
function AllergyPrompt({ onSave }) {
  const [allergy, setAllergy] = useState('');
  const [furtherInfo, setFurtherInfo] = useState('');

  /**
   * A function to handle the saving of the allergy information. Invokes the onSave prop function with an object
   * containing the allergy and furtherInfo values, then resets the allergy and furtherInfo state values to empty strings.
   */
  const handleSave = () => {
    onSave({ allergy, furtherInfo });
    setAllergy('');
    setFurtherInfo('');
  };

  return (
    <div>
      <label htmlFor="allergy-input">What is your allergy?</label>
      <input
        className='algy-input'
        id="allergy-input"
        type="text"
        value={allergy}
        onChange={(e) => setAllergy(e.target.value)}
      />
      <br /><br />
      <label htmlFor="info-input">Further information (optional)</label>
      <input
        className='algy-input'
        id="info-input"
        type="text"
        value={furtherInfo}
        onChange={(e) => setFurtherInfo(e.target.value)}
      />
      <br /><br />
      <button className='allergy-button' onClick={handleSave}>Save</button>
    </div>
  );
}

/**
 * A component that displays allergy information and allows users to update it through a prompt.
 *
 * @param {Object} props - The props object.
 * @param {Object} props.allergyData - An object containing allergy information to be displayed.
 * @param {string} props.allergyData.allergy - The name of the allergy.
 * @param {string} props.allergyData.furtherInfo - Additional information about the allergy.
 *
 * @returns {JSX.Element} - The AllergyDisplay component.
 */
function AllergyDisplay({ allergyData }) {
  const [allergy, setAllergy] = useState(allergyData.allergy || '');
  const [furtherInfo, setFurtherInfo] = useState(allergyData.furtherInfo || '');

  /**
   * Saves updated allergy information to local storage and updates state.
   *
   * @param {Object} data - An object containing updated allergy information.
   * @param {string} data.allergy - The new name of the allergy.
   * @param {string} data.furtherInfo - Additional information about the allergy.
   * @returns {void}
   */
  const handleSave = ({ allergy, furtherInfo }) => {
    localStorage.setItem('allergyData', JSON.stringify({ allergy, furtherInfo }));
    setAllergy(allergy);
    setFurtherInfo(furtherInfo);
  };

  return (
    <div className='allergy-box'>
      <div>
        <div className='allergy-title'>Allergy: </div>
        <div className='info'>{allergy}</div>
      </div>
      {furtherInfo && (
        <div>
          <div className='allergy-further'>Further information: </div>
          <div className='further-info'>{furtherInfo}</div>
        </div>
      )}
      <AllergyPrompt onSave={handleSave} />
    </div>
  );
}

/**
 * A functional component that renders user profile details and settings.
 */
function User() {
  /**
   * A state hook that stores the display text.
   *
   * @type {string|JSX.Element}
   */
  const [displayText, setDisplayText] = useState('');

  /**
   * A state hook that stores the current sub-section to be displayed.
   *
   * @type {string|JSX.Element}
   */
  const [subSection, setSubSection] = useState('');

  /**
   * A state hook that stores allergy data retrieved from local storage.
   *
   * @type {Object}
   */
  const [allergyData, setAllergyData] = useState(JSON.parse(localStorage.getItem('allergyData')) || {});


  /**
   * Handles button clicks and updates the display and sub-section accordingly.
   *
   * @param {string} box - The name of the button that was clicked.
   */
  const handleButtonClick = (box) => {
    if (box === 'previous-orders') {
      setDisplayText(
        <div className='section-text'>View your previous orders</div>
      );
      setSubSection(
        // This subsection displays 2 dummy order tickets on the left
        // On the right, it displays the receipt for the first order
        // there is no functionality for the buttons
        <div>
        <div className='previous-box'>
          <div className='order-1'>
            <div className='prev-order-details'>
              <div className='order-ref'>Order No. # 4040404</div>
              <div className='order-date'>Date: 12 - Dec - 2020</div>
              <div className='paid-via'>Paid: Card</div>
            </div>
            <button className='order-again'>order again</button>
            <button className='view-receipt-1'>view receipt</button>
          </div>
          <div className='order-1'>
            <div className='prev-order-details'>
              <div className='order-ref'>Order No. # 9090909</div>
              <div className='order-date'>Date: 28 - Nov - 2020</div>
              <div className='paid-via'>Paid: Cash</div>
            </div>
            <button className='order-again'>order again</button>
            <button className='view-receipt-2'>view receipt</button>
          </div>
        </div>
        <div className='order-receipt-1'>
          <div className='order-ref'>Order No. # 4040404</div>
          <div className='order-list'>
            <div className='item-n-p'>1 Taco al Pastor £5.99</div>
            <div className='item-n-p'>1 Mole Poblano £12.99</div>
            <div className='item-n-p'>1 Queso Fundido £7.99</div>
            <div className='item-n-p'>1 Taco al Pastor £5.99</div>
            <div className='item-n-p'>1 Queso Fundido £7.99</div>
            <div className='item-n-p'>2 Tequila Sunrise £15.98</div>
          </div>
          <div className='order-total'>£42.95</div>
          <div className='order-date'>Date: 12 - Dec - 2020</div>
          <div className='paid-via'>Paid: Card</div>
          <div className='paid-via'>Card No. ****-****-****-9999</div>
        </div>
      </div>
      );
  } else if (box === 'allergy-info') {
      setDisplayText(
        <div className='section-text'>Add your allergy</div>
      );
      setSubSection(
        // this subsection displays the allergy information stored by allergydata
          <AllergyDisplay allergyData={allergyData} />
      );
    } else if (box === 'privacy-settings') {
      setDisplayText(
        // this div contains the three options within privacy settings
        <div>
          <button className='details' onClick={() => handleButtonClick('details')}>
            Your Details
          </button>
          <button className='billing' onClick={() => handleButtonClick('billing')}>
            Billing and Payments
          </button>
          <button className='notifications' onClick={() => handleButtonClick('notifications')}>
            Notification Settings
          </button>
        </div>
      );
      setSubSection('');
    } else if (box === 'details') {
      // this subsection holds personal details of the user, it does not have any functionality
      setSubSection(
        <div className='section-box'>
          <div className='section-text'>your personal information</div>
            <form>
              <div className='form-group'>
                <label htmlFor='first-name'>First Name:</label>
                <input type='text' id='first-name' className='form-control' />
              </div>
              <div className='form-group'>
                <label htmlFor='last-name'>Last Name:</label>
                <input type='text' id='last-name' className='form-control' />
              </div>
              <div className='form-group'>
                <label htmlFor='email-address'>Email Address:</label>
                <input type='email' id='email-address' className='form-control' />
              </div>
              <div className='form-group'>
                <label htmlFor='date-of-birth'>Date of Birth:</label>
                <input type='date' id='date-of-birth' className='form-control' />
              </div>
            </form>
        </div>
      );
    } else if (box === 'billing') {
      // this subsection holds payment details of the user, it does not have any functionality
      setSubSection(
        <div className='section-box'>
          <div className='section-text'>your billing and payment information</div>
          <form>
            <div className='form-group'>
              <label htmlFor='card-name'>Name on Card:</label>
              <input type='text' id='card-name' className='form-control card-name' />
            </div>
            <div className='form-group'>
              <label htmlFor='card-number'>Card Number:</label>
              <input type='text' id='card-number' className='form-control card-number' />
            </div>
            <div className='form-group'>
              <label htmlFor='expiry-date'>Expiry Date:</label>
              <input type='text' id='expiry-date' className='form-control expiry-date' />
            </div>
            <div className='form-group'>
              <label htmlFor='security-code'>Security Code:</label>
              <input type='text' id='security-code' className='form-control security-code' />
            </div>
        </form>
        </div>
      );
    } else if (box === 'notifications') {
      // this subsection provides two options for notifications, it does not have any functionality
      setSubSection(
        <div className='section-box'>
        <div className='section-text'>your notification preferences</div>
        <br /><br />
        <div className='toggle-switch'>
          <div className='switch-questions'>Receive Email Receipts?</div>
          <br />
          <div className='toggle'>
            <label class='switch'>
              <input type='checkbox' />
              <span class='slider'></span>
            </label>
          </div>
        </div>
        <br /><br />
        <div className='toggle-switch'>
          <div className='switch-questions'>Receive Offers?</div>
          <br />
          <div className='toggle'>
            <label class='switch'>
              <input type='checkbox' />
              <span class='slider'></span>
            </label>
          </div>
        </div>
      </div>
      );
    }
  };

  /**
   * Renders the User Page component that displays the user's profile information
   * and buttons to navigate to previous orders, allergy information, and privacy settings.
   * @returns {JSX.Element} Returns the JSX Element that renders the User Page component.
   */
  return (
    <div className="User-Page">
      <header className="App-header">
        <Link to="/menuL">
          <img src={logo} alt="the logo" className="header-image" />
        </Link>
      </header>

      <div className="user-container">
        <div className="username">
            John Doe
        </div>
        <div className='profile-picture'>
          <img src={avatar} alt="profile picture"/>
        </div>
        <button className='previous-orders' onClick={() => handleButtonClick('previous-orders')}>
          Previous Orders
        </button>
        <button className='allergy-info' onClick={() => handleButtonClick('allergy-info')}>
          Allergy Information
        </button>
        <button className='privacy-settings' onClick={() => handleButtonClick('privacy-settings')}>
          Privacy Settings
        </button>

        {displayText && (
          <div className="text-box">
            {displayText}
            {subSection && (
              <div className="sub-section">
                {subSection}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default User;
