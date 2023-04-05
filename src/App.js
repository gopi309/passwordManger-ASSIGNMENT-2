import './App.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    userDetailsList: [],
    websiteInput: '',
    userNameInput: '',
    passwordInput: '',
    isTicked: false,
    searchedValue: '',
    // newSearchedList: [],
  }

  deletePassword = id => {
    const {userDetailsList} = this.state
    // const {id} = eachUser
    const newUserDetailsList = userDetailsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({userDetailsList: newUserDetailsList})
  }

  showNoPassword = () => (
    <div className="no-password-div">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password-img"
      />
      <p className="no-pass">No Passwords</p>
    </div>
  )

  searchedList = event => {
    this.setState({searchedValue: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()

    const newClassValue = colorList[Math.floor(Math.random() * 5)]
    const {websiteInput, userNameInput, passwordInput} = this.state

    const addNewPassword = {
      id: uuidv4(),
      website: websiteInput,
      username: userNameInput,
      password: passwordInput,
      classValue: newClassValue,
    }

    this.setState(prevState => ({
      userDetailsList: [...prevState.userDetailsList, addNewPassword],
      websiteInput: '',
      userNameInput: '',
      passwordInput: '',
    }))
  }

  getWebsiteName = event => this.setState({websiteInput: event.target.value})

  getUserName = event => this.setState({userNameInput: event.target.value})

  getPassword = event => this.setState({passwordInput: event.target.value})

  toggleChecked = event => this.setState({isTicked: event.target.checked})

  render() {
    const {
      userDetailsList,
      websiteInput,
      userNameInput,
      passwordInput,
      searchedValue,
    } = this.state

    const newSearchedList = userDetailsList.filter(eachUser =>
      eachUser.website.toLowerCase().includes(searchedValue.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <div className="bg-container1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="password-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager"
            />
            <div className="form-container">
              <h1 className="form-name">Add New Password</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="website-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="website-img"
                  />
                  <input
                    onChange={this.getWebsiteName}
                    type="text"
                    className="website-input"
                    placeholder="Enter Website"
                    value={websiteInput}
                  />
                </div>
                <div className="website-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="website-img"
                  />
                  <input
                    onChange={this.getUserName}
                    type="text"
                    className="website-input"
                    placeholder="Enter Username"
                    value={userNameInput}
                  />
                </div>
                <div className="website-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="website-img"
                  />
                  <input
                    value={passwordInput}
                    onChange={this.getPassword}
                    type="password"
                    className="website-input"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="button-container">
                  <button className="button" type="submit">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="show-password-container">
          <div className="password-search-container">
            <div className="hi">
              <h1 className="password-heading">Your Passwords</h1>
              <p className="span-element">{newSearchedList.length}</p>
            </div>

            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                alt="search"
                className="search-img"
              />
              <input
                onChange={this.searchedList}
                type="search"
                className="input-search"
                placeholder="Search"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="checkbox-container">
            <input type="checkbox" id="check" onChange={this.toggleChecked} />
            <label htmlFor="check" className="show-password">
              Show Passwords
            </label>
          </div>
          {newSearchedList.length === 0 ? (
            this.showNoPassword()
          ) : (
            <div>
              <ul className="list-container">
                {newSearchedList.map(eachUser => {
                  const {id} = eachUser
                  const {isTicked} = this.state
                  return (
                    <li className="list-item" key={eachUser.id}>
                      <div className="profile">
                        <p className={`profile-name ${eachUser.classValue}`}>
                          {eachUser.username.slice(0, 1).toLocaleUpperCase()}
                        </p>
                      </div>
                      <div className="second-container">
                        <div>
                          <p className="heading">{eachUser.website}</p>
                          <p className="username">{eachUser.username}</p>

                          {isTicked ? (
                            <p className="stars one">{eachUser.password}</p>
                          ) : (
                            <img
                              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                              alt="stars"
                              className="stars"
                            />
                          )}
                        </div>

                        <button
                          type="button"
                          className="button1"
                          onClick={() => this.deletePassword(id)}
                          data-testid="delete"
                          // testid="delete"
                        >
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                            alt="delete"
                            className="delete-img"
                          />
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
