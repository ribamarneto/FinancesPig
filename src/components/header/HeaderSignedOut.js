import { Header, Icon } from "@rneui/base";


export default function HeaderSignedOut()
{
    return(
        <Header
            centerComponent={{ text: 'Bem vindo!', style: { color: '#fff', fontSize: 23, fontWeight: "bold" } }}
            backgroundColor="darkorange"
        />
    );
}

