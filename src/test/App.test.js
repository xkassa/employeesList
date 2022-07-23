import App from "../App";
import React from "react";
import { wait, render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import { mockValues } from "./helpers";

const BASE_URI = "http://localhost:3001";

jest.mock("axios");

describe("App component tests", () => {
  /*   Happy day scenario:
  1. spinner rendered while waiting for server
  2. then rendered employees data in table
  3. select one department - rendered only matching employees
  4. open detail modal window of employee  */
  test("HDS", async () => {
    axios.get.mockResolvedValueOnce({ data: mockValues.employees });
    axios.get.mockResolvedValueOnce({ data: mockValues.departments });
    render(<App baseUri={BASE_URI} />);
    // test spinner to be rendered while waiting for response from mock server
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument();
    // then wait while names are rendered in table
    await wait(() =>
      expect(screen.getByText("Caolan Harrison")).toBeInTheDocument()
    );
    //test if number of employees for every department is correct
    expect(screen.getAllByText("Technology consulting").length).toEqual(10);
    expect(screen.getAllByText("Quality assurance").length).toEqual(4);
    expect(screen.getAllByText("Human resources").length).toEqual(2);
    expect(screen.getAllByText("Managed services").length).toEqual(4);
    expect(screen.getAllByText("Management").length).toEqual(2);

    // now select department- Managed Services from options selector
    fireEvent.change(screen.getByTestId("select"), { target: { value: 2 } });
    await wait(() =>
      expect(screen.getAllByText("Managed services").length).toEqual(4)
    );
    //no employees rendered only select options so one item from all departments in DOM
    expect(screen.getAllByText("Technology consulting").length).toEqual(1);
    expect(screen.getAllByText("Quality assurance").length).toEqual(1);
    expect(screen.getAllByText("Human resources").length).toEqual(1);
    expect(screen.getAllByText("Management").length).toEqual(1);

    //now open detail modal of employee
    fireEvent.click(screen.getByTestId("button7"));
    // then wait while detail info appears in modal
    await wait(() =>
      expect(screen.getByText("Employee detail")).toBeInTheDocument()
    );
    expect(screen.getByText("Conan")).toBeInTheDocument();
    expect(screen.getByText("Allman")).toBeInTheDocument();
    expect(screen.getByText("End date:")).toBeInTheDocument();
    expect(screen.getByText("1. 3. 2018")).toBeInTheDocument();
    expect(screen.getByText("31. 1. 2019")).toBeInTheDocument();
  });

  test("Failed to load data from server", async () => {
    axios.get.mockRejectedValueOnce(new Error("Internal Server Error"));
    render(<App baseUri={BASE_URI} />);
    // test spinner to be rendered while waiting for fail response from mock server
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument();
    // error massage must be rendered
    await wait(() =>
      expect(screen.getByText("Internal Server Error")).toBeInTheDocument()
    );
  });
});
