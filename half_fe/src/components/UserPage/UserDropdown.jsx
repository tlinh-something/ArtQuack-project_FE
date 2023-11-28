import { useEffect, useState } from "react";
import "./UserDropdown.css";
import { Button, Menu } from "antd";
import { Link } from "react-router-dom";
import convertToCurrencyFormat from "../../components/utils/currencyUtil";
import api from "../../config/axios";
function UserDropdown() {
  const userName = JSON.parse(localStorage.getItem("accessToken"))?.name;
  // const navigate = useNavigate();
  const account = JSON.parse(localStorage.getItem(`accessToken`));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [wallet1, setWallet1] = useState(0);
  const [wallet2, setWallet2] = useState(0);

  // const wallet = JSON.parse(localStorage.getItem("accessToken")).wallet;
  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const fetchWallet = () => {
    api
      .get(`/api/wallet-of-instructor/${account.instructorID}`)
      .then((response) => {
        setWallet1(response.data);
      });
  };
  const fetchWallet2 = () => {
    api.get(`/api/wallet-of-learner/${account.learnerID}`).then((response) => {
      setWallet2(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    fetchWallet();
    fetchWallet2();
  }, []);

  return (
    <div
      className="user"
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
    >
      <div
        className="learner-name"
        style={{
          border: "1px solid #000",
          padding: "0 10px",
          width: "180px",
          borderRadius: "30px",
        }}
      >
        {userName}
      </div>
      {isDropdownOpen && (
        <div
          className="dropdown"
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          <div style={{ fontSize: "18px" }} className="mb-2">
            {account.learnerID ? (
              <Link to={`/user/profile/${account.learnerID}`}>My Profile</Link>
            ) : (
              <Link to={`/instructor/profile/${account.instructorID}`}>
                My Profile
              </Link>
            )}
          </div>
          <div style={{ fontSize: "18px" }} className="mb-2">
            {account.learnerID ? (
              <Link to={`/learner/transaction`}>
                Wallet:{" "}
                <span style={{ color: "orange", fontWeight: "600" }}>
                  {wallet2 === 0
                    ? 0
                    : convertToCurrencyFormat(wallet2?.balance?.toFixed(1))}
                </span>
              </Link>
            ) : (
              <Link to={`/instructor/transaction`}>
                Wallet:{" "}
                <span style={{ color: "orange", fontWeight: "600" }}>
                  {wallet1 === 0
                    ? 0
                    : convertToCurrencyFormat(wallet1?.balance?.toFixed(1))}
                </span>
              </Link>
            )}
          </div>
          <div>
            <Button
              onClick={() => {
                localStorage.clear();
                window.location = "/";
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
