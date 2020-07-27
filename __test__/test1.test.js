import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from 'react-native-testing-library';
import fetchMock, { done } from 'fetch-mock';
import App from '../App';
import Login from '../screens/Login';
import * as routes from '../constants/URLs';
import AsyncStorage from '@react-native-community/async-storage';
import * as mocks from './mockResponses'

describe('<App />', () => {
  it('sanity check, checks if there is one child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
  it('checks if navigates to Login', async () => {
    const { findByPlaceholder } = render(<App />);
    const usernameBox = await findByPlaceholder("NUS Net ID: i.e. E1234567");
    const passBox = await findByPlaceholder("Password");
    expect(usernameBox).toBeTruthy();
    expect(passBox).toBeTruthy();
  });
});

describe('Login page', () => {

  it("error when given wrong input", async () => {
    fetchMock.post(routes.login_url, 401);
    const page = render(
      <Login />
    );
    const user = page.getByPlaceholder('NUS Net ID: i.e. E1234567');
    const pass = page.getByPlaceholder('Password');
    fireEvent.changeText(user, 'wrong');
    fireEvent.changeText(pass, 'wrong');
    fireEvent.press(page.getByAccessibilityLabel('login'));
    await waitFor(() => {
      expect(page.queryByText("Incorrect ID/Password."))
        .toBeTruthy();
    });
    fetchMock.restore();
    jest.resetAllMocks();
  });

  it("error when given empty input", async () => {
    const page = render(
      <Login />
    );
    fireEvent.press(page.getByAccessibilityLabel('login'));
    await waitFor(() => {
      expect(page.queryByText("ID and Password cannot be empty!"))
        .toBeTruthy();
    });
  });

  /*it("checks if correct number of fetches are made and asyncStorage is called when given correct responses", async () => {
    const page = render(
      <Login />
    );
    fetchMock.post(routes.login_url, 200);
    const user = page.getByPlaceholder('NUS Net ID: i.e. E1234567');
    const pass = page.getByPlaceholder('Password');

    fireEvent.changeText(user, 'test');
    fireEvent.changeText(pass, 'test');
    fireEvent.press(page.getByAccessibilityLabel('login'));

    await asyncOperationOnAsyncStorage();

    expect(AsyncStorage.setItem).toBeCalledWith("id");
    expect(AsyncStorage.setItem).toBeCalledWith("token");
    expect(AsyncStorage.setItem).toBeCalledWith("profile");
    expect(AsyncStorage.setItem).toBeCalledWith("mods");

    fetchMock.restore();
  })*/
})