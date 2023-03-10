import { ActivityIndicator, View, StyleSheet } from 'react-native';
export default function Spinner() {
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size={65} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});