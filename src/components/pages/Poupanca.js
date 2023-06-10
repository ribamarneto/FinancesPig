import { View, SafeAreaView, ScrollView, Text } from "react-native";
import { Icon } from "@rneui/base";
import PageTitle from "../Title"

export default function Poupanca() {
    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <PageTitle value={'Poupança'} />
                <View style={{ paddingVertical: '25%', borderColor: '#cdcdcd', alignItems:'center' }}>
                   <Icon name="construction" size={100} color={'grey'} />
                   <Text style={{fontSize: 22}}>Em construção!</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}