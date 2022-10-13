import React from "react";
import "./Bottomnavbar.css";
import { HiMenuAlt1 } from "react-icons/hi";

function Bottomnavbar() {
  return (
    <>
      <div className="bottomnav-mobile">
        <div>
          <div className="row bottom-navbar">
            <div className="col-lg-4 col-md-2 col-sm-2 col-2">
              <a
                class="btn btn-primary"
                data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample"
                className="icon-1"
              >
                <HiMenuAlt1 />
                <br />
                Menu
              </a>
            </div>
            <div className="col-lg-4 col-md-2 col-sm-2 col-2">
              <img
                src="https://safu.betswamp.com/asset/btm%20icons/bet.svg"
                alt=""
              />
              <br />
              Bets
            </div>
            <div className="col-lg-4 col-md-2 col-sm-2 col-3">
              <img
                src="https://safu.betswamp.com/asset/btm%20icons/bet%20slip.svg"
                alt=""
              />
              <br />
              BetSlip
            </div>
            <div className="col-lg-4 col-md-2 col-sm-2 col-3">
              <img
                src="https://safu.betswamp.com/asset/btm%20icons/create.svg"
                alt=""
              />
              <br />
              Create
            </div>
            <div className="col-lg-4 col-md-2 col-sm-2 col-2">
              <img
                src="https://safu.betswamp.com/asset/btm%20icons/validate.svg"
                alt=""
              />
              <br />
              Validate
            </div>
          </div>
        </div>

        {/* ................................................................................................... */}

        {/* .........................       off canvas       .......................................... */}

        <div
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">
              Offcanvas
            </h5>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <div>
              Some text as placeholder. In real life you can have the elements
              you have chosen. Like, text, images, lists, etc.
            </div>
            <div class="dropdown mt-3">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
              >
                Dropdown button
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bottomnavbar;
