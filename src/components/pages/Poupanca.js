import { View, Text, SafeAreaView, ScrollView } from "react-native";
import PageTitle from "../Title"

export default function Poupanca() {
    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <PageTitle value={'Poupança'} />
                <View style={{ marginTop: 16, borderColor: '#cdcdcd', paddingLeft: '10%' }}>
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}