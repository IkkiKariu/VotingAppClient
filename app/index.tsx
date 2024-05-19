import { Text, View, Button } from "react-native";
import { useState, useEffect } from "react";

import axios from "axios";
import UserRepository from "../api/repositories/userRepository";
import RequestedUserDTO from '../dto/requestedUserDto';

import UserDataLabel from "../components/labels/userDataLabel";

export default function Index() {

  const userRepository = new UserRepository();

  const a: RequestedUserDTO = {login: null, password: null, name: null, bio: null}

  const [userData, setUserData]= useState(a);

  useEffect(() =>{
    userRepository.getUser('1|876GjJRxTrUMsCM0WbLlq2hmR7aKD8FVCWidBTy0d2613700')
    .then(response => {
      console.log(response.status);
      console.log(response.data);

      if(response.data.response_status === 'success')
        {
          setUserData(response.data.data);
        }
    })
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>UserData</Text>
      <UserDataLabel usDat={userData}></UserDataLabel>
    </View>
  );
}
