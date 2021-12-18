import { render } from "react-dom";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import App from "./App";
import Admin from "./Admin";
import ExistingUser from "./ExistingUser"
import GuestUser from "./GuestUser"
import Update from "./components/Update"
import Search from "./components/searchFlight"
import SearchData from "./components/searchData"
import SearchUser from "./components/searchFlightUser"
import SearchDataUser from "./components/searchDataUser"
import FlightDetails from "./components/flightDetails"
import ReturnFlights from "./components/returnFlights";
import ReturnDetails from "./components/returnDetails";
import Summary from "./components/summary";
import DepartureSeats from "./components/departureSeats";
import UpdateUser from "./components/UpdateUser";
import ReturnSeats from "./components/returnSeats"
import Itinerary from "./components/itinerary"
const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<App />} />
      <Route path="admin" exact element={<Admin />} />
      <Route path="existingUser" exact element={<ExistingUser />} />
      <Route path="guestUser" exact element={<GuestUser />} />
      <Route path="admin/update/:id" exact element={<Update />} />
      <Route path="existingUser/updateUser/:id" exact element={<UpdateUser />} />
      <Route path="search" exact element={<Search />} />
      <Route path="searchUser" exact element={<SearchUser />} />
      <Route path="searchData" exact element={<SearchData />} />
      <Route path="searchDataUser" exact element={<SearchDataUser />} />
      <Route path="searchDataUser/flightDetails/:adult/:children/:id/:cabinClass" exact element={<FlightDetails />} />
      <Route path="searchDataUser/flightDetails/:adult/:children/:id/:cabinClass/returnFlights" exact element={<ReturnFlights />} />
      <Route path="searchDataUser/flightDetails/:adult/:children/:id1/:cabinClass/returnFlights/returnDetails/:id2" exact element={<ReturnDetails />} />
      <Route path="searchDataUser/flightDetails/:adult/:children/:id1/:cabinClass/returnFlights/returnDetails/:id2/summary" exact element={<Summary />} />
      <Route path="searchDataUser/flightDetails/:adult/:children/:id1/:cabinClass/returnFlights/returnDetails/:id2/summary/depSeats" exact element={<DepartureSeats />} />
      <Route path="searchDataUser/flightDetails/:adult/:children/:id1/:cabinClass/returnFlights/returnDetails/:id2/summary/depSeats/retSeats" exact element={<ReturnSeats />} />
      <Route path="searchDataUser/flightDetails/:adult/:children/:id1/:cabinClass/returnFlights/returnDetails/:id2/summary/depSeats/retSeats/itinerary" exact element={<Itinerary />} />

    </Routes>
  </BrowserRouter>,
  rootElement
);