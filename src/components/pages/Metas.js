import { View, Text, SafeAreaView, ScrollView } from "react-native";
import PageTitle from "../Title"

export default function Metas() {
    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <PageTitle value={'Metas'} />
                <View style={{ marginTop: 16, borderColor: '#cdcdcd', paddingLeft: '10%' }}>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}