import { Header, Icon } from "@rneui/base";


export default function HeaderSignedOut()
{
    return(
        <Header
            centerComponent={{ text: 'Finances Pig', style: { color: '#fff', fontSize: 23, fontWeight: "bold" } }}
            backgroundColor="darkorange"
        />
    );
}

