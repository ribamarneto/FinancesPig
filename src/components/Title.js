import { Text, StyleSheet } from "react-native";

export default function PageTitle(props) {
    return (
      <Text style={textStyle.input}>{props.value}</Text>
    );
  }

const textStyle = StyleSheet.create({
    input: {
        fontSize: 22, 
        fontWeight: 'bold',
        padding:'5%',
        backgroundColor: '#fceee3', 
        textAlign:'center', 
        width:'100%' 
    },
});