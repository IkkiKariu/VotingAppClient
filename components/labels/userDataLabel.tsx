import { Text, View, Button } from "react-native";

import RequestedUser from '../../dto/requestedUserDto';

type UserDataProps = {
    usDat: RequestedUser
};

const UserDataLabel = (props: UserDataProps) => {
    return (
        <>
            <Text>{props.usDat.login}</Text>
            <Text>{props.usDat.password}</Text>
            <Text>{props.usDat.name}</Text>
            <Text>{props.usDat.bio}</Text>
        </>
    )
}

export default UserDataLabel;