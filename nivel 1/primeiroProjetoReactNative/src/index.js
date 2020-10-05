import React from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar } from 'react-native';

import api from './services/api'

export default function App() {
    const [projects, setProjects] = useState()

    useEffect(() => {
        api.get('projects').then(res => {
            console.log(res.data)
            setProjects(res.data)
        })
    }, [])

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
            
            <SafeAreaView style={style.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item }) => (
                        <Text style={style.project}>{item.title}</Text>
                    )}
                />
            </SafeAreaView>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1'
    },

    project: {
        fontSize: 30,
        color: '#FFF'
    }
})