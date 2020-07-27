import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from 'react-native-testing-library';
import fetchMock, { done } from 'fetch-mock';
import App from '../App';
import Login from '../screens/Login';
import * as routes from '../constants/URLs';
import AsyncStorage, { asyncOperationOnAsyncStorage } from '@react-native-community/async-storage';
import * as mocks from './mockResponses'

describe('Login page', () => {

  it("checks if correct number of fetches are made and asyncStorage is called when given correct responses", async () => {
    const page = render(
      <Login />
    );
    fetchMock
      .post(routes.login_url, mocks.test_success)
      .get(routes.profile_url + 'test', mocks.test_profile);

    const user = page.getByPlaceholder('NUS Net ID: i.e. E1234567');
    const pass = page.getByPlaceholder('Password');

    fireEvent.changeText(user, 'test');
    fireEvent.changeText(pass, 'test');
    fireEvent.press(page.getByAccessibilityLabel('login'));

    await asyncOperationOnAsyncStorage();

    expect(AsyncStorage.setItem).toBeCalledWith("id", "test");
    expect(AsyncStorage.setItem).toBeCalledWith("token", "test");
    expect(AsyncStorage.setItem).toBeCalledWith("mods", ["CS2100"]);

    fetchMock.restore();
  })
})